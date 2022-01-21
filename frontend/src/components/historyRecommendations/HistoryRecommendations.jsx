import React, {useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import {Carousel} from '@trendyol-js/react-carousel';
import CarItem from '../carItem/CarItem';
import axios from 'axios';
import cogoToast from 'cogo-toast';

const HistoryRecommendations = () => {
  const [cars, setCars] = useState ([]);
  const [loadingCars, setLoadingCars] = useState (true);

  useEffect (() => {
    const fetchCars = async () => {
      try {
        const carsReq = await axios.get (
          process.env.REACT_APP_BACKEND_URL + '/historyFilter',
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
      } finally {
        setLoadingCars (false);
      }
    };

    fetchCars ();
  }, []);

  let toRender;

  if (loadingCars) {
    toRender = <CircularProgress />;
  } else if (cars.length > 0) {
    toRender = (
      <div>
        <Typography variant="h6" mb={3}>Credem ca te-ar interesa:</Typography>
        <Carousel show={3.5} slide={3} swiping={true}>
          {cars.map ((car, index) => (
            <CarItem
              key={index}
              id={car.id}
              image_url={car.image_url}
              manufacturer={car.manufacturer}
              model={car.model}
              year={car.year}
              price={car.price}
            />
          ))}
        </Carousel>
      </div>
    );
  } else {
    toRender = <p>Nu exista recomandari pentru istoricul actual.</p>;
  }
  return (
    <div style={{marginTop: '4rem'}}>
      {toRender}
    </div>
  );
};

export default HistoryRecommendations;
