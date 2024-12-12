import { motion } from 'framer-motion';

const colors = ["var(--color-primary-light)", "var(--color-primary)", "var(--color-primary-dark)", "var(--color-primary-darker)", "var(--color-primary-darkest)"];

export function Item(props) {
    var index = props.index
    var notes = props.notes
    var note = notes[index]
    const style = { border: `2px solid ${colors[index < colors.length ? index : colors.length - 1]}` };
    const removeNote = (noteToRemove) => {
        props.setNotes(notes.filter((note) => note !== noteToRemove))
    }
    return (
        <Card style={style} {...props}>
            <CardHeader>
                <CardTitle>Card {index}</CardTitle>
            </CardHeader>
            <CardDescription></CardDescription>
            <button type="button" onClick={() => removeNote(note)}>Remove Item</button>
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
    return <div>{ children }</div>
}

export function CardTitle({ children }) {
    return <h1 className="card-title">{ children }</h1>
}

export function CardDescription({ children }) {
    return <div>{ children }</div>
}