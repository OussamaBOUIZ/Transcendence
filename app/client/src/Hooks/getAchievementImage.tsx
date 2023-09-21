import axios from 'axios'

export  const getAchievementImage = async (id: number) => {
    try {
        const res = await axios.get<Blob>(`/api/user/achievement/image/${id}`, {responseType: 'blob'})
        return URL.createObjectURL(res.data);
    } catch (error) {
        return undefined;
    }
};