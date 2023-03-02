import axios from 'axios';
import { SERVER_URL } from '../../config';

axios.defaults.baseURL = SERVER_URL;

export const getUserByProfileIdApi = async (
  profileId: string,
  signedId: string,
) => {
  try {
    const response = await axios.post(`/api/user/${profileId}`, {
      signed_id: signedId,
    });
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};
