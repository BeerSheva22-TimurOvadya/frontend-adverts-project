import { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { HousingTypes } from '../../model/AllCategories';

interface HousingFormProps {
    submitFn: (housing: any) => void;
}

const HousingForm: React.FC<HousingFormProps> = ({ submitFn }) => {
    const [housing, setHousing] = useState({
        type: '',
        rooms: '',
        squareMeters: '',
        address: '',
    });

    const [errors, setErrors] = useState({
        rooms: '',
        squareMeters: '',
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        let error = '';

        if (name === 'rooms' || name === 'squareMeters') {
            if (parseInt(value) < 0) {
                error = `${name.replace(/([A-Z])/g, ' $1')} must be 0 or greater`;
            }
        }

        setHousing({ ...housing, [name]: value });
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = () => {
        if (!errors.rooms && !errors.squareMeters) {
            submitFn(housing);
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
            <FormControl style={{ minWidth: '200px', marginBottom: '10px', width: '100%' }}>
                <InputLabel id="type-label">Housing Type</InputLabel>
                <Select
                    labelId="type-label"
                    name="type"
                    value={housing.type}
                    onChange={handleInputChange}
                    label="Housing Type"
                >
                    {HousingTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                name="rooms"
                label="Rooms"
                value={housing.rooms}
                onChange={handleInputChange}
                type="number"
                style={{ marginBottom: '10px', width: '100%' }}
                error={!!errors.rooms}
                helperText={errors.rooms}
            />
            <TextField
                name="squareMeters"
                label="Square Meters"
                value={housing.squareMeters}
                onChange={handleInputChange}
                type="number"
                style={{ marginBottom: '10px', width: '100%' }}
                error={!!errors.squareMeters}
                helperText={errors.squareMeters}
            />
            <TextField
                name="address"
                label="Address"
                value={housing.address}
                onChange={handleInputChange}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </form>
    );
};

export default HousingForm;
