import { useForm, SubmitHandler, Resolver } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  let errors = {};
  if (!values.fullName) {
    errors = {
      ...errors,
      fullName: {
        type: 'required',
        message: 'This field is required.',
      },
    };
  }

  if (!values.email) {
    errors = {
      ...errors,
      email: {
        type: 'required',
        message: 'This field is required.',
      },
    };
  }

  if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
    errors = {
      ...errors,
      email: {
        type: 'validate',
        message: 'Please enter a valid email address.',
      },
    };
  }

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

function SignupForm() {
  const { formState, handleSubmit, register } = useForm<FormValues>({ resolver });
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input type="text" id="fullName" {...register('fullName')} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" {...register('email')} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register('password')} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register('passwordConfirm')} />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
