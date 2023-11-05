import Button from '../../ui/Button';
import { useCheckOut } from './hooks/useCheckOut';

function CheckoutButton({ bookingId }: { bookingId: number }) {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Button size="small" onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
