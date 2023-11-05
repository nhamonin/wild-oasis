import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HiOutlineNoSymbol } from 'react-icons/hi2';

import CheckoutButton from './CheckOutButton';
import Tag from '../../ui/Tag';
import { Flag } from '../../ui/Flag';
import Button from '../../ui/Button';
import { PartialBooking } from '../../types';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

type TodayItemProps = {
  activity: PartialBooking;
};

const TodayItem = ({ activity }: TodayItemProps) => {
  const { id, status, num_nights, guests } = activity;

  if (!guests || !id) return null;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

      {guests.country_flag ? (
        <Flag src={guests.country_flag} alt={`flag of ${guests?.country_flag}`} />
      ) : (
        <div>
          <HiOutlineNoSymbol />
        </div>
      )}
      <Guest>{guests?.full_name}</Guest>
      <div>{num_nights} nights</div>

      {status === 'unconfirmed' && (
        <Button size="small" as={Link} to={`/check-in/${id}`}>
          Check in
        </Button>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
};

export default TodayItem;
