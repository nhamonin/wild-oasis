import styled from 'styled-components';

import { useRecentBookings } from './hooks/useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './hooks/useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { stays, isLoading: isLoadingStays, confirmedStays } = useRecentStays();

  if (isLoadingBookings || isLoadingStays) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activities</div>
      <div>Chart stay durations</div>
      <div>Chart of sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
