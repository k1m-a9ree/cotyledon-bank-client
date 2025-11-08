import axios from "axios";
axios.defaults.withCredentials = true;
import { useState, useEffect } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ParentStore() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/storeProduct/`);
                setProducts(res.data.storeProducts);

                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
        getProducts();
    }, []);

    const deleteProduct = async (productid) => {
        try {
            await axios.delete(`${SERVER_URL}/api/storeProduct/${productid}/parent`);
            setProducts((prev) => prev.filter(item => item.id != productid));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${SERVER_URL}/api/storeProduct`,
                {
                    storeProduct: {
                        name,
                        price
                    }
                }
            );
            setName('');
            setPrice(0);
            alert('post succeed');
            setProducts(prev => [res.data.product, ...prev]);
        } catch (err) {
            console.log(err);
            setError('post failed');
        }
    }



    return (
        <div>
            <div className="px-10 py-10 w-screen flex flex-nowrap flex-row overflow-x-auto">
                {products.map((product) => {
                    return (
                        <div className="mx-3 card w-70 h-100 flex-shrink-0 bg-base-100 shadow-lg" key={product.id}>
                            <div className="card-body flex flex-col justify-between items-center">
                                <h2 className="text-2xl">{product.name}</h2>
                                <h3 className="text-xl">가격: {product.price}</h3>
                                <button className="btn btn-soft btn-error w-50" onClick={(e) => deleteProduct(product.id)}>삭제하기</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className="btn ml-10 btn-dash btn-info" onClick={() => document.getElementById('add_store_modal').showModal()}>추가하기</button>
            <dialog id="add_store_modal" className="modal">
                <div className="modal-box w-100 h-100">
                    <form onSubmit={handleSubmit} className="h-80 flex flex-col justify-between items-start">
                        <div>
                            <label className="label">이름</label>
                            <input className="input mt-1" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">가격</label>
                            <input className="input mt-1" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>

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

export default ParentStore;