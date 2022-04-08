import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, Container } from '@material-ui/core';
import '../css/main.css';
import { NovelCovid, All, Country, Historical } from 'novelcovid';
import { StatusBar } from './common/statusBar';
import { SearchBar } from './common/searchBar';
import { TitleBar } from './common/titleBar';
import { Footer, FooterSelection } from './common/footer';
import { GlobalStats } from './body/globalStats';
import { CountriesStats } from './body/countriesStats';
import { CountriesTable } from './body/countriesTable';
import { flags, commonImages } from '../utils/';
import { About } from './body/about';
import { Copyright } from './copyright';

declare global {
  interface Window {
    Bokeh: any;
  }
}

const theme = createMuiTheme({
  props: {},
  palette: {
    type: 'light'
    // type: 'dark'
  },
  typography: {
    fontFamily: "Hermit-Regular, 'Roboto'"
  },
  overrides: {
    MuiPaper: {
      elevation4: {
        boxShadow: 'unset'
      }
    }
  }
});

function App() {
  // App
  // ===========
  useEffect(() => {
    fetchGlobalStats();
    fetchCountriesStats();
    fetchCountriesHistorical();
  }, []);

  const [globalStats, setGlobalStats] = React.useState<All | undefined>(
    undefined
  );
  const [countriesStats, setCountriesStats] = React.useState<
    Array<Country> | undefined
  >(undefined);
  const [filteredCountriesStats, setFilteredCountriesStats] = React.useState<
    Array<Country> | undefined
  >(undefined);

  const [countriesHistorical, setCountriesHistorical] = React.useState<
    Array<Historical> | undefined
  >(undefined);

  const fetchGlobalStats = () => {
    const track = new NovelCovid();
    track
      .all()
      .then((stats) => {
        setGlobalStats(stats);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCountriesStats = () => {
    const track = new NovelCovid();
    track
      .countries()
      .then((countries) => {
        // to reduce the number of api requests all flags are shipped with the
        // the app. Here we're just changing the paths to the flags images
        // from the default api endpoint to a local path
        const updatedCountries = countries
          .map((c) => {
            if (c.countryInfo.iso2) {
              c.countryInfo.flag = flags[c.countryInfo.iso2.toLowerCase()];
            }
            return c;
          })
          .sort((a, b) => (a.country <= b.country ? -1 : 1))
          .sort((a, b) => (a.continent <= b.continent ? -1 : 1));
        setCountriesStats(updatedCountries);
        setFilteredCountriesStats(updatedCountries.map((c) => c));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCountriesHistorical = () => {
    fetch('https://disease.sh/v2/historical?lastdays=all')
      .then((response) => response.json())
      .then((val) => {
        setCountriesHistorical(val);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // StatusBar
  // ===========
  const handleRefreshButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    fetchGlobalStats();
    fetchCountriesStats();
    fetchCountriesHistorical();
  };

  const handleSearchButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setShowSearchBar(true);
  };

  // SearchBar
  // ===========
  const [showSearchBar, setShowSearchBar] = React.useState(false);

  const handleSearchBarAutocompleteChange = (
    event: object,
    value: any,
    reason: string
  ): void => {
    if (reason === 'clear') {
      setFilteredCountriesStats(
        (countriesStats && countriesStats.map((e) => e)) || undefined
      );
      setShowSearchBar(false);
      return;
    }

    if (reason === 'select-option' || reason === 'remove-option') {
      if (!value.length) {
        setFilteredCountriesStats(
          (countriesStats && countriesStats.map((e) => e)) || undefined
        );
        return;
      }
      const pickedCountriesNames = value.map((country: any) => country.country);
      let cd = (countriesStats && countriesStats.map((e) => e)) || [];

      cd =
        cd &&
        cd.filter((country) => pickedCountriesNames.includes(country.country));
      setFilteredCountriesStats(cd);
    }
  };

  // Body
  // ===========
  const renderBody = () => {
    switch (footerSelectedItem) {
      case FooterSelection.Global:
        return <GlobalStats stats={globalStats} image={commonImages[1]} />;
      case FooterSelection.Countries:
        return <CountriesTable countries={filteredCountriesStats} />;
      case FooterSelection.Stats:
        return (
          <CountriesStats
            countries={filteredCountriesStats}
            historicals={countriesHistorical}
          />
        );
      case FooterSelection.About:
        return <About />;
      default:
        return <div></div>;
    }
  };

  // Footer
  // ===========
  const [footerSelectedItem, setFooterSelectedItem] = React.useState<
    FooterSelection
  >(FooterSelection.Global);

  const handleFooterSelectedItemChange = (
    event: React.ChangeEvent<{}>,
    selectedItem: FooterSelection
  ) => {
    setFooterSelectedItem(selectedItem);
  };

  return (
    <div className="App">
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Container>
          <StatusBar
            onSearchButtonClick={handleSearchButtonClick}
            onRefreshButtonClick={handleRefreshButtonClick}
          />
          <SearchBar
            show={showSearchBar}
            autocompleteData={countriesStats}
            onAutocompleteChange={handleSearchBarAutocompleteChange}
            autocompleteGetOptionLabel={(country) => country.country}
            autocompleteGroupBy={(country) => country.continent}
          />
          <TitleBar title="PeGu" />
          {renderBody()}
          <Copyright />
        </Container>
        <Footer
          selectedItem={footerSelectedItem}
          onSelectedItemChange={handleFooterSelectedItemChange}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
