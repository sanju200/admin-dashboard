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
import React, { useEffect } from "react";
import { UserType } from "../interface/userType";
import { Row, Col } from "react-bootstrap";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import Switch from "@mui/material/Switch";

type DialogProp = {
    isOpen: boolean,
    selectedUser: UserType | undefined,
    onClose: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomDialog({ isOpen, selectedUser, onClose }: DialogProp ) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    let [checked, setChecked] = React.useState(false);

    useEffect(() => {
        checked = selectedUser?.status === 'active' ? true : false;
        console.log('checked ', checked);
        setChecked(checked);
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("isChecked ", checked);
        setChecked(!checked);
    };

    if (!isOpen) {
        return null;
    }

    return (
    <>
       <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={onClose}
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
                defaultValue={selectedUser?.firstname}
                className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Lastname</label> <br />
                <input
                type="text"
                placeholder="Doe"
                name="lastname"
                defaultValue={selectedUser?.lastname}
                className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Email</label> <br />
                <input
                type="text"
                placeholder="Doe"
                name="email"
                defaultValue={selectedUser?.email}
                className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Phone</label> <br />
                <input
                type="text"
                placeholder="+919087654321"
                name="phone"
                defaultValue={selectedUser?.phone}
                className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Date of Birth</label> <br />
                <input
                type="text"
                placeholder="Doe"
                name="dob"
                defaultValue={selectedUser?.dob}
                className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Address</label> <br />
                <input
                type="text"
                placeholder="123 Main Street, Anytown, CA 91234"
                name="address"
                defaultValue={selectedUser?.address}
                className="form-field"
                />
            </Col>
            <Col xs={6}>
                <label className="form-label">Status</label> <br />
                <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
                className="mx-0 mt-0 "
                />
            </Col>
            <Col>
            
            </Col>
            </Row>
        </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomDialog;
