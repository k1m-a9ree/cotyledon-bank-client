import { Link } from 'react-router';
import useAuthStore from '../stores/useAuthStore';
import useToastStore from '../stores/useToastStore';

function Home() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const user = useAuthStore((state) => state.user);

    const showToast = useToastStore((state) => state.showToast);
    const logout = useAuthStore((state) => state.logout);

    const handleClick = () => {
        showToast('로그아웃이 완료되었습니다!', 'success');
        logout();
    }

    return <div className='h-screen bg-[url(../assets/start.png)] bg-center bg-cover flex flex-row justify-center items-end'>
        <div className='mb-[20vh]'>
            {!isLoggedIn ? (
                <div>
                    <Link to='/auth/login' className='btn btn-lg btn-soft btn-accent'>로그인 하기</Link>
                    <Link to='/auth/register' className='btn btn-lg btn-soft btn-accent ml-3'>가입 하기</Link>
                    <a href="https://github.com/k1m-a9ree/cotyledon-bank-client/blob/main/manual.md" className='btn btn-lg btn-soft btn-accent ml-3'>설명서</a>
                </div>
            ) : user.role == 0 ? (
                <div>
                    <Link to='/parent/home' className='btn btn-lg btn-soft btn-accent'>시작하기</Link>
                    <button className='btn btn-lg btn-soft btn-accent ml-5' onClick={handleClick}>로그아웃하기</button>
                </div>
            ) : (
                <div>
                    <Link to='/child/home' className='btn btn-lg btn-soft btn-accent'>시작하기</Link>
                    <button className='btn btn-lg btn-soft btn-accent ml-5' onClick={handleClick}>로그아웃하기</button>
                </div>
            )}
        </div>
    </div>
}

export default Home;