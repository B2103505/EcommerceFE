
import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'Plant-indoor');
  formData.append('folder', 'samples/ecommerce');

  const response = await axios.post(
    'https://api.cloudinary.com/v1_1/dpydquflo/image/upload',
    formData
  );

  return response.data.secure_url;
};

export const uploadMultipleImagesToCloudinary = async (files) => {
  try {
    const uploadPromises = files.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Plant-indoor');
      formData.append('folder', 'samples/ecommerce');

      return axios.post(
        'https://api.cloudinary.com/v1_1/dpydquflo/image/upload',
        formData
      );
    });

    const responses = await Promise.all(uploadPromises);
    const urls = responses.map(res => res.data.secure_url);
    return urls;
  } catch (error) {
    console.error('❌ Upload nhiều ảnh thất bại:', error);
    throw new Error('Upload nhiều ảnh thất bại. Vui lòng thử lại.');
  }
};

