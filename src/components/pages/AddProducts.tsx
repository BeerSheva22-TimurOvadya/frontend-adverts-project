import Product from '../../model/Product';
import Confirmation from '../common/Confirmation';
import { useState } from 'react';
import AddForm from '../forms/AddForm';
import SnackbarAlert from '../common/SnackbarAlert';

import { useDispatch } from 'react-redux';
import { productActions } from '../../redux/slices/productSlice';

const AddProduct: React.FC = () => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [productToAdd, setProductToAdd] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const dispatch = useDispatch();
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleConfirmation = () => {
        setOpenConfirm(true);
    };

    const handleAddProduct = (confirmed: boolean) => {
        if (confirmed && productToAdd) {
            dispatch(productActions.addProduct(productToAdd));
            setProducts([...products, productToAdd]);
            setSnackbarMessage('Product added successfully!');
        }
        setOpenConfirm(false);
    };

    return (
        <>
            <AddForm
                submitFn={(product) => {
                    setProductToAdd(product);
                    handleConfirmation();
                }}
                onConfirmation={handleConfirmation}
            />
            <Confirmation
                confirmFn={handleAddProduct}
                open={openConfirm}
                title={'Confirm Addition'}
                content={'Are you sure you want to add this product?'}
            />
            <SnackbarAlert message={snackbarMessage} severity="success" /> 
            
        </>
    );
};

export default AddProduct;
