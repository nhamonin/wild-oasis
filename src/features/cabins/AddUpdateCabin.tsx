import Button from '../../ui/Button';
import CreateUpdateCabinForm from './CreateUpdateCabinForm';
import Modal from '../../ui/Modal';
import { Cabin } from '../../types';

function AddUpdateCabin({
  cabin,
  CustomButton,
  buttonText,
}: {
  cabin?: Cabin;
  CustomButton?: React.ReactElement;
  buttonText?: string;
}) {
  if (!CustomButton && !buttonText) {
    throw new Error('Either CustomButton or buttonText must be provided');
  }

  return (
    <Modal>
      <Modal.Open opens="cabin-form">{CustomButton || <Button>{buttonText}</Button>}</Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateUpdateCabinForm cabinToUpdate={cabin} />
      </Modal.Window>
    </Modal>
  );
}

export default AddUpdateCabin;
