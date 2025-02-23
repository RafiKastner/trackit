import './styles/App.css';
import Sidebar from './components/sidebar/sidebar';
import Footer from './components/footer';
import Main from './components/main/main';
import { LevelContextProvider } from './contexts/LevelContext';

function App() {
	return (
		<>
			<LevelContextProvider>
				<div className='content'>
					<Sidebar/>
					<Main/>
				</div>
				<Footer/>
			</LevelContextProvider>
		</>
	)
}

export default App;
