import { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Product from '../../model/Product';
import { Categories } from '../../model/Common';

interface AddFormProps {
  submitFn: (product: Product, category: string) => void;
  productUpdated?: Product;
}

const AddForm: React.FC<AddFormProps> = ({ submitFn, productUpdated }) => {
    const [error, setError] = useState('');

    const [product, setProduct] = useState(
        productUpdated || { id: '', name: '', category: '', price: '' },
    );

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = () => {
      if (!product.id || !product.name || !product.category || !product.price) {
          setError('Please fill in all fields');
          return;
      }
  
      setError('');
      submitFn(product, product.category);
      setProduct({ id: '', name: '', category: '', price: '' });
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
            <TextField name="id" label="ID" value={product.id} onChange={handleInputChange} />
            <TextField name="name" label="Name" value={product.name} onChange={handleInputChange} />
            <FormControl style={{ minWidth: '200px' }}>
                <InputLabel id="category-label">Choose a Category</InputLabel>
                <Select
                    labelId="category-label"
                    name="category"
                    value={product.category}
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
                value={product.price}
                onChange={handleInputChange}
                type="number"
            />
            <Button onClick={handleSubmit}>Submit</Button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default AddForm;
