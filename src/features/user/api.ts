import axios from 'axios';

export const editProfileApi = async (
  id: string,
  editedValue: EditProfileFormValue,
) => {
  try {
    const res = await axios.put(`/api/user/edit/${id}`, editedValue);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    return error;
  }
};

export const getUserByProfileIdApi = async (
  paramsUserValue: ParamsUserValue,
) => {
  try {
    const { profileId, signedId } = paramsUserValue;
    const res = await axios.post(`/api/user/${profileId}`, {
      signed_id: signedId,
    });
    return { data: res.data, status: res.status };
  } catch (error: any) {
    return error;
  }
};

export const toggleDoneApi = async (scheduleId: string) => {
  try {
    const res = await axios.put(`/api/schedule/done/${scheduleId}`);
    return { data: res.data, status: res.status };
  } catch (error: any) {
    return error;
  }
};
