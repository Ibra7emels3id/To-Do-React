
import { useEffect, useState } from 'react';
import Cards from './Cards';
import { v4 as uuidv4 } from 'uuid';
import './css/Cards.css'
// import Filterproduct from './Filterproduct';
import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useContext } from 'react';
import { ContextToDos } from '../context/Context';




const ToDoList = () => {
    const { Listproducts , setprodeucts} = useContext(ContextToDos)
    const [TitleInput, setTitleInput] = useState("")
    const [displayCheackCompleted, setdisplayCheackCompleted] = useState("All")


    // ======================
    // Save All Product local Storage  
    // ======================

    useEffect(() => {
        localStorage.setItem('product', JSON.stringify(Listproducts))
    }, [Listproducts])


    // ======================
    // Filter All Product 
    // ======================

    const ComplFilter = Listproducts.filter((it) => {
        return it.itCompleted
    })

    const NotComplFilter = Listproducts.filter((it) => {
        return !it.itCompleted
    })

    let CompnantTodosFilter = Listproducts

    if (displayCheackCompleted == "Completed") {
        console.log('test');
        CompnantTodosFilter = ComplFilter

    } else if (displayCheackCompleted == 'NotCompleted') {
        console.log('test3');
        CompnantTodosFilter = NotComplFilter
        
    } else {
        CompnantTodosFilter = Listproducts
    }




    // ======================
    // == Handel New Product  
    // ======================

    const Productslist = CompnantTodosFilter.map((itme) => {
        return <Cards key={itme.id} title={itme.title} id={itme.id} itCompleted={itme.itCompleted} handelCheckclick={handelCheck} handelCheackCompleted={CompletedProductCheack} />
    })


    // ======================
    // ==== Delete Product  
    // ======================

    function handelCheck(id) {
        const updateListProduct = Listproducts.filter((P) => {
            if (P.id == id) {
                return false
            } else {
                return true
            }
        })
        setprodeucts(updateListProduct)
    }

    // =========================
    // handel Product Completed 
    // =========================

    function CompletedProductCheack(id) {
        const Completed = Listproducts.map((comp) => {
            if (comp.id == id) {
                if (comp.itCompleted == true) {
                    comp.itCompleted = false
                } else {
                    comp.itCompleted = true
                }
            }
            return comp
        })
        setprodeucts(Completed)
    }




    // ======================
    // ==== Add New Product  
    // ======================

    function AddProduct() {
        const NewTodo = {
            id: uuidv4(),
            title: TitleInput,
            itCompleted: false
        }
        setprodeucts([...Listproducts, NewTodo])
        setTitleInput("")
    }

    function CheackCompletedproduct(e) {
        setdisplayCheackCompleted(e.target.value)
    }

    return (
        <>
            <div className="card p-2">
                <h4 className="fw-bold fs-1 m-4">To Do list</h4>
                <div className="d-flex align-itmes-center justify-content-center mt-2 mb-4">
                    <ToggleButtonGroup
                        color="primary"
                        value={displayCheackCompleted}
                        exclusive
                        onChange={CheackCompletedproduct}
                        aria-label="Platform"
                    >
                        <ToggleButton value="NotCompleted">Not Completed</ToggleButton>
                        <ToggleButton value="Completed">Completed</ToggleButton>
                        <ToggleButton value="All">All</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                {Productslist}
                <div>
                    <TextField value={TitleInput} onChange={(e) => {
                        setTitleInput(e.target.value)
                    }} className=' w-100 mt-3 mb-3' id="outlined-basic" label="Enter your name" variant="outlined" />
                    <button onClick={AddProduct} className="mx-2 btn btn-primary mt-2 mb-3">Add Product</button>
                </div>
            </div>
        </>
    )
}

export default ToDoList;
