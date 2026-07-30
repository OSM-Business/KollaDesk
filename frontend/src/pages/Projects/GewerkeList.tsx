import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import { EmptyState } from '../../components/common/EmptyState';
import { FolderItems } from './FolderTile';
import { gewerke } from './data';

export function GewerkeList() {
  const navigate = useNavigate();
  const { compact } = useOutletContext<{ compact: boolean }>();
  const { projectId } = useParams<{ projectId: string }>();
  const projectGewerke = gewerke.filter((g) => g.projectId === projectId);

  if (projectGewerke.length === 0) {
    return (
      <EmptyState
        title="Keine Gewerke angelegt"
        description="Für dieses Projekt wurden noch keine Gewerke angelegt."
      />
    );
  }

  return (
    <FolderItems
      compact={compact}
      items={projectGewerke.map((gewerk) => ({
        id: gewerk.id,
        icon: <EngineeringOutlinedIcon />,
        label: gewerk.name,
        onClick: () => navigate(`/projects/${projectId}/${gewerk.id}`),
      }))}
    />
  );
}
