import { motion, transform, useCycle, useVelocity } from 'framer-motion';
import { useEffect, useState } from 'react';

const colors = ["var(--color-primary-lightest)", "var(--color-primary-lighter)", "var(--color-primary-light)", "var(--color-primary)", "var(--color-primary-dark)", "var(--color-primary-darker)", "var(--color-primary-darkest)"];

export function Item(props) {
    var index = props.index
    var notes = props.notes
    var note = notes[index]
    const style = { border: `2px solid ${colors[index < colors.length ? index : colors.length - 1]}`, zIndex: '1', position: 'relative'};
    const removeNote = () => {
        props.setNotes(notes.filter((n) => n !== note))
    }
    return (
        <Card initial='open' style={style} {...props}>
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardOptions removeNote={removeNote} {...props}/>
            </CardHeader>
            <CardDescription>{note.description}</CardDescription>
            {/* display here like little previews of other stuff 
            like graphs or whatever else you're tracking*/}
        </Card>
    )
}


export function Card({ children, style }) {
    return (
        <motion.div 
            style={style}
            className="card"
            whileHover={{ scale: 1.05 }}
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

export function CardOptions(props) {
    var [optionsOpen, setOptionsOpen] = useCycle(false, true)
    return (
        <div className='card-options-container'>
            <button className='card-options-button' onClick={setOptionsOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 16 16" 
                    stroke={props.color} fill={props.color} strokeLinecap='round'
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
                                d: 'M1.5 8 L 8 14',
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
                                d: 'M8 14 L8 14',
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
                                d: 'M14.5 8 L 8 14',
                            }
                        }}
                        animate={optionsOpen ? 'open' : 'closed'}
                    />
                </svg>
            </button>
        </div>
    )
}