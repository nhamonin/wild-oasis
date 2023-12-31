import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from 'react-icons/hi2';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { useCheckOut } from '../check-in-out/hooks/useCheckOut';
import { useDeleteBooking } from './hooks/useDeleteBooking';
import { FullBooking } from '../../types';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({ booking }: { booking: FullBooking }) {
  const { start_date, end_date, num_nights, total_price, status, guests, cabins, id } = booking;
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const guestName = guests?.full_name || 'N/A';
  const email = guests?.email || 'N/A';
  const cabinName = cabins?.name || 'N/A';
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  } as const;
  const tagType = status ? statusToTagName[status as keyof typeof statusToTagName] : undefined;
  const formattedStatus = status?.replace('-', ' ') || 'N/A';

  return (
    <Table.Row>
      <Modal>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(start_date || ''))
              ? 'Today'
              : formatDistanceFromNow(start_date || '')}{' '}
            &rarr; {num_nights} night stay
          </span>
          <span>
            {format(new Date(start_date || ''), 'MMM dd yyyy')} &mdash;{' '}
            {format(new Date(end_date || ''), 'MMM dd yyyy')}
          </span>
        </Stacked>

        <Tag type={tagType}>{formattedStatus}</Tag>

        <Amount>{formatCurrency(total_price)}</Amount>

        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button icon={<HiEye />} onClick={() => navigate(`/bookings/${id}`)}>
              See details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/check-in/${id}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkOut(id)}
                disabled={Boolean(isCheckingOut)}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} disabled={Boolean(isDeletingBooking)}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete resourceName="booking" onConfirm={() => deleteBooking(id)} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
