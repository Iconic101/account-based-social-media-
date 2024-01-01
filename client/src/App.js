import { FaSearch } from 'react-icons/fa';
import { Route, Routes } from 'react-router-dom';
import AddPost from './components/AddPost';
// import Landing from './components/landing';
import Posts from './components/Posts'
import SignIn from './components/SignIn';
import UserPanel from './components/UserPanel';
import Visit from './components/Visit';

function App() {

  return (
    <>
    

        <Routes>
      {/* <Route path='/' element={<Landing/>}/> */}

      <Route path='/' element={<SignIn/>}/>
      <Route path='/feed' element={<Posts/>}/>
      <Route path='/create' element={<AddPost/>}/>
      <Route path='/userInfo' element={<UserPanel/>}/>
      <Route path='/visit' element={<Visit/>}/>


    </Routes>
    </>

  )
   
}

export default App;
