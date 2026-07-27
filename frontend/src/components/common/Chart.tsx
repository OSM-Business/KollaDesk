import Stack from '@mui/material/Stack';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const settings = {
  height: 80,
  yAxis: { min: 0, max: 20 },
} as const;


export default function ColorCustomization({values}: {values: number[]}) {
  return (
    <Stack sx={{ width: '100%', maxWidth: 200 }}>
      <SparkLineChart data={values} color="green" {...settings} />
    </Stack>
  );
}
