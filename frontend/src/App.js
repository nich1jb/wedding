import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Background from './components/Background';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={
            <RequireAuth>
              <RegisterPage />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
    <Background />
  </BrowserRouter>
);

export default App;
