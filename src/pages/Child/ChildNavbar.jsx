import { NavLink, Link } from "react-router";
import { useState, useEffect } from "react";
import useChildStore from '../../stores/useChildStore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ChildNavbar() {
    const [notis, setNotis] = useState([]);
    const [pointLogs, setPointLogs] = useState([]);

    const getNotis = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/notification/`);
            setNotis(res.data.notifications);

            return true;
        } catch (err) {
            if (import.meta.env.VITE_ENV !== 'production') {
                console.log(err);
            }
            return false;
        }
    }
    const getPointLogs = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/child/point`);
            setPointLogs(res.data.pointLogs);

            return true;
        } catch (err) {
            if (import.meta.env.VITE_ENV !== 'production') {
                console.log(err);
            }
            return false;
        }
    }

    useEffect(() => {
        getPointLogs();
        getNotis();
    }, []);

    const deleteNoti = async (notiid) => {
        try {
            await axios.delete(`${SERVER_URL}/api/notification/${notiid}`);
            setNotis(prev => prev.filter(item => item.id != notiid));
        } catch (err) {
            if (import.meta.env.VITE_ENV !== 'production') {
                console.log(err);
            }
        }
    }

    const point = useChildStore(state => state.point);
    const checkPoint = useChildStore(state => state.checkPoint);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getPoint = async () => {
            try {
                setLoading(true);
                await checkPoint();
            } catch (err) {
                if (import.meta.env.VITE_ENV !== 'production') {
                    console.log(err);
                }
            } finally {
                setLoading(false);
            }
        }
        getPoint();
    }, [])

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="bg-white p-3 border border-gray-300 rounded shadow-lg text-sm">
                    <p className="font-bold">{label}</p>
                    <p className="text-success">point: {data.point}</p>

                    <p className="text-info mt-1 font-bold">
                        {data.comment}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-row justify-between navbar bg-base-100 shadow-lg sticky top-0 z-50 h-[15vh]">
            <div className="flex flex-row ml-5 items-center">
                <Link to='/' className="text-3xl flex-none transition-all duration-300 hover:scale-103 hover:-translate-y-1">떡잎은행</Link>
                <div role="tablist" className="tabs tabs-box ml-5">
                    <NavLink to='/child/home' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>
                        <div className="tooltip tooltip-bottom">
                            <div className="tooltip-content">
                                <div className="animate-bounce -rotate-5 text-xl">홈</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-current"><path d="M21.66,10.25l-9-8a1,1,0,0,0-1.32,0l-9,8a1,1,0,0,0-.27,1.11A1,1,0,0,0,3,12H4v9a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V12h1a1,1,0,0,0,.93-.64A1,1,0,0,0,21.66,10.25ZM13,20H11V17a1,1,0,0,1,2,0Zm5,0H15V17a3,3,0,0,0-6,0v3H6V12H18ZM5.63,10,12,4.34,18.37,10Z"></path></svg>
                        </div>
                    </NavLink>

                    <NavLink to='/child/bank' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>
                        <div className="tooltip tooltip-bottom">
                            <div className="tooltip-content">
                                <div className="animate-bounce -rotate-5 text-xl">은행</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-current"><path d="M6,11a1,1,0,1,0,1,1A1,1,0,0,0,6,11Zm12,0a1,1,0,1,0,1,1A1,1,0,0,0,18,11Zm2-6H4A3,3,0,0,0,1,8v8a3,3,0,0,0,3,3H20a3,3,0,0,0,3-3V8A3,3,0,0,0,20,5Zm1,11a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V8A1,1,0,0,1,4,7H20a1,1,0,0,1,1,1ZM12,9a3,3,0,1,0,3,3A3,3,0,0,0,12,9Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,12,13Z"></path></svg>
                        </div>
                    </NavLink>

                    <NavLink to='/child/stage' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>
                        <div className="tooltip tooltip-bottom">
                            <div className="tooltip-content">
                                <div className="animate-bounce -rotate-5 text-xl">스테이지</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-current"><path d="M19.87,8.6A1,1,0,0,0,19,8H14.42l1.27-4.74a1,1,0,0,0-.17-.87A1,1,0,0,0,14.73,2h-7a1,1,0,0,0-1,.74l-2.68,10a1,1,0,0,0,.17.87,1,1,0,0,0,.8.39H8.89L7.08,20.74a1,1,0,0,0,1.71.93l10.9-12A1,1,0,0,0,19.87,8.6Zm-9.79,8.68,1.07-4a1,1,0,0,0-.17-.87,1,1,0,0,0-.79-.39H6.35L8.49,4h4.93L12.15,8.74a1,1,0,0,0,1,1.26h3.57Z"></path></svg>
                        </div>
                    </NavLink>
                </div>

            </div>

            <div className="flex flex-row justify-end items-center">



                <button className="btn mr-5 btn-square btn-secondary" onClick={() => { document.getElementById('notification_modal').showModal(); getNotis(); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6"><path d="M18,13.18V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v3.18A3,3,0,0,0,4,16v2a1,1,0,0,0,1,1H8.14a4,4,0,0,0,7.72,0H19a1,1,0,0,0,1-1V16A3,3,0,0,0,18,13.18ZM8,10a4,4,0,0,1,8,0v3H8Zm4,10a2,2,0,0,1-1.72-1h3.44A2,2,0,0,1,12,20Zm6-3H6V16a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"></path></svg>
                </button>
                <dialog id="notification_modal" className="modal">
                    <div className="modal-box w-150 h-150">
                        <div className='px-5 pt-5 overflow-y-auto h-full'>
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
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>


                <button
                    className="text-xl mr-5 transition-all duration-300 hover:scale-103 hover:-translate-y-1 cursor-pointer"
                    onClick={() => { document.getElementById('pointlog_modal').showModal(); getPointLogs(); }}
                >
                    포인트: {loading ? <span className="loading loading-infinity loading-md"></span> : point}
                </button>
                <dialog id="pointlog_modal" className="modal">
                    <div className="modal-box min-w-200 h-150 outline-none">
                        <LineChart
                            className="mt-5"
                            style={{ width: '90%', height: '90%', aspectRatio: 1.618 }}
                            responsive
                            data={pointLogs.map((log, idx) => ({
                                day: idx - pointLogs.length + 1,
                                point: log.point,
                                comment: log.comment
                            }))}
                            margin={{
                                top: 5,
                                right: 0,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis width="auto" domain={['dataMin-10', 'dataMax+10']} />
                            <Tooltip content={<CustomTooltip />}/>
                            <Legend />
                            <Line type="monotone" dataKey="point" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>



            </div>
        </div>
    )
}