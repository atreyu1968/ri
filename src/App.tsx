import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/layout/Layout';
import { useAuthStore } from './stores/authStore';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const AcademicYears = React.lazy(() => import('./pages/AcademicYears'));
const MasterRecords = React.lazy(() => import('./pages/MasterRecords'));
const Users = React.lazy(() => import('./pages/Users'));
const Actions = React.lazy(() => import('./pages/Actions'));

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </React.Suspense>
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />
          
          {/* Protected Routes */}
          <Route
            element={
              isAuthenticated ? (
                <Layout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route
              path="/dashboard"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </React.Suspense>
              }
            />
            <Route
              path="/academic-years"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <AcademicYears />
                </React.Suspense>
              }
            />
            <Route
              path="/master-records"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <MasterRecords />
                </React.Suspense>
              }
            />
            <Route
              path="/users"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Users />
                </React.Suspense>
              }
            />
            <Route
              path="/actions"
              element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Actions />
                </React.Suspense>
              }
            />
          </Route>

          {/* Redirect root to dashboard or login */}
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;