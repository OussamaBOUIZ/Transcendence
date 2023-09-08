import React, { useContext, useState } from 'react'
import cube from "../../Assets/Icons/cube.svg"
import useEffectOnUpdate from "../../Hooks/useEffectOnUpdate"
import axios, {AxiosResponse} from 'axios';
import UserContext from '../../Context/UserContext';
import { SocketContext } from './ChatRooms';

interface channel {
    id: number;
    channel_name: string;
    channel_type: string;
    isClick: boolean;
}

export default function ChannelInitAction ({setNotif}: {setNotif: React.Dispatch<React.SetStateAction<string>>}) {

    const [channelPassword, setChannelPassword] = useState<string>("")
    const [selectedChannel, setSelectedChannel] = useState<channel>({} as channel)
    const [channels, setChannels] = useState<channel[]>([])
    const {user} = useContext(UserContext)
    const {setUpdate, setIsClick} = useContext(SocketContext)

    const passwordDiv = <input
                            className='w-full'
                            type="password"
                            placeholder="type password"
                            name="channelPassword"
                            onChange={(e) => setChannelPassword(e.target.value)}
                            value={channelPassword}>
                        </input>

    useEffectOnUpdate(() => {
        const getChannels = async () => {
            try {
                const res: AxiosResponse<channel[]> = await axios.get("/api/channel/AccessibleChannels");
                setChannels(res.data.map(channel => ({...channel, isClick: false})));
            }
            catch (err) {
                // console.log(err);
            }
        }
        void getChannels()
    }, [])

    async function handleSubmit() {
        if (!selectedChannel.channel_name)
            return;
        if (selectedChannel.channel_type === 'protected') {
            try {
                const res: AxiosResponse<boolean | string> = await axios.post(`/api/channel/checkProtected/${user?.id}`, {channelName: selectedChannel.channel_name, channelPassword: channelPassword})
                if (typeof res.data === 'string')
                    setNotif(res.data)
                else
                    res.data ? setUpdate(prev => prev + 1) : setNotif("Wrong password")
            }
            catch (err) {
                // console.log(err)
            }
        } else {
            try {
                const res: AxiosResponse<string> = await axios.get(`/api/channel/addToChannel/${user?.id}?channelName=${selectedChannel.channel_name}`)
                res.data ? setNotif(res.data) : setUpdate(prev => prev + 1) 
            }
            catch (err) {
                // console.log(err)
            }
        }
    }

    const list = channels.map((channel) => {
        return (
            <section>
                <div className={`channel flex gap-3 justify-start cursor-pointer px-4 py-4 ${selectedChannel?.id === channel.id ? 'bg-room-bar' : ''}`} key={channel.id} onClick={() => setSelectedChannel(channel)}>
                    <img src={cube} alt="cube" />
                    <h2>{channel.channel_name}</h2>
                </div>
                {selectedChannel.id === channel.id && channel.channel_type === 'protected' && passwordDiv}
            </section>
        )
    })
    return (
        <section className="init_action_container flex flex-col gap-4 items-center justify-center w-full h-full">
            <h1 className='text-center text-3xl font-bold'>👋 Hi There!<br></br>Create your first channel</h1>
            <p className='text-center w-1/3 text-xl font-semibold'>Embark on an extraordinary journey of collaboration and inspiration or join existing ones</p>
            <div className="buttons_div flex gap-4">
                <button className="secondary_btn border-2 rounded-3xl border-white px-8 py-3" onClick={() => void handleSubmit()}>Join</button>
                <button className="primary_btn rounded-3xl bg-primary-pink px-6 py-3 flex items-center gap-2" onClick={() => setIsClick(prev => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" fill="white">
                        <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path>
                    </svg>
                    Create
                </button>
            </div>
            {list.length >0 && <div className='border-2 rounded-2xl border-white flex flex-col w-1/2 overflow-hidden max-h-56'>
                <div className='channels_list overflow-x-hidden overflow-y-auto'>
                    {list}
                </div>
            </div>}
        </section>
    );
}