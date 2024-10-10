import PrivateRoute from "../components/PrivateRoute"
import Task from "../pages/Task"
import DefaultLayout from "../layout"
import Home from "../pages/Home"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import TaskDetail from "../pages/Task/TaskDetail"

export const routes = [
  {
    path: "user/login",
    element: <Login/>
  },
  {
    path: "user/register",
    element: <SignUp/>
  },
  {
    element: <PrivateRoute/>,
    children: [
      {
        path: "/",
        element: <DefaultLayout/>,
        children: [
          {
            index: true,
            element: <Home/>
          },
          {
            path: "task",
            element: <Task/>,
          },
          {
            path: "task/detail/:id",
            element: <TaskDetail/>
          }
        ]
      }
    ]
  }
]