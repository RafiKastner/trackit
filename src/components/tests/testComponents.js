import { useContext, useEffect } from 'react';
import { LevelContext } from './contexts/LevelContext';

export function Button() {
    const { color, notes, addFolder, folders } = useContext(LevelContext)
    useEffect(() => {
        console.log('Updated folders:', folders);
    }, [folders]);
    useEffect(() => {
        console.log('Updated notes:', notes);
    }, [notes]);
    return (
        <button style={{ color: color }} onClick={
            () => {
                addFolder('2')
            }
        }>test</button>
    )
}