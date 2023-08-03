import { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Advert from '../../model/Advert';
import { Categories } from '../../model/AllCategories';

interface AddFormProps {
    submitFn: (advert: Advert, category: string) => void;
    advertUpdated?: Advert;
}

const AddForm: React.FC<AddFormProps> = ({ submitFn, advertUpdated }) => {
    const [error, setError] = useState('');
    const [advert, setAdvert] = useState(advertUpdated || { name: '', category: '', price: 0 });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setAdvert({ ...advert, [name]: value });
    };

    const handleSubmit = () => {
        if (!advert.name || !advert.category || !advert.price) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        submitFn(advert, advert.category);
        setAdvert({ name: '', category: '', price: 0 });
    };

    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: '10%',
                width: '100%',
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
                value={advert.price}
                onChange={handleInputChange}
                type="number"
            />
            <Button onClick={handleSubmit}>Submit</Button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default AddForm;
