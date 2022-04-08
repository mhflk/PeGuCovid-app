import React from 'react';
import 'typeface-roboto';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Country, Historical } from 'novelcovid';
import { LineChart } from './lineChart';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontFamily: 'Hermit-Bold'
  },
  casesHeader: {
    fontFamily: 'Hermit-Bold'
  },
  dialogActionsRoot: {
    justifyContent: 'unset'
  }
}));

export interface CountryChartProps {
  shown: boolean;
  country: Country | undefined;
  historical: Historical | undefined;
  onClose: () => void;
}

export const CountryChart = (props: CountryChartProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const extracDataFromHistorical = (
    propName: 'cases' | 'deaths' | 'recovered',
    historical: Historical | undefined
  ) => {
    if (!historical) {
      return undefined;
    }
    const cases = props.historical?.timeline[propName] || [];
    let data: { x: Array<number>; y: Array<number> } = { x: [], y: [] };
    for (let [key, value] of Object.entries(cases)) {
      data.x.push(new Date(key).getTime());
      data.y.push(value);
    }
    return data;
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.shown}
        fullScreen={fullScreen}
        maxWidth={'xl'}
        fullWidth={true}
        onClose={props.onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className={classes.dialogTitle}
        >
          {props.country && props.country.country}
        </DialogTitle>
        <DialogContent>
          <Box width="100%" height="100%">
            <Grid container spacing={2}>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Typography
                    className={classes.casesHeader}
                    align="left"
                    variant="h6"
                  >
                    Infected:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <LineChart
                    // title="Cases"
                    lineColor="steelblue"
                    data={extracDataFromHistorical('cases', props.historical)}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Typography
                    className={classes.casesHeader}
                    align="left"
                    variant="h6"
                  >
                    Deaths:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <LineChart
                    // title="Deaths"
                    lineColor="lightcoral"
                    data={extracDataFromHistorical('deaths', props.historical)}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <Typography
                    className={classes.casesHeader}
                    align="left"
                    variant="h6"
                  >
                    Recovered:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <LineChart
                    // title="Recovered"
                    lineColor="seagreen"
                    data={extracDataFromHistorical(
                      'recovered',
                      props.historical
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActionsRoot }}>
          <Tooltip title="back" arrow={true}>
            <IconButton aria-label="settings" onClick={props.onClose}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          {/* <Button
            autoFocus
            onClick={props.onClose}
            color="primary"
            size="small"
          >
            <Typography variant="body1">Close</Typography>
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
