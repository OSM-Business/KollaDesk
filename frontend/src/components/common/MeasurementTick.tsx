import { useTheme } from '@mui/material/styles';

/**
 * Dezentes Signatur-Element: eine Messband-Skala.
 *
 * Bewusst als einziges "gestalterisches Risiko" der gesamten Oberfläche –
 * alles andere bleibt ruhig. Erscheint unter Kennzahlen und verweist
 * auf den Produktkern (Aufmaß = Messung) ohne kitschig zu wirken.
 */
export function MeasurementTick({ width = 96 }: { width?: number }) {
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const ticks = Array.from({ length: 9 }, (_, i) => i);

  return (
    <svg width={width} height={10} viewBox={`0 0 96 10`} aria-hidden="true" focusable="false">
      <line x1={0} y1={1} x2={96} y2={1} stroke={color} strokeWidth={1.5} opacity={0.9} />
      {ticks.map((i) => (
        <line
          key={i}
          x1={i * 12}
          y1={1}
          x2={i * 12}
          y2={i % 2 === 0 ? 7 : 4}
          stroke={color}
          strokeWidth={1.5}
          opacity={0.9}
        />
      ))}
    </svg>
  );
}