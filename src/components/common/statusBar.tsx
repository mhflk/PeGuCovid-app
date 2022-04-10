import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: '56px'
  },
  spacer: {
    flexGrow: 1
  }
}));

export interface StatusBarProps {
  onSearchButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRefreshButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMenuButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const StatusBar = (props: StatusBarProps) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >

        <MenuItem
          onClick={() => {
            window.open('https://pegucovid.netlify.app/', '_blank');
            handleMenuClose();
          }}
        >
          Website
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open('https://github.com/NovelCOVID/API', '_blank');
            handleMenuClose();
          }}
        >
          Data source
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open('https://github.com/mhflk/PeGuCovid-app', '_blank');
            handleMenuClose();
          }}
        >
          Source code
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open('https://thulina2004.netlify.app/', '_blank');
            handleMenuClose();
          }}
        >
          Portfilio
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open('mailto:endhamfc@gmail.com', '_blank');
            handleMenuClose();
          }}
        >
          Contact
        </MenuItem>
      </Menu>
      <AppBar color="inherit" className={classes.appbar}>
        <Toolbar>
          <Tooltip title="search" arrow={true}>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={props.onSearchButtonClick}
            >
              <SearchRoundedIcon />
            </IconButton>
          </Tooltip>
          <div className={classes.spacer} />
          <Tooltip title="refresh" arrow={true}>
            <IconButton onClick={() => {window.location.reload(); }} >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="menu" arrow={true}>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuButtonClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};
