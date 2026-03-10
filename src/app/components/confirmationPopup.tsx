import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps } from '@mui/material';
import React, { HtmlHTMLAttributes } from 'react'
import { UserType } from '../interface/userType';

type ConfirmationPopup = {
  isOpen: boolean,
  closePopup: (event: React.MouseEvent<HTMLButtonElement>) => void;
  selectedUser?: UserType | undefined,
  submitButton : {
    userAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    buttonTitle: string,
    description: String,
  }
}

function ConfirmationPopup({ isOpen, closePopup, selectedUser, submitButton }: ConfirmationPopup) {

  const [fullWidth, setFullWidth] = React.useState(false);
  const [maxWidth, setMaxWidth ] = React.useState<DialogProps['maxWidth']>('sm');


  return (
    <div>
       <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        onClose={closePopup}
      >
        {/* <DialogTitle>Optional sizes</DialogTitle> */}
        <DialogContent>
          <DialogContentText className='text-black fs-5'>
            { submitButton.description }
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            
          </Box>
        </DialogContent>
        <DialogActions className='flex justify-center pb-4'>
          <Button variant="outlined" onClick={closePopup} size="small">Close</Button>

          {submitButton.userAction && (
            <Button variant="outlined" color="error" onClick={submitButton.userAction} size="small">{submitButton.buttonTitle}</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmationPopup;

