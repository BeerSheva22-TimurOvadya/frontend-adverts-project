import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigator from './components/navigators/Navigator';

import './App.css';


import routesConfig from './config/routes-config.json';
import NotFound from './components/pages/NotFound';
import Products from './components/pages/Products';
import AddProducts from './components/pages/AddProducts';
import Categories from './components/pages/SortByCategories';
import SortByPrice from './components/pages/SortByPrice';

const { always } = routesConfig;

const App: React.FC = () => { 

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigator routes={always} />}>
                    <Route index element={<Products />} />
                    <Route path="products/add" element={<AddProducts />} />
                    <Route path="products/categories" element={<Categories />} />
                    <Route path="products/price" element={<SortByPrice />} />                    
                    <Route path="/*" element={<NotFound />} />
                </Route>
            </Routes>            
        </BrowserRouter>
    );
};
export default App;
