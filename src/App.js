import './styles/App.css';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import AddButton from './components/adder';
import Main from './components/main';
import { useAppLogic } from './scripts/appLogic';

function App() {
  const props = useAppLogic()

  return (
    <>
      <div className='content'>
        <Sidebar {...props}/>
        <Main {...props}/>
        <AddButton {...props}/>
      </div>
      <Footer/>
    </>
  )
}

export default App;
