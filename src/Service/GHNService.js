import axios from 'axios';

const GHN_API = 'https://online-gateway.ghn.vn/shiip/public-api';

export const getProvinces = async (req, res) => {
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

export const calculateShippingFee = async (toDistrictId, wardCode, serviceId) => {
  try {
    const response = await axios.post(`/api/ghn/fee`, {
      service_id: serviceId,
      from_district_id: 1572,
      to_district_id: Number(toDistrictId),
      to_ward_code: wardCode,
      weight: 1000
    });

    return response.data.data;
  } catch (error) {
    console.error("Lỗi tính phí vận chuyển:", error.response?.data || error);
    return null;
  }
};

export const getExpectedDeliveryTime = async (fromDistrictId, toDistrictId, serviceId, toWardCode) => {
  try {

    const response = await axios.post(
      'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime',
      {
        from_district_id: Number(fromDistrictId),
        to_district_id: Number(toDistrictId),
        service_id: Number(serviceId),
        to_ward_code: toWardCode
      },
      {
        headers: {
          Token: process.env.REACT_APP_GHN_TOKEN,
          ShopId: process.env.REACT_APP_GHN_SHOP_ID,
        }
      }
    );
    return response.data.data.leadtime;
  } catch (error) {
    console.error('Lỗi lấy leadtime GHN:', error.response?.data || error.message);
    return null;
  }
};



