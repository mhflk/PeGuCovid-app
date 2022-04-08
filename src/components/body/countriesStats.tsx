import React, { useState } from 'react';
import 'typeface-roboto';
import { CountryStats } from './countryStats';
import { Grid, Box, CircularProgress, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Country, Historical } from 'novelcovid';
import { CountryChart } from './countryChart';

export interface CountriesStatsProps {
  countries: Country[] | undefined;
  historicals: Historical[] | undefined;
}

const initNumItems = 12;
const numItemsIncrement = 50;
const loadingTimeout = 100;

export const CountriesStats = (props: CountriesStatsProps) => {
  const [numItems, setNumItems] = useState(initNumItems);

  const [countryChartShown, setCountryChartShown] = useState(false);
  const [shownCountry, setShownCountry] = useState<Country | undefined>(
    undefined
  );
  const [shownCountryHistorical, setShownCountryHistorical] = useState<
    Historical | undefined
  >(undefined);

  const fetchMoreData = () => {
    if (props.countries && props.countries.length > numItems) {
      const len = props.countries.length;

      setTimeout(() => {
        setNumItems(
          (numItems + numItemsIncrement > len && len) ||
          numItems + numItemsIncrement
        );
      }, loadingTimeout);
    }
  };

  function addObjects(a: any, b: any) {
    let c: any = {};
    let x: string = '';
    for (x in a) {
      if (b[x] !== undefined) {
        c[x] = a[x] + b[x];
      }
    }
    return c;
  }

  const handleHistoricalDataButtonClick = (country: Country) => {
    const hists = props.historicals?.filter(
      (h) => h.country === country.country
    );
    if (!hists?.length) {
      console.log(
        `Historical series for ${country.country} is not available. Is this a province of a country?`
      );
      return;
    }

    const hist = hists?.reduce((acc, curr) => {
      const cases = addObjects(acc.timeline.cases, curr.timeline.cases);
      const deaths = addObjects(acc.timeline.deaths, curr.timeline.deaths);
      const recovered = addObjects(
        acc.timeline.recovered,
        curr.timeline.recovered
      );
      return {
        country: acc.country,
        province: null,
        timeline: {
          cases: cases,
          deaths: deaths,
          recovered: recovered
        }
      };
    });
    setShownCountry(country);
    setShownCountryHistorical(hist);
    setCountryChartShown(true);
  };

  return (
    <React.Fragment>
      {(props.countries && props.countries.length && (
        <React.Fragment>
          <CountryChart
            shown={countryChartShown}
            country={shownCountry}
            historical={shownCountryHistorical}
            onClose={() => {
              setCountryChartShown(false);
            }}
          />
          <InfiniteScroll
            scrollThreshold="20px"
            style={{ overflow: 'unset' }}
            dataLength={numItems}
            next={fetchMoreData}
            hasMore={props.countries.length > numItems}
            loader={
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                m={3}
                p={3}
                css={{ height: 100 }}
              >
                <Typography color="primary" align="center" variant="body2">
                  loading...
                </Typography>
              </Box>
            }
          >
            <Grid container spacing={1}>
              {props.countries.slice(0, numItems).map((countryStats, index) => (
                <Grid
                  key={countryStats.country + '_' + index.toString()}
                  container
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <CountryStats
                    country={countryStats}
                    onHistoricalDataButtonClick={
                      handleHistoricalDataButtonClick
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </React.Fragment>
      )) || (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            m={3}
            p={3}
            css={{ height: 200 }}
          >
            <CircularProgress />
          </Box>
        )}
    </React.Fragment>
  );
};
