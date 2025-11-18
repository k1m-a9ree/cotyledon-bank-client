import { useState, useEffect } from 'react';
import useChildStore from '../../stores/useChildStore';
import useToastStore from '../../stores/useToastStore';
import axios from 'axios';
axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ChildWork() {
    const [works, setWorks] = useState([]);
    const checkPoint = useChildStore(state => state.checkPoint);

    const showToast = useToastStore(state => state.showToast);

    useEffect(() => {
        const getWorks = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/work/`);
                setWorks(res.data.works);
                return true;
            } catch (err) {
                if (import.meta.env.VITE_ENV !== 'production') {
                    console.log(err);
                }
                return false;
            }
        }

        getWorks();
    }, []);

    const working = async (workid) => {
        try {
            const res = await axios.delete(`${SERVER_URL}/api/work/${workid}`);
            setWorks(prev => prev.filter(item => item.id != workid));
            showToast(`${res.data.work.name} 완료!`, 'success');
            await checkPoint();
            return true;
        } catch (err) {
            if (import.meta.env.VITE_ENV !== 'production') {
                console.log(err);
            }
            showToast(err.response.data.error.message, 'error');
            return false;
        }
    }



    return (
        <div className="p-5 w-full flex flex-nowrap flex-row overflow-x-auto">
            {works.map((work) => {
                return (
                    <div className="mx-3 card w-70 h-100 flex-shrink-0 bg-base-100 shadow-lg border border-base-300 border-2 transition-all duration-300 hover:scale-103 hover:-translate-y-3 hover:shadow-xl" key={work.id}>
                        <div className="card-body">
                            <h2 className="text-3xl">{work.name}</h2>
                            <h3 className="text-xl">일당: {work.salary}</h3>
                            <p className='text-lg'>할 일: {work.todo}</p>
                            <button className='btn btn-success' onClick={(e) => working(work.id)}>완료</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ChildWork;