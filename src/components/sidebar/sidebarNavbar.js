import { useContext, useState } from "react"
import { motion, useCycle } from 'framer-motion'
import '../../styles/sidebar/SidebarNavbar.css'
import { LevelContext } from "../../contexts/LevelContext"

export default function Navbar() {
	const { folders } = useContext(LevelContext)
	return (
		<nav className='navbar-sidebar'>
			<div className='navbar-sidebar-header-container'>
				<h2 className='folder-name-header'>{folders.byId[folders.selection.folder].title}</h2>
			</div>
			<div className="flex-center navbar-button-wrapper">
				<NewNote/>
				<Margin/>
				<SearchButton/>
			</div>
		</nav>
	)
}

export function Margin() {
	return <div className="margin"/>
}

export function NewNote() {
	let { color, folders, addNote } = useContext(LevelContext)

	return (
		<motion.button className='new-note-button button' type="button" onClick={() => addNote(folders.selection.folder)}>
			<svg className="svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill={color}>
				<g>
					<path d="M24.98 30.009h-23v-25h14.050l2.022-1.948-0.052-0.052h-16.020c-1.105 0-2 0.896-2 2v25c0 1.105 0.895 2 2 2h23c1.105 0 2-0.895 2-2v-14.646l-2 1.909v12.736zM30.445 1.295c-0.902-0.865-1.898-1.304-2.961-1.304-1.663 0-2.876 1.074-3.206 1.403-0.468 0.462-13.724 13.699-13.724 13.699-0.104 0.106-0.18 0.235-0.219 0.38-0.359 1.326-2.159 7.218-2.176 7.277-0.093 0.302-0.010 0.631 0.213 0.851 0.159 0.16 0.373 0.245 0.591 0.245 0.086 0 0.172-0.012 0.257-0.039 0.061-0.020 6.141-1.986 7.141-2.285 0.132-0.039 0.252-0.11 0.351-0.207 0.631-0.623 12.816-12.618 13.802-13.637 1.020-1.052 1.526-2.146 1.507-3.253-0.019-1.094-0.55-2.147-1.575-3.129zM29.076 6.285c-0.556 0.574-4.914 4.88-12.952 12.798l-0.615 0.607c-0.921 0.285-3.128 0.994-4.796 1.532 0.537-1.773 1.181-3.916 1.469-4.929 1.717-1.715 13.075-13.055 13.506-13.48 0.084-0.084 0.851-0.821 1.795-0.821 0.536 0 1.053 0.244 1.577 0.748 0.627 0.602 0.95 1.179 0.959 1.72 0.010 0.556-0.308 1.171-0.943 1.827z"/> 
					<line x1="22.5" y1="3.5" x2="28" y2="9" stroke={color} strokeWidth="2"/>
				</g>
			</svg>
			{/* {<p className="new-note-text"><i>New Note</i></p>} */}
		</motion.button>
	)
}

export function SearchButton(){
	let { color } = useContext(LevelContext)
	let [searchOpen, setSearchOpen] = useState(false)
	return (
		<motion.search className="search">
			{searchOpen ? 
			<form>
				<label></label>
				<input className="search-input"/>
				<button type="submit"></button>
			</form>
			:
			<button className="button" onClick={() => setSearchOpen(true)}>
				<svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" stroke={color} strokeWidth='1.5px' fill={color}>
					<path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
				</svg>
			</button>
			}
		</motion.search>
	)
}

export function BackButton() {
	let { color } = useContext(LevelContext)
	return (
		<button className="topbar-nav-back-button">
			{/* {<p style={{color: 'var(--text-color)', margin: '0', padding: '0'}}>{`<-`}</p>} */}
			<svg className="svg" viewBox="0 0 36 36" stroke={color} strokeWidth='6px' strokeLinecap="round">
				<g>
					<line x1='4' y1='18' x2='16' y2='6'/>
					<line x1='4' y1='18' x2='16' y2='30'/>
				</g>
			</svg>
		</button>
	)
}