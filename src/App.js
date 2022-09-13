import './App.css';
import Header from './components/Header';
import {Routes,Route,Navigate} from 'react-router-dom'
import FirstPage from './components/FirstPage';
import UsersPage from './components/UsersPage';
import Detailspage from './components/Detailspage';
import Network from './components/Network';

function App() {


  return (
    <div style={{overflowX: "hidden"}}>
      <Header/>
      
      <Routes>
        <Route path="/" element={<FirstPage/>} />
        <Route path="/home/users" element={<UsersPage/>} />
        <Route path="/home/user/:id" element={<Detailspage/>} />
        <Route path='/home/networks' element={<Network/>} />
        <Route path="*" element={<Navigate to='/'/>} />
      </Routes>
    
    </div>
  );
}

export default App;
