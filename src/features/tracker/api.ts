import axios from 'axios';

export const newTrackerApi = async (data: NewTrackerFormValue) => {
  try {
    const response = await axios.post('/api/tracker/new', data);
    return { status: response.status };
  } catch (error: any) {
    return error.response;
  }
};

export const getTrackerListByPageApi = async (page: number) => {
  try {
    const response = await axios.get(`/api/tracker/list/${page}`);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};

export const getTrackerByIdApi = async (trackerId: string) => {
  try {
    const response = await axios.get(`/api/tracker/${trackerId}`);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};

export const removeTrackerApi = async (trackerId: string) => {
  try {
    const response = await axios.put(`/api/tracker/${trackerId}/remove/`);
    return { status: response.status };
  } catch (error: any) {
    return error.response;
  }
};
