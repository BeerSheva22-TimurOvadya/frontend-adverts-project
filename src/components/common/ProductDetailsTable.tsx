import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Car } from '../../model/Cars';
import { Electronics } from '../../model/Electronics';
import { Housing } from '../../model/Housing';

type Product = Car | Electronics | Housing;

interface ProductDetailsTableProps {
    product: Product;
}

const ProductDetailsTable: React.FC<ProductDetailsTableProps> = ({ product }) => {
    if (!product) return null;

    switch (product.category) {
        case 'Cars':
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>Release Year</TableCell>
                            <TableCell>Mileage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>{product.releaseYear}</TableCell>
                            <TableCell>{product.mileage}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            );
            case 'Housing':
                return (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell>Rooms</TableCell>
                        <TableCell>Square Footage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{product.address}</TableCell>
                        <TableCell>{product.rooms}</TableCell>
                        <TableCell>{product.squareFootage}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                );
                case 'Electronics':
                    return (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Specifications</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>{product.model}</TableCell>
                            <TableCell>{product.specifications}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    );
        default:
            return null;
    }
};

export default ProductDetailsTable;
