import { useEffect, useState } from 'react';
import { Reorder } from 'framer-motion'
import {Item} from './card';

export default function Sidebar() {
    var [items, setItems] = useState([0, 1, 2, 3, 4])
    const root = document.getElementById("root")
    var scroll = 0

    const removeItem = (itemToRemove) => {
        setItems(items.filter((item) => item !== itemToRemove))
    }
    return (
    <aside className='sidebar' 
        onMouseEnter={() => {
            scroll = window.scrollY
            root.classList.add("no-scroll")
            root.style.top = `-${scroll}px`
        }}
        onMouseLeave={() => {
            root.classList.remove("no-scroll")
            window.scrollTo(0, scroll);
        }}>
        <div className='white'></div>
        <div className='navbar-sidebar'>
            <LogoButton/>
            <DarkModeToggle/>
            <CollapseButton/>
        </div>
        <AddItemButton items={items} setItems={setItems}/>
        <Reorder.Group axis="y" values={items} onReorder={setItems} className='reorder-group'>
            {items.map((item) => (
            <Reorder.Item key={item} value={item} className='reorder-item'>
                <Item Num={item}/>
                <button type="button" onClick={() =>removeItem(item)}>Remove Item</button>
            </Reorder.Item>
            ))}
        </Reorder.Group>
     </aside>
    )
}

export function LogoButton() {
    return (
        <a href="" className='logo-button'>
            <h1 className='logo-text'>Trackit</h1>
        </a>
    )
}

export function DarkModeToggle() {
    return (
        <button className='dark-mode-toggle'>
            <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path>
            </svg>
        </button>
    )
}

export function CollapseButton() {
    return (
    <div className='collapse-button-container'>
        <button className='collapse-button' onClick={() => console.log("press")}>
            <svg width="32px" height="32px" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <line x1="6" y1="6" x2="26" y2="26" stroke="black" strokeWidth="2"/>
                    <line x1="6" y1="26" x2="26" y2="6" stroke="black" strokeWidth="2"/>
                </g>
            </svg>
        </button>
    </div>
    )
}

export function AddItemButton({ items, setItems }) {
    const addItem = () => {
    var sortedItems = [...items]
    sortedItems.sort()
    let tracker = items.length;
    for (let i = 0; i < sortedItems.length; i++) {
        if (sortedItems[i] !== i) {
        tracker = i
        break
        }
    }
    setItems([...items, tracker])
    }

    return (
        <button type="button" onClick={addItem}>Add Item</button>
    )
}