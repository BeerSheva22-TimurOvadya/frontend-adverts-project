import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigator from './components/navigators/Navigator';

import './App.css';


import routesConfig from './config/routes-config.json';
import NotFound from './components/pages/NotFound';
import Adverts from './components/pages/Advert';
import AddAdverts from './components/pages/AddAdvert';
import Categories from './components/pages/SortByCategories';
import SortByPrice from './components/pages/SortByPrice';

const { always } = routesConfig;

const App: React.FC = () => { 

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigator routes={always} />}>
                    <Route index element={<Adverts />} />
                    <Route path="adverts/add" element={<AddAdverts />} />
                    <Route path="adverts/categories" element={<Categories />} />
                    <Route path="adverts/price" element={<SortByPrice />} />                    
                    <Route path="/*" element={<NotFound />} />
                </Route>
            </Routes>            
        </BrowserRouter>
    );
};
export default App;
