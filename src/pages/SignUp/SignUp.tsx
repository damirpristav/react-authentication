import { Formik, Form } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { AuthLayout } from 'layouts';
import { Button, Input } from 'components';
import { RegisterRequestData } from 'types';
import { getCsrfCookie, register } from 'actions/auth';
import { validationSchema } from './formHelpers';

export const SignUp = () => {
  const navigate = useNavigate();

  const onSubmit = async (values: RegisterRequestData) => {
    try {
      await getCsrfCookie();
      await register(values);
      toast.success('Successfully registered. Check your inbox to verify your email address.');
      navigate('/sign-in');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AuthLayout title="Sign up">
      <Formik<RegisterRequestData>
        initialValues={{ email: '', password: '', first_name: '', last_name: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <p>Create your account.</p>
            <Input name="first_name" label="First name" />
            <Input name="last_name" label="Last name" />
            <Input name="email" label="Email address" />
            <Input name="password" label="Password" type="password" />
            <div className="form__links">
              <Link to="/sign-in">Already have an account ?</Link>
            </div>
            <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting} />
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};
