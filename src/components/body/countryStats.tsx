import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TimelineIcon from '@material-ui/icons/Timeline';
import Typography from '@material-ui/core/Typography';
import {
  IconButton,
  Tooltip,
  CardHeader,
  Avatar,
  Grid,
  createStyles,
  Theme
} from '@material-ui/core';
import { Country } from 'novelcovid';
import { numberWithCommas } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    },
    avatar: {
      width: theme.spacing(6)
    },
    cardHeaderTitle: {
      fontFamily: 'Hermit-Bold',
      fontSize: 'small'
    },
    cardsubheader: {
      fontSize: 'xx-small'
    },
    dataItem: {
      fontFamily: 'Hermit-RegularItalic',
      fontSize: 'x-small'
    },
    sectionHeader: {
      fontFamily: 'Hermit-Bold'
    }
  })
);

export interface CountryStatsProps {
  country: Country;
  onHistoricalDataButtonClick: (country: Country) => void;
}

export function CountryStats(props: CountryStatsProps) {
  const classes = useStyles(props);

  return (
    <Card variant="outlined">
      <CardHeader
        classes={{ subheader: classes.cardsubheader }}
        avatar={
          <Avatar
            variant="rounded"
            // aria-label={props.country.country}
            className={classes.avatar}
            src={props.country.countryInfo.flag}
          />
        }
        action={
          <Tooltip title="historical data" arrow={true}>
            <IconButton
              aria-label="settings"
              onClick={() => {
                props.onHistoricalDataButtonClick(props.country);
              }}
            >
              <TimelineIcon />
            </IconButton>
          </Tooltip>
        }
        title={props.country.country}
        titleTypographyProps={{ className: classes.cardHeaderTitle }}
        subheader={new Date(props.country.updated).toLocaleString()}
        subheaderTypographyProps={{ variant: 'subtitle2' }}
      />

      <CardContent>
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Typography
              className={classes.sectionHeader}
              align="left"
              variant="body2"
            >
              Totals:
            </Typography>
          </Grid>

          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography
                className={classes.dataItem}
                align="left"
                variant="body2"
              >
                infected
              </Typography>
              <Typography color="primary" align="left" variant="body2">
                {numberWithCommas(props.country.cases)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                className={classes.dataItem}
                align="left"
                variant="body2"
              >
                deaths
              </Typography>
              <Typography color="secondary" align="left" variant="body2">
                {numberWithCommas(props.country.deaths)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                className={classes.dataItem}
                align="left"
                variant="body2"
              >
                recovered
              </Typography>
              <Typography color="primary" align="left" variant="body2">
                {numberWithCommas(props.country.recovered)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography
                className={classes.dataItem}
                align="left"
                variant="body2"
              >
                active
              </Typography>
              <Typography color="primary" align="left" variant="body2">
                {numberWithCommas(props.country.active)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                className={classes.dataItem}
                align="left"
                variant="body2"
              >
                critical
              </Typography>
              <Typography color="secondary" align="left" variant="body2">
                {numberWithCommas(props.country.critical)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                className={classes.dataItem}
                align="left"
                variant="body2"
              >
                tests
              </Typography>
              <Typography color="primary" align="left" variant="body2">
                {numberWithCommas(props.country.tests)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <Typography
              className={classes.sectionHeader}
              align="left"
              variant="body2"
            >
              Today:
            </Typography>
          </Grid>

          <Grid container item xs={12}>
            <Grid item xs={6}>
              <Typography
                className={classes.dataItem}
                align="left"
                variant="body2"
              >
                infected
              </Typography>
              <Typography color="primary" align="left" variant="body2">
                {numberWithCommas(props.country.todayCases)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                className={classes.dataItem}
                align="left"
                variant="body2"
              >
                deaths
              </Typography>
              <Typography color="secondary" align="left" variant="body2">
                {numberWithCommas(props.country.todayDeaths)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <Typography
              className={classes.sectionHeader}
              align="left"
              variant="body2"
            >
              Per 1 million population:
            </Typography>
          </Grid>

          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography
                className={classes.dataItem}
                align="left"
                variant="body2"
              >
                infected
              </Typography>
              <Typography color="primary" align="left" variant="body2">
                {numberWithCommas(props.country.casesPerOneMillion)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                className={classes.dataItem}
                align="left"
                variant="body2"
              >
                deaths
              </Typography>
              <Typography color="secondary" align="left" variant="body2">
                {numberWithCommas(props.country.deathsPerOneMillion)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                className={classes.dataItem}
                align="left"
                variant="body2"
              >
                tests
              </Typography>
              <Typography color="primary" align="left" variant="body2">
                {numberWithCommas(props.country.testsPerOneMillion)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
