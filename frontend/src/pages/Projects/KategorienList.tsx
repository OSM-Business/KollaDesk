import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { FolderItems } from './FolderTile';
import { kategorien } from './data';

export function KategorienList() {
  const navigate = useNavigate();
  const { compact } = useOutletContext<{ compact: boolean }>();
  const { projectId, gewerkId } = useParams<{ projectId: string; gewerkId: string }>();

  return (
    <FolderItems
      compact={compact}
      items={kategorien.map((kategorie) => ({
        id: kategorie.id,
        icon: kategorie.icon,
        label: kategorie.label,
        onClick: () => navigate(`/projects/${projectId}/${gewerkId}/${kategorie.id}`),
      }))}
    />
  );
}
