import axios from "axios";
axios.defaults.withCredentials = true;
import useChildStore from '../../stores/useChildStore';
import { useState, useEffect } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ChildStore () {
    const [products, setProducts] = useState([]);
    const checkPoint = useChildStore(state => state.checkPoint);

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

    const purchase = async (productid) => {
        try {
            await axios.delete(`${SERVER_URL}/api/storeProduct/${productid}`);
            setProducts((prev) => prev.filter(item => item.id != productid));
            await checkPoint();
            return true;
        } catch (err) { 
            console.log(err);
            return false;
        } 
    }



    return (
        <div className="px-10 py-10 w-full flex flex-nowrap flex-row overflow-x-auto">
            { products.map((product) => {
                return (
                    <div className="card mx-3 w-70 h-100 flex-shrink-0 bg-base-100 shadow-lg" key={ product.id }>
                        <div className="card-body flex flex-col justify-between">
                            <h2 className="text-4xl">{ product.name }</h2>
                            <h3 className="text-xl">가격: { product.price }포인트</h3>
                            <button className="btn btn-primary" onClick={(e) => purchase(product.id)}>구매</button>
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}

export default ChildStore;