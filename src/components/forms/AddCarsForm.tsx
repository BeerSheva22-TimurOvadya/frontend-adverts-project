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
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setCar({ ...car, [name]: value });
  };

  const handleSubmit = () => {
    submitFn(car);
  };

  return (
    <form>
      <TextField name="brand" label="Brand" value={car.brand} onChange={handleInputChange} />
      <TextField name="releaseYear" label="Release Year" value={car.releaseYear} onChange={handleInputChange} type="number" />
      <TextField name="mileage" label="Mileage" value={car.mileage} onChange={handleInputChange} type="number" />
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
};

export default CarsForm;
