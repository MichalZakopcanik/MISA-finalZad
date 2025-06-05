import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Divider } from '@mui/material';
import DataTable from '../components/DataTable';
import SensorChart from '../components/SensorChart';
import DateFilter from '../components/DateFilter';
import { getSensorData } from '../services/api';
import dayjs from 'dayjs';

function Dashboard() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchData = async () => {
    try {
      const params = {};
      if (startDate) params.startDate = dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss');
      if (endDate) params.endDate = dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss');
      const result = await getSensorData(params.startDate, params.endDate);
      setData(result);
    } catch (err) {
      console.error('Chyba pri načítaní dát:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          📊 Senzorové Dáta
        </Typography>

        <Divider sx={{ my: 3 }} />

        <DateFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          onFetch={fetchData}
        />

        <DataTable data={data} />

        {data.length > 1 && (
          <div style={{ marginTop: '2rem' }}>
            <SensorChart data={data} />
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default Dashboard;
