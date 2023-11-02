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
  const { booking, isLoading, error } = useBooking();
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckIn();

  useEffect(() => {
    setConfirmPaid(booking?.is_paid ?? false);
  }, [booking?.is_paid]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!booking || error) {
    return 'Booking not found';
  }

  const { id: bookingId, guests, total_price, num_guests, has_breakfast, num_nights } = booking;

  function handleCheckIn() {
    if (!confirmPaid) return;

    checkIn(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

    <Box>
      <Checkbox
        id='confirmPaid'
        checked={confirmPaid}
        disabled={confirmPaid || isCheckingIn}
        onChange={() => setConfirmPaid(confirmPaid => !confirmPaid)}
      >I confirm that {guests?.full_name} has paid total amount of {formatCurrency(total_price)}.</Checkbox>
    </Box>

      <ButtonGroup>
        <Button onClick={handleCheckIn} disabled={!confirmPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckInBooking;
