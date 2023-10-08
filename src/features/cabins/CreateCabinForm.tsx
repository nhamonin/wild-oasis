import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { CabinCreation } from '../../types/data/Cabin';
import { createCabin } from '../../services/apiCabins';
import FormRow from '../../ui/FormRow';

type FormInputs = CabinCreation & FieldValues;

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm<FormInputs>();
  const { errors } = formState;
  const { mutate, isLoading: creatingCabin } = useMutation({
    mutationFn: (newCabin: FormInputs) => createCabin(newCabin),
    onSuccess: () => {
      toast.success('Cabin successfully created!');
      queryClient.invalidateQueries(['cabins']);
      reset();
    },
    onError: (error: Error) => toast.error(error.message),
  });
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={creatingCabin}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={creatingCabin}
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
          disabled={creatingCabin}
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
          disabled={creatingCabin}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) => {
              const currentRegularPrice = getValues('regular_price');
              return (
                value <= currentRegularPrice ||
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
          disabled={creatingCabin}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={creatingCabin}>
          Cancel
        </Button>
        <Button disabled={creatingCabin}>Create cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
