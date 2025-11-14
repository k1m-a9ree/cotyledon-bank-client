import { NavLink, Link } from "react-router";
import { useState, useEffect } from "react";
import useChildStore from '../../stores/useChildStore'
import axios from 'axios';
axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ChildNavbar() {
    const point2 = useChildStore(state => state.point);
    const checkPoint = useChildStore(state => state.checkPoint);
    const [point, setPoint] = useState(0);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getPoint = async () => {
            try {
                setLoading(true);
                await checkPoint();
                console.log(point2);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getPoint();
    }, [])
    return (
        <div className="flex flex-row justify-between navbar bg-base-100 shadow-lg sticky top-0 z-50 h-[15vh]">
            <Link to='/' className="btn btn-ghost text-3xl flex-none">떡잎은행</Link>

            <div className="flex flex-row items-center">
                <span className="text-xl mr-10">포인트: { loading ? <span className="loading loading-infinity loading-md"></span> : point2 }</span>
                <div role="tablist" className="tabs tabs-box">
                    <NavLink to='/child/home' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>홈</NavLink>
                    <NavLink to='/child/work' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>아르바이트</NavLink>
                    <NavLink to='/child/bank' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>은행</NavLink>
                    <NavLink to='/child/store' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>상점</NavLink>
                    <NavLink to='/child/stage' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>스테이지</NavLink>
                </div>
            </div>
        </div>
    )
}