import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { AppBar } from './AppBar';
import { Sidebar } from './Sidebar';
import { TopBanner, BANNER_HEIGHT } from './TopBanner';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  // Desktop: Sidebar startet offen (voller Text). Mobile: Sidebar startet als geschlossenes Overlay.
  const [showSidebar, setShowSidebar] = useState(() => !isMobile);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          // Muss über dem permanenten Drawer liegen (der ist per MUI-Default fixed
          // positioniert mit zIndex.drawer > zIndex.appBar), sonst blockiert die
          // Sidebar-Fläche Klicks auf die AppBar (z.B. den Hamburger-Button).
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <TopBanner />
        <AppBar onMenuClick={() => setShowSidebar((prev) => !prev)} />
      </Box>

      <Box sx={{ height: BANNER_HEIGHT }} />
      <Toolbar />

      <Box sx={{ display: 'flex', flex: 1, minWidth: 0 }}>
        <Sidebar open={showSidebar} isMobile={isMobile} onClose={() => setShowSidebar(false)} />

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
