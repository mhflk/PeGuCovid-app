import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slide, AppBar, Toolbar, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  appbar: {
    height: '56px',
    zIndex: theme.zIndex.appBar + 1
  }
}));

export interface SearchBarProps {
  show: boolean;
  autocompleteData: any;
  onAutocompleteChange?: (event: object, value: any, reason: string) => void;
  autocompleteGetOptionLabel?: (option: any) => any;
  autocompleteGroupBy?: (option: any) => any;
}

export const SearchBar = (props: SearchBarProps) => {
  const classes = useStyles();

  return (
    <Slide appear={false} direction="right" in={props.show}>
      <AppBar className={classes.appbar} color="inherit">
        <Toolbar>
          {props.autocompleteData && (
            <Autocomplete
              fullWidth={true}
              noOptionsText="all"
              onChange={props.onAutocompleteChange}
              multiple
              size="small"
              limitTags={1}
              id="search-countries"
              options={props.autocompleteData}
              groupBy={props.autocompleteGroupBy}
              getOptionLabel={props.autocompleteGetOptionLabel}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="countries" />
              )}
            />
          )}
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
