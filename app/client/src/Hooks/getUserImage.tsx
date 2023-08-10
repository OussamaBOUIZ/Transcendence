import axios from 'axios';

export const getUserImage = async (id: number) => {
    try {
      const res = await axios.get(`/api/user/avatar/${id}`, {responseType: 'blob'})
      return URL.createObjectURL(res.data);
    } catch (err) {
      console.log("Error: Failed to fetch image.");
      console.log(err);
      return undefined;
    }
};