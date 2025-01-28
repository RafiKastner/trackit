import { LogoButton } from "./sidebar/topbar";
import { motion } from 'framer-motion';
import '../styles/Main.css'
import { useContext } from "react";
import { LevelContext } from "../contexts/LevelContext";
import { Tiptap } from "./tiptap";

export default function Main( {} ) {
	let { sidebarOpen, sidebarAnimationTiming, folders } = useContext(LevelContext)
	const id = folders.selection.note
	const note = folders.byId[id]
	return (
		<main className="main">
			<div className='z-background'></div>
			<motion.div className="navbar-main"
				initial={{ left: sidebarOpen ? '-286px' : '24px' }}
				animate={{
					left: sidebarOpen ? '-286px' : '24px'
				}}
				transition={{
					type: 'tween',
					duration: .3,
					delay: sidebarOpen ? 0 : sidebarAnimationTiming + .2,
			}}>
				<div className={`main-navbar-inner`}>
					<LogoButton/>
					<OpenSidebarButton/>
				</div>
			</motion.div>
			<div className="content-main">
				<Tiptap {...{ note }}/>
			</div>
		</main>
	)
}

export function OpenSidebarButton() {
	let { color, setSidebarOpen } = useContext(LevelContext)
	return (
		<button className="open-sidebar" 
		onClick={() => setSidebarOpen(true)}>
			<svg width="30px" height="30px" viewBox="0 0 30 30" aria-hidden="true">
					<path stroke={color} strokeLinecap="round" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22"/>
			</svg>
		</button>
	)
}