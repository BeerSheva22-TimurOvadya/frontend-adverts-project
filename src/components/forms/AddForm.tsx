import { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Advert from '../../model/Advert';
import { Categories } from '../../model/AllCategories';

interface AddFormProps {
    submitFn: (advert: Advert, category: string) => void;
}

const AddForm: React.FC<AddFormProps> = ({ submitFn }) => {
    const [error, setError] = useState('');
    const [advert, setAdvert] = useState({ name: '', category: '', price: null });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'price' && value < 0) {
            setError('Price must be 0 or greater');
            return;
        }
        setError('');
        setAdvert({ ...advert, [name]: value });
    };

    const handleSubmit = () => {
        if (!advert.name || !advert.category || !advert.price) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        submitFn(advert, advert.category);
        setAdvert({ name: '', category: '', price: null });
    };

    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '10%',
                width: '100%',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <TextField name="name" label="Name" value={advert.name} onChange={handleInputChange} />
                <FormControl style={{ minWidth: '200px' }}>
                    <InputLabel id="category-label">Choose a Category</InputLabel>
                    <Select
                        labelId="category-label"
                        name="category"
                        value={advert.category}
                        onChange={handleInputChange}
                        label="Choose a Category"
                    >
                        {Categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    name="price"
                    label="Price"
                    value={advert.price || ''}
                    onChange={handleInputChange}
                    type="number"
                />
            </div>
            <Button
                style={{
                    backgroundColor: '#63a4ff',
                }}
                variant="contained"
                onClick={handleSubmit}
            >
                Next Step
            </Button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default AddForm;
