import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthLayout } from "layouts";
import { Button, Checkbox, Input } from "components";
import { LoginRequestData } from "types";
import { getCsrfCookie, login } from "actions/auth";
import { useGlobalProvider } from "hooks";
import { validationSchema } from './formHelpers';
import { saveUserToLS } from "actions/localStorage";

export const SignIn = () => {
  const { setUser, setIsUserFetched } = useGlobalProvider();

  const onSubmit = async (values: LoginRequestData) => {
    try {
      await getCsrfCookie();
      const res = await login(values);
      toast.success(res.data.message);
      setUser(res.data.user);
      saveUserToLS(res.data.user);
      setIsUserFetched(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AuthLayout title="Sign in">
      <Formik<LoginRequestData>
        initialValues={{ email: '', password: '', remember: false }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}  
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <p>Enter a valid email address and your password.</p>
            <Input name="email" label="Email address" />
            <Input name="password" label="Password" type="password" />
            <Checkbox name="remember" label="Remember me" />
            <div className="form__links">
              <Link to="/sign-up">Don't have an account ?</Link>
              <Link to="/forgot-password">Forgot password ?</Link>
            </div>
            <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting} />
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};
