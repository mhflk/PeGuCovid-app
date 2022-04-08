import React from 'react';
import 'typeface-roboto';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Container
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Image from 'material-ui-image';
import { All } from 'novelcovid';

export interface GlobalStatsProps {
  stats: All | undefined;
  image: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 28
  },
  circularProgress: {
    flex: 1,
    alignSelf: 'center'
  },
  updated: {
    fontFamily: 'Hermit-BoldItalic'
  }
}));

export function GlobalStats(props: GlobalStatsProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="md" className={classes.container}>
        <Image
          src={props.image}
          // onClick={()=>{}}
          aspectRatio={100 / 60}
        />
      </Container>

      {!props.stats ? (
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
      ) : (
        <React.Fragment>
          <Container maxWidth="sm" className={classes.container}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow key={'infected'}>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" color="textPrimary">
                        Infected
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {props.stats.cases
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </TableCell>
                  </TableRow>

                  <TableRow key={'deaths'}>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" color="textPrimary">
                        Deaths
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {props.stats.deaths
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </TableCell>
                  </TableRow>

                  <TableRow key={'recovered'}>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" color="textPrimary">
                        Recovered
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {props.stats.recovered
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Container>

          <Typography
            className={classes.updated}
            variant="body2"
            color="textSecondary"
            align="center"
          >
            Last updated: {new Date(props.stats.updated).toString()}
            {'.'}
          </Typography>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
