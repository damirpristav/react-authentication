import { useState } from 'react';
import toast from 'react-hot-toast';

import { useGlobalProvider } from 'hooks';
import { resendEmailVerifyMail } from 'actions/auth';
import { Alert } from 'components';

export const Dashboard = () => {
  const { user } = useGlobalProvider();
  const [isResending, setIsResending] = useState(false);

  const onResend = async () => {
    try {
      setIsResending(true);
      const res = await resendEmailVerifyMail({ user_id: user?.id ?? '' });
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="dashboard">
      {!user?.email_verified_at && (
        <Alert 
          text="Your email address is not verified. Click resend button to verify your email address."
          buttonLabel="Resend"
          buttonAction={onResend}
          isButtonDisabled={isResending}
          isButtonLoading={isResending}
        />
      )}
      <h2>Hello {user?.first_name}, welcome back</h2>
    </div>
  );
};
