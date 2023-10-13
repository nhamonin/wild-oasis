import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './hooks/useSettings';
import { useUpdateSetting } from './hooks/useUpdateSettings';
import { SettingsToUpdate } from '../../types';

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
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) {
    return <Spinner />;
  }

  function handleUpdateSetting(e: React.FocusEvent<HTMLInputElement>, id: keyof SettingsToUpdate) {
    const { value } = e.target;

    if (!value) return;

    updateSetting({ [id]: +value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_booking_length?.toString()}
          onBlur={(e) => handleUpdateSetting(e, 'min_booking_length')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={max_booking_length?.toString()}
          onBlur={(e) => handleUpdateSetting(e, 'max_booking_length')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={max_guests_per_booking?.toString()}
          onBlur={(e) => handleUpdateSetting(e, 'max_guests_per_booking')}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price?.toString()}
          onBlur={(e) => handleUpdateSetting(e, 'breakfast_price')}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
