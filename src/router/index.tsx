import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { GlobalProvider } from 'providers';
import { PrivateLayout, PublicLayout, SharedLayout } from 'layouts';
import { Dashboard, ForgotPassword, ResetPassword, SignIn, SignUp, VerifyEmail } from 'pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<GlobalProvider />}>
      <Route path="/" element={<PrivateLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route element={<SharedLayout />}>
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);
