import { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { ElectronicsTypes } from '../../model/AllCategories';

interface ElectronicsFormProps {
    submitFn: (electronics: any) => void;
}

const ElectronicsForm: React.FC<ElectronicsFormProps> = ({ submitFn }) => {
    const [electronics, setElectronics] = useState({
        type: '',
        screenSize: '',
        model: '',
        brand: '',
    });

    const [errors, setErrors] = useState({
        screenSize: '',
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        let error = '';

        if (name === 'screenSize' && parseFloat(value) < 0) {
            error = 'Screen Size must be 0 or greater';
        }

        setElectronics({ ...electronics, [name]: value });
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = () => {
        if (!errors.screenSize) {
            submitFn(electronics);
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
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                    labelId="type-label"
                    name="type"
                    value={electronics.type}
                    onChange={handleInputChange}
                    label="Type"
                >
                    {ElectronicsTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                name="brand"
                label="Brand"
                value={electronics.brand}
                onChange={handleInputChange}
                type="string"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
                name="model"
                label="Model"
                value={electronics.model}
                onChange={handleInputChange}
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <TextField
                name="screenSize"
                label="Screen Size (inches)"
                value={electronics.screenSize}
                onChange={handleInputChange}
                type="number"
                style={{ marginBottom: '10px', width: '100%' }}
                error={!!errors.screenSize}
                helperText={errors.screenSize}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </form>
    );
};

export default ElectronicsForm;
