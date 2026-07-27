import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { WelcomeSection } from '../components/common/WelcomeSection';

export function Dashboard() {
  return (
    <Box>
      <WelcomeSection appUser={null} />
    </Box>
  );
}
