import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Coding from './coding';
import { RecoilRoot } from 'recoil';
import Home from './home';
import Dashboard from './dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/coding' element={<Coding/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/" element={<Home/>} />

      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);

