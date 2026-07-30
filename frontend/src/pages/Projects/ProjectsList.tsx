import { useNavigate, useOutletContext } from 'react-router-dom';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { FolderItems } from './FolderTile';
import { projects } from './data';

export function ProjectsList() {
  const navigate = useNavigate();
  const { compact } = useOutletContext<{ compact: boolean }>();

  return (
    <FolderItems
      compact={compact}
      items={projects.map((project) => ({
        id: project.id,
        icon: <FolderOutlinedIcon />,
        label: project.name,
        onClick: () => navigate(`/projects/${project.id}`),
      }))}
    />
  );
}
