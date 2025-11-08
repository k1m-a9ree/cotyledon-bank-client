import { NavLink, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ChildNavbar() {
    const [point, setPoint] = useState(0);
    useEffect(() => {
        const getPoint = async () => {
            try {
                const res = await axios(`${SERVER_URL}/api/child/point`);
                setPoint(res.data.point);
            } catch (err) {
                console.log(err);
            }
        }
        getPoint();
    }, [])
    return (
        <div className="flex flex-row justify-between navbar bg-base-100 shadow-lg sticky top-0 z-50 h-20">
            <Link to='/' className="btn btn-ghost text-3xl flex-none">떡잎은행</Link>

            <div className="flex flex-row items-center">
                <span className="text-xl mr-10">포인트: {point}</span>
                <div role="tablist" className="tabs tabs-box">
                    <NavLink to='/child/home' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>홈</NavLink>
                    <NavLink to='/child/work' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>아르바이트</NavLink>
                    <NavLink to='/child/bank' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>은행</NavLink>
                    <NavLink to='/child/store' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>상점</NavLink>
                </div>
            </div>
        </div>
    )
}