import { useState, useEffect } from 'react';
import useChildStore from '../../stores/useChildStore';
import axios from 'axios'; 
axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ChildWork () {
    const [works, setWorks] = useState([]);
    const checkPoint = useChildStore(state => state.checkPoint);

    useEffect(() => {
        const getWorks = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/work/`);
                setWorks(res.data.works);
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
        
        getWorks();
    }, []);

    const working = async (workid) => {
        try {
            await axios.delete(`${SERVER_URL}/api/work/${workid}`);
            setWorks(prev => prev.filter(item => item.id != workid));
            await checkPoint();
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }



    return (
        <div className="px-10 py-10 w-screen flex flex-nowrap flex-row overflow-x-auto">
            { works.map((work) => {
                return (
                    <div className="mx-3 card w-70 h-100 flex-shrink-0 bg-base-100 shadow-lg" key={ work.id }>
                        <div className="card-body">
                            <h2 className="text-3xl">{ work.name }</h2>
                            <h3 className="text-xl">일당: { work.salary }</h3>
                            <p className='text-lg'>할 일: { work.todo }</p>
                            <button className='btn btn-soft btn-success' onClick={(e) => working(work.id) }>완료</button>
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}

export default ChildWork;