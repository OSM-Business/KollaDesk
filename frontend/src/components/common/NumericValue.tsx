import Typography, { type TypographyProps } from '@mui/material/Typography';

/**
 * Stellt Geld-, Mengen- und Kennzahlwerte in der Mono-Schrift dar
 * (tabellarische Ziffern) – wie eine Messgeräte-Anzeige.
 *
 * WICHTIG: Diese Komponente formatiert nichts selbst. Übergib bereits
 * fertig formatierte Strings (z.B. aus lib/format.ts).
 */
export function NumericValue({ children, sx, ...props }: TypographyProps) {
  return (
    <Typography
      component="span"
      sx={{
        fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
        fontVariantNumeric: 'tabular-nums',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
