import axios from 'axios';

export const getAcars = async () => {
  try {
    const response = await axios.get(`${process.env.ROOT_API}/acars`);
    return response.data.data;
  } catch(err) {
    console.log(err);
  }
  return [];
}

export const getGeoson = async (id) => {console.log('getGeoson');
  try {
    const response = await axios.get(`${process.env.ROOT_API}/geoson/${id}`);
    return response.data.data;
  } catch(err) {
    console.log(err);
  }
  return [];
}