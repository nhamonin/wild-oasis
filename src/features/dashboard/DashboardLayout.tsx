import styled from 'styled-components';

import Stats from './Stats';
import TodayActivity from '../check-in-out/TodayActivity';
import Spinner from '../../ui/Spinner';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import { useRecentBookings } from './hooks/useRecentBookings';
import { useRecentStays } from './hooks/useRecentStays';
import { useCabins } from '../cabins/hooks/useCabins';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { isLoading: isLoadingStays, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length || 0}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
