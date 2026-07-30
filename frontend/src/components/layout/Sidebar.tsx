import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { chrome } from '../../theme/tokens';
import { useNavigate } from 'react-router-dom';
import { navItems, Types, type NavItem } from './navItems';
import Divider from '@mui/material/Divider';

export const DRAWER_WIDTH = 220;
export const COLLAPSED_DRAWER_WIDTH = DRAWER_WIDTH / 4;

interface SidebarProps {
  open: boolean;
}

interface NavListProps {
  items: NavItem[];
  activePath: string;
  onNavigate: (path: string) => void;
}
const NavList = ({ items, activePath, onNavigate }: NavListProps) => {
  return (
    <List sx={{ px: 1 }}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activePath === item.path;
        return (
          <ListItemButton
            key={item.path}
            onClick={() => onNavigate(item.path)}
            selected={isActive}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              color: chrome.text,
              '& .MuiListItemIcon-root': {
                color: chrome.textMuted,
                minWidth: 36,
              },
              '&:hover': { bgcolor: chrome.bgHover },
              '&.Mui-selected': {
                bgcolor: chrome.bgHover,
                '& .MuiListItemIcon-root': { color: 'primary.main' },
              },
              '&.Mui-selected:hover': { bgcolor: chrome.bgHover },
            }}
          >
            {item.divider && <Divider />}

            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export function Sidebar({ open }: SidebarProps) {
  const navigate = useNavigate();
  const topItems = navItems.filter((item) => item.type === Types.TOP);
  const adminItems = navItems.filter((item) => item.type === Types.ADMIN);
  const bottomItems = navItems.filter((item) => item.type === Types.BOTTOM);
  return (
    <Box
      component="nav"
      aria-label="Sidebar Navigation"
      sx={{
        width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
        flexShrink: 0,
        overflow: 'hidden',
        bgcolor: chrome.bg,
        borderRight: open ? `1px solid ${chrome.border}` : 'none',
        transition: (theme) =>
          theme.transitions.create(['width', 'border-color'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }}
    >
      <Box
        sx={{
          width: DRAWER_WIDTH,
          height: '100%',
          color: chrome.text,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NavList
          items={adminItems}
          activePath={location.pathname}
          onNavigate={navigate}
        />

        <Divider></Divider>
        <NavList
          items={topItems}
          activePath={location.pathname}
          onNavigate={navigate}
        />

        <Box sx={{ flexGrow: 1 }} />
        <Divider></Divider>

        <NavList
          items={bottomItems}
          activePath={location.pathname}
          onNavigate={navigate}
        />
      </Box>
    </Box>
  );
}
