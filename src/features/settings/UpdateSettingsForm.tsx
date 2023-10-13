import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './hooks/useSettings';

function UpdateSettingsForm() {
  const {
    settings: {
      min_booking_length,
      max_booking_length,
      max_guests_per_booking,
      breakfast_price,
    } = {},
    isLoading,
  } = useSettings();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" defaultValue={min_booking_length?.toString()} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={max_booking_length?.toString()} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input type="number" id="max-guests" defaultValue={max_guests_per_booking?.toString()} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input type="number" id="breakfast-price" defaultValue={breakfast_price?.toString()} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
