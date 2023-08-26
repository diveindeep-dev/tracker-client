import axios from 'axios';
import { SERVER_URL } from '../../config';

axios.defaults.baseURL = SERVER_URL;

export const signUpApi = async (newUser: SignUpFormValue) => {
  try {
    const res = await axios.post('/api/auth/signup', newUser);
    return { data: res.data, status: res.status };
  } catch (error) {
    return error;
  }
};

export const signInApi = async (signInUser: SignInFormValue) => {
  try {
    const res = await axios.post('/api/auth/signin', signInUser);
    return { data: res.data, status: res.status };
  } catch (error) {
    return error;
  }
};
