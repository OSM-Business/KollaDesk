import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Dashboard } from '../pages/Dashboard';
import Projects from '../pages/Projects';
import Settings from '../pages/Settings';
import Admin from '../pages/Admin/Admin';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/projects', element: <Projects /> },
      { path: '/settings', element: <Settings /> },
      { path: '/admin', element: <Admin /> },
    ],
  },
]);
