import React, { useState } from 'react';
import Confirmation from '../common/Confirmation';
import AddForm from '../forms/AddForm';
import SnackbarAlert from '../common/SnackbarAlert';
import Product from '../../model/Product';
import AddCarsForm from '../forms/AddCarsForm';
import AddElectronicsForm from '../forms/AddElectronicsForm';
import AddHousingForm from '../forms/AddHousingForm';
import { Box, Modal, Paper } from '@mui/material';
import { productService } from '../../config/service-config';

const AddProduct: React.FC = () => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [productToAdd, setProductToAdd] = useState<Product>();

    
    const [snackbar, setSnackbar] = useState<{ key: number; message: string }>({ key: 0, message: '' });
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleConfirmation = () => {
        setOpenConfirm(true);
    };

    const handleAddProduct = (confirmed: boolean) => {
        if (confirmed && productToAdd) {
            productService.addProduct(productToAdd)
                .then(() => {                    
                    setSnackbar({ key: snackbar.key + 1, message: 'Product added successfully!' });
                })
                .catch((error: any) => {
                    console.error(error);
                });
            setOpenConfirm(false);
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

    const handleAddCar = (car: any) => {
        if (productToAdd) {
            const additionalFields = JSON.stringify({
                brand: car.brand,
                releaseYear: car.releaseYear,
                mileage: car.mileage,
                enginePower: car.enginePower,
            });
            const newProduct = { ...productToAdd, additionalFields, id: Number(productToAdd.id) };
            handleConfirmation();
            setProductToAdd(newProduct);
            setOpenModal(false);
        }
    };

    const handleAddElectronics = (electronics: any) => {
        if (productToAdd) {
            const additionalFields = JSON.stringify({
                brand: electronics.brand,
                model: electronics.model,
                screenSize: electronics.screenSize,
                type: electronics.type,
            });
            const newProduct = { ...productToAdd, additionalFields, id: Number(productToAdd.id) };
            handleConfirmation();
            setProductToAdd(newProduct);
            setOpenModal(false);
        }
    };

    const handleAddHousing = (housing: any) => {
        if (productToAdd) {
            const additionalFields = JSON.stringify({
                address: housing.address,
                rooms: housing.rooms,
                squareMeters: housing.squareMeters,
                type: housing.type,
            });
            const newProduct = { ...productToAdd, additionalFields, id: Number(productToAdd.id) };
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
            <SnackbarAlert key={snackbar.key} message={snackbar.message} severity="success" />
        </Box>
    );
};

export default AddProduct;
