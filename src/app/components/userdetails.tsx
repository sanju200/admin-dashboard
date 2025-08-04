import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { UserType } from "../interface/userType";
import { Col, Row } from "react-bootstrap";

type UserDetailsProp = {
  selectedUser?: UserType | undefined;
  isOpen: boolean;
  closePopup: (event: React.MouseEventHandler<HTMLInputElement>) => void;
};

function Userdetails({ selectedUser, isOpen, closePopup }: UserDetailsProp) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {selectedUser && (
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
                height: "auto",
              },
            },
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            <div className="text-sm">
              Details
            </div>
          </DialogTitle>
          <Divider></Divider>
          <DialogContent>
            <div className="border p-4">
              <Row className="d-flex align-items-center">
              <Col xs={6} className="d-flex">
                <div>
                  <Avatar
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                    sx={{ width: 54, height: 54 }}
                  >
                    {selectedUser.firstname?.charAt(0)}
                    {selectedUser.lastname?.charAt(0)}
                  </Avatar>
                </div>
                <div className="mx-3">
                  <div className="fw-semibold mb-0">{selectedUser?.firstname} {selectedUser?.lastname}</div>
                  <div className="text-sm text-secondary mt-0">
                    {selectedUser.email}
                  </div>
                </div>
              </Col>
              <Col xs={6} className="text-end">
              <div className={selectedUser.status == 'active' ? 'badge badge-sucess float-end' : 'badge badge-danger float-end'}>
                 {selectedUser?.status?.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
              </div>
              </Col>
            </Row>
            {/* <div className="my-2"></div> */}
              <Divider className="my-3"></Divider>

              <Row>
                <Col xs={6} className="mb-2">
                  <label className="text-secondary">Firstname</label>
                  <div className="text-black">{selectedUser?.firstname}</div>
                </Col>
                <Col xs={6} className="mb-2">
                  <label className="text-secondary">Lastname</label>
                  <div className="text-black">{selectedUser?.lastname}</div>
                </Col>
                <br />
                <Col xs={6} className="mb-2">
                  <label className="text-secondary">Email</label>
                  <div className="text-black">{selectedUser?.email}</div>
                </Col>
                <Col xs={6} className="mb-2">
                  <label className="text-secondary">Date of Birth</label>
                  <div className="text-black">{selectedUser?.dob}</div>
                </Col>
                <Col xs={6} className="mb-2">
                  <label className="text-secondary">Address</label>
                  <div className="text-black">{selectedUser?.address}</div>
                </Col>
              </Row>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={closePopup}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default Userdetails;
