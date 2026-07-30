import { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { gewerke, kategorien, projects } from './data';
import { FolderItems } from './FolderTile';

const VIEW_MODE_KEY = 'kolladesk:projects:viewMode';

export type ViewMode = 'kacheln' | 'liste' | 'baum';

function readStoredViewMode(): ViewMode {
  const stored = localStorage.getItem(VIEW_MODE_KEY);
  return stored === 'liste' || stored === 'baum' ? stored : 'kacheln';
}

export function ProjectsLayout() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>(readStoredViewMode);
  const { projectId, gewerkId, kategorieId } = useParams<{
    projectId?: string;
    gewerkId?: string;
    kategorieId?: string;
  }>();

  const project = projects.find((p) => p.id === projectId) ?? null;
  const gewerk = gewerke.find((g) => g.id === gewerkId) ?? null;
  const kategorie = kategorien.find((k) => k.id === kategorieId) ?? null;

  const crumbs: { label: string; path?: string }[] = [{ label: 'Projekte', path: '/projects' }];
  if (project) crumbs.push({ label: project.name, path: `/projects/${project.id}` });
  if (gewerk) crumbs.push({ label: gewerk.name, path: `/projects/${projectId}/${gewerk.id}` });
  if (kategorie) crumbs.push({ label: kategorie.label });

  const backPath = kategorieId
    ? `/projects/${projectId}/${gewerkId}`
    : gewerkId
      ? `/projects/${projectId}`
      : projectId
        ? '/projects'
        : null;

  const handleViewModeChange = (_: unknown, next: ViewMode | null) => {
    if (!next) return;
    setViewMode(next);
    localStorage.setItem(VIEW_MODE_KEY, next);
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 3, alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          {backPath && (
            <IconButton size="small" onClick={() => navigate(backPath)} aria-label="Zurück">
              <ArrowBackOutlinedIcon fontSize="small" />
            </IconButton>
          )}
          <Breadcrumbs separator={<ChevronRightOutlinedIcon fontSize="small" />}>
            {crumbs.map((crumb, index) =>
              index === crumbs.length - 1 || !crumb.path ? (
                <Typography key={crumb.label} color="text.primary" variant="body2" sx={{ fontWeight: 600 }}>
                  {crumb.label}
                </Typography>
              ) : (
                <Link
                  key={crumb.label}
                  component="button"
                  variant="body2"
                  underline="hover"
                  color="inherit"
                  onClick={() => navigate(crumb.path!)}
                >
                  {crumb.label}
                </Link>
              ),
            )}
          </Breadcrumbs>
        </Stack>

        <ToggleButtonGroup size="small" value={viewMode} exclusive onChange={handleViewModeChange}>
          <ToggleButton value="kacheln" aria-label="Kacheln">
            <ViewModuleOutlinedIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="liste" aria-label="Liste">
            <ViewListOutlinedIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="baum" aria-label="Baum">
            <AccountTreeOutlinedIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {viewMode === 'baum' ? (
        <Stack direction="row" sx={{ gap: 2 }}>
          <Box sx={{ width: 280, flexShrink: 0 }}>
            <FolderItems
              compact
              items={projects.map((p) => ({
                id: p.id,
                icon: <FolderOutlinedIcon />,
                label: p.name,
                onClick: () => navigate(`/projects/${p.id}`),
                active: p.id === projectId,
              }))}
            />
          </Box>
          {projectId && (
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Outlet context={{ compact: true }} />
            </Box>
          )}
        </Stack>
      ) : (
        <Outlet context={{ compact: viewMode === 'liste' }} />
      )}
    </Box>
  );
}
