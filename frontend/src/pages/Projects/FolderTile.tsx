import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function FolderTile({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Card
      variant="outlined"
      onClick={onClick}
      sx={{
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <Box sx={{ color: 'primary.main', '& > svg': { fontSize: 36 } }}>{icon}</Box>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>
    </Card>
  );
}

export function FolderGrid({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
}

// Explorer-artige Listenansicht: volle Breite, weißer Hintergrund pro Zeile, kleines Icon.
export function FolderListRow({
  icon,
  label,
  onClick,
  active = false,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        width: '100%',
        px: 1.5,
        py: 1,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer',
        bgcolor: active ? 'action.selected' : 'background.paper',
        '&:hover': { bgcolor: active ? 'action.selected' : 'action.hover' },
      }}
    >
      <Box sx={{ display: 'flex', color: 'primary.main', '& > svg': { fontSize: 20 } }}>{icon}</Box>
      <Typography variant="body2" sx={{ fontWeight: active ? 700 : 400 }}>
        {label}
      </Typography>
    </Box>
  );
}

export function FolderList({ children }: { children: ReactNode }) {
  return (
    <Stack spacing={1} sx={{ py: 0.5 }}>
      {children}
    </Stack>
  );
}

export interface FolderItem {
  id: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

export function FolderItems({ items, compact }: { items: FolderItem[]; compact: boolean }) {
  if (compact) {
    return (
      <FolderList>
        {items.map((item) => (
          <FolderListRow
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            active={item.active}
          />
        ))}
      </FolderList>
    );
  }

  return (
    <FolderGrid>
      {items.map((item) => (
        <FolderTile key={item.id} icon={item.icon} label={item.label} onClick={item.onClick} />
      ))}
    </FolderGrid>
  );
}
