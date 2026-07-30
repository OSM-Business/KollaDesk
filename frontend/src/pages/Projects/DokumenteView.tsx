import { useParams } from 'react-router-dom';
import { EmptyState } from '../../components/common/EmptyState';
import { kategorien } from './data';

export function DokumenteView() {
  const { kategorieId } = useParams<{ kategorieId: string }>();
  const kategorie = kategorien.find((k) => k.id === kategorieId) ?? null;

  return (
    <EmptyState
      title={`Noch keine Dokumente – ${kategorie?.label ?? ''}`}
      description="Sobald Dateien für dieses Gewerk hochgeladen werden, erscheinen sie hier."
    />
  );
}
