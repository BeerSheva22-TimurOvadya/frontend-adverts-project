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

    const [errors, setErrors] = useState({
        releaseYear: '',
        mileage: '',
        enginePower: '',
    });
    

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        let error = '';

        if (name === 'releaseYear' || name === 'mileage' || name === 'enginePower') {
            if (parseInt(value) < 0) {
                error = `${name.replace(/([A-Z])/g, ' $1')} must be 0 or greater`;
            }
        }

        setCar({ ...car, [name]: value });
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = () => {
        if (!errors.releaseYear && !errors.mileage && !errors.enginePower) {
            submitFn(car);
        }
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
                error={!!errors.releaseYear}
                helperText={errors.releaseYear}
            />
            <TextField
                name="mileage"
                label="Mileage"
                value={car.mileage}
                onChange={handleInputChange}
                type="number"
                style={{ marginBottom: '10px', width: '100%' }}
                error={!!errors.mileage}
                helperText={errors.mileage}
            />
            <TextField
                name="enginePower"
                label="Engine Power"
                value={car.enginePower}
                onChange={handleInputChange}
                type="number"
                style={{ marginBottom: '10px', width: '100%' }}
                error={!!errors.enginePower}
                helperText={errors.enginePower}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </form>
    );
};

export default CarsForm;
