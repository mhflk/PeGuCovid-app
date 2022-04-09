import React, { useEffect } from 'react';
import {
  Box,
  makeStyles,
  Container,
  Typography,
  Link
} from '@material-ui/core';
import 'font-awesome/css/font-awesome.min.css';
import Image from 'material-ui-image';
import { undrawImages } from '../../utils';

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: 32
  },
  container: {
    marginBottom: '100px'
  },
  Typography: {
    marginTop: "10px"
  }
}));

const changeImagePeriod = 5000;

const imgIdToText = [
  'Read a book.',
  'Avoid going out.',
  'Make a videoconference with your friends.',
  'Chill out...',
  'Workout at home.',
  'Be rational, be scientific.',
  'Read the news, reject the fake ones.',
  'Call your mother.',
  'Spend more time with your family.',
  'Read another book.',
  'Work remotely.',
  'Maintain social distancing.',
  'Wash your hands.'
];

export const About = () => {
  const classes = useStyles();
  const [imageId, setImageId] = React.useState<number>(0);

  useEffect(() => {
    const changeImageTimer = setInterval(changeImage, changeImagePeriod);
    return () => clearTimeout(changeImageTimer);
  }, []);

  const changeImage = () => {
    setImageId((currImageId) => (currImageId + 1) % imgIdToText.length);
  };

  return (
    <React.Fragment>
      <Container maxWidth="md" className={classes.container}>
        <Image
          src={undrawImages[imageId]}
          aspectRatio={100 / 60}
          disableSpinner
        />
        <Box className={classes.box}>
          <Typography align="center" variant="h5">
            {imgIdToText[imageId]}
          </Typography>
        </Box>
      </Container>
      <Container>
        <Typography align="center">

          PeGu covid-19 meter is an app which can be used to watch live status of covid-19 report of any country. You'll be able to find some informations like total cases,new cases,total deaths ,new deaths and etc.

        </Typography>



        <Box m={2} pt={3}>
          <Typography align="center" >

            This app might take several minutes to be updated since PeGu covid-19 meter is issuing verified data from reliable sources, such as api.covid19api.com and corona.lmao.ninja

          </Typography>
        </Box>
        <Box m={2} pt={3}>

          <Typography align="center">

            PeGu is a joint venture between two owners (Thulina Perera - CEO & Founder,Dewwandi Gunawardhana - CEO & Founder) , We alwys try to make something that would make life mush easier. Enjoy the app !

          </Typography>
        </Box>


      </Container>
    </React.Fragment>
  );
};
