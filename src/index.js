import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Coding from './coding';
import { RecoilRoot } from 'recoil';
import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/coding' element={<Coding/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);

