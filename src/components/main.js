import { LogoButton } from "./sidebar";
import { motion } from 'framer-motion';

export default function Main(props) {
    return (
        <main className="main">
            <div className='z-background'></div>
            <motion.div className="navbar-main"
                initial={{ left: props.sidebarOpen ? '-286px' : '24px' }}
                animate={{
                    left: props.sidebarOpen ? '-286px' : '24px'
                }}
                transition={{
                    type: 'tween',
                    duration: .3,
                    delay: props.sidebarOpen ? 0 : .07 * props.notes.length + .02 + .125,
                }}>
                <div className={`main-navbar-inner`}>
                    <LogoButton/>
                    <OpenSidebarButton {...props}/>
                </div>
            </motion.div>
          <div className="content-main">
              <p>Main</p>
          </div>
        </main>
    )
}

export function OpenSidebarButton({ color, setSidebarOpen }) {
    return (
        <button className="open-sidebar" 
        onClick={() => setSidebarOpen(true)}>
            <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
                <path stroke={color} strokeLinecap="round" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22"/>
            </svg>
        </button>
    )
}