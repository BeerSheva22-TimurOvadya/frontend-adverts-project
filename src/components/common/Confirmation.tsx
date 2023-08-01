import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface ConfirmationProps {
  confirmFn: (isOk: boolean) => void;
  open: boolean;
  title: string;
  content: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({ confirmFn, open, title, content }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => confirmFn(true)} color="primary">Yes</Button>
        <Button onClick={() => confirmFn(false)} color="secondary">No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
