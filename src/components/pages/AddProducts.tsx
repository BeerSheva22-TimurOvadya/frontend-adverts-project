import React, { useState } from 'react';
import Confirmation from '../common/Confirmation';
import AddForm from '../forms/AddForm';
import SnackbarAlert from '../common/SnackbarAlert';
import Product from '../../model/Product';
import { useDispatch } from 'react-redux';
import { productActions } from '../../redux/slices/productSlice';
import AddCarsForm from '../forms/AddCarsForm';
import AddElectronicsForm from '../forms/AddElectronicsForm';
import AddHousingForm from '../forms/AddHousingForm';
import { Car } from '../../model/Cars';
import { Electronics } from '../../model/Electronics';
import { Housing } from '../../model/Housing';
import { Box, Modal, Paper } from '@mui/material';

const AddProduct: React.FC = () => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [productToAdd, setProductToAdd] = useState<Product>();
    const [products, setProducts] = useState<Product[]>([]);

    const dispatch = useDispatch();
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

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

    const handleCategorySelection = (product: Product, category: string) => {
        setProductToAdd(product);
        setSelectedCategory(category);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddCar = (car: Car) => {
        if (productToAdd) {
        const newProduct = { ...productToAdd, ...car, id: Number(productToAdd.id) };
        handleConfirmation();
        setProductToAdd(newProduct);
        setOpenModal(false);
        }
    };

    const handleAddElectronics = (electronics: Electronics) => {
        if (productToAdd) {
            const newProduct = { ...productToAdd, ...electronics, id: Number(productToAdd.id) };
        handleConfirmation();
        setProductToAdd(newProduct);
        setOpenModal(false);
        }
    };

    const handleAddHousing = (housing: Housing) => {
        if (productToAdd) {
            const newProduct = { ...productToAdd, ...housing, id: Number(productToAdd.id) };
        handleConfirmation();
        setProductToAdd(newProduct);
        setOpenModal(false);
        }
    };

    const renderForm = () => {
        switch (selectedCategory) {
            case 'Cars':
                return <AddCarsForm submitFn={handleAddCar} />;
            case 'Electronics':
                return <AddElectronicsForm submitFn={handleAddElectronics} />;
            case 'Housing':
                return <AddHousingForm submitFn={handleAddHousing} />;
            default:
                return null;
        }
    };

    return (
        <Box>
            <AddForm
                submitFn={(product, category) => {
                    handleCategorySelection(product, category);
                }}
            />
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                    }}
                >
                    {renderForm()}
                </Paper>
            </Modal>
            <Confirmation
                confirmFn={handleAddProduct}
                open={openConfirm}
                title={'Confirm Addition'}
                content={'Are you sure you want to add this product?'}
            />
            <SnackbarAlert message={snackbarMessage} severity="success" />
        </Box>
    );
};

export default AddProduct;
