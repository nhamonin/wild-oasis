import { useForm, SubmitHandler, Resolver } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useUpdateUser } from './hooks/useUpdateUser';

type FormValues = {
  password: string;
  passwordConfirm: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  let errors = {};
  if (!values.password) {
    errors = {
      ...errors,
      password: {
        type: 'required',
        message: 'This field is required.',
      },
    };
  }

  if (values.password.length < 8) {
    errors = {
      ...errors,
      password: {
        type: 'validate',
        message: 'The password must be at least 8 characters long.',
      },
    };
  }

  if (!values.passwordConfirm) {
    errors = {
      ...errors,
      passwordConfirm: {
        type: 'required',
        message: 'This field is required.',
      },
    };
  }

  if (values.password !== values.passwordConfirm) {
    errors = {
      ...errors,
      passwordConfirm: {
        type: 'validate',
        message: 'The passwords do not match.',
      },
    };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors: errors,
  };
};

function UpdatePasswordForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { formState, handleSubmit, register, reset } = useForm<FormValues>({ resolver });
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    updateUser({ password: data.password }, { onSettled: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="New password (min 8 chars)" error={errors?.password?.message}>
        <Input type="password" id="password" disabled={isUpdating} {...register('password')} />
      </FormRow>

      <FormRow label="Confirm password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm')}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" disabled={isUpdating} onClick={() => reset()}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
