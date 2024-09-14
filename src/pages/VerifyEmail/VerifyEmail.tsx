import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthLayout } from 'layouts';
import { getCsrfCookie, verifyEmail } from 'actions/auth';
import { Button } from 'components';
import { useGlobalProvider } from 'hooks';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const { user, setUser } = useGlobalProvider();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const onVerify = async () => {
    const id = searchParams.get('id') ?? '';
    const hash = searchParams.get('hash') ?? '';
    const expires = searchParams.get('expires') ?? '';
    const signature = searchParams.get('signature') ?? '';
    try {
      setIsLoading(true);
      await getCsrfCookie();
      const res = await verifyEmail({ id, hash, expires, signature });
      toast.success(res.data.message);
      // only set user if user is logged in
      if (user) {
        setUser(res.data.user);
      }
      navigate('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Verify your email address">
      <div className="verify-email">
        <p>Click the button bellow to verify your email address</p>
        <Button
          label="Verify"
          className="button"
          type="button"
          onClick={onVerify}
          isLoading={isLoading}
          disabled={isLoading}
        />
        <p className="return-link-wrapper">
          <Link to="/">Return to application</Link>
        </p>
      </div>
    </AuthLayout>
  );
};
