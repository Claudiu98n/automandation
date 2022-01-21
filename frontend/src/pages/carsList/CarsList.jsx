import React, {useState, useEffect} from 'react';
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
import Pagination from '@mui/material/Pagination';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import CircleLoader from 'react-spinners/CircleLoader';
import ColdStartRecommendations from '../../components/coldStartRecommendations/ColdStartRecommendations';
import {useHistory} from 'react-router-dom';

const theme = createTheme ();

const CarsList = () => {
  const [cars, setCars] = useState ([]);
  const [loading, setLoading] = useState (true);
  const [currentPage, setCurrentPage] = useState (1);

  const history = useHistory();

  const paginate = pageNumber => {
    setCurrentPage (pageNumber);
  };

  const goToCarPage = (id) => {
    history.push(`/cars-catalogue/${id}`);
  }

  useEffect (() => {
    const fetchCars = async () => {
      try {
        const carsReq = await axios.get (
          process.env.REACT_APP_BACKEND_URL + '/cars',
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem ('jwt'),
            },
          }
        );

        if (carsReq.status === 200) {
          setCars (carsReq.data);
        }
      } catch (e) {
        console.log (e);
        cogoToast.error ('A avut loc o eroare neasteptata');
      } finally {
        setLoading (false);
      }
    };

    fetchCars ();
  }, []);

  const carsPerPage = 30;
  const count = Math.ceil (cars.length / carsPerPage);
  const lastCarIndex = currentPage * carsPerPage;
  const firstCarIndex = lastCarIndex - carsPerPage;
  const currentCars = cars.slice (firstCarIndex, lastCarIndex);

  let toRender;

  if (loading) {
    toRender = (
      <div className="loader">
        <CircleLoader size={120} color={'#7B1FA2'} />
      </div>
    );
  } else if (cars.length > 0) {
    toRender = currentCars.map ((car, index) => (
      <Grid item key={index} xs={12} sm={6} md={4}>
        <Card onClick={() => goToCarPage(car.id)} sx={{height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer'}}>
          <CardMedia
            sx={{
              height: '200px',
            }}
            component="img"
            image={car.image_url}
            alt="random"
          />
          <CardContent sx={{flexGrow: 1}}>
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
      <Box sx={{height: 'calc(100vh - 250px)'}}>
        <Typography align="center">There are no cars available.</Typography>
      </Box>
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
            <Box display="flex" alignItems="center">
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
          <Grid container spacing={4}>
            {toRender}
          </Grid>
          <Pagination
            sx={{mt: 5}}
            count={count}
            page={currentPage}
            color="primary"
            onChange={(_, value) => paginate (value)}
          />
          <ColdStartRecommendations />
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

export default CarsList;
