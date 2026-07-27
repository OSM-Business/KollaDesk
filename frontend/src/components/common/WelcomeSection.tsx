import { Stack, Typography } from '@mui/material';

export const WelcomeSection = () => {
  return (
    <Stack spacing={0} sx={{mb: 3}}>
      <Stack direction={'row'} spacing={1} style={{ width: '100%' }}>
        <Typography variant="h2" style={{ fontWeight: 'normal' }}>
          Welcome back,{' '}
        </Typography>
        <Typography variant="h2" display={'inline'} fontWeight={'bold'}>
          Mina Mansour
        </Typography>
      </Stack>
      <Typography variant="h3" style={{ fontWeight: 'normal' }}>
        Here's an overview of all activities
      </Typography>
    </Stack>
  );
};
