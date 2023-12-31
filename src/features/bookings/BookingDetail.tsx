import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './hooks/useBooking';
import { useCheckOut } from '../check-in-out/hooks/useCheckOut';
import { useDeleteBooking } from './hooks/useDeleteBooking';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, error } = useBooking();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  } as const;

  if (isLoading) {
    return <Spinner />;
  }

  if (!booking || error) {
    return <div>Booking not found</div>;
  }

  const status = (booking.status || 'unconfirmed') as keyof typeof statusToTagName;

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/check-in/${booking.id}`)}>Check in</Button>
        )}

        {status === 'checked-in' && (
          <Button
            onClick={() => {
              checkOut(booking.id);
            }}
            disabled={Boolean(isCheckingOut)}
          >
            Check out
          </Button>
        )}

        <Modal.Open opens="delete">
          <Button $variation="danger" disabled={Boolean(isDeletingBooking)}>
            Delete
          </Button>
        </Modal.Open>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={Boolean(isDeletingBooking)}
            onConfirm={() => {
              deleteBooking(booking.id, {
                onSettled: () => {
                  moveBack();
                },
              });
            }}
          />
        </Modal.Window>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </Modal>
  );
}

export default BookingDetail;
