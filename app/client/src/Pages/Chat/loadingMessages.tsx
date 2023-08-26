import { getUserData } from '../../Hooks/getUserData';

export const loadingMessages = (data, setMessageList) => {
    console.log('load messages');
    return () => {
        const fetchData = async () => {
            const newData = await Promise.all(
                data.map(async (message) => {
                    const userData = await getUserData(message.fromUser);
                    message.image = userData.image;
                    message.username = userData.username;
                    return message;
                })
            );
            setMessageList(newData);
        };
        void fetchData();
    };
};
