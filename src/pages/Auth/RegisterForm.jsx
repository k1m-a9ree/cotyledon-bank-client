import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

import useToastStore from '../../stores/useToastStore';

function RegisterForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [housename, setHousename] = useState('');
    const [role, setRole] = useState(false);

    const showToast = useToastStore(state => state.showToast);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(
                `${SERVER_URL}/api/auth/register`,
                {
                    user: {
                        username: username,
                        userid: userid,
                        password: password,
                        housename: housename,
                        role: (role ? 1 : 0)
                    }
                }
            );
            showToast('성공적으로 가입되었습니다!', 'success');
            navigate('/');
        } catch (err) {
            showToast(err.response.data.error.message, 'error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-start">

            <form onSubmit={handleSubmit} className="h-120 mt-20 flex flex-col justify-between items-center">
                <div className="w-70">
                    <label className="label">이름</label>
                    <input className="input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="w-70">
                    <label className="label">아이디</label>
                    <input className="input" type="text" value={userid} onChange={(e) => setUserid(e.target.value)} />
                </div>
                <div className="w-70">
                    <label className="label">비밀번호</label>
                    <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="w-70">
                    <label className="label">집 이름 (부모의 집 이름과 같아야 함)</label>
                    <input className="input" type="text" value={housename} onChange={(e) => setHousename(e.target.value)} />
                </div>
                <label className="label">
                    부모
                    <input type="checkbox" className="toggle" checked={role} onChange={(e) => setRole(e.target.checked)} />
                    아이
                </label>

                <button className={`btn btn-neutral w-50 ${ loading ? 'btn-disabled' : ''}`} type="submit">{ loading ? (<span className="loading loading-infinity loading-md"></span>) : '가입하기'}</button>
            </form>
        </div>
    )
}

export default RegisterForm