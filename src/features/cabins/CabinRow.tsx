import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { formatCurrency } from '../../utils/helpers';
import { Cabin } from '../../types';
import { useState } from 'react';
import CreateUpdateCabinForm from './CreateUpdateCabinForm';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import { useCreateCabin } from './hooks/useCreateCabin';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [showForm, setShowForm] = useState(false);
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
    <>
      <TableRow role="row">
        <Img src={image ?? undefined} alt={name ?? undefined} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {max_capacity} guests</div>
        <Price>{formatCurrency(regular_price)}</Price>
        <Discount>{discount ? formatCurrency(discount) : <span>&mdash;</span>}</Discount>
        <div>
          <button disabled={isCreating} onClick={() => handleDuplicateCabin()}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && (
        <CreateUpdateCabinForm cabinToUpdate={cabin} onClose={() => setShowForm(false)} />
      )}
    </>
  );
}

export default CabinRow;
