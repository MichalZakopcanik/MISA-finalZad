import React from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import {
  LocalizationProvider,
  DateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function DateFilter({ startDate, endDate, setStartDate, setEndDate, onFetch }) {
  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    onFetch(); // voliteľné: môžeš vyvolať re-fetch hneď po vymazaní
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} alignItems="flex-end" marginBottom={2}>
        <Grid item xs={12} md={3}>
          <Typography variant="body1">Od:</Typography>
          <DateTimePicker
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            ampm={false}
            slotProps={{
                textField: {
                fullWidth: true,
                size: 'small',
                sx: { height: 40 },
                },
            }}
            />
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="body1">Do:</Typography>
          <DateTimePicker
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            ampm={false}
            slotProps={{
                textField: {
                fullWidth: true,
                size: 'small',
                sx: { height: 40 },
                },
            }}
            />
        </Grid>

        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onFetch}
            size="medium"
            sx={{ height: '40px' }}
          >
            Načítať
          </Button>
        </Grid>

        <Grid item xs={12} md={3}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={clearFilters}
            size="medium"
            sx={{ height: '40px' }}
          >
            Vymazať dátum
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default DateFilter;
