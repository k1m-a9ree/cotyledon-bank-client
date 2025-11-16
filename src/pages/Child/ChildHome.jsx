import { useState, useEffect } from 'react';
import axios from 'axios';
import ChildWork from './ChildWork';
import ChildStore from './ChildStore';

axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ChildHome() {


    return (
        <div className="tabs tabs-lift min-w-0 h-full p-10">
            <label className="tab text-xl">
                <input type="radio" name="home_taps" defaultChecked />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='size-6 fill-current'><path d="M20,9.67V9.5a7.95,7.95,0,0,0-5.59-7.62l-.06,0a8.32,8.32,0,0,0-2.59-.36A8.21,8.21,0,0,0,4,9.67a3,3,0,0,0,0,5.66,8,8,0,0,0,8,7.17h.23a8.13,8.13,0,0,0,7.68-7.16A3,3,0,0,0,20,9.67ZM12.18,20.5a6,6,0,0,1-6.09-5H17.86A6.09,6.09,0,0,1,12.18,20.5Zm6.82-7H5a1,1,0,0,1,0-2H7a1,1,0,0,0,0-2H6A6.4,6.4,0,0,1,9,4.35V7.5a1,1,0,0,0,2,0V3.59a7.34,7.34,0,0,1,.82-.09H12a6.64,6.64,0,0,1,1,.09V7.5a1,1,0,0,0,2,0V4.32a6.65,6.65,0,0,1,1.18.87A6,6,0,0,1,18,9.5H17a1,1,0,0,0,0,2h2a1,1,0,0,1,0,2Z"></path></svg>
                아르바이트
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <ChildWork />
            </div>

            <label className="tab text-xl">
                <input type="radio" name="home_taps" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='size-6 fill-current'><path d="M22,7.82a1.25,1.25,0,0,0,0-.19v0h0l-2-5A1,1,0,0,0,19,2H5a1,1,0,0,0-.93.63l-2,5h0v0a1.25,1.25,0,0,0,0,.19A.58.58,0,0,0,2,8H2V8a4,4,0,0,0,2,3.4V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V11.44A4,4,0,0,0,22,8V8h0A.58.58,0,0,0,22,7.82ZM13,20H11V16h2Zm5,0H15V15a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v5H6V12a4,4,0,0,0,3-1.38,4,4,0,0,0,6,0A4,4,0,0,0,18,12Zm0-10a2,2,0,0,1-2-2,1,1,0,0,0-2,0,2,2,0,0,1-4,0A1,1,0,0,0,8,8a2,2,0,0,1-4,.15L5.68,4H18.32L20,8.15A2,2,0,0,1,18,10Z"></path></svg>
                상점
            </label>
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <ChildStore />
            </div>
        </div>
    )
}

export default ChildHome;