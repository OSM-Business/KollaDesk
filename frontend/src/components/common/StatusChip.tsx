import Chip from '@mui/material/Chip';

export type PruefStatus =
  'freigegeben' | 'abweichung' | 'in_pruefung' | 'abgelehnt';

const config: Record<
  PruefStatus,
  { label: string; color: 'success' | 'warning' | 'info' | 'error' }
> = {
  freigegeben: { label: 'Freigegeben', color: 'success' },
  abweichung: { label: 'Abweichung festgestellt', color: 'warning' },
  in_pruefung: { label: 'In Prüfung', color: 'info' },
  abgelehnt: { label: 'Abgelehnt', color: 'error' },
};

export function StatusChip({ status }: { status: PruefStatus }) {
  const { label, color } = config[status];
  return <Chip label={label} color={color} size="small" variant="outlined" />;
}
