import { Reorder } from 'framer-motion'
import {Item} from './menuItem';
import { motion } from 'framer-motion';
import { useContext, useEffect } from 'react';
import '../../styles/sidebar/Sidebar.css'
import Navbar from './sidebarNavbar';
import Topbar from './topbar.js'
import { SidebarContext, SidebarContextProvider } from '../../contexts/SidebarContext.js';
import { LevelContext } from '../../contexts/LevelContext.js';

const sidebarVariants = {
	open: {
		width: "300px",
		translateX: '0',
	},
	closed: {
		width: "0",
		translateX: '-150px',
	},
}

function calculateDelay(type, { index, start, end }) {
	index = Math.min(Math.max(index, start), end)
	index -= start
	if (type === "open") {
			return index * 0.07 + 0.2
	} else if (type === 'closed') {
			return (end - start - index) * 0.05
	}
	throw Error('Invalid delay type!')
}

const itemVariants = {
	open: (custom) => ({
		y: 0,
		opacity: 1,
		transition: {
			y: { stiffness: 1000, velocity: -100, delay: calculateDelay('open', custom)},
			opacity: { duration: .4, delay: calculateDelay('open', custom)},
		},
		
	}),
	closed: (custom) => ({
		y: 50,
		opacity: 0,
		transition: {
			y: { stiffness: 1000, delay: calculateDelay('closed', custom) },
			opacity: { delay: calculateDelay('closed', custom) }
		}
	})
};

export default function Sidebar() {
	return (
		<SidebarContextProvider>
			<SidebarReturn/>
		</SidebarContextProvider>
	)
}

export function SidebarReturn() {
	let { notes, setNotes, sidebarOpen, sidebarAnimationTiming } = useContext(LevelContext)
	var open = sidebarOpen

	var { animBounds, setAnimBounds } = useContext(SidebarContext)

	var { setBounds} = useContext(SidebarContext)
	useEffect(() => {
		var group = document.getElementsByClassName('sidebar-inner')[0]
		var pos = group.getBoundingClientRect()
		var white = group.getElementsByClassName('white')[0].getBoundingClientRect()
		setBounds({ top: pos.top + white.bottom, bottom: pos.bottom})

		setAnimBounds({ start: 0, end: notes.length - 1 })
	}, [setBounds, setAnimBounds, notes.length])

	var { notesbarRef } = useContext(SidebarContext)
	
	return (
		<motion.aside className='sidebar' 
			layout
			initial='open'
			variants={sidebarVariants}
			animate={open ? 'open' : 'closed'}
			transition={{
				type: 'tween',
				duration: .3,
				delay: open ? 0 : sidebarAnimationTiming,
			}}
		>
			<div className='sidebar-inner'>
				<div className='folder-display'>
					
				</div>
				<div className='notes-display'>
					<WhiteSpace {...{notes, sidebarOpen}}/>
					<Topbar/>
					<Navbar/>
					<h3>Yesterday</h3>
					<Reorder.Group axis="y" values={notes} onReorder={setNotes} className='reorder-group' ref={notesbarRef}>
						{notes.map((note, index) => (
							<Reorder.Item key={note.id} value={note} className='reorder-item' 
								variants={itemVariants}
								custom={{index: index, start: animBounds.start, end: animBounds.end}}
								>
								<Item index={index}/>
							</Reorder.Item>
						))}
					</Reorder.Group>
				</div>
			</div>
		</motion.aside>
	)
}

export function WhiteSpace({ notes, sidebarOpen, height = 50 }) {
	return (
		<motion.div className='white' style={ {height: height} }
			initial={'open'}
			variants={{
				open: {
					width: '290px',
					translateX: '0',
				},
				closed: {
					width: '0',
					translateX: '-150px',
				},
			}}
			animate={sidebarOpen ? 'open' : 'closed'}
			transition={{
				type: 'tween',
				duration: .3,
				delay: sidebarOpen ? 0 : .07 * notes.length + .02 + .125,
			}}
		/>
	)
}