import { motion, useCycle } from 'framer-motion';
import '../../styles/sidebar/MenuItem.css'
import { useContext, useState } from 'react';
import { LevelContext } from '../../contexts/LevelContext';

const colors = ["var(--color-primary-lightest)", "var(--color-primary-lighter)", "var(--color-primary-light)", "var(--color-primary)", "var(--color-primary-dark)", "var(--color-primary-darker)", "var(--color-primary-darkest)"];

export function Item({ index }) {
	const { getObject, notes } = useContext(LevelContext)
	const [isHoovering, setIsHoovering] = useCycle(false, true)
	const id = notes[index]
	const note = getObject(id)
	const style = { borderLeft: `2px solid ${colors[index < colors.length ? index : colors.length - 1]}`};
	return (
		<Card initial='open' {...{ style, setIsHoovering, id}}>
			<CardHeader>
				<CardTitle>{note.title}</CardTitle>
				{isHoovering && <CardOptions/>}
			</CardHeader>
			<CardDescription>{note.description}</CardDescription>
			{/* display here like little previews of other stuff 
			like graphs or whatever else you're tracking*/}
		</Card>
	)
}


export function Card({ children, style, setIsHoovering, id }) {
	const { select } = useContext(LevelContext)
	return (
		<motion.div 
			style={style}
			className="card"
			whileHover={{ scale: 1.05 }}
			onMouseEnter={setIsHoovering}
			onMouseLeave={setIsHoovering}
			onClick={() => select(id)}
		>
			{ children }
		</motion.div>
	)
}

export function CardHeader({ children }) {
	return <div className='card-header'>{ children }</div>
}

export function CardTitle({ children }) {
	return <h3 className="card-title">{ children }</h3>
}

export function CardDescription({ children }) {
	return <p className='card-description'>{ children }</p>
}

export function CardOptions() {
	const { color, deleteObj } = useContext(LevelContext)
	var [optionsOpen, setOptionsOpen] = useCycle(false, true)
	return (
		<div className='card-options-container'>
			<button className='card-options-button' onClick={setOptionsOpen}>
				<svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 16 16" 
					stroke={color} fill={color} strokeLinecap='round'
				>
					<motion.path
						initial={'closed'}
						variants={{
								closed: {
										strokeWidth: '3',
										d: 'M1.5 8 L 1.5 8',
								},
								open: {
										strokeWidth: '2',
										d: 'M1.5 8 L 8 13',
								}
						}}
						animate={optionsOpen ? 'open' : 'closed'}
					/>
					<motion.path
						initial={'closed'}
						variants={{
								closed: {
										d: 'M8 8 L8 8',
										strokeWidth: '3'
								},
								open: {
										d: 'M8 13 L8 13',
										strokeWidth: '2'
								}
						}}
						animate={optionsOpen ? 'open' : 'closed'}
					/>
					<motion.path
						initial={'closed'}
						variants={{
							closed: {
								strokeWidth: '3',
								d: 'M14.5 8 L 14.5 8',
							},
							open: {
								strokeWidth: '2',
								d: 'M14.5 8 L 8 13',
							}
						}}
						animate={optionsOpen ? 'open' : 'closed'}
					/>
				</svg>
			</button>
		</div>
	)
}