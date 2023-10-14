import { useState } from 'react';

import Button from '../../ui/Button';
import CreateUpdateCabinForm from './CreateUpdateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpenModal((show) => !show)}>Add new cabin!</Button>

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          {' '}
          <CreateUpdateCabinForm onClose={() => setIsOpenModal(false)} />{' '}
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
