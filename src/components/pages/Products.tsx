import { Box,  Modal } from '@mui/material';
import { Car } from '../../model/Cars';
import { Electronics } from '../../model/Electronics';
import { Housing } from '../../model/Housing';

import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,    
    GridRowParams,
} from '@mui/x-data-grid';

import { useSelector } from 'react-redux';
import { useState } from 'react';

import { Visibility } from '@mui/icons-material';
import ProductDetailsTable from '../common/ProductDetailsTable';

type Product = Car | Electronics | Housing;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Products: React.FC = () => {
    const products = useSelector((state: any) => state.products);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const handleView = (params: GridRowParams) => {
        setSelectedProduct(products.find((product: Product) => product.id === params.id));
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
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
            field: 'details',
            type: 'actions',
            headerName: 'Details',
            getActions: (params) => {
                return [
                    <GridActionsCellItem
                        label="details"
                        icon={<Visibility />}
                        onClick={() => handleView(params)}
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
                open={openModal} onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                {selectedProduct && <ProductDetailsTable product={selectedProduct} />}
                </Box>
            </Modal>
        </Box>
      );
};

export default Products;
