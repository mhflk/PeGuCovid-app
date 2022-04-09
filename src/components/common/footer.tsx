import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  useScrollTrigger,
  Fade,
  BottomNavigation,
  BottomNavigationAction
} from '@material-ui/core';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import TimelineIcon from '@material-ui/icons/Timeline';

const useStyles = makeStyles((theme) => ({
  bottomNavigation: {
    bottom: 0,
    position: 'fixed',
    width: '100%'
  },
  selected: {
    color: '#00B0FF !important'
  }
}));

export enum FooterSelection {
  Global = 0,
  Stats,
  Countries,

  About
}

export interface FooterProps {
  selectedItem: FooterSelection;
  onSelectedItemChange: (
    event: React.ChangeEvent<{}>,
    selectedItem: FooterSelection
  ) => void;
}

export const Footer = (props: FooterProps) => {
  const classes = useStyles();
  const trigger = useScrollTrigger();

  return (
    <Fade in={!trigger} timeout={200}>
      <BottomNavigation
        className={classes.bottomNavigation}
        value={props.selectedItem}
        onChange={props.onSelectedItemChange}
      >
        <BottomNavigationAction
          classes={{
            selected: classes.selected
          }}
          label={FooterSelection[FooterSelection.Global]}
          icon={<FormatListBulletedIcon />}
        />

        <BottomNavigationAction
          classes={{
            selected: classes.selected
          }}
          label={FooterSelection[FooterSelection.Stats]}
          icon={<TimelineIcon />}
        />
        <BottomNavigationAction
          classes={{
            selected: classes.selected
          }}
          label={FooterSelection[FooterSelection.Countries]}
          icon={<LocationCityRoundedIcon />}
        />
        <BottomNavigationAction
          classes={{
            selected: classes.selected
          }}
          label={FooterSelection[FooterSelection.About]}
          icon={<InfoRoundedIcon />}
        />
      </BottomNavigation>
    </Fade>
  );
};
