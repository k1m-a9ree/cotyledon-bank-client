import axios from "axios";
axios.defaults.withCredentials = true;
import useChildStore from '../../stores/useChildStore';
import { useState, useEffect } from 'react';
import useToastStore from '../../stores/useToastStore';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ChildStore() {
    const [products, setProducts] = useState([]);
    const checkPoint = useChildStore(state => state.checkPoint);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/storeProduct/`);
                setProducts(res.data.storeProducts);

                return true;
            } catch (err) {
                if (import.meta.env.VITE_ENV !== 'production') {
                    console.log(err);
                }
                return false;
            }
        }
        getProducts();
    }, []);

    const showToast = useToastStore(state => state.showToast);

    const purchase = async (productid) => {
        try {
            const res = await axios.delete(`${SERVER_URL}/api/storeProduct/${productid}`);
            setProducts((prev) => prev.filter(item => item.id != productid));
            await checkPoint();
            showToast(`${res.data.product.name} 구매 완료!`, 'success');
        } catch (err) {
            if (import.meta.env.VITE_ENV !== 'production') {
                console.log(err);
            }
            showToast(err.response.data.error.message, 'error');
        }
    }



    return (
        <div className="p-5 w-full flex flex-nowrap flex-row overflow-x-auto">
            {products.map((product) => {
                return (
                    <div className="card mx-3 w-70 h-100 flex-shrink-0 border border-base-300 border-2 bg-base-100 shadow-lg transition-all duration-300 hover:scale-103 hover:-translate-y-3 hover:shadow-xl" key={product.id}>
                        <div className="card-body flex flex-col justify-between">
                            <h2 className="text-4xl">{product.name}</h2>
                            <h3 className="text-xl">가격: {product.price}포인트</h3>
                            <button className="btn btn-info" onClick={(e) => purchase(product.id)}>구매</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ChildStore;