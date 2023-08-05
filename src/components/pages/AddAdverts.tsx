import React, { useState } from 'react';
import Confirmation from '../common/Confirmation';
import AddForm from '../forms/AddForm';
import SnackbarAlert from '../common/SnackbarAlert';
import Advert from '../../model/Advert';
import AddCarsForm from '../forms/AddCarsForm';
import AddElectronicsForm from '../forms/AddElectronicsForm';
import AddHousingForm from '../forms/AddHousingForm';
import { Box, Modal, Paper } from '@mui/material';
import { advertService } from '../../config/service-config';

const AddAdvert: React.FC = () => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [advertToAdd, setAdvertToAdd] = useState<Advert>();

    const [snackbar, setSnackbar] = useState<{ key: number; message: string }>({ key: 0, message: '' });
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleConfirmation = () => {
        setOpenConfirm(true);
    };

    const handleAddAdvert = (confirmed: boolean) => {
        if (confirmed && advertToAdd) {
            advertService
                .addAdvert(advertToAdd)
                .then(() => {
                    setSnackbar({ key: snackbar.key + 1, message: 'Advert added successfully!' });
                })
                .catch((error: any) => {
                    console.error(error);
                });
            setOpenConfirm(false);
        }
        setOpenConfirm(false);
    };

    const handleCategorySelection = (advert: Advert, category: string) => {
        setAdvertToAdd(advert);
        setSelectedCategory(category);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddCar = (car: any) => {
        if (advertToAdd) {
            const additionalFields = JSON.stringify({
                brand: car.brand,
                releaseYear: car.releaseYear,
                mileage: car.mileage,
                enginePower: car.enginePower,
            });
            const newAdvert = { ...advertToAdd, additionalFields, id: Number(advertToAdd.id) };
            handleConfirmation();
            setAdvertToAdd(newAdvert);
            setOpenModal(false);
        }
    };

    const handleAddElectronics = (electronics: any) => {
        if (advertToAdd) {
            const additionalFields = JSON.stringify({
                brand: electronics.brand,
                model: electronics.model,
                screenSize: electronics.screenSize,
                type: electronics.type,
            });
            const newAdvert = { ...advertToAdd, additionalFields, id: Number(advertToAdd.id) };
            handleConfirmation();
            setAdvertToAdd(newAdvert);
            setOpenModal(false);
        }
    };

    const handleAddHousing = (housing: any) => {
        if (advertToAdd) {
            const additionalFields = JSON.stringify({
                address: housing.address,
                rooms: housing.rooms,
                squareMeters: housing.squareMeters,
                type: housing.type,
            });
            const newAdvert = { ...advertToAdd, additionalFields, id: Number(advertToAdd.id) };
            handleConfirmation();
            setAdvertToAdd(newAdvert);
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
                submitFn={(advert, category) => {
                    handleCategorySelection(advert, category);
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
                confirmFn={handleAddAdvert}
                open={openConfirm}
                title={'Confirm Addition'}
                content={'Are you sure you want to add this advert?'}
            />
            <SnackbarAlert key={snackbar.key} message={snackbar.message} severity="success" />
        </Box>
    );
};

export default AddAdvert;
