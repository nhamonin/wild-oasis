import { useSearchParams } from 'react-router-dom';

import { useCabins } from './hooks/useCabins';
import Spinner from '../../ui/Spinner';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { Cabin, SortableCabinFields } from '../../types';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading || !cabins) {
    return <Spinner />;
  }

  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins: Cabin[] = [];

  if (filterValue === 'all') {
    filteredCabins = cabins;
  }

  if (filterValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount && cabin.discount > 0);
  }

  if (filterValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  const sortByValue = searchParams.get('sort_by') || 'name-asc';
  const [field, direction] = sortByValue.split('-') as [SortableCabinFields, 'asc' | 'desc'];
  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue - bValue) * modifier;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * modifier;
    }

    return 0;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body<Cabin>
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
