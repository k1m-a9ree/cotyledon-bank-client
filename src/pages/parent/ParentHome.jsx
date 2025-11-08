import { useState, useEffect } from 'react';
import axios from 'axios'; 

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ParentHome () {
    const [children, setChildren] = useState([]);

    useEffect(() => {
        const getChildren = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/child/`);
                setChildren(res.data.children);

                return true;
            } catch (err) {
                console.log(err);
                return false
            }
        }

        getChildren();
    }, [])


    return (
        <div className="px-10 py-10 w-screen flex flex-nowrap flex-row overflow-x-auto">
            { children.map((child) => {
                return (
                    <div className="mx-3 card w-70 h-100 flex-shrink-0 bg-base-100 shadow-lg" key={ child.id }>
                        <div className="card-body flex flex-col justify-around">
                            <h2 className="text-4xl text-info">{ child.name }</h2>
                            <h3 className="text-xl">포인트: { child.point }</h3>
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}

export default ParentHome;