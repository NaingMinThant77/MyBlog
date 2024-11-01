import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Main from './layout/Main'
import Posts, { loader as postsLoader } from './pages/Posts'
import Create from './pages/Create'
import { action as postCreateAction } from './components/PostForm'
import { action as postUpdate } from './components/PostForm'
import Detail, { action as deleteAction, loader as detailLoader } from './pages/Detail'
import Edit from './pages/Edit'
import Error from './pages/Error'
import Auth, { action as authAction } from './pages/Auth'
import { loader as logoutLoader } from './pages/Logout'
import { checkTokenLoader, tokenLoader } from './util/auth'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", element: <Main />, errorElement: <Error />, id: "root", loader: tokenLoader, children: [
        { index: true, element: <Posts />, loader: postsLoader },
        { path: "/create-post", element: <Create />, action: postCreateAction, loader: checkTokenLoader },
        {
          path: ":id", id: "post-detail", loader: detailLoader, children: [
            { index: true, element: <Detail />, action: deleteAction },
            { path: "edit-post", element: <Edit />, action: postUpdate, loader: checkTokenLoader }
          ]
        },
        { path: "/auth", element: <Auth />, action: authAction },
        { path: "/logout", loader: logoutLoader }
      ]
    }
  ])
  return (
    <RouterProvider router={router}>App</RouterProvider>
  )
}

export default App