import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../../stores/useAuthStore";
import useToastStore from '../../stores/useToastStore';

function LoginForm() {
    const navigate = useNavigate();
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');

    const showToast = useToastStore(state => state.showToast);

    const [loading, setLoading] = useState(false);

    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(userid, password);
            showToast('로그인이 완료되었습니다!', 'success');
            navigate('/');
        } catch (err) {
            console.log(err);
            showToast(err.response.data.error.message, 'error');
        } finally {
            setLoading(false);
        }
    }

    return <div className="flex flex-col justify-start">
        <form onSubmit={handleSubmit} className="h-60 mt-20 flex flex-col justify-between items-center">
            <div className="w-70">
                <label>아이디</label>
                <input className="input mt-1" type="text" value={userid} onChange={(e) => setUserid(e.target.value)} />
            </div>
            <div className="w-70">
                <label>비밀번호</label>
                <input className="input mt-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className={`btn btn-neutral w-50 ${ loading ? 'btn-disabled' : ''}`} type="submit">{ loading ? (<span className="loading loading-infinity loading-md"></span>) : '로그인하기'}</button>
        </form>
    </div>
}

export default LoginForm