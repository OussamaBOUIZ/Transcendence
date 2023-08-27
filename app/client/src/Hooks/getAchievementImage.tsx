import axios from 'axios'

export  const getAchievementImage = async (id: number) => {
    try {
        const res = await axios.get(`/api/user/achievement/image/${id}`, {responseType: 'blob'})
        return URL.createObjectURL(res.data);
    } catch (err) {
        console.log("Error: Failed to fetch award image.");
        console.log(err);
        return undefined;
    }
};