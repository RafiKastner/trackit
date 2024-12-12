import { Reorder } from 'framer-motion'
import {Item} from './menuItem';
import { motion } from 'framer-motion';

const listVariants = {
    open: {
        transition: { 
            staggerChildren: 0.07, 
            delayChildren: 0.2, 
        }
    },
    closed: {
        transition: { 
            staggerChildren: 0.05, 
            staggerDirection: -1,
        }
    }
};

const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
};

export default function Sidebar(props) {
    //make reducer
    //structure of notes/whatever
    //Notes -> items -> cards, lists, graphs, drawings, etc
    var notes = props.notes
    var setNotes = props.setNotes
    var open = props.sidebarOpen
    
    return (
    <motion.aside className='sidebar' 
        layout
        animate={{ 
            width: open ? "256px" : "0" ,
            translateX: open ? '0' : '-256px',
        }}
        transition={{
            type: 'tween',
            duration: .3,
            delay: open ? 0 : .07 * notes.length + .02 + .125,
        }}
    >
        <div className='sidebar-inner'>
            <WhiteSpace {...props}/>
            <div className='navbar-sidebar'>
                <LogoButton/>
                <DarkModeToggle {...props}/>
                <CollapseButton {...props}/>
            </div>
            <Reorder.Group axis="y" values={notes} onReorder={setNotes} className='reorder-group'
                initial={'open'}
                variants={listVariants}
                animate={open ? 'open' : 'closed'}
            >
                {notes.map((note, index) => (
                <Reorder.Item key={note} value={note} className='reorder-item'
                variants={itemVariants}>
                    <Item index={index} {...props}/>
                </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
     </motion.aside>
    )
}

export function LogoButton() {
    return (
        <a href="/" className='logo-button'>
            <h1 className='logo-text'>Trackit</h1>
        </a>
    )
}

export function DarkModeToggle({ dataTheme, setDataTheme, color }) {
    const setMode = () => {
        var set = dataTheme === "light" ? "dark" : "light"
        setDataTheme(set)
        document.documentElement.setAttribute("data-theme", set)
    }
    return (
        <button className='dark-mode-toggle' onClick={setMode}>
            <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg">
                {dataTheme === 'dark' ? 
                    <path fill={color} d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path>
                :
                    <path fill={color} d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path>
                }
            </svg>
        </button>
    )
}

export function CollapseButton({ color, setSidebarOpen }) {
    return (
    <div className='collapse-button-container'>
        <button className='collapse-button' 
            onClick={() => setSidebarOpen(false)}>
            <svg width="32px" height="32px" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <line x1="6" y1="6" x2="26" y2="26" stroke={color} strokeWidth="2"/>
                    <line x1="6" y1="26" x2="26" y2="6" stroke={color} strokeWidth="2"/>
                </g>
            </svg>
        </button>
    </div>
    )
}

export function WhiteSpace({ sidebarOpen, height = 50 }) {
    return (
        <motion.div className='white' style={ {height: height} }
        animate={{ left: sidebarOpen ? '0' : '-250px' }}
        />
    )
}