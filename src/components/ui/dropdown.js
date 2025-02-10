import React, { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'


export function Dropdown({ inner, children }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    const buttonRef = useRef(null)
    useEffect(() => {
        //add styles here so can be above or below depending on screen
        const listener = (e) => {
            if (buttonRef.current && buttonRef.current.contains(e.target)) {
                return
            }
            else if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", listener)
        return () => document.removeEventListener("mousedown", listener)
    }, [])
    return (
        <div className='dropdown flex-center'>
            <button ref={buttonRef} className="control-button" onClick={() => setOpen(!open)}>
                <div></div>
                {inner}
            </button>
            {open && 
                <div ref={ref} className='dropdown-children'>
                    {Children.map(children, (child) => {
                        if (isValidElement(child)) {
                            return cloneElement(child, {setOpen})
                        }
                        return child
                    })}
                </div>
            }
        </div>
    )
}

export function DropdownItem({ text, right, callback, setOpen }) {
    return (
        <button className='dropdown-item flex-between' onClick={() => {setOpen(false); callback()}}>
            <span className='shortcut-name'>{text} </span>
            <div className='kbd-container'>
                {right}
            </div>
        </button>
    )
}

export function ShortCut({ keys }) {
    return (
       <> 
            {keys.map((key, index) => (
                <React.Fragment key={index}>
                    <kbd>{key}</kbd>
                </React.Fragment>
            ))}
        </>
    )
}