import { DataGrid } from '@mui/x-data-grid';
import Product from '../../model/Product';

interface ProductDetailsTableProps {
    product: Product;
}

const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({ product }) => {
    if (!product) return null;

    const additionalFields = JSON.parse(product.additionalFields);

    let columns = [];
    let rows = [];

    switch (product.category) {
        case 'Cars':
            columns = [
                { field: 'brand', headerName: 'Brand', width: 130},
                { field: 'releaseYear', headerName: 'Release Year', width: 130 },
                { field: 'mileage', headerName: 'Mileage', width: 130 },
                { field: 'enginePower', headerName: 'Engine Power', width: 130 },
            ];
            rows = [{ id: 1, ...additionalFields }];
            break;
        case 'Housing':
            columns = [
                { field: 'type', headerName: 'Type', width: 130 },
                { field: 'rooms', headerName: 'Rooms', width: 130 },
                { field: 'squareMeters', headerName: 'Square Meters', width: 130 },
                { field: 'address', headerName: 'Address', width: 130 },
            ];
            rows = [{ id: 1, ...additionalFields }];
            break;
        case 'Electronics':
            columns = [
                { field: 'type', headerName: 'Type', width: 130 },
                { field: 'brand', headerName: 'Brand', width: 130 },
                { field: 'model', headerName: 'Model', width: 130 },
                { field: 'screenSize', headerName: 'Screen Size', width: 130 },
            ];
            rows = [{ id: 1, ...additionalFields }];
            break;
        default:
            return null;
    }

    return (
        <div style={{ height: 300, width: 800 }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
};

export default ProductDetailsTable;