import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const getSensorData = async (startDate, endDate) => {
  const params = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await axios.get(`${API_BASE_URL}/data`, { params });
  return response.data;
};
