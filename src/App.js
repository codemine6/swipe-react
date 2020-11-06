import React, {Suspense, lazy} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {AuthContextProvider} from './services/AuthContext'

const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const Bookmarks = lazy(() => import('./pages/Bookmarks/Bookmarks'))
const Chats = lazy(() => import('./pages/Chats/Chats'))
const ChatDetails = lazy(() => import('./pages/ChatDetails/ChatDetails'))
const CreatePost = lazy(() => import('./pages/CreatePost/CreatePost'))
const CreateStory = lazy(() => import('./pages/CreateStory/CreateStory'))
const EditPost = lazy(() => import('./pages/EditPost/EditPost'))
const EditProfile = lazy(() => import('./pages/EditProfile/EditProfile'))
const Followers = lazy(() => import('./pages/Followers/Followers'))
const Home = lazy(() => import('./pages/Home/Home'))
const PostDetails = lazy(() => import('./pages/PostDetails/PostDetails'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const Report = lazy(() => import('./pages/Report/Report'))
const Search = lazy(() => import('./pages/Search/Search'))
const Settings = lazy(() => import('./pages/Settings/Settings'))
const StoryDetails = lazy(() => import('./pages/StoryDetails/StoryDetails'))
const UserDetails = lazy(() => import('./pages/UserDetails/UserDetails'))
const Error = lazy(() => import('./pages/Error/Error'))

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            localStorage.getItem('login') ? <Component {...props}/> : <Redirect to='/login'/>
        )}/>
    )
}

const App = () => {
    return (
        <AuthContextProvider>
        <BrowserRouter>
        <Suspense fallback={<div>Loading..</div>}>
        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <PrivateRoute path='/bookmarks' component={Bookmarks}/>
            <PrivateRoute path='/chats' component={Chats}/>
            <PrivateRoute path='/chat/:id' component={ChatDetails}/>
            <PrivateRoute path='/create-post' component={CreatePost}/>
            <PrivateRoute path='/create-story' component={CreateStory}/>
            <PrivateRoute path='/edit/:id' component={EditPost}/>
            <PrivateRoute path='/edit-profile' component={EditProfile}/>
            <PrivateRoute path='/followers' component={Followers}/>
            <PrivateRoute path='/' exact component={Home}/>
            <PrivateRoute path='/post/:id' component={PostDetails}/>
            <PrivateRoute path='/profile' component={Profile}/>
            <PrivateRoute path='/report' component={Report}/>
            <PrivateRoute path='/search' component={Search}/>
            <PrivateRoute path='/settings' component={Settings}/>
            <PrivateRoute path='/story/:id' component={StoryDetails}/>
            <PrivateRoute path='/user/:id' component={UserDetails}/>
            <Route path='*' component={Error}/>
        </Switch>
        </Suspense>
        </BrowserRouter>
        </AuthContextProvider>
    )
}

export default App