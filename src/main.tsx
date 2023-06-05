import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Admin } from './pages/admin/admin.tsx';
import { Login } from './pages/auth/login.tsx';
import { NotFound } from './pages/not-found/not-found.tsx';
import { Teacher } from './pages/teacher/teacher.tsx';
import { Home } from './pages/home/home.tsx';
import { IUser } from './interfaces/interfaces.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <ProtectedRoute element={<Admin />} />
  },
  {
    path: '/teacher',
    element: <ProtectedRoute element={<Teacher />} />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

function ProtectedRoute({ element }: { element: any }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser | null>();

  useEffect(() => {
    if (isLoading) {
      fetch(`/api/users/current`)
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.userId) {
            setCurrentUser(responseData);
          }
        })
        .catch((error) => {
          console.log(`Error getting user`, error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);
  const isAuthenticated = currentUser;

  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/" replace />;
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
