import axios from "axios";
axios.defaults.withCredentials = true;
import { useState, useEffect } from 'react';
import useChildStore from '../../stores/useChildStore';
import useToastStore from '../../stores/useToastStore';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ChildBank() {
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState({ enum: [] });
    const [type, setType] = useState('');
    const [period, setPeriod] = useState(1);
    const [point, setPoint] = useState(0);

    const showToast = useToastStore(state => state.showToast);
    const checkPoint = useChildStore(state => state.checkPoint);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/financialProduct/`);
                setProducts(res.data.financialProducts);
                return true;
            } catch (err) {
                return false;
            }
        }
        const getTypes = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/financialProduct/config`);
                setTypes(() => ({ ...res.data.configs }));
                return true;
            } catch (err) {
                return false;
            }
        }

        getProducts();
        getTypes();
    }, []);


    const handleSelectChange = (e) => {
        setType(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${SERVER_URL}/api/financialProduct`,
                {
                    financialProduct: {
                        type,
                        period,
                        point
                    }
                }
            );
            await checkPoint();
            setType('');
            setPeriod(1);
            setPoint(0);
            showToast(`${types[res.data.product.type].korean} 가입 성공!`, 'success');
            setProducts(prev => [res.data.product, ...prev]);
        } catch (err) {
            if (import.meta.env.VITE_ENV !== 'production') {
                console.log(err);
            }
            showToast(err.response.data.error.message, 'error');
        }
    }

    const deleteProduct = async (productid) => {
        try {
            await axios.delete(`${SERVER_URL}/api/financialProduct/${productid}`);
            await checkPoint();
            
            setProducts(prev => prev.filter(item => item.id !== productid));
        } catch (err) {
            if (import.meta.env.VITE_ENV !== 'production') {
                console.log(err);
            }
        }
    }


    return (
        <div>
            <div className="px-10 py-10 w-screen flex flex-nowrap flex-row overflow-x-auto">
                {products.map((product) => {
                    return <ProductCard product={product} types={types} deleteProduct={deleteProduct} setProducts={setProducts} key={product.id} />
                })
                }
            </div>

            <button className="btn ml-10 btn-dash btn-info" onClick={() => document.getElementById('add_financialproduct_modal').showModal()}>추가하기</button>
            <dialog id="add_financialproduct_modal" className="modal">
                <div className="modal-box w-100 h-100">
                    <form onSubmit={handleSubmit} className="h-80 flex flex-col justify-between items-start">
                        <label className="label">금융상품</label>
                        <select value={type} className="select" onChange={handleSelectChange}>
                            <option disabled={true} value='' >금융 상품을 선택하세요!</option>
                            {types.enum.map((item) => {
                                return <option value={item} key={item}>{types[item].korean}</option>
                            })}
                        </select>
                        <div className={type == 'fixedInstallmentSavings' ? '' : 'hidden'}>
                            <label className="label">달마다 낼 돈</label>
                            <input type="number" className='input' value={period} onChange={(e) => setPeriod(e.target.value)} />
                        </div>
                        <div className={type == 'fixedDeposit' ? '' : 'hidden'}>
                            <label className="label">넣어둘 돈</label>
                            <input type="number" className='input' value={point} onChange={(e) => setPoint(e.target.value)} />
                        </div>
                        <button className={`${type === '' ? 'btn btn-disabled' : 'btn btn-success'}`} type="submit">추가하기</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

function ProductCard({ product, types, deleteProduct, setProducts }) {
    const [point, setPoint] = useState(product.point);
    const showToast = useToastStore(state => state.showToast);
    const checkPoint = useChildStore(state => state.checkPoint);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (point < product.point) {
                showToast('출금은 해지하기 기능을 사용해주세요!', 'warning');
                return false;
            } else {
                await axios.patch(
                    `${SERVER_URL}/api/financialProduct/${product.id}`,
                    {
                        financialProduct: {
                            point
                        }
                    }
                )

                setProducts(prev => prev.map(item => {
                    if (item.id == product.id) {
                        return { ...item, point: point }
                    } else return item
                }))

                await checkPoint();

                showToast('입금 성공!', 'success');

                return true;
            }
        } catch (err) {
            if (import.meta.env.VITE_ENV !== 'production') {
                console.log(err);
            }
            return false;
        }
    }
    return <div className="mx-3 card w-70 h-100 flex-shrink-0 bg-base-100 shadow-lg border border-base-300 border-2 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl" key={product.id}>
        <div className="card-body flex flex-col justify-between items-center">
            <h2 className="text-2xl">{types[product.type].korean}</h2>

            {types[product.type].canDeposit ? (
                <form onSubmit={handleSubmit} className="flex flex-col items-start">
                    <label className="label ml-3">포인트</label>
                    <div className="flex flex-row mt-2">
                        <input className="input" type="number" value={point} onChange={(e) => setPoint(e.target.value)} />
                        <button className="btn btn-neutral ml-3">수정하기</button>
                    </div>
                </form>
            ) : (
                <span className="text-xl">{product.point} 포인트</span>
            )}


            <div className="flex flex-wrap flex-row justify-center items-center">
                <span className="badge m-1 badge-primary badge-sm">{types[product.type].rootType}</span>
                {types[product.type].comment.map((com, idx) => <span className="badge m-1 badge-accent badge-sm" key={idx}>{com}</span>)}
                {types[product.type].detail.map((dtl, idx) => <span className="badge m-1 badge-secondary badge-sm" key={idx}>{dtl}</span>)}
            </div>


            <button className="btn btn-soft btn-error w-50" onClick={() => deleteProduct(product.id)}>해지하기</button>
        </div>
    </div>
}

export default ChildBank;