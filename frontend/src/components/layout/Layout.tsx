import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { AppBar } from './AppBar';
import { Sidebar } from './Sidebar';
import { TopBanner, BANNER_HEIGHT } from './TopBanner';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export function Layout() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <TopBanner />
        <AppBar onMenuClick={() => setShowSidebar((prev) => !prev)} />
      </Box>

      <Box sx={{ height: BANNER_HEIGHT }} />
      <Toolbar />

      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar open={showSidebar} />

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            bgcolor: 'background.default',
            p: { xs: 2, sm: 3 },
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
