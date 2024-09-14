import { Formik, Form, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthLayout } from "layouts";
import { Button, Input } from "components";
import { ForgotPasswordRequestData } from "types";
import { forgotPassword, getCsrfCookie } from "actions/auth";
import { validationSchema } from './formHelpers';

export const ForgotPassword = () => {

  const onSubmit = async (values: ForgotPasswordRequestData, formikHelpers: FormikHelpers<ForgotPasswordRequestData>) => {
    try {
      await getCsrfCookie();
      const res = await forgotPassword(values);
      toast.success(res.data.message);
      formikHelpers.resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AuthLayout title="Forgot password">
      <Formik<ForgotPasswordRequestData>
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}  
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <p>Enter your email address to reset a password.</p>
            <Input name="email" label="Email address" />
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
