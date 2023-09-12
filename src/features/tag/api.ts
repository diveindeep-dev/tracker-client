import axios from 'axios';

export const getAllTagApi = async () => {
  try {
    const response = await axios.get(`/api/tag`);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};

export const getTrackerListByTagApi = async (tag: string) => {
  try {
    const response = await axios.post(`/api/tag/${tag}`);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};
