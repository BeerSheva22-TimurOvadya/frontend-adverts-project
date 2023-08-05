import { DataGrid } from '@mui/x-data-grid';
import Advert from '../../model/Advert';

interface AdvertDetailsTableProps {
    advert: Advert;
}

const AdvertDetailsTable: React.FC<AdvertDetailsTableProps> = ({ advert }) => {
    if (!advert) return null;

    const additionalFields = JSON.parse(advert.additionalFields);

    let columns = [];
    let rows = [];

    switch (advert.category) {
        case 'Cars':
            columns = [
                { field: 'brand', headerName: 'Brand', flex: 1 },
                { field: 'releaseYear', headerName: 'Release Year', flex: 1 },
                { field: 'mileage', headerName: 'Mileage', flex: 1 },
                { field: 'enginePower', headerName: 'Engine Power', flex: 1 },
            ];
            rows = [{ id: 1, ...additionalFields }];
            break;
        case 'Housing':
            columns = [
                { field: 'type', headerName: 'Type', flex: 1 },
                { field: 'rooms', headerName: 'Rooms', flex: 1 },
                { field: 'squareMeters', headerName: 'Square Meters', flex: 1 },
                { field: 'address', headerName: 'Address', flex: 1 },
            ];
            rows = [{ id: 1, ...additionalFields }];
            break;
        case 'Electronics':
            columns = [
                { field: 'type', headerName: 'Type', flex: 1 },
                { field: 'brand', headerName: 'Brand', flex: 1 },
                { field: 'model', headerName: 'Model', flex: 1 },
                { field: 'screenSize', headerName: 'Screen Size', flex: 1 },
            ];
            rows = [{ id: 1, ...additionalFields }];
            break;
        default:
            return null;
    }

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
};

export default AdvertDetailsTable;
