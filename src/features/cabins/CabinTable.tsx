import { useSearchParams } from 'react-router-dom';

import { useCabins } from './hooks/useCabins';
import Spinner from '../../ui/Spinner';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { Cabin } from '../../types';

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
          data={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
