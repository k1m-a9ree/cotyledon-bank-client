import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';

import AuthLayout from './pages/Auth/AuthLayout';
import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';

import ChildLayout from './pages/Child/ChildLayout';
import ChildHome from './pages/Child/ChildHome';
import ChildWork from './pages/Child/ChildWork';
import ChildBank from './pages/Child/ChildBank';
import ChildStore from './pages/Child/ChildStore';

import ParentLayout from './pages/parent/ParentLayout';
import ParentHome from './pages/parent/ParentHome';
import ParentStore from './pages/parent/ParentStore';
import ParentWork from './pages/parent/ParentWork';

function App() {
    return (
        <div className='font-isyun'>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/auth' element={<AuthLayout/>}>
                    <Route path='login' element={<LoginForm />}/>
                    <Route path='register' element={<RegisterForm />}/>
                </Route>

                <Route path='/child' element={<ChildLayout/>}>
                    <Route path='home' element={<ChildHome/>}></Route>
                    <Route path='work' element={<ChildWork/>}></Route>
                    <Route path='bank' element={<ChildBank/>}></Route>
                    <Route path='store' element={<ChildStore/>}></Route>
                </Route>

                <Route path='/parent' element={<ParentLayout />}>
                    <Route path='home' element={<ParentHome/>}></Route>
                    <Route path='work' element={<ParentWork/>}></Route>
                    <Route path='store' element={<ParentStore/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
        </div>
    )
}

export default App
