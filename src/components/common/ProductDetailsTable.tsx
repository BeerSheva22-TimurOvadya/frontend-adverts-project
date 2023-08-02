import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Product from '../../model/Product';


interface ProductDetailsTableProps {
    product: Product;
}

const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({ product }) => {
    if (!product) return null;

    const additionalFields = JSON.parse(product.additionalFields);
    switch (product.category) {
        case 'Cars':
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>Release Year</TableCell>
                            <TableCell>Mileage</TableCell>
                            <TableCell>Engine Power</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{additionalFields.brand}</TableCell>
                            <TableCell>{additionalFields.releaseYear}</TableCell>
                            <TableCell>{additionalFields.mileage}</TableCell>
                            <TableCell>{additionalFields.enginePower}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
        case 'Housing':
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Rooms</TableCell>
                            <TableCell>Square Meters</TableCell>
                            <TableCell>Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{additionalFields.type}</TableCell>
                            <TableCell>{additionalFields.rooms}</TableCell>
                            <TableCell>{additionalFields.squareMeters}</TableCell>
                            <TableCell>{additionalFields.address}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
        case 'Electronics':
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Screen Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{additionalFields.type}</TableCell>
                            <TableCell>{additionalFields.brand}</TableCell>
                            <TableCell>{additionalFields.model}</TableCell>
                            <TableCell>{additionalFields.screenSize}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
        default:
            return null;
    }
};

export default ProductDetailsTable;
