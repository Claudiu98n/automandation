import React, {useState} from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useHistory } from 'react-router-dom';

const ColdStart = () => {
  const [coldStartObj, setColdStartObj] = useState ({
    startYear: '',
    fuelType: '',
    startPrice: '',
    endPrice: '',
    startMileage: '',
    endMileage: '',
  });

  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault ();

    const coldStartFilter = async () => {
      try {
        const response = await axios.post (
          process.env.REACT_APP_BACKEND_URL + '/insertPreference', 
          {
            startYear: Number(coldStartObj.startYear),
            fuelType: coldStartObj.fuelType,
            startPrice: Number(coldStartObj.startPrice),
            endPrice: Number(coldStartObj.endPrice),
            startMileage: Number(coldStartObj.startMileage),
            endMileage: Number(coldStartObj.endMileage),
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem ('jwt'),
            },
          }
        );

        if (response.status === 200) {
          cogoToast.success('Multumim pentru timpul dedicat');
          history.push('/cars-catalogue');
        }
      } catch (e) {
        console.log (e);
        cogoToast.error ('A avut loc o eroare neasteptata');
      }
    };

    coldStartFilter ();
  };

  const handleChange = event => {
    setColdStartObj ({
      ...coldStartObj,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Container sx={{py: 8}} maxWidth="md">
        <Paper sx={{p: 5}}>
          <Typography variant="h6">
            Pentru a iti oferi cele mai bune recomandari, avem nevoie sa completezi urmatoarul formular prin care sa iti exprimi preferintele in legatura cu masina ce planuiesti sa o cumperi.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
            <FormControl fullWidth>
              <InputLabel id="year">An</InputLabel>
              <Select
                labelId="year"
                name="startYear"
                id="year"
                label="year"
                required
                color="secondary"
                onChange={handleChange}
                value={coldStartObj.startYear}
              >
                <MenuItem value={'2000'}>2000-2005</MenuItem>
                <MenuItem value={'2005'}>2005-2010</MenuItem>
                <MenuItem value={'2010'}>2010-2015</MenuItem>
                <MenuItem value={'2015'}>2015-2020</MenuItem>
                <MenuItem value={'2020'}>2020+</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{mt: 2}}>
              <InputLabel id="fuelType">Motorizare</InputLabel>
              <Select
                labelId="fuelType"
                name="fuelType"
                id="fuelType"
                required
                label="fuelType"
                color="secondary"
                onChange={handleChange}
                value={coldStartObj.fuelType}
              >
                <MenuItem value={'Diesel'}>Diesel</MenuItem>
                <MenuItem value={'Benzina'}>Benzina</MenuItem>
                <MenuItem value={'Benzina + GPL'}>Benzina + GPL</MenuItem>
                <MenuItem value={'Electric'}>Electric</MenuItem>
                <MenuItem value={'Hibrid'}>Hibrid</MenuItem>
              </Select>
            </FormControl>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <TextField
                type="number"
                margin="normal"
                required
                color="secondary"
                id="startPrice"
                label="Pret minim"
                name="startPrice"
                onChange={handleChange}
                sx={{width: '49%'}}
              />
              <TextField
                type="number"
                margin="normal"
                required
                color="secondary"
                id="endPrice"
                label="Pret maxim"
                name="endPrice"
                onChange={handleChange}
                sx={{width: '49%'}}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <TextField
                type="number"
                margin="normal"
                required
                color="secondary"
                id="startMileage"
                label="Km de la"
                name="startMileage"
                onChange={handleChange}
                sx={{width: '49%'}}
              />
              <TextField
                type="number"
                margin="normal"
                required
                color="secondary"
                id="endMileage"
                label="Km pana la"
                name="endMileage"
                onChange={handleChange}
                sx={{width: '49%'}}
              />
            </Box>
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              trimite raspunsurile
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ColdStart;
