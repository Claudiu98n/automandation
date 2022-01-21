import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CircleLoader from 'react-spinners/CircleLoader';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CarRentalIcon from '@mui/icons-material/CarRental';
import CarDetailsItem from '../../components/carDetailsItem/CarDetailsItem';
import HistoryRecommendations from '../../components/historyRecommendations/HistoryRecommendations';
import { useHistory } from 'react-router-dom';

const theme = createTheme ();

const CarDetailsPage = () => {
  const [car, setCar] = useState (null);
  const [loadingCar, setLoadingCar] = useState (true);

  const history = useHistory();
  const params = useParams ();

  useEffect (
    () => {
      // add product to user's history
      const addToHistory = async () => {
          try {
            await axios.post (
              process.env.REACT_APP_BACKEND_URL + '/addToHistory', {carId: params.id},
              {
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem ('jwt'),
                },
              }
            );
          } catch (e) {
            console.log (e);
          }
      };

      addToHistory ();

      // get car details using id from url
      const fetchCar = async () => {
        if (params.id) {
          try {
            const carReq = await axios.get (
              process.env.REACT_APP_BACKEND_URL + '/getCarById',
              {
                params: {
                  id: params.id,
                },
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem ('jwt'),
                },
              }
            );

            if (carReq.status === 200) {
              setCar (carReq.data);
            }
          } catch (e) {
            console.log (e);
          } finally {
            setLoadingCar (false);
          }
        }
      };

      fetchCar ();
    },
    [params]
  );

  let toRender;

  if (loadingCar) {
    toRender = (
      <div className="loader">
        <CircleLoader size={120} color={'#7B1FA2'} />
      </div>
    );
  } else if (car) {
    toRender = (
      <CarDetailsItem
        image_url={car.image_url}
        manufacturer={car.manufacturer}
        model={car.model}
        year={car.year}
        price={car.price}
        location={car.location}
        cylinderCapacity={car.cylinderCapacity}
        fuelType={car.fuelType}
        mileage={car.mileage}
        url={car.url}
      />
    );
  } else {
    toRender = (
      <Typography variant="h6" align="center">
        Car with {params.id} id does not exist. You have accessed a wrong page.
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Box onClick={() => history.push('/cars-catalogue')} display="flex" alignItems="center" sx={{cursor: 'pointer'}}>
              <CarRentalIcon sx={{mr: 2}} />
              <Typography variant="h6" color="inherit" noWrap>
                Cars Catalogue
              </Typography>
            </Box>
            <Typography variant="h6" color="inherit" noWrap>
              Hello, {JSON.parse (localStorage.getItem ('user')).username}!
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{py: 8}} maxWidth="md">
          {/* End hero unit */}
            {toRender}
            <HistoryRecommendations />
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{bgcolor: 'primary.main', p: 6}} component="footer">
        <Typography variant="h6" align="center" color="white" gutterBottom>
          &#169; Automandation
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="white"
          component="p"
        >
          Web app which recommends you a car
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};

export default CarDetailsPage;
