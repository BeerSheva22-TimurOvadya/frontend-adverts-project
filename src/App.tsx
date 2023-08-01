import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigatorDispatcher from './components/navigators/NavigatorDispatcher';

import './App.css';
import { useSelectorCode } from './redux/store';
import { useMemo } from 'react';
import routesConfig from './config/routes-config.json';
import NotFound from './components/pages/NotFound';
import Products from './components/pages/Products';
import AddProducts from './components/pages/AddProducts';
import Categories from './components/pages/SortByCategories';
import SortByPrice from './components/pages/SortByPrice';
import { StatusType } from './model/StatusType';
import CodeType from './model/CodeType';
import { useDispatch } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { codeActions } from './redux/slices/codeSlice';
import Generation from './components/pages/Generation';
const { always } = routesConfig;

const App: React.FC = () => {
    const code = useSelectorCode();
    const dispatch = useDispatch();

    const [alertMessage, severity] = useMemo(() => codeProcessing(), [code]);

    function codeProcessing(): [string, StatusType] {
        const res: [string, StatusType] = [code.message, 'success'];
        switch (code.code) {
            case CodeType.OK:
                res[1] = 'success';
                break;
            case CodeType.SERVER_ERROR:
                res[1] = 'error';
                break;
            case CodeType.UNKNOWN:
                res[1] = 'error';
                break;
                          
        }

        return res;
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavigatorDispatcher routes={always} />}>
                    <Route index element={<Products />} />
                    <Route path="products/add" element={<AddProducts />} />
                    <Route path="products/categories" element={<Categories />} />
                    <Route path="products/price" element={<SortByPrice />} />
                    <Route path="generation" element={<Generation />} />
                    <Route path="/*" element={<NotFound />} />
                </Route>
            </Routes>
            <Snackbar
                open={!!alertMessage}
                autoHideDuration={20000}
                onClose={() => dispatch(codeActions.reset())}
            >
                <Alert
                    onClose={() => dispatch(codeActions.reset())}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </BrowserRouter>
    );
};
export default App;
