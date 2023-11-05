import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';
import { Booking, PartialBooking } from '../../types';

type StatsProps = {
  bookings: PartialBooking[] | undefined;
  confirmedStays: Booking[] | undefined;
  numDays: number;
  cabinCount: number;
};

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) => {
  const totalBookings = bookings?.length || 0;
  const totalSales = bookings?.reduce((acc, curr) => acc + (curr?.total_price || 0), 0) || 0;
  const totalCheckIns = confirmedStays?.length || 0;

  const confirmedNightsCount =
    confirmedStays?.reduce((acc, curr) => (acc += curr.num_nights || 0), 0) || 0;
  const occupancyRate = (confirmedNightsCount / (numDays * cabinCount)) * 100;

  return (
    <>
      <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={totalBookings} />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalCheckIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupancyRate.toFixed(2) + '%'}
      />
    </>
  );
};

export default Stats;
