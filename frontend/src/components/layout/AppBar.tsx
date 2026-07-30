import { useState } from 'react';
import MUIAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { chrome } from '../../theme/tokens';
import icon from '../../assets/icon.png';

interface AppBarProps {
  onMenuClick: () => void;
}

export function AppBar({ onMenuClick }: AppBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  return (
    <MUIAppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: chrome.bg,
        color: chrome.text,
      }}
    >
      <Toolbar sx={{ gap: { xs: 0.5, sm: 1 }, px: { xs: 1, sm: 2 } }}>
        <IconButton
          color="inherit"
          aria-label="Sidebar umschalten"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <Box
          component={RouterLink}
          to="/"
          aria-label="Zur Startseite"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            minWidth: 0,
          }}
        >
          <Box
            component="img"
            src={icon}
            alt="KollaDesk"
            sx={{
              display: 'block',
              width: 'auto',
              height: { xs: 40, sm: 56, md: 70 },
              objectFit: 'contain',
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Benachrichtigungen">
          <IconButton color="inherit" aria-label="Benachrichtigungen anzeigen">
            <Badge badgeContent={3} color="primary">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Konto">
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            aria-label="Benutzermenü öffnen"
            aria-controls={menuOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            sx={{ ml: 0.5 }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              M
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2">Mina Mansour</Typography>
            <Typography variant="caption" color="text.secondary">
              mina@kolladesk.at
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => setAnchorEl(null)}>Profil</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Einstellungen</MenuItem>
          <Divider />
          <MenuItem onClick={() => setAnchorEl(null)}>Abmelden</MenuItem>
        </Menu>
      </Toolbar>
    </MUIAppBar>
  );
}
