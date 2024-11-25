import { useState } from 'react';
import { Reorder } from 'framer-motion'
import {Item} from './card';


export default function Sidebar() {
    var [items, setItems] = useState([0, 1, 2, 3, 4, 5])

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

    const removeItem = (itemToRemove) => {
        setItems(items.filter((item) => item !== itemToRemove))
    }
    return (
    <aside className='sidebar'>
        <h1>Trackit</h1>
        <button type="button" onClick={addItem}>Add Item</button>
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