import React , { useEffect , useContext } from 'react';
import { Switch , Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Register from './components/users/Register';
import { UserContext } from './context/UserContext';
import ProfileContextProvider from './context/ProfileContext';
import Login from './components/users/Login';
import PrivateRoute from './routes/PrivateRoute';
import Landing from './components/layout/Landing';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import AddEduc from './components/profile/AddEduc';
import AddExp from './components/profile/AddExp';
import Posts from './components/posts/Posts';
import PostContextProvider from './context/PostContext';
import Comments from './components/posts/Comments';
import Profiles from './components/profile/Profiles';
import DevProfile from './components/profile/DevProfile';
import checkAuth from './components/users/checkAuth';
import Not_found from './components/layout/Not_found';

function App() {
  const { userDispatch } = useContext(UserContext)
  
useEffect(()=>{
    checkAuth(userDispatch)
},[userDispatch])

  return (
    <ProfileContextProvider>
    <PostContextProvider>
      <Navbar/>
        <Switch>
            <Route exact path='/home' component={Landing}/>
            <Route  path='/register' component={Register}/>
            <Route  path='/login' component={Login}/>

            <PrivateRoute  path='/profile' component={Profile} />
            <PrivateRoute  path='/editprofile' component={EditProfile} />
            <PrivateRoute  path='/addexp' component={AddExp} />
            <PrivateRoute  path='/addeduc' component={AddEduc} />
            <PrivateRoute  path='/posts' component={Posts} />
            <PrivateRoute  path='/comments' component={Comments} />
            <PrivateRoute  path='/profiles' component={Profiles}/>
            <PrivateRoute  path='/dev_profile/:id' component={DevProfile}/>
            <Route   component={Not_found}/>
        </Switch>
    </PostContextProvider>
    </ProfileContextProvider>
  );
}

export default App;
