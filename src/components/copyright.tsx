import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: '64px',
    marginBottom: '64px'
  }
}));

export const Copyright = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://thulina2004.netlify.app/">
          Thulina
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};
