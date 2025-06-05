import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Divider,
  Paper,
  Stack,
  Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import dayjs from 'dayjs';

function computeStats(data) {
  if (data.length === 0) return null;

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const min = (arr) => Math.min(...arr);
  const max = (arr) => Math.max(...arr);

  const co2Values = data.map(d => d.CO2);
  const tempValues = data.map(d => d.temperature);
  const humValues = data.map(d => d.humidity);

  return {
    co2: {
      avg: average(co2Values).toFixed(1),
      min: min(co2Values),
      max: max(co2Values),
    },
    temp: {
      avg: average(tempValues).toFixed(1),
      min: min(tempValues),
      max: max(tempValues),
    },
    hum: {
      avg: average(humValues).toFixed(1),
      min: min(humValues),
      max: max(humValues),
    },
  };
}

function DataTable({ data }) {
  const theme = useTheme();
  const stats = computeStats(data);

  const rows = data.map((entry, index) => ({
    id: index,
    timestamp: dayjs(entry.timestamp).format('YYYY-MM-DD HH:mm:ss'),
    CO2: entry.CO2,
    temperature: entry.temperature,
    humidity: entry.humidity,
    index: entry.index,
  }));

  const columns = [
    { field: 'timestamp', headerName: 'Čas', flex: 1 },
    { field: 'CO2', headerName: 'CO₂ (ppm)', flex: 1, type: 'number' },
    { field: 'temperature', headerName: 'Teplota (°C)', flex: 1, type: 'number' },
    { field: 'humidity', headerName: 'Vlhkosť (%)', flex: 1, type: 'number' },
    { field: 'index', headerName: 'Index', flex: 1, type: 'number' },
  ];

  return (
    <Paper elevation={2} sx={{ mt: 4, p: 3, borderRadius: 2 }}>
      {stats && (
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <AnalyticsIcon />
          </Avatar>
          <Typography variant="h6">Štatistiky</Typography>
        </Stack>
      )}

      {stats && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>CO₂:</strong> min {stats.co2.min}, max {stats.co2.max}, avg {stats.co2.avg} &nbsp;|&nbsp;
          <strong>Teplota:</strong> min {stats.temp.min}°C, max {stats.temp.max}°C, avg {stats.temp.avg}°C &nbsp;|&nbsp;
          <strong>Vlhkosť:</strong> min {stats.hum.min}%, max {stats.hum.max}%, avg {stats.hum.avg}%
        </Typography>
      )}

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableRowSelectionOnClick
            autoHeight
            sx={{
            border: 0,
            fontSize: 14,
            '& .MuiDataGrid-columnHeaders': {
                backgroundColor:
                theme.palette.mode === 'dark'
                    ? theme.palette.grey[900]
                    : theme.palette.grey[200],
                color: theme.palette.text.primary,
                fontWeight: 'bold',
            },
            '& .MuiDataGrid-row:hover': {
                backgroundColor: theme.palette.action.hover,
            },
            }}
        />
        </Box>

    </Paper>
  );
}

export default DataTable;
