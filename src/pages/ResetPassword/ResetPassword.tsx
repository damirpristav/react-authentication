import { Formik, Form } from "formik";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthLayout } from "layouts";
import { Button, Input } from "components";
import { getCsrfCookie, resetPassword } from "actions/auth";
import { validationSchema, Values } from './formHelpers';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onSubmit = async (values: Values) => {
    try {
      await getCsrfCookie();
      const res = await resetPassword({
        ...values,
        token: searchParams.get('token') ?? '',
        email: searchParams.get('email') ?? '',
      });
      toast.success(res.data.message);
      navigate('/sign-in');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AuthLayout title="Reset password">
      <Formik<Values>
        initialValues={{ password: '', password_confirmation: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}  
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <p>Set a new password for your account.</p>
            <Input name="password" label="Password" type="password" />
            <Input name="password_confirmation" label="Confirm password" type="password" />
            <div className="form__links">
              <Link to="/sign-in">Sign in instead</Link>
            </div>
            <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting} />
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};
