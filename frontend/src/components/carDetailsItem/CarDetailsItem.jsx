import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const CarDetailsItem = ({
  image_url,
  manufacturer,
  model,
  year,
  price,
  cylinderCapacity,
  fuelType,
  mileage,
  location,
  url,
}) => {
  return (
    <div
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        mr: 2,
        width: '100%',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${image_url})`,
          width: '100%',
          height: '300px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          border: '1px solid #1976d2',
          borderRadius: '20px',
        }}
        alt="car"
      />
      <CardContent sx={{flexGrow: 1}}>
        <Typography gutterBottom fontWeight="bo" variant="h5" component="h2">
          {manufacturer} {model}
        </Typography>
        <Typography>
          An de fabricație: {year}
        </Typography>
        <Typography>
          Preț: {price}
        </Typography>
        <Typography>
          Capacitate cilindrică: {cylinderCapacity}
        </Typography>
        <Typography>
          Tip motorizare: {fuelType}
        </Typography>
        <Typography>
          Kilometraj: {mileage}
        </Typography>
        <Typography>
          Locație: {location}
        </Typography>
        <Link href={url} color="inherit">
          {url}
        </Link>
      </CardContent>
    </div>
  );
};

export default CarDetailsItem;
