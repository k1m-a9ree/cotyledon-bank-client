import { Outlet, Navigate } from 'react-router';
import ParentNavbar from './ParentNavbar';
import useAuthStore from '../../stores/useAuthStore';

function ParentLayout() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const role = useAuthStore((state) => state.user.role)
    return (
        <>
            {<ParentNavbar />}
            <div className='bg-base-200 min-h-screen'>
                {isLoggedIn && (role == 0) ? (
                    <Outlet />
                ) : (
                    <Navigate to='/auth/login' replace />
                )}
            </div>
        </>
    )
}

export default ParentLayout