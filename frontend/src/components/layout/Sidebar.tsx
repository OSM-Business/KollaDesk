import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { styled, type Theme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { chrome } from '../../theme/tokens';
import { useNavigate } from 'react-router-dom';
import { navItems, Types, type NavItem } from './navItems';
import { BANNER_HEIGHT } from './TopBanner';

export const DRAWER_WIDTH = 220;
export const COLLAPSED_DRAWER_WIDTH = 64;

interface SidebarProps {
  open: boolean;
  isMobile: boolean;
  onClose: () => void;
}

interface NavListProps {
  items: NavItem[];
  activePath: string;
  collapsed: boolean;
  onNavigate: (path: string) => void;
}

// MUI-Mini-Variant-Drawer-Rezept: NUR die Breite des Drawers selbst wird animiert
// (via CSS-Transition + overflow-x:hidden). Der Inhalt bekommt nie eine eigene,
// per JS gesetzte Breite – dadurch "springt" beim Zu-/Aufklappen nichts, das Icon
// bleibt an derselben Stelle stehen und der Text wird sauber weg-/eingeblendet.
const openedMixin = (theme: Theme) => ({
  width: DRAWER_WIDTH,
  overflowX: 'hidden' as const,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme) => ({
  width: COLLAPSED_DRAWER_WIDTH,
  overflowX: 'hidden' as const,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  border: 'none',
  ...(open ? openedMixin(theme) : closedMixin(theme)),
  '& .MuiDrawer-paper': {
    backgroundColor: chrome.bg,
    borderRight: `1px solid ${chrome.border}`,
    ...(open ? openedMixin(theme) : closedMixin(theme)),
  },
}));

const NavList = ({ items, activePath, collapsed, onNavigate }: NavListProps) => {
  return (
    <List sx={{ px: 1 }}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activePath === item.path;

        return (
          <Tooltip
            key={item.path}
            title={item.label}
            placement="right"
            disableHoverListener={!collapsed}
            disableFocusListener={!collapsed}
            disableTouchListener={!collapsed}
          >
            <ListItemButton
              onClick={() => onNavigate(item.path)}
              selected={isActive}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                px: 2,
                color: chrome.text,
                '& .MuiListItemIcon-root': {
                  color: chrome.textMuted,
                  minWidth: 36,
                  justifyContent: 'center',
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
              <ListItemText
                primary={item.label}
                sx={{
                  opacity: collapsed ? 0 : 1,
                  transition: (theme) =>
                    theme.transitions.create('opacity', {
                      duration: theme.transitions.duration.shorter,
                    }),
                  '& .MuiTypography-root': { whiteSpace: 'nowrap' },
                }}
              />
            </ListItemButton>
          </Tooltip>
        );
      })}
    </List>
  );
};

function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate: (path: string) => void;
}) {
  const topItems = navItems.filter((item) => item.type === Types.TOP);
  const adminItems = navItems.filter((item) => item.type === Types.ADMIN);
  const bottomItems = navItems.filter((item) => item.type === Types.BOTTOM);

  return (
    <Box sx={{ height: '100%', color: chrome.text, py: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Der Drawer ist fixed positioniert und startet bei top:0 – dieser Abstandshalter
          entspricht exakt dem in Layout.tsx, damit der erste Eintrag nicht unter dem
          fixierten TopBanner/AppBar-Header verschwindet. */}
      <Box sx={{ height: BANNER_HEIGHT }} />
      <Toolbar />

      <NavList items={adminItems} activePath={location.pathname} collapsed={collapsed} onNavigate={onNavigate} />

      <Divider />
      <NavList items={topItems} activePath={location.pathname} collapsed={collapsed} onNavigate={onNavigate} />

      <Box sx={{ flexGrow: 1 }} />
      <Divider />

      <NavList items={bottomItems} activePath={location.pathname} collapsed={collapsed} onNavigate={onNavigate} />
    </Box>
  );
}

export function Sidebar({ open, isMobile, onClose }: SidebarProps) {
  const navigate = useNavigate();

  // Auf Mobile ist die Sidebar ein Overlay: nach der Navigation soll sie sich schließen.
  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) onClose();
  };

  if (isMobile) {
    return (
      <MuiDrawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        slotProps={{ paper: { component: 'nav', 'aria-label': 'Sidebar Navigation' } }}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: chrome.bg,
          },
        }}
      >
        <SidebarContent collapsed={false} onNavigate={handleNavigate} />
      </MuiDrawer>
    );
  }

  return (
    <StyledDrawer
      variant="permanent"
      open={open}
      slotProps={{ paper: { component: 'nav', 'aria-label': 'Sidebar Navigation' } }}
    >
      <SidebarContent collapsed={!open} onNavigate={handleNavigate} />
    </StyledDrawer>
  );
}
