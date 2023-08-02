import { Box, Modal } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useState } from 'react';
import { Visibility, Delete, Edit } from '@mui/icons-material';
import Confirmation from './Confirmation';
import ProductDetailsTable from './ProductDetailsTable';
import SnackbarAlert from './SnackbarAlert';
import Product from '../../model/Product';
import { useDispatch } from 'react-redux';
import { deleteProduct, editProduct } from '../../service/ProductService';
import { productActions } from '../../redux/slices/productSlice';

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

type ProductsTableProps = {
    products: Product[];
    
};

const ProductsTable: React.FC<ProductsTableProps> = ({ products}) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<{ key: number; message: string }>({ key: 0, message: '' });

    const [editProductModal, setEditProductModal] = useState<{
        product: Product | null;
        price: number | null;
    }>({ product: null, price: null });

    const dispatch = useDispatch();

    const handleView = (params: GridRowParams) => {
        const product = products.find((product: Product) => product.id === params.id);
        if (product) {
            setSelectedProduct(product);
            setOpenModal(true);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDelete = (params: GridRowParams) => {
        setProductIdToDelete(params.id as number);
        setConfirmDelete(true);
    };

    const handleEdit = (params: GridRowParams) => {
        const product = products.find((product: Product) => product.id === params.id);
        if (product) {
            setEditProductModal({ product, price: product.price });
        }
    };

    const handleConfirmEdit = async () => {
      if (editProductModal.product && editProductModal.price !== null && editProductModal.product.id !== undefined) {
        try {
          const updatedProduct = { ...editProductModal.product, price: editProductModal.price };
          await editProduct(editProductModal.product.id, updatedProduct);
          dispatch(productActions.updateProduct(updatedProduct));
          setSnackbar({ key: snackbar.key + 1, message: 'Product updated successfully!' });
        } catch (error) {
          setSnackbar({ key: snackbar.key + 1, message: 'Failed to update product!' });
        }
        setEditProductModal({ product: null, price: null });
      }
    };

    const handleConfirmDelete = async (confirmed: boolean) => {
        if (confirmed && productIdToDelete !== null) {
            try {
                await deleteProduct(productIdToDelete);
                dispatch(productActions.deleteProduct(productIdToDelete));
                setSnackbar({ key: snackbar.key + 1, message: 'Product deleted successfully!' });                
            } catch (error) {
                setSnackbar({ key: snackbar.key + 1, message: 'Failed to delete product!' });
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
                <DataGrid columns={columnsCommon} rows={products} />
            </Box>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {selectedProduct && <ProductDetailsTable product={selectedProduct} />}
                </Box>
            </Modal>

            <Modal
                open={editProductModal.product !== null}
                onClose={() => setEditProductModal({ product: null, price: null })}
                aria-labelledby="edit-product-modal-title"
                aria-describedby="edit-product-modal-description"
            >
                <Box sx={style}>
                    {editProductModal.product && (
                        <div>
                            <h2>Edit Price for {editProductModal.product.name}</h2>
                            <input
                                type="number"
                                value={editProductModal.price || ''}
                                onChange={(e) =>
                                    setEditProductModal({
                                        ...editProductModal,
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
                content={'Are you sure you want to delete this product?'}
            />
            <SnackbarAlert key={snackbar.key} message={snackbar.message} severity="success" />
        </Box>
    );
};

export default ProductsTable;
