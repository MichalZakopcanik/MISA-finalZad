import React from 'react';
import {
  Grid,
  Button,
  Typography,
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

  setTimeout(() => {
    onFetch(null, null);
  }, 0);
};

  const isDateRangeEmpty = !startDate && !endDate;

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
            onClick={() => onFetch(startDate, endDate)}
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
            disabled={isDateRangeEmpty}
          >
            Vymazať dátum
          </Button>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default DateFilter;
