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
          <Link
            href="https://pegucovid.netlify.app/"
            onClick={() => { }}
            color="inherit"
            target="_blank"
          >
            <i className="fa fa-globe" aria-hidden="true"></i> Website
          </Link>
        </Typography>
        <Typography align="center">
          <Link
            href="https://github.com/NovelCOVID/API"
            onClick={() => { }}
            color="inherit"
            target="_blank"
          >
            <i className="fa fa-signal" aria-hidden="true"></i> Data source
          </Link>
        </Typography>
        <Typography align="center">
          <Link href="https://thulina2004.netlify.app/" onClick={() => { }} color="inherit" target="_blank">
            <i className="fa fa-camera" aria-hidden="true"></i> portfilio
          </Link>
        </Typography>
        <Typography align="center">
          <Link
            href="https://github.com/gmagno/covid19"
            onClick={() => { }}
            color="inherit"
            target="_blank"
          >
            <i className="fa fa-github" aria-hidden="true"></i> Source code
          </Link>
        </Typography>
        <Typography align="center">
          <Link
            href="https://github.com/mhflk"
            onClick={() => { }}
            color="inherit"
            target="_blank"
          >
            <i className="fa fa-github" aria-hidden="true"></i> thulina
          </Link>
        </Typography>
        <Typography align="center">
          <Link
            href="mailto:endhamfc@gmail.com"
            onClick={() => { }}
            color="inherit"
            target="_blank"
          >
            <i className="fa fa-envelope" aria-hidden="true"></i> Contact
          </Link>
        </Typography>

      </Container>
    </React.Fragment>
  );
};
