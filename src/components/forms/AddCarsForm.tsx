import { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface CarsFormProps {
    submitFn: (car: any) => void;
}

const CarsForm: React.FC<CarsFormProps> = ({ submitFn }) => {
    const [car, setCar] = useState({
        brand: '',
        releaseYear: '',
        mileage: '',
        enginePower: '',
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setCar({ ...car, [name]: value });
    };

    const handleSubmit = () => {
        submitFn(car);
    };

    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '400px',
                margin: '0 auto',
            }}
        >
            <TextField
                name="brand"
                label="Brand"
                value={car.brand}
                onChange={handleInputChange}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
                name="releaseYear"
                label="Release Year"
                value={car.releaseYear}
                onChange={handleInputChange}
                type="number"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
                name="mileage"
                label="Mileage"
                value={car.mileage}
                onChange={handleInputChange}
                type="number"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
                name="enginePower"
                label="Engine Power"
                value={car.enginePower}
                onChange={handleInputChange}
                type="number"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </form>
    );
};

export default CarsForm;
