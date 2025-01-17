import './styles/App.css';
import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer';
import Main from './components/main';
import { LevelContext, LevelContextProvider } from './contexts/LevelContext';
import { useContext, useEffect } from 'react';

function App() {
	return (
		<>
			<LevelContextProvider>
				<Button/>
				<div className='content'>
					<Sidebar/>
					<Main/>
				</div>
				<Footer/>
			</LevelContextProvider>
		</>
	)
}

function Button() {
	const { color, notes, select, deleteObj, change, addFolder, changeFolder, deleteFolder, folders, addNote } = useContext(LevelContext)
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

export default App;
