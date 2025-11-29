import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider } from 'react-router-dom';
import Postlist from './Components/Postlist.jsx';
import CreatePost from './Components/CreatePost.jsx';
import EditPost from './Components/EditPost.jsx';

const router = createBrowserRouter([
    {path:"/", element:<App/> ,children:[
        {path:"/",element:<Postlist/>},
        {path:"/create-post", element:<CreatePost/>},
        {path:"/edit/:postId", element:<EditPost/>}
    ]}
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)