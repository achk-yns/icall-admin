import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import MainCard from '../components/MainCard';

export default function AuthCard({ children, ...other }) {
  return (
    <MainCard
      sx={{ maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 }, '& > *': { flexGrow: 1, flexBasis: '50%' } }}
      content={false}
      {...other}
      border={false}
      boxShadow
      // Check if theme.customShadows.z1 is defined, otherwise provide a default shadow value
      shadow={(theme) => theme.customShadows?.z1 || '0px 4px 6px rgba(0, 0, 0, 0.1)'}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
}

AuthCard.propTypes = { children: PropTypes.node, other: PropTypes.any };
