import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { formatCurrency } from '../../utils/helpers';
import { Cabin } from '../../types';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import { useCreateCabin } from './hooks/useCreateCabin';
import CreateUpdateCabinForm from './CreateUpdateCabinForm';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }: { cabin: Cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const { id: cabinId, image, name, max_capacity, regular_price, discount, description } = cabin;

  function handleDuplicateCabin() {
    createCabin({
      name: `${name} (copy)`,
      max_capacity,
      regular_price,
      discount,
      description,
      image,
    });
  }

  return (
    <Table.Row>
      <Img src={image ?? undefined} alt={name ?? undefined} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {max_capacity} guests</div>
      <Price>{formatCurrency(regular_price)}</Price>
      <Discount>{discount ? formatCurrency(discount) : <span>&mdash;</span>}</Discount>
      <div>
        <button disabled={isCreating} onClick={() => handleDuplicateCabin()}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateUpdateCabinForm cabinToUpdate={cabin} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens="delete">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
