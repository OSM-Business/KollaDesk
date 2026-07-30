import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { projectTree, type TreeNode } from './data';

function TreeRow({
  node,
  depth,
  activePath,
  onNavigate,
}: {
  node: TreeNode;
  depth: number;
  activePath: string;
  onNavigate: (path: string) => void;
}) {
  const hasChildren = Boolean(node.children?.length);
  const [expanded, setExpanded] = useState(false);
  const isActive = activePath === node.path;

  return (
    <>
      <Box
        onClick={() => onNavigate(node.path)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          pl: depth * 2.5,
          py: 0.5,
          borderRadius: 1,
          cursor: 'pointer',
          bgcolor: isActive ? 'action.selected' : 'transparent',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <IconButton
          size="small"
          sx={{ p: 0.25, visibility: hasChildren ? 'visible' : 'hidden' }}
          onClick={(event) => {
            event.stopPropagation();
            setExpanded((value) => !value);
          }}
        >
          {expanded ? (
            <ExpandMoreOutlinedIcon fontSize="small" />
          ) : (
            <ChevronRightOutlinedIcon fontSize="small" />
          )}
        </IconButton>
        <Box sx={{ display: 'flex', color: 'primary.main', '& > svg': { fontSize: 18 } }}>
          {node.icon}
        </Box>
        <Typography variant="body2" noWrap sx={{ fontWeight: isActive ? 700 : 400 }}>
          {node.label}
        </Typography>
      </Box>

      {hasChildren &&
        expanded &&
        node.children!.map((child) => (
          <TreeRow
            key={child.id}
            node={child}
            depth={depth + 1}
            activePath={activePath}
            onNavigate={onNavigate}
          />
        ))}
    </>
  );
}

export function ProjectTree() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack sx={{ py: 0.5 }}>
      {projectTree.map((node) => (
        <TreeRow
          key={node.id}
          node={node}
          depth={0}
          activePath={location.pathname}
          onNavigate={navigate}
        />
      ))}
    </Stack>
  );
}
