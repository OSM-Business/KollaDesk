import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 3,
        border: "none",
        textAlign: 'center',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} KollaDesk. Alle Rechte vorbehalten.
      </Typography>
    </Box>
  );
};

export default Footer;
