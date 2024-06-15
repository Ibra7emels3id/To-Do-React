
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/f'
import { useContext, useEffect, useState } from 'react';
import Darkimg from '../imgs/dark theme icon/moon.png'
import ToDoList from './components/ToDoList';
import { ContextToDos } from './context/Context';


// Array Data To Dose
var Products;
if (localStorage.getItem('product')) {
    Products = JSON.parse(localStorage.product)
} else {
    Products = [];
}


function App() {
    const [Listproducts, setprodeucts] = useState(Products)
    const [moodch, setmood] = useState('dark')
    const [moods, setmoodsMemory] = useState('')


    useEffect(() => {
        setmoodsMemory(localStorage.getItem('mood'))
    }, [moodch]);

    function ChengeMoodImg() {
        setmood(moodch === 'dark' ? 'sun' : 'dark')
        localStorage.setItem('mood', moodch)
    }


    return (
        <>
            <div className={`App pt-3 ${moods}`}>
                <img onClick={ChengeMoodImg} className='moodImg' src={Darkimg} alt='/'/>
                
                <ContextToDos.Provider value={{Listproducts , setprodeucts}} >
                    <ToDoList />
                </ContextToDos.Provider>
                
            </div>
        </>
    )
}

export default App;
