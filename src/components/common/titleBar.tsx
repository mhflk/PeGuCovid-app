import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Slide,
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: '56px',
    marginTop: '56px',
    zIndex: theme.zIndex.appBar - 1
  }
}));

export interface TitleBarProps {
  title: string;
}

export const TitleBar = (props: TitleBarProps) => {
  const classes = useStyles();
  const trigger = useScrollTrigger();

  return (
    <React.Fragment>
      <Slide in={!trigger} direction="down">
        <AppBar color="inherit" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6">{props.title}</Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </React.Fragment>
  );
};
