import axios from 'axios';

const GHN_API = 'https://online-gateway.ghn.vn/shiip/public-api';

const getProvinces = async (req, res) => {
    try {
      const response = await axios.get(`${GHN_API}/master-data/province`, {
        headers: {
          'Content-Type': 'application/json',
          'Token': process.env.GHN_TOKEN
        }
      });
      res.json(response.data);
    } catch (err) {
      console.error('GHN Province Error:', err);
      res.status(500).json({ message: 'Error getting provinces from GHN' });
    }
  };
  
  module.exports = { getProvinces };