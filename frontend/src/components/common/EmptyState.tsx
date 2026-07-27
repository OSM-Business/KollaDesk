import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 6,
        px: 2,
        color: 'text.secondary',
      }}
    >
      <Box sx={{ mb: 1.5, opacity: 0.6 }}>
        {icon ?? <InboxOutlinedIcon sx={{ fontSize: 40 }} />}
      </Box>
      <Typography
        variant="subtitle1"
        sx={{ color: 'text.primary', fontWeight: 600 }}
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" sx={{ mt: 0.5, maxWidth: 360 }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button
          variant="outlined"
          size="small"
          onClick={onAction}
          sx={{ mt: 2.5 }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
