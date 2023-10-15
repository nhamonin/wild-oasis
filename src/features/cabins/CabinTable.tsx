import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './hooks/useCabins';
import Table from '../../ui/Table';

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      {cabins?.length && cabins.map((cabin) => <CabinRow key={cabin.id} cabin={cabin} />)}
    </Table>
  );
}

export default CabinTable;
