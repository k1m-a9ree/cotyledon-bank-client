import { NavLink, Link } from "react-router";

function ParentNavbar() {
    return (
        <div className="navbar flex flex-row justify-between bg-base-100 shadow-lg sticky top-0 z-50 h-20">
            <Link to='/' className="btn btn-ghost text-3xl flex-none">떡잎은행</Link>
            <div role="tablist" className="tabs tabs-box">
                <NavLink to='/parent/home' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>홈</NavLink>
                <NavLink to='/parent/work' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>아르바이트</NavLink>
                <NavLink to='/parent/store' role="tab" className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}>상점</NavLink>
            </div>
        </div>
    )
}

export default ParentNavbar;