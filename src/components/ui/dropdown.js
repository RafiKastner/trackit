import React, { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
import '../../styles/ui/dropdown.css'
import { Arrow } from '../svg/arrow'

export function Dropdown({ inner, children }) {
   return (
        <div className='dropdown flex-center'>
            <DropdownGeneric display='vertical' {...{inner, children}}/>
        </div>
   )
}

export function SubDropdown({ text, right, children }) {
    return (
        <div className='sub-dropdown' style={{ position: 'relative'}}>
            <DropdownGeneric display='horizontal'
                inner={
                <div className='flex-between'>
                    <span>{text}</span>
                    <span>{right || <Arrow/>}</span>
                </div>
            }>
                {children}
            </DropdownGeneric>
        </div>
    )
}

function DropdownGeneric({ inner, children, display }) {
    const [open, setOpen] = useState(false)
    const childrenRef = useRef(null)
    const buttonRef = useRef(null)
    useEffect(() => {
        const listener = (e) => {
            if (buttonRef.current && buttonRef.current.contains(e.target)) {
                return
            }
            else if (childrenRef.current && !childrenRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", listener)
        return () => document.removeEventListener("mousedown", listener)
    }, [])
    return (
        <>
            <button ref={buttonRef} className="control-button" onClick={() => setOpen(!open)}>
                {inner}
            </button>
            {open && 
                <DropdownChildren type={display} offsetRef={buttonRef} {...{childrenRef, setOpen}}>
                    {children}
                </DropdownChildren>
            }
        </>
    )
}

function DropdownChildren({ offsetRef, childrenRef, children, setOpen, type}) {
    const [style, setStyle] = useState({ top: 0, left: 0 })
    useEffect(() => {
        //holy clean up
        // though i shld do something abt excess offset that I can pass in like
        // the padding of the dropdowns
        if (!offsetRef) return
        const offset = offsetRef.current
        const offsetPos = offset.getBoundingClientRect()
        const childrenWidth = childrenRef.current.offsetWidth
        const childrenHeight = childrenRef.current.offsetHeight
        if (type === 'vertical') {
            if (window.innerHeight - offsetPos.bottom > childrenHeight) {
                setStyle({ top: offset.offsetHeight, left: 0 })
            } else {
                setStyle({ top: -childrenHeight, left: 0 })
            }
        } else if (type === 'horizontal') {
            if (window.innerWidth - offsetPos.right > childrenWidth) {
                setStyle({ top: 0, left: offset.offsetWidth })
            } else {
                setStyle({ top: 0, left: -childrenWidth })
            }
        }
    }, [])
    return (
        <div ref={childrenRef} className='dropdown-children' style={{ top: style.top, left: style.left}}>
            {Children.map(children, (child) => {
                if (isValidElement(child) && typeof child.type === 'function') {
                    return cloneElement(child, {setOpen})
                }
                return child
            })}
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