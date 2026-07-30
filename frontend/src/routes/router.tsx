import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Dashboard } from '../pages/Dashboard';
import { ProjectsLayout } from '../pages/Projects/ProjectsLayout';
import { ProjectsList } from '../pages/Projects/ProjectsList';
import { GewerkeList } from '../pages/Projects/GewerkeList';
import { KategorienList } from '../pages/Projects/KategorienList';
import { DokumenteView } from '../pages/Projects/DokumenteView';
import Settings from '../pages/Settings';
import Admin from '../pages/Admin/Admin';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Dashboard /> },
      {
        path: '/projects',
        element: <ProjectsLayout />,
        children: [
          { index: true, element: <ProjectsList /> },
          { path: ':projectId', element: <GewerkeList /> },
          { path: ':projectId/:gewerkId', element: <KategorienList /> },
          { path: ':projectId/:gewerkId/:kategorieId', element: <DokumenteView /> },
        ],
      },
      { path: '/settings', element: <Settings /> },
      { path: '/admin', element: <Admin /> },
    ],
  },
]);
