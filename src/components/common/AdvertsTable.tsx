import { Box, Modal } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { Visibility, Delete, Edit } from '@mui/icons-material';
import Confirmation from './Confirmation';
import AdvertDetailsTable from './AdvertDetailsTable';
import SnackbarAlert from './SnackbarAlert';
import Advert from '../../model/Advert';
import { useDispatch } from 'react-redux';
import { deleteAdvert, editAdvert } from '../../service/AdvertService';
import { advertActions } from '../../redux/slices/advertSlice';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type AdvertsTableProps = {
    adverts: Advert[];
    
};

const AdvertsTable: React.FC<AdvertsTableProps> = ({ adverts}) => {
    const [selectedAdvert, setSelectedAdvert] = useState<Advert | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [advertIdToDelete, setAdvertIdToDelete] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<{ key: number; message: string }>({ key: 0, message: '' });

    const [editAdvertModal, setEditAdvertModal] = useState<{
        advert: Advert | null;
        price: number | null;
    }>({ advert: null, price: null });

    const dispatch = useDispatch();

    const handleView = (params: GridRowParams) => {
        const advert = adverts.find((advert: Advert) => advert.id === params.id);
        if (advert) {
            setSelectedAdvert(advert);
            setOpenModal(true);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDelete = (params: GridRowParams) => {
        setAdvertIdToDelete(params.id as number);
        setConfirmDelete(true);
    };

    const handleEdit = (params: GridRowParams) => {
        const advert = adverts.find((advert: Advert) => advert.id === params.id);
        if (advert) {
            setEditAdvertModal({ advert, price: advert.price });
        }
    };

    const handleConfirmEdit = async () => {
      if (editAdvertModal.advert && editAdvertModal.price !== null && editAdvertModal.advert.id !== undefined) {
        try {
          const updatedAdvert = { ...editAdvertModal.advert, price: editAdvertModal.price };
          await editAdvert(editAdvertModal.advert.id, updatedAdvert);
          dispatch(advertActions.updateAdvert(updatedAdvert));
          setSnackbar({ key: snackbar.key + 1, message: 'Advert updated successfully!' });
        } catch (error) {
          setSnackbar({ key: snackbar.key + 1, message: 'Failed to update advert!' });
        }
        setEditAdvertModal({ advert: null, price: null });
      }
    };

    const handleConfirmDelete = async (confirmed: boolean) => {
        if (confirmed && advertIdToDelete !== null) {
            try {
                await deleteAdvert(advertIdToDelete);
                dispatch(advertActions.deleteAdvert(advertIdToDelete));
                setSnackbar({ key: snackbar.key + 1, message: 'Advert deleted successfully!' });                
            } catch (error) {
                setSnackbar({ key: snackbar.key + 1, message: 'Failed to delete advert!' });
            }
        }
        setConfirmDelete(false);
    };

    const columnsCommon: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.5, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'Name', flex: 0.7, align: 'center', headerAlign: 'center' },
        { field: 'category', headerName: 'Category', flex: 0.8, align: 'center', headerAlign: 'center' },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            flex: 0.6,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'tools',
            type: 'actions',
            headerName: 'Tools',
            getActions: (params) => {
                return [
                    <GridActionsCellItem
                        label="details"
                        icon={<Visibility />}
                        onClick={() => handleView(params)}
                    />,
                    <GridActionsCellItem
                        label="delete"
                        icon={<Delete />}
                        onClick={() => handleDelete(params)}
                    />,

                    <GridActionsCellItem
                        label="edit"
                        icon={<Edit />}
                        onClick={() => handleEdit(params)}
                    />,
                ];
            },
        },
    ];

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <Box sx={{ height: '80vh', width: '95vw' }}>
                <DataGrid columns={columnsCommon} rows={adverts} />
            </Box>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {selectedAdvert && <AdvertDetailsTable advert={selectedAdvert} />}
                </Box>
            </Modal>

            <Modal
                open={editAdvertModal.advert !== null}
                onClose={() => setEditAdvertModal({ advert: null, price: null })}
                aria-labelledby="edit-advert-modal-title"
                aria-describedby="edit-advert-modal-description"
            >
                <Box sx={style}>
                    {editAdvertModal.advert && (
                        <div>
                            <h2>Edit Price for {editAdvertModal.advert.name}</h2>
                            <input
                                type="number"
                                value={editAdvertModal.price || ''}
                                onChange={(e) =>
                                    setEditAdvertModal({
                                        ...editAdvertModal,
                                        price: parseFloat(e.target.value),
                                    })
                                }
                            />
                            <button onClick={handleConfirmEdit}>Confirm</button>
                        </div>
                    )}
                </Box>
            </Modal>

            <Confirmation
                confirmFn={handleConfirmDelete}
                open={confirmDelete}
                title={'Confirm Deletion'}
                content={'Are you sure you want to delete this advert?'}
            />
            <SnackbarAlert key={snackbar.key} message={snackbar.message} severity="success" />
        </Box>
    );
};

export default AdvertsTable;
