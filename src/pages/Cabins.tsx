import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import AddUpdateCabin from '../features/cabins/AddUpdateCabin';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <AddUpdateCabin buttonText="Add new cabin!" />
      </Row>
    </>
  );
}

export default Cabins;
