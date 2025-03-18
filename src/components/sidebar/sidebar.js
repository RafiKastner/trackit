import { Reorder } from 'framer-motion'
import {Item} from './noteMenuItem.js';
import { motion } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';
import '../../styles/sidebar/Sidebar.css'
import Navbar from './sidebarNavbar';
import Topbar from './topbar.js'
import { SidebarContext, SidebarContextProvider } from '../../contexts/SidebarContext.js';
import { LevelContext } from '../../contexts/LevelContext.js';
import Folder from './folderMenuItem.js';

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
	let { folders, notes, reorder } = useContext(LevelContext)
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
				{/* {<h3>Yesterday</h3>} */}
				<Reorder.Group axis="y" values={notes} onReorder={(newOrder) => reorder(folders.selection.folder, 'notes', newOrder)} className='reorder-group' ref={notesbarRef}>
					{notes.map((note, index) => (
						<Reorder.Item key={note} value={note} className='reorder-item'
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
	const { folders, color, addFolder } = useContext(LevelContext)
	let addLocation = folders.selection.folder
	addLocation = addLocation === 'Recents' ? 'root' : addLocation
	return (
		<div className='folder-display'>
			<div className='topbar-sidebar' style={{ height: '6.2rem'}}>
			{/* placeholder height until add options button (make each topbar button have one uniform class) */}
			</div>
			<div className='folder-display-inner'>
				<div className='navbar-sidebar navbar-folder'>
					<button className='add-folder flex-center' onClick={() => addFolder(addLocation)}>
						<svg xmlns="http://www.w3.org/2000/svg" width='140%' height='140%' viewBox="4 4 35 47.25" fill={color}>
							<path fillRule="evenodd" clipRule="evenodd" d="M17.41,10.858c0.179,0,0.359,0.09,0.449,0.09l4.846,4.577h11.757  c0.987-0.09,2.423,1.256,2.423,2.333v6.677c0.294-0.025,0.596-0.04,0.897-0.04c0.427,0,0.844,0.029,1.257,0.083v-6.989  c0-1.884-2.334-4.218-4.219-4.218H23.603c-1.974-1.705-3.859-4.218-5.833-4.667H7.807c-1.884,0-4.217,2.244-4.307,4.128v18.667  c0,1.705,2.513,4.218,4.218,4.128h20.687c-0.09-0.527-0.136-1.066-0.136-1.619c0-0.18,0.003-0.358,0.014-0.534H7.987  c-1.077,0-2.333-1.347-2.333-2.334V13.191c-0.179-0.987,1.615-2.602,2.513-2.333H17.41z M37.789,30.598  c-0.488,0-0.887,0.417-0.887,0.927l-0.007,1.586h-1.595c-0.513,0-0.929,0.402-0.929,0.897c0,0.496,0.416,0.897,0.929,0.897h1.587  l-0.003,1.587c0,0.51,0.416,0.908,0.904,0.908l-0.014,0.019c0.487,0,0.904-0.435,0.904-0.944v-1.569h1.583  c0.514,0,0.93-0.401,0.93-0.897c0-0.495-0.416-0.897-0.93-0.897H38.68v-1.586C38.68,31.015,38.281,30.598,37.789,30.598z   M43.705,34.008c0,3.321-2.872,5.923-5.923,5.923c-3.41,0-5.924-2.871-5.924-5.923c0-3.141,2.514-5.923,5.924-5.923  C41.103,28.085,43.705,30.867,43.705,34.008z M45.5,33.918c0-4.218-3.41-7.628-7.718-7.628s-7.718,3.41-7.718,7.718  c0,4.309,3.41,7.718,7.718,7.718S45.5,38.316,45.5,33.918z"/>
						</svg>
					</button>
				</div>
				<RenderChildFolders folderId="root"/>
			</div>
		</div>
	)
}

function RenderChildFolders({ folderId, indent = 0 }) {
	const { folders, notes } = useContext(LevelContext)
	const folder = folders.byId[folderId]
	if (folder.folders === undefined) {
		return
	}
	return (
		<>
			{folder.folders.map((id) => (
				<Folder key={id} {...{id, indent}}> 
					<RenderChildFolders folderId={id} indent={indent + 1}/>
				</Folder>
			))}
		</>
	)
}