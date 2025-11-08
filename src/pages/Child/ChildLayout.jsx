import { Outlet, Navigate } from 'react-router';
import ChildNavbar from './ChildNavbar';
import useAuthStore from '../../stores/useAuthStore';

function ChildLayout() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const role = useAuthStore((state) => state.user.role)
    return (
        <>
            {<ChildNavbar />}
            <div className='bg-base-200 min-h-screen'>
                {isLoggedIn && (role == 1) ? (
                    <Outlet />
                ) : (
                    <Navigate to='/auth/login' replace />
                )}
            </div>
        </>
    )
}

export default ChildLayout