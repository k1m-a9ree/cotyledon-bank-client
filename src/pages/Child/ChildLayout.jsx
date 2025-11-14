import { Outlet, Navigate } from 'react-router';
import ChildNavbar from './ChildNavbar';
import useAuthStore from '../../stores/useAuthStore';

function ChildLayout() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const role = useAuthStore((state) => state.user.role)
    return (
        <>
            <div className='bg-base-200 h-screen flex flex-col'>
                {<ChildNavbar />}
                <div className='flex-1 min-h-0'>
                    {isLoggedIn && (role == 1) ? (
                        <Outlet />
                    ) : (
                        <Navigate to='/auth/login' replace />
                    )}
                </div>
            </div>
        </>
    )
}

export default ChildLayout