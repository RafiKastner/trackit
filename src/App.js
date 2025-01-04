import './styles/App.css';
import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer';
import Main from './components/main';
import { useAppLogic } from './scripts/appLogic';
import { LevelContext } from './contexts/LevelContext';

function App() {
	var props = useAppLogic()

	return (
		<>
			<LevelContext.Provider value={props}>
				<div className='content'>
					<Sidebar {...props}/>
					<Main {...props}/>
				</div>
				<Footer/>
			</LevelContext.Provider>
		</>
	)
}

export default App;
