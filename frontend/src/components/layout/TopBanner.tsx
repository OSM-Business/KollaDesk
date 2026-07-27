import Box from '@mui/material/Box';
import { topBannerGradient } from '../../theme/tokens';

export const BANNER_HEIGHT = 6;

/**
 * Dekoratives Banner ganz oben, vor/über der AppBar.
 *
 * Aktuell ein Platzhalter-Farbverlauf. Für ein echtes Bild:
 * sx={{ backgroundImage: 'url(/dein-bild.jpg)', backgroundSize: 'cover' }}
 * statt "background: topBannerGradient" verwenden.
 */
export function TopBanner() {
  return (
    <Box
      sx={{
        height: BANNER_HEIGHT,
        width: '100%',
        background: topBannerGradient,
      }}
    />
  );
}
