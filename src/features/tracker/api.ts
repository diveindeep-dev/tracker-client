import axios from 'axios';

export const newTrackerApi = async (data: NewTrackerFormValue) => {
  try {
    const response = await axios.post('/api/tracker/new', data);
    return { status: response.status };
  } catch (error: any) {
    return error.response;
  }
};
