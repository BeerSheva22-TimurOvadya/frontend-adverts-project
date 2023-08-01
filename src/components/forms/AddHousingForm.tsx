import { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { HousingTypes } from '../../model/Common';

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

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setHousing({ ...housing, [name]: value });
  };

  const handleSubmit = () => {
    submitFn(housing);
  };

  return (
    <form>
      <FormControl style={{ minWidth: '200px' }}>
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
      <TextField name="rooms" label="Rooms" value={housing.rooms} onChange={handleInputChange} type="number" />
      <TextField name="squareMeters" label="Square Meters" value={housing.squareMeters} onChange={handleInputChange} type="number" />
      <TextField name="address" label="Address" value={housing.address} onChange={handleInputChange} />
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
};

export default HousingForm;
