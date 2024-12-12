import { useEffect, useState } from 'react';
import './styles/App.css';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import AddButton from './components/adder';
import Main from './components/main';

function App() {
  var [dataTheme, setDataTheme] = useState(() => {
    const storedTheme = localStorage.getItem("dataTheme")
    if (storedTheme === null || storedTheme === undefined) {
      localStorage.setItem("dataTheme", "light")
      return "light"
    }
    return storedTheme
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dataTheme)
    localStorage.setItem("dataTheme", dataTheme)
  }, [dataTheme])

  var color = dataTheme === 'light' ? 'black' : 'white'
  var [notes, setNotes] = useState([0, 1, 2, 3, 4])
  var [sidebarOpen, setSidebarOpen] = useState(true)
  var props = { dataTheme, setDataTheme, color, notes, setNotes, sidebarOpen, setSidebarOpen}

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
