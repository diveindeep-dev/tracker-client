import axios from 'axios';
import { SERVER_URL } from '../../config';

axios.defaults.baseURL = SERVER_URL;

export const signUpApi = async (newUser: SignUpFormValue) => {
  try {
    const response = await axios.post('/api/auth/signup', newUser);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};

export const signInApi = async (signInUser: SignInFormValue) => {
  try {
    const response = await axios.post('/api/auth/signin', signInUser);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};

interface Token {
  headers: {
    authorization: string;
  };
}

export const getUserByToken = async (headers: Token) => {
  try {
    const response = await axios.get('/api/auth', headers);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};
