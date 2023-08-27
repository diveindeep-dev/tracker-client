import axios from 'axios';

export const editProfileApi = async (
  id: string,
  editedValue: EditProfileFormValue,
) => {
  try {
    const response = await axios.put(`/api/user/edit/${id}`, editedValue);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return error.response;
  }
};
