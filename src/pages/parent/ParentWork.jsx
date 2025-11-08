import { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ParentWork() {
    const [works, setWorks] = useState([]);

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

    const deleteWork = async (workid) => {
        try {
            await axios.delete(`${SERVER_URL}/api/work/${workid}/parent`);
            setWorks(prev => prev.filter(item => item.id != workid));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const [name, setName] = useState('');
    const [todo, setTodo] = useState('');
    const [salary, setSalary] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${SERVER_URL}/api/work`,
                {
                    work: {
                        name,
                        todo,
                        salary
                    }
                }
            );
            setName('');
            setTodo('');
            setSalary(0);
            alert('post succeed');
            setWorks(prev => [res.data.work, ...prev]);
        } catch (err) {
            console.log(err);
            setError('register failed');
        }
    }



    return (
        <div>
            <div className="px-10 py-10 w-screen flex flex-nowrap flex-row overflow-x-auto">
                {works.map((work) => {
                    return (
                        <div className="mx-3 card w-70 h-100 flex-shrink-0 bg-base-100 shadow-lg" key={work.id}>
                            <div className="card-body flex flex-col justify-between items-center">
                                <h2 className="text-2xl">{work.name}</h2>
                                <h3 className="text-xl">일당: {work.salary}</h3>
                                <span className='text-lg'>할 일: {work.todo}</span>
                                <button className="btn btn-soft btn-error w-50" onClick={(e) => deleteWork(work.id)}>삭제하기</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className="btn ml-10 btn-dash btn-info" onClick={() => document.getElementById('add_work_modal').showModal()}>추가하기</button>
            <dialog id="add_work_modal" className="modal">
                <div className="modal-box w-100 h-100">
                    <form onSubmit={handleSubmit} className='h-80 flex flex-col justify-between items-start'>
                        <label className='label'>이름</label>
                        <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <label className='label'>할 일</label>
                        <input className="input" type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
                        <label className='label'>일당</label>
                        <input className="input" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />

                        <button className="btn btn-success" type="submit">제출하기</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default ParentWork;