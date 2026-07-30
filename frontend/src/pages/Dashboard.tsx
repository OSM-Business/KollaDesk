import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

import { WelcomeSection } from '../components/common/WelcomeSection';
import { StatCard } from '../components/common/StatCard';
import { StatusChip, type PruefStatus } from '../components/common/StatusChip';
import { NumericValue } from '../components/common/NumericValue';
import { EmptyState } from '../components/common/EmptyState';
import { MeasurementTick } from '../components/common/MeasurementTick';
import { formatCurrency, formatDate } from '../lib/format';

interface PruefungRow {
  id: string;
  projekt: string;
  rechnungsnummer: string;
  betrag: number;
  datum: string;
  status: PruefStatus;
}

// Platzhalter bis der Prüfungen-Endpoint steht.
const recentReviews: PruefungRow[] = [
  {
    id: '1',
    projekt: 'Wohnpark Donaufeld',
    rechnungsnummer: 'TR-2026-014',
    betrag: 84250.5,
    datum: '2026-07-28',
    status: 'abweichung',
  },
  {
    id: '2',
    projekt: 'Gewerbepark Süd',
    rechnungsnummer: 'TR-2026-013',
    betrag: 132900,
    datum: '2026-07-27',
    status: 'freigegeben',
  },
  {
    id: '3',
    projekt: 'Sanierung Hauptstraße 12',
    rechnungsnummer: 'TR-2026-012',
    betrag: 45680.2,
    datum: '2026-07-25',
    status: 'in_pruefung',
  },
  {
    id: '4',
    projekt: 'Brückensanierung Mühlau',
    rechnungsnummer: 'TR-2026-011',
    betrag: 210430,
    datum: '2026-07-22',
    status: 'abgelehnt',
  },
];

export function Dashboard() {
  return (
    <Box>
      <WelcomeSection />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            lg: 'repeat(4, 1fr)',
          },
          gap: 2,
          mb: 3,
        }}
      >
        <StatCard
          label="Offene Prüfungen"
          value="7"
          icon={<AssignmentLateOutlinedIcon />}
          trend="12"
          trendDirection="up"
          chartValues={[3, 5, 4, 6, 5, 7, 7]}
          periodLabel="Letzte 30 Tage"
        />
        <StatCard
          label="Abweichungen erkannt"
          value="3"
          icon={<WarningAmberOutlinedIcon />}
          iconColor="error.main"
          trend="4"
          trendDirection="down"
          chartValues={[5, 4, 4, 3, 4, 3, 3]}
          periodLabel="Letzte 30 Tage"
        />
        <StatCard
          label="Geprüftes Volumen (Netto)"
          value={formatCurrency(473260.7)}
          icon={<PaidOutlinedIcon />}
          trend="18"
          trendDirection="up"
          chartValues={[8, 9, 11, 10, 13, 15, 16]}
          periodLabel="Letzte 30 Tage"
        />
        <StatCard
          label="Ø Prüfdauer"
          value="2,3 Tage"
          icon={<ScheduleOutlinedIcon />}
          trend="9"
          trendDirection="down"
          chartValues={[4, 3.6, 3.2, 3, 2.6, 2.4, 2.3]}
          periodLabel="Letzte 30 Tage"
        />
      </Box>

      <Card variant="outlined" sx={{ p: 2.5 }}>
        <Stack direction="row" sx={{ mb: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack>
            <Typography variant="h5" component="h2">
              Aktuelle Prüfungen
            </Typography>
          </Stack>
          <MeasurementTick />
        </Stack>

        {recentReviews.length === 0 ? (
          <EmptyState
            title="Noch keine Prüfungen"
            description="Sobald eine Teilrechnung hochgeladen wird, erscheint sie hier."
          />
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Projekt</TableCell>
                <TableCell>Rechnung</TableCell>
                <TableCell align="right">Betrag</TableCell>
                <TableCell>Datum</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentReviews.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.projekt}</TableCell>
                  <TableCell>
                    <NumericValue>{row.rechnungsnummer}</NumericValue>
                  </TableCell>
                  <TableCell align="right">
                    <NumericValue>{formatCurrency(row.betrag)}</NumericValue>
                  </TableCell>
                  <TableCell>{formatDate(row.datum)}</TableCell>
                  <TableCell align="right">
                    <StatusChip status={row.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </Box>
  );
}
