import React, { useState } from 'react'
import { useInput } from '@mui/base/useInput';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Form } from 'react-router-dom';

// I am still not sure as of how to call the function with the right parameters so that it can run a switch for the right dialog to open for the 
// dialog to be reusable with other components
export default function AddServerDialog(props: any) {
    const [serverName, setValid] = useState({
      serverName: '',
      tempName: ''
    });
    const handleDialogClose = () => {
      props.setOpenDialog(false); // Use the prop.
    };
      // this is the function that will be called when the user clicks the confirmation button,
      // it will add the server to the list of servers with the use of right backend call
      const handleAdd = (serverName: String) => {
        props.addServer(serverName);
             };
    

    //validators
            const isServerNameValid = (serverName: string) =>
		        serverName.length < 2 || serverName.length > 20 ;

            const handleSubmit = () => {
              setValid({serverName: serverName.tempName, tempName: serverName.serverName});
            };


    // const handleAddServerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     tmp(e.target.value);
    //   };
    
             //currently this is just a placeholder for the actual dialog, it can open, close and read the input but it does not do anything with it yet
             //the dialog is also not styled yet
      return (
        <React.Fragment>
          <Dialog className='text-center justify-center backdrop-filter backdrop-blur-[5px]'
            fullWidth
            maxWidth={"xs"}
            
            PaperProps={{ style: { color: 'white', borderRadius: '10px'   }}}
            open={props.openDialog}
            onClose={handleDialogClose}
            sx={{ input: { color: 'white'} }}

          ><div className='w-full h-full bg-secondary'>
            <DialogTitle>Server creation</DialogTitle>
            <DialogContent>{/* helper text, onchange, validation and many other fields/functions will be removed later, commiting this cuz i'm done for today*/ }
              <TextField
                required
                margin="dense"
                id="name"
                error={isServerNameValid(serverName.serverName)} 
                helperText={
                  isServerNameValid(serverName.serverName)
                    ? 'Server name must be between 2 and 20 characters'
                    : 'asd'
                }
                onChange={(event) =>
                  setValid({
                    serverName: '',
                    tempName: event.target.value
                  })
                }
                name="serverName"
                label="Server Name"
                type="text"
                fullWidth={false}
                variant="outlined"
                InputLabelProps={{
                  style: { color: '#fff'},
                }}
                sx={{
                  width: { sm: 200, md: 300 },
              }}
              />
              {/*both brbr h1 names are temporary as I am not sure of the right tag to use here*/}
              <br/>
              <br/>
              <TextField className='mt-0 pt-0'
                inputProps={{ style: { color: "white" } }}
                required
                id="name"
                name="serverDescription"
                label="Description"
                type="text"
                multiline
                rows={3}
                fullWidth={false}
                variant="outlined"
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                sx={{
                  width: { sm: 200, md: 300 },
              }}
              />
              <br/>
              Public ?
              <Checkbox defaultChecked={false} 
              name='isPublic'/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmit}>
                Confirm
              </Button>
              <Button variant="outlined" onClick={handleDialogClose}>
                Close
              </Button>
            </DialogActions>
            </div>
          </Dialog>
        </React.Fragment>
      );
}