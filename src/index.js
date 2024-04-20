import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Coding from './coding';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/coding' element={<Coding/>} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
);

