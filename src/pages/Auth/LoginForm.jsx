import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../../stores/useAuthStore";

function LoginForm() {
    const navigate = useNavigate();
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);

    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(userid, password);
            alert('login succeed');
            navigate('/');
        } catch (err) {
            console.log(err);
            setError('login failed');
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
            <button className="btn btn-neutral w-50" type="submit">submit</button>
        </form>
        {
            error &&
            <div role="alert" className="alert alert-error alert-outline mt-10 mx-10">
                <span>{error}</span>
            </div>
        }
    </div>
}

export default LoginForm