import { Route, Routes } from 'react-router';
import ProtectedRoute from './auth/ProtectedRoute';
import { AutomationsProvider } from './contexts/AutomationsContext';
import {
  AdminPage,
  AutomationsPage,
  ConnectionsPage,
  LoginPage,
  SettingsPage,
  SignUpPage,
  UserProfilePage,
} from './pages';
import Menu from './Menu';
import Navbar from './Navbar';
import BuisnessesPage from './pages/BuisnessesPage';
import { NewBuisnessProvider } from './contexts/NewBuisnessContext';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="*"
          element={
            <AppLayout>
              <AuthRouter />
            </AppLayout>
          }
        />
      </Route>
    </Routes>
  );
};

export const AppLayout = ({ children }: any) => {
  return (
    <div className="container">
      <Navbar />
      <Menu />
      <div className="content">{children}</div>
    </div>
  );
};

export const AuthRouter = () => {
  return (
    <Routes>
      {/* <Route
        path="/"
        element={
          <AutomationsProvider>
            <AutomationsPage />
          </AutomationsProvider>
        }
      />
      <Route path="/admin" element={<AdminPage />} /> */}
      <Route
        path="/"
        element={
          <NewBuisnessProvider>
            <BuisnessesPage />
          </NewBuisnessProvider>
        }
      />
      <Route path="/settings" element={<SettingsPage />} />
      {/* <Route path="/user-profile" element={<UserProfilePage />} /> */}
      {/* <Route path="/connections" element={<ConnectionsPage />} /> */}
    </Routes>
  );
};
