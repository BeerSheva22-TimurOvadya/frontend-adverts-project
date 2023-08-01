
import InputResult from '../../model/InputResult';
import Input from '../common/Input';



const MAX_AMOUNT = 10;
const Generation: React.FC = () => {    
    function onSubmit(value: string): InputResult {
        const amount = +value;
        const res: InputResult = { status: 'success', message: '' };
        if (amount < 1 || amount > MAX_AMOUNT) {
            res.status = 'error';
            res.message = `amount must be in the range [1 - ${MAX_AMOUNT}]`;
        }  
        return res;
    }
    
    return (
        <Input
            submitFn={onSubmit}
            placeholder={`amount of random Employees [1 - ${MAX_AMOUNT}]`}
            type="number"
            buttonTitle="Generate"
        />
    );
};
export default Generation;
