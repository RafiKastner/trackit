import { useState } from "react"

export default function AddButton({ notes, setNotes }) {
    var [idCounter, setIdCounter] = useState(4)
    const addItem = () => {
        setIdCounter(idCounter+1)
        setNotes([...notes, { title: "Untitled", id: idCounter}])
    }

    return (
        <button className='add-button' type="button" onClick={addItem}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox='0 0 35 35'>
                <line x1="18" y1="0" x2="18" y2="35" stroke="black" strokeWidth="5"/>
                <line x1="0" y1="18" x2="35" y2="18" stroke="black" strokeWidth="5"/>
            </svg>
        </button>
    )
}