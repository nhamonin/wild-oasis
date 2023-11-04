import { useEffect, useState } from 'react';
import styled from 'styled-components';

import BookingDataBox from '../bookings/BookingDataBox';
import { formatCurrency } from '../../utils/helpers';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { useBooking } from '../bookings/hooks/useBooking';
import { useSettings } from '../settings/hooks/useSettings';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckIn } from './hooks/useCheckIn';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckInBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [confirmBreakfast, setConfirmBreakfast] = useState(false);
  const { booking, isLoading, error } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckIn();

  useEffect(() => {
    setConfirmPaid(booking?.is_paid ?? false);
  }, [booking?.is_paid]);

  useEffect(() => {
    setConfirmBreakfast(booking?.has_breakfast ?? false);
  }, [booking?.has_breakfast]);

  if (isLoading || isLoadingSettings) {
    return <Spinner />;
  }

  if (!booking || error) {
    return 'Booking not found';
  }

  const { id: bookingId, guests, total_price, num_guests, has_breakfast, num_nights } = booking;
  const breakfastPrice =
    Number(settings?.breakfast_price) * Number(num_guests ?? 0) * Number(num_nights ?? 0);

  function handleCheckIn() {
    if (!confirmPaid) return;

    const breakfastDetails = confirmBreakfast
      ? {
          has_breakfast: true,
          extras_price: breakfastPrice,
          total_price: (total_price ?? 0) + breakfastPrice,
        }
      : {};

    checkIn({ bookingId, ...breakfastDetails });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && (
        <Box>
          <Checkbox
            id="confirmBreakfast"
            checked={confirmBreakfast}
            disabled={has_breakfast || isCheckingIn}
            onChange={() => {
              setConfirmBreakfast((confirmBreakfast) => !confirmBreakfast);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(breakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirmPaid"
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
        >
          I confirm that {guests?.full_name} has paid total amount of{' '}
          {formatCurrency(confirmBreakfast ? (total_price ?? 0) + breakfastPrice : total_price)}
          {confirmBreakfast &&
            `(${formatCurrency(total_price)} + ${formatCurrency(breakfastPrice)})`}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckIn} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckInBooking;
