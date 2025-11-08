import { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ChildHome() {
    const [notis, setNotis] = useState([]);

    useEffect(() => {
        const getNotis = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/notification/`);
                setNotis(res.data.notifications);

                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }

        getNotis();
    }, []);

    const deleteNoti = async (notiid) => {
        try {
            await axios.delete(`${SERVER_URL}/api/notification/${notiid}`);
            setNotis(prev => prev.filter(item => item.id != notiid));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='px-5 pt-5 overflow-y-auto h-[calc(100vh - 20)]'>
            {notis.map(noti => {
                const date = new Date(noti.createdAt);
                const options = {
                    timeZone: "Asia/Seoul",
                    year: 'numeric',  
                    month: 'long',    
                    day: 'numeric',     
                    hour: 'numeric',
                    minute: 'numeric',  
                    hour12: false
                };
                const koreanDate = date.toLocaleString('ko-KR', options);
                return <details className="collapse bg-base-100 border border-base-300 mb-3" name="notifications" key={noti.id} open>
                    <summary className="collapse-title font-semibold">{noti.content}</summary>
                    <div className="collapse-content text-sm flex flex-row justify-between">
                        {koreanDate}
                        <button className='btn btn-accent' onClick={(e) => deleteNoti(noti.id)}>읽음 처리</button>
                    </div>
                </details>
            })}
        </div>
    )
}

export default ChildHome;