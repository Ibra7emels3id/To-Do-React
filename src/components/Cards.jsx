import React, { useState } from "react";
import './css/Cards.css'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { Checkbox } from "@mui/material";
import { useContext } from 'react';
import { ContextToDos } from '../context/Context';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function Cards({ title, id, itCompleted, handelCheckclick, handelCheackCompleted }) {
    const { Listproducts, setprodeucts } = useContext(ContextToDos)
    const [handelDialog, sethandelDialog] = useState(false);
    const [handelUpdateValue, sethandelUpdateValue] = useState({title : title});

     // Replay function
    function DeletProduct() {
        handelCheckclick(id);
    }

    // Replay function 
    function CompletedProduct() {
        handelCheackCompleted(id)
    }

    // Handel show open

    const handelShowOpen = () => {
        sethandelDialog(true)
    }

     // Handel show None
    function handelNoneOpen() {
        sethandelDialog(false)
    }

    // ahandle upDate Data
    function handleUpDateData() {
        const UpdataData = Listproducts.map((it) => {
            if (it.id == id) {
                return {...it , title: handelUpdateValue.title}
            } else {
                return it
            }
        })
        setprodeucts(UpdataData)
        sethandelDialog(false)
    }


    return (
        <>
            <div className="box mb-2 rounded d-flex align-itmes-center justify-content-center justify-content-between px-4 p-2">
                <div className="icon">
                    <Checkbox
                        checked={itCompleted}
                        onClick={CompletedProduct}
                        inputProps={{ 'aria-label': 'controlled' }} />
                    <i onClick={handelShowOpen} className="fa-solid fa-pen-to-square mx-2 btn fs-4 text-warning"></i>
                    <i onClick={DeletProduct} className="fa-solid fa-trash mx-2 btn fs-4 text-danger"></i>
                </div>
                <h5 className="m-0 p-0 d-flex align-itmes-center justify-content-center">{title}</h5>
            </div>


            {/* === start Dailog ===*/}
            <Dialog
                open={handelDialog}
                onClose={handelNoneOpen}
                className="w-100"
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        please Update Data for Title And Descripch , please Update Data for Title And Descripch
                    </DialogContentText>
                    <TextField
                    onChange={(e)=>{
                        sethandelUpdateValue({...handelUpdateValue , title: e.target.value})
                    }}
                    value={handelUpdateValue.title}
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="text"
                        label="Update Data"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handelNoneOpen}>Cancel</Button>
                    <Button onClick={handleUpDateData} type="submit">Confirm</Button>
                </DialogActions>
            </Dialog>
            {/* === End Dailog ===*/}
        </>
    );
}
export default Cards;
