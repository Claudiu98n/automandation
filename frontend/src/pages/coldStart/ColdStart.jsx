import React, { useState } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ColdStart = () => {
    const [coldStartObj, setColdStartObj] = useState({
        startYear: '',
        fuelType: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = (event) => {
        setColdStartObj({
            ...coldStartObj,
            [event.target.name]: event.target.value
        });
    }

    console.log(coldStartObj);

    return (
        <div>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Paper sx={{ p: 5 }}>
                    <Typography variant="h6">Pentru a iti oferi cele mai bune recomandari, avem nevoie sa completezi urmatoarul formular prin care sa iti exprimi preferintele in legatura cu masina ce planuiesti sa o cumperi.</Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel id="year">An</InputLabel>
                            <Select
                                labelId="year"
                                name="startYear"
                                id="year"
                                label="year"
                                color="secondary"
                                onChange={handleChange}
                                value={coldStartObj.startYear}
                            >
                                <MenuItem value={'2000'}>2000-2005</MenuItem>
                                <MenuItem value={'2006'}>2006-2010</MenuItem>
                                <MenuItem value={'2011'}>2011-2015</MenuItem>
                                <MenuItem value={'2016'}>2016-2020</MenuItem>
                                <MenuItem value={'2021'}>2021+</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{mt: 2}}>
                            <InputLabel id="fuelType">Motorizare</InputLabel>
                            <Select
                                labelId="fuelType"
                                name="fuelType"
                                id="fuelType"
                                label="fuelType"
                                color="secondary"
                                onChange={handleChange}
                                value={coldStartObj.startYear}
                            >
                                <MenuItem value={'Diesel'}>2000-2005</MenuItem>
                                <MenuItem value={'Benzina'}>2006-2010</MenuItem>
                                <MenuItem value={'Electric'}>2011-2015</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            color="secondary"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            trimite raspunsurile
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}

export default ColdStart;