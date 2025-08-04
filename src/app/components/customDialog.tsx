import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserType } from "../interface/userType";
import { Row, Col } from "react-bootstrap";
import Switch from "@mui/material/Switch";
import { createUser, updateUserData } from "../services/users";

type DialogProp = {
    isOpen: boolean,
    selectedUser?: UserType,
    closePopup: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isEdit: boolean,
    onSaved: () => void;
}

function CustomDialog({ isOpen, selectedUser, closePopup, isEdit = false, onSaved }: DialogProp ) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    let [checked, setChecked] = React.useState(false);
    let [userRole, setUserRole ] = useState<String>("customer")
    let [formData, setFormData] = useState<UserType>({
      _id: selectedUser ? selectedUser._id : "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      dob: Date(),
      status: "",
      role: ""
    });
    
    useEffect(() => {
      if (selectedUser) {
        setFormData(selectedUser);
        setChecked(selectedUser.status === 'active');
        setUserRole(selectedUser.role);
      }
    }, [selectedUser]);

    const handleUserForm = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      } as UserType);
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newStatus = event.target.checked ? 'active' : 'inactive';
      setChecked(event.target.checked);
      setFormData({
        ...formData,
        status: newStatus,
        role: userRole
      } as UserType);
    };

    const handleSubmit = async () => {
      const setStatus = formData?.status ? formData?.status : 'inactive';
      formData = {...formData, status: setStatus}
     if(isEdit){
       const response = await updateUserData(formData);
       if(response){
          alert('User updated successfully');
          closePopup({} as any);
          onSaved();
        }else{
          alert('Failed to update the user');
        }
     }else{
        const response = await createUser(formData);
        if(response){
          alert('User added successfully');
          closePopup({} as any);
          onSaved();
        }else{
          alert('Failed to add the user');
        }
      }
    };



    if (!isOpen) {
        return null;
    }

    return (
    <>
       <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={closePopup}
        aria-labelledby="responsive-dialog-title"
        sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "50%", 
            height: "auto"
          },
        },
      }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Edit User"}
        </DialogTitle>
        <DialogContent>
           <form>
            <Row>
            <Col xs={6}>
                <label className="form-label">Firstname</label> <br />
                <input
                  type="text"
                  placeholder="John"
                  name="firstname"
                  value={formData?.firstname ? formData?.firstname : ""}
                  onChange={(event) => handleUserForm(event)}
                  className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Lastname</label> <br />
                <input
                type="text"
                placeholder="Doe"
                name="lastname"
                value={formData?.lastname ? formData?.lastname : ""}
                onChange={(event) => handleUserForm(event)}
                  className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Email</label> <br />
                <input
                type="text"
                placeholder="john.doe@gmail.com"
                name="email"
                value={formData?.email ? formData?.email : ""}
                  onChange={(event) => handleUserForm(event)}
                  className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Phone</label> <br />
                <input
                type="text"
                placeholder="+919087654321"
                name="phone"
                value={formData?.phone ? formData?.phone : ""}
                onChange={(event) => handleUserForm(event)}
                className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Date of Birth</label> <br />
                <input
                type="date"
                placeholder="Doe"
                name="dob"
                value={formData?.dob ? formData?.dob : Date()}
                  onChange={(event) => handleUserForm(event)}
                  className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Address</label> <br />
                <input
                  type="text"
                  placeholder="123 Main Street, Anytown, CA 91234"
                  name="address"
                  value={formData?.address ? formData?.address : ""}
                  onChange={(event) => handleUserForm(event)}
                  className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Status</label> <br />
                <Switch
                  name="status"
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  className="mx-0 mt-0 "
                  value={ checked ? 'active' : 'inactive' }
                />
            </Col>
            <Col>
            
            </Col>
            </Row>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomDialog;
