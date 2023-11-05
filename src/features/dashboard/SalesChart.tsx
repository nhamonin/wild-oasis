import styled from 'styled-components';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';
import { useDarkMode } from '../../context/DarkModeContext';
import { PartialBooking } from '../../types';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

type SalesChartProps = {
  bookings: PartialBooking[] | undefined;
  numDays: number;
};

const SalesChart = ({ bookings, numDays }: SalesChartProps) => {
  const { isDarkMode } = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales:
        bookings
          ?.filter(
            (booking) => booking?.created_at && isSameDay(new Date(booking.created_at), date)
          )
          .reduce((acc, curr) => acc + (curr?.total_price || 0), 0) || 0,
      extrasSales:
        bookings
          ?.filter(
            (booking) => booking?.created_at && isSameDay(new Date(booking.created_at), date)
          )
          .reduce((acc, curr) => acc + (curr?.extras_price || 0), 0) || 0,
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  const startDate = allDates[0] ? format(allDates[0], 'MMM dd yyyy') : '';
  const endDate = allDates[allDates.length - 1]
    ? format(allDates[allDates.length - 1], 'MMM dd yyyy')
    : '';

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {startDate} &mdash; {endDate}
      </Heading>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="label" stroke={colors.text} />
          <YAxis unit={'$'} stroke={colors.text} />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
            }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Area
            dataKey="totalSales"
            {...colors.totalSales}
            strokeWidth={2}
            name="Total Sales"
            unit={'$'}
          />
          <Area
            dataKey="extrasSales"
            {...colors.extrasSales}
            strokeWidth={2}
            name="Extras Sales"
            unit={'$'}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
