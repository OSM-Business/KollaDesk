import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Chart from './Chart';

type TrendDirection = 'up' | 'down' | 'neutral';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  iconColor?: string;
  trend?: string;
  trendDirection?: TrendDirection;
  loading?: boolean;
  chartValues?: number[];
  periodLabel?: string;
}

const TREND_STYLES: Record<
  TrendDirection,
  {
    color: string;
    backgroundColor: string;
    symbol: string;
  }
> = {
  up: {
    color: 'success.main',
    backgroundColor: 'rgba(46, 125, 50, 0.08)',
    symbol: '↗',
  },
  down: {
    color: 'error.main',
    backgroundColor: 'rgba(211, 47, 47, 0.08)',
    symbol: '↘',
  },
  neutral: {
    color: 'text.secondary',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    symbol: '→',
  },
};

export function StatCard({
  label,
  value,
  icon,
  iconColor = 'primary.main',
  trend,
  trendDirection = 'neutral',
  loading = false,
  chartValues = [],
  periodLabel = 'Last month',
}: StatCardProps) {
  const trendStyle = TREND_STYLES[trendDirection];
  const hasChart = chartValues.length > 0;
  const hasTrend = Boolean(trend);

  return (
    <Card
      variant="outlined"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minHeight: 200,
        backgroundImage: 'none',
        elevation: 0,
        border: 'none',
      }}
    >
      <Stack
        spacing={2.5}
        sx={{
          position: 'relative',
          zIndex: 1,
          p: 2.5,
          pb: hasChart ? 1.5 : 2.5,
          bgcolor: '#ffffff',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '44px minmax(0, 1fr) auto',
            alignItems: 'center',
            columnGap: 1.5,
            width: '100%',
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: 44,
              height: 44,
              borderRadius: 2.5,
              color: iconColor,
              bgcolor: 'rgba(0, 0, 0, 0.04)',

              '& > svg': {
                fontSize: 24,
              },
            }}
          >
            {icon}
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              color="text.primary"
              noWrap
              sx={{
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {label}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              sx={{
                display: 'block',
                mt: 0.25,
                fontWeight: 500,
              }}
            >
              {periodLabel}
            </Typography>
          </Box>

          {loading ? (
            <Skeleton
              variant="rounded"
              width={64}
              height={28}
              sx={{ borderRadius: 10 }}
            />
          ) : hasTrend ? (
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{
                justifySelf: 'end',
                flexShrink: 0,
                px: 1.25,
                py: 0.5,
                borderRadius: 10,
                color: trendStyle.color,
                bgcolor: trendStyle.backgroundColor,
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: 15,
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {trendStyle.symbol}
              </Typography>

              <Typography
                variant="caption"
                component="span"
                sx={{
                  color: 'inherit',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                {trend}%
              </Typography>
            </Stack>
          ) : (
            <Box />
          )}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'max-content minmax(0, 1fr)',
            },
            alignItems: 'end',
            columnGap: 3,
            rowGap: 2,
            width: '100%',
            minWidth: 0,
          }}
        >
          {/* Value */}
          <Box sx={{ minWidth: 0 }}>
            {loading ? (
              <Stack spacing={0.5}>
                <Skeleton
                  variant="text"
                  width={120}
                  height={48}
                  animation="wave"
                />

                <Skeleton
                  variant="text"
                  width={64}
                  height={18}
                  animation="wave"
                />
              </Stack>
            ) : (
              <Stack spacing={0.5}>
                <Typography
                  variant="h3"
                  component="p"
                  sx={{
                    m: 0,
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    fontVariantNumeric: 'tabular-nums',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {value}
                </Typography>

                <Typography
                  variant="caption"
                  component="p"
                  color="text.secondary"
                  sx={{
                    m: 0,
                    fontWeight: 200,
                    lineHeight: 1.3,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    whiteSpace: {
                      xs: 'normal',
                      sm: 'nowrap',
                    },
                  }}
                >
                  In total
                </Typography>
              </Stack>
            )}
          </Box>

          {/* Chart */}
          {hasChart && (
            <Box
              sx={{
                width: '100%',
                minWidth: 0,
                height: 88,
                px: 1,
                pt: 1.5,
                pb: 0.5,
                overflow: 'visible',
                bgcolor: 'common.white',

                '& svg': {
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  overflow: 'visible',
                },
              }}
            >
              {loading ? (
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height="100%"
                  animation="wave"
                  sx={{ borderRadius: 2 }}
                />
              ) : (
                <Chart values={chartValues} />
              )}
            </Box>
          )}
        </Box>
      </Stack>
    </Card>
  );
}
