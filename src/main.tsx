import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Admin } from './pages/admin/admin.tsx';
import { Login } from './pages/auth/login.tsx';
import { NotFound } from './pages/not-found/not-found.tsx';
import { Teacher } from './pages/teacher/teacher.tsx';
import { Home } from './pages/home/home.tsx';

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
    element: <Admin />
  },
  {
    path: '/teacher',
    element: <Teacher />
  },
  {
    path: '/notFound',
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
