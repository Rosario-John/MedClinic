import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import RegisterPatient from './pages/RegisterPatient';
import PatientManagement from './pages/PatientManagement';
import MedicalRecords from './pages/MedicalRecords';
import OrganizationPage from './pages/Organization';
import Facility from './pages/Facility';
import Roles from './pages/Roles';
import Users from './pages/Users';
import Specialities from './pages/masters/Specialities';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/appointments" element={<Appointments />} />
                      <Route path="/register" element={<RegisterPatient />} />
                      <Route path="/patients" element={<PatientManagement />} />
                      <Route path="/records" element={<MedicalRecords />} />
                      <Route path="/organization" element={<OrganizationPage />} />
                      <Route path="/facility" element={<Facility />} />
                      <Route path="/roles" element={<Roles />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/specialities" element={<Specialities />} />
                    </Routes>
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;