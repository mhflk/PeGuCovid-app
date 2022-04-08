import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbar: {
      [theme.breakpoints.down('xs')]: {
        bottom: 90
      }
    }
  })
);

export interface InfoProps {
  show: boolean;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
  handleShow: (show: boolean) => void;
  children: React.ReactNode;
}

export function Info(props: InfoProps) {
  const classes = useStyles();

  // const [open, setOpen] = React.useState(true);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    // console.log(reason);
    if (reason === 'clickaway') {
      return;
    }
    // setOpen(false);
    props.handleShow(false);
  };

  return (
    <Snackbar
      className={classes.snackbar}
      open={props.show}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <MuiAlert
        elevation={9}
        variant="standard"
        onClose={handleClose}
        severity={props.severity}
      >
        {props.children}
      </MuiAlert>
    </Snackbar>
  );
}
