import { useContext, useState } from "react"
import { motion } from 'framer-motion'
import '../../styles/sidebar/SidebarNavbar.css'
import { LevelContext } from "../../contexts/LevelContext"

export default function Navbar() {
	return (
		<nav className='navbar-sidebar'>
			<div className='navbar-sidebar-header-container'>
				<BackButton/>
				<h2 className='folder-name-header'>Recents</h2>
			</div>
			<SearchButton/>
			<AddButton/>
		</nav>
	)
}

export function AddButton() {
	let { notes, setNotes } = useContext(LevelContext)
	var [idCounter, setIdCounter] = useState(4)
	const addItem = () => {
		setIdCounter(idCounter+1)
		setNotes([...notes, { title: "Untitled", id: idCounter}])
	}

	return (
		<motion.button className='add-button' type="button" onClick={addItem}>
			{/* {<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox='0 0 35 35'>
				<line x1="18" y1="0" x2="18" y2="35" stroke={props.color} strokeWidth="5"/>
				<line x1="0" y1="18" x2="35" y2="18" stroke={props.color} strokeWidth="5"/>
			</svg>} */}
			<p className="adder-text"><i>New Note</i></p>
		</motion.button>
	)
}

export function SearchButton(){
	return (
		<search className="search">
			<form>
				<label></label>
				<input className="search-input"/>
				<button></button>
			</form>
		</search>
	)
}

export function BackButton() {
	let { color } = useContext(LevelContext)
	return (
		<button className="topbar-nav-back-button">
			{/* {<p style={{color: 'var(--text-color)', margin: '0', padding: '0'}}>{`<-`}</p>} */}
			<svg height='90%' width='90%' viewBox="0 0 36 36" stroke={color} strokeWidth='6px' strokeLinecap="round">
				<g>
					<line x1='4' y1='18' x2='16' y2='6'/>
					<line x1='4' y1='18' x2='16' y2='30'/>
				</g>
			</svg>
		</button>
	)
}