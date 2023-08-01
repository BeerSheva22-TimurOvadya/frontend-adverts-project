import { Box } from '@mui/material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useSelector } from 'react-redux';

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
];



const Products: React.FC = () => {
    const products = useSelector((state: any) => state.products);
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <Box sx={{ height: '80vh', width: '95vw' }}>
                <DataGrid columns={columnsCommon} rows={products} />
            </Box>
        </Box>
    );
};
export default Products;
