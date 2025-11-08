import { Link } from 'react-router';
import useAuthStore from '../stores/useAuthStore';

function Home() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    return <div className='h-screen bg-[url(../assets/start.png)] bg-center bg-cover flex flex-row justify-center items-end'>
        <div className='mb-[20vh]'>
            {!isLoggedIn ? (
                <div>
                    <Link to='/auth/login' className='btn btn-lg btn-soft btn-accent'>로그인 하기</Link>
                    <Link to='/auth/register' className='btn btn-lg btn-soft btn-accent ml-5'>가입 하기</Link>
                </div>
            ) : user.role == 0 ? (
                <div>
                    <Link to='/parent/home' className='btn btn-lg btn-soft btn-accent'>시작하기</Link>
                    <button className='btn btn-lg btn-soft btn-accent ml-5' onClick={logout}>로그아웃하기</button>
                </div>
            ) : (
                <div>
                    <Link to='/child/home' className='btn btn-lg btn-soft btn-accent'>시작하기</Link>
                    <button className='btn btn-lg btn-soft btn-accent ml-5' onClick={logout}>로그아웃하기</button>
                </div>
            )}
        </div>
    </div>
}

export default Home;