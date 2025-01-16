import { Reorder } from 'framer-motion'
import {Item} from './noteMenuItem.js';
import { motion } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';
import '../../styles/sidebar/Sidebar.css'
import Navbar from './sidebarNavbar';
import Topbar from './topbar.js'
import { SidebarContext, SidebarContextProvider } from '../../contexts/SidebarContext.js';
import { LevelContext } from '../../contexts/LevelContext.js';

const sidebarVariants = {
	open: {
		width: '379px',
		translateX: '0',
	},
	closed: {
		width: '0',
		translateX: '-379px',
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
	const { notes, sidebarOpen, sidebarAnimationTiming } = useContext(LevelContext)
	const open = sidebarOpen
	const { setAnimBounds, setBounds } = useContext(SidebarContext)

	useEffect(() => {
		let group = document.getElementsByClassName('sidebar-inner')[0]
		let pos = group.getBoundingClientRect()
		setBounds({ top: pos.top, bottom: pos.bottom})

		setAnimBounds({ start: 0, end: notes.length - 1 })
	}, [setBounds, setAnimBounds, notes.length])
	
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
				<FolderDisplay/>
				<NotesDisplay/>
			</div>
		</motion.aside>
	)
}

function NotesDisplay() {
	let { notes, setNotes } = useContext(LevelContext)
	let { animBounds } = useContext(SidebarContext)
	let {isNotesScrolled, setIsNotesScrolled} = useContext(SidebarContext)
	let { notesbarRef } = useContext(SidebarContext)
	return (
		<div className='notes-display'>
			<Topbar/>
			<div className='notes-display-inner' 
			onScroll={(e) => {
				if (e.target.scrollTop > 0 && !isNotesScrolled) {
					setIsNotesScrolled(true)
				} else if (e.target.scrollTop <= 0 && isNotesScrolled) {
					setIsNotesScrolled(false)
				}
			}}>
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
	)
}

function FolderDisplay() {
	return (
		<div className='folder-display'>

		</div>
	)
}