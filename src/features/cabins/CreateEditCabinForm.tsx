import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { createEditCabin } from '../../services/apiCabins';
import { Cabin, CabinFormInputs, EditCabinArgs } from '../../types';

type CreateCabinFormProps = {
  cabinToEdit?: Cabin | Record<string, never>;
  onFormClose: () => void;
};

function CreateEditCabinForm({ cabinToEdit = {}, onFormClose }: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = !!editId;
  const { register, handleSubmit, reset, getValues, formState } = useForm<CabinFormInputs>({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created!');
      queryClient.invalidateQueries(['cabins']);
      reset();
      onFormClose();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }: EditCabinArgs) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited!');
      queryClient.invalidateQueries(['cabins']);
      reset();
      onFormClose();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const isWorking = isCreating || isEditing;

  const onSubmit: SubmitHandler<CabinFormInputs> = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image?.[0] ?? null;

    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId });
    } else {
      createCabin({ ...data, image });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register('max_capacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Minimum capacity is 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register('regular_price', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Minimum price is 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) => {
              const currentRegularPrice = parseInt(
                getValues('regular_price')?.toString() || '0',
                10
              );
              const parsedValue = parseInt(value?.toString() || '0', 10);

              if (isNaN(parsedValue)) {
                return 'Value is required';
              }
              if (isNaN(currentRegularPrice)) {
                return 'Regular price is missing';
              }
              return (
                parsedValue <= currentRegularPrice ||
                'Discount should be less than or equal to the regular price'
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isWorking}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit' : 'Create new'} cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateEditCabinForm;
