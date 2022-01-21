import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {useHistory} from 'react-router-dom';

const CarItem = ({ id, image_url, manufacturer, model, year, price }) => {
  const history = useHistory();
  
  return (
    <Card onClick={() => history.push(`/cars-catalogue/${id}`)} sx={{height: '100%', display: 'flex', flexDirection: 'column', mr: 2}}>
      <CardMedia
        sx={{
          height: '200px'
        }}
        component="img"
        image={image_url}
        alt="random"
      />
      <CardContent sx={{flexGrow: 1}}>
        <Typography gutterBottom fontWeight="bo" variant="h5" component="h2">
          {manufacturer}
        </Typography>
        <Typography>
          {model}
        </Typography>
        <Typography>
          An de fabricație: {year}
        </Typography>
        <Typography>
          Preț: {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CarItem;
