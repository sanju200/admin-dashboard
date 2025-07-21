"use client"

import React, { Key, useCallback, useEffect, useState } from "react";
import { UserList } from "../constant/userlist";
import {
  Box,
  Checkbox, 
  Divider, 
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { UserType } from "../interface/userType";
import { visuallyHidden } from "@mui/utils";
import { alpha, useTheme } from "@mui/material/styles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import { getUserData } from "../services/users";
import { Button, Col, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import ConfirmationPopup from "../components/confirmationPopup";
import CustomDialog from "../components/customDialog";

type Order = "asc" | "desc";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof UserType
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof UserType;
  label: string;
  numeric: boolean;
  styleClass?: string;
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}


const tableHead: readonly HeadCell[] = [
  {
    disablePadding: false,
    id: "firstname",
    label: "Fullname",
    numeric: false,
  },
  {
    disablePadding: false,
    id: "email",
    label: "Email",
    numeric: false,
  },
  {
    disablePadding: false,
    id: "phone",
    label: "Phone",
    numeric: false,
  },
  {
    disablePadding: false,
    id: "address",
    label: "Address",
    numeric: false,
  },
  {
    disablePadding: false,
    id: "dob",
    label: "Date of Birth",
    numeric: false,
  },
  {
    disablePadding: false,
    id: "status",
    label: "Status",
    numeric: false,
  },
];

function EnhancedTableHead(props: EnhancedTableProps) {

  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof UserType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
          {tableHead.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy == headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order == "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell>
            Action
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const [isAddNewUserPopup, setIsAddNewUserPopup] = useState(false);


  const CustomDialog = dynamic(() => import('../components/customDialog'), {
    ssr: false,
  });

   const openAddUserDialog = () => {
    setIsAddNewUserPopup(true);
    Users();
  }

  const closeAddUserPopup = () => {
    debugger;
    setIsAddNewUserPopup(false);
  }

  return (
    <>
      <Row>
        <Col xs={6}>
            <div className="table-title ">Users</div>
        </Col>
        <Col xs={6} className="mt-2 text-end pt-1">
            <Button className="me-4" onClick={ openAddUserDialog}>Add User</Button>
        </Col>
      </Row>
      <Divider />
      <CustomDialog isOpen={isAddNewUserPopup} closePopup={closeAddUserPopup} isEdit={false}></CustomDialog>
    </>
  );

}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: string }, b: { [key in Key]: string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function Users() {
  const [userList, setUserList] = useState<>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof UserType>("_id");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowPerPage, setRowPerPage] = React.useState(5);
  const [selectedUser, setSelectedUser] = React.useState<UserType>();
  const [isEditUserPopup, setIsEditUserPopup] = useState(false);
  const [openDeleteUserPopup, setOpenDeleteUserPopup] = useState(false);


  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getUserData();
    setUserList(data);
  };
      
  

  const openDialog = (user: UserType) => {
    setSelectedUser(user);
    setIsEditUserPopup(true);
  };

  const deleteUser = async (user : UserType) => {
    try{
      const response = await fetch(`http://localhost:3002/users/${user._id}`, {
        method: 'DELETE',
         headers: {
            "Content-Type": "application/json",
          }
      })
      if(response.ok){
        setOpenDeleteUserPopup(false);
      }else{
        const errorText = await response.text();
      }
      fetchData();
    }catch(err){
      console.error('Failed to delete user: ', err)
    }
  }

  
  const deleteActionButton = {
    userAction: () => {
      if(selectedUser){
        deleteUser(selectedUser);
      }
    },
    buttonTitle: 'Delete',
    description: 'Are you sure you want to delete this user ?',
  }

  const closeDialog = () => {
    setIsEditUserPopup(false);
    fetchData();
  };

  


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof UserType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


 const handleSelectAllClick = useCallback(
  (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newRowSelected = userList.map((user) => user._id);
      setSelected(newRowSelected);
    } else {
      setSelected([]);
    }
  },
  [userList] 
);

  const handleClick = (event: React.MouseEvent<unknown>, _id: string) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected: readonly string[] = [];
    

    if (selectedIndex == -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) =>{
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  // const handleDenseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowPerPage - userList.length) : 0;


  const visibleRows: UserType[] = React.useMemo(
    () =>
      [...userList]
        .sort(getComparator(order, orderBy))
        .slice(page * rowPerPage, page * rowPerPage + rowPerPage),
    [userList, order, orderBy, page, rowPerPage]
  );

  const openDeletePopup = (user: UserType) => {
    setOpenDeleteUserPopup(true);
    setSelectedUser(user);
  }

  const closeDeletePopup =() => {
    setOpenDeleteUserPopup(false);
    setSelectedUser(undefined);
  }


  return (
   <>
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={userList.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row?._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row?._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.firstname} { row.lastname}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.dob}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <VisibilityIcon fontSize="small" color="primary" className="icon m-1 border-primary"/>  
                      <EditIcon fontSize="small" color="success" className="icon m-1 border-success" onClick={() => openDialog(row)}/>
                      <DeleteIcon fontSize="small" sx={{ color: red[500] }} className="icon m-1 border-danger" onClick={() => openDeletePopup(row)}/>  
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={userList.length}
          rowsPerPage={rowPerPage}
           page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
        {/* <FormControlLabel control={<Switch checked={dense} onChange={handleDenseChange } /> } label="Dense padding" /> */}
    </Box>

      <CustomDialog isOpen={isEditUserPopup} closePopup={closeDialog} selectedUser={selectedUser} isEdit={true}></CustomDialog>

      <ConfirmationPopup isOpen={openDeleteUserPopup}  submitButton={deleteActionButton} selectedUser={selectedUser} closePopup={closeDeletePopup}></ConfirmationPopup>
    </>
  );
}

export default Users;
