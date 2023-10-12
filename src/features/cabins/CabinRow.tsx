import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import toast from 'react-hot-toast';

import { formatCurrency } from '../../utils/helpers';
import { deleteCabin } from '../../services/apiCabins';
import { Cabin } from '../../types';
import { useState } from 'react';
import CreateEditCabinForm from './CreateEditCabinForm';

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
  const { id: cabinId, image, name, max_capacity, regular_price, discount } = cabin;
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (cabinId: number) => deleteCabin(cabinId),
    onSuccess: () => {
      toast.success('Cabin successfully deleted!');
      queryClient.invalidateQueries(['cabins']);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <>
      <TableRow role="row">
        <Img src={image ?? undefined} alt={name ?? undefined} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {max_capacity} guests</div>
        <Price>{formatCurrency(regular_price)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
          <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && (
        <CreateEditCabinForm cabinToEdit={cabin} onFormClose={() => setShowForm(false)} />
      )}
    </>
  );
}

export default CabinRow;
