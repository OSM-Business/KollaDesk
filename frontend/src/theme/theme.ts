import { createTheme, type Theme } from '@mui/material/styles';
import { deDE } from '@mui/material/locale';
import { accent, fontFamilies, status, surface } from './tokens';

export const theme: Theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: accent,
      success: { main: status.success },
      warning: { main: status.warning },
      error: { main: status.error },
      info: { main: status.info },
      background: { default: surface.default, paper: surface.paper },
      text: { primary: surface.textPrimary, secondary: surface.textSecondary },
      divider: surface.divider,
    },
    shape: { borderRadius: 4 },
    typography: {
      fontFamily: fontFamilies.body,
      fontSize: 13,
      h1: { fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: '1.75rem' },
      h2: { fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: '1.5rem' },
      h3: { fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: '1.25rem' },
      h4: { fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: '1.125rem' },
      h5: { fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: '1rem' },
      h6: { fontFamily: fontFamilies.heading, fontWeight: 600, fontSize: '0.9375rem' },
      body1: { fontSize: '0.875rem' },
      body2: { fontSize: '0.8125rem' },
      button: {
        fontFamily: fontFamilies.heading,
        fontWeight: 500,
        fontSize: '0.8125rem',
        textTransform: 'none',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':focus-visible': {
            outline: `2px solid ${accent.main}`,
            outlineOffset: '2px',
          },
          '@media (prefers-reduced-motion: reduce)': {
            '*': {
              animationDuration: '0.001ms !important',
              animationIterationCount: '1 !important',
              transitionDuration: '0.001ms !important',
            },
          },
        },
      },
      MuiButton: { styleOverrides: { root: { borderRadius: 4 } } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiChip: { styleOverrides: { root: { fontWeight: 600, borderRadius: 4 } } },
    },
  },
  deDE,
);