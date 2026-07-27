import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import type { SvgIconComponent } from '@mui/icons-material';

export const Types = {
  ADMIN: 'Admin',
  TOP: 'Top',
  BOTTOM: 'Bottom',
} as const;

export type Types = (typeof Types)[keyof typeof Types];

export interface NavItem {
  label: string;
  icon: SvgIconComponent;
  path: string;
  divider?: boolean;
  type?: Types;
}

export const navItems: NavItem[] = [
  {
    label: 'Admin Dashboard',
    icon: DashboardIcon,
    path: '/admin',
    divider: true,
    type: Types.ADMIN,
  },
  {
    label: 'Dashboard',
    icon: SpaceDashboardOutlinedIcon,
    path: '/',
    type: Types.TOP,
  },
  {
    label: 'Projekte',
    icon: FolderOutlinedIcon,
    path: '/projects',
    type: Types.TOP,
  },
  {
    label: 'Einstellungen',
    icon: SettingsOutlinedIcon,
    path: '/settings',
    divider: true,
    type: Types.BOTTOM,
  },
];
