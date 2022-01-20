import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import CarRentalIcon from '@mui/icons-material/CarRental';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import CircleLoader from 'react-spinners/CircleLoader';

const theme = createTheme();

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsReq = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/cars",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          });

        if (carsReq.status === 200) {
          setCars(carsReq.data);
        }
      } catch (e) {
        console.log(e);
        cogoToast.error('Oopps.. Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  let toRender;

  if (loading) {
    toRender = (
      <div className="loader">
        <CircleLoader size={120} color={'#7B1FA2'} />
      </div>
    );
  } else if (cars.length > 0) {
    toRender = cars.map((car, index) => (
      <Grid item key={index} xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            sx={{
              height: '200px'
            }}
            component="img"
            image={car.image_url}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              gutterBottom
              fontWeight="bo"
              variant="h5"
              component="h2"
            >
              {car.manufacturer}
            </Typography>
            <Typography>
              {car.model}
            </Typography>
            <Typography>
              An de fabricație: {car.year}
            </Typography>
            <Typography>
              Preț: {car.price}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  } else {
    toRender = (
      <Box sx={{ height: 'calc(100vh - 250px)' }}>
        <Typography align="center">There are no cars available.</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Box display="flex" alignItems="center">
              <CarRentalIcon sx={{ mr: 2 }} />
              <Typography variant="h6" color="inherit" noWrap>
                Cars Catalogue
              </Typography>
            </Box>
            <Typography variant="h6" color="inherit" noWrap>
              Hello, {JSON.parse(localStorage.getItem("user")).username}!
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {toRender}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'primary.main', p: 6 }} component="footer">
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

export default CarsList;
