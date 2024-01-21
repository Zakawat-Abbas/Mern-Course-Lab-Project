import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'


import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Project from "./components/Project";
import TeamName from "./components/Team";
import UserStory from "./components/UserStory";
import Task from "./components/Task";
import ViewTasks from './components/ViewTasks';
import ViewTeams from './components/ViewTeams';
import ViewProjects from './components/ViewProjects';
import TeamRosters from './components/TeamRosters';
import RemoveTeamMembers from './components/RemoveTeamMembers';
import ViewUserStories from './components/ViewUserStories';
import AssignUserStories from './components/AssignUserStories';
import UserProjects from './components/UserProjects';

const root = ReactDOM.createRoot(document.getElementById("root"));


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/createprojects" element={<Project />} />
      <Route path="/viewprojects" element={<ViewProjects />} />
      <Route path="/createteams" element={<TeamName />} />
      <Route path="/viewteams" element={<ViewTeams />} />
      <Route path="/teamRosters" element={<TeamRosters />} />
      <Route path="/removeteammmember" element={<RemoveTeamMembers />} />
      <Route path="/userStories" element={<UserStory />} />
      <Route path="/viewUserStories" element={<ViewUserStories />} />
      <Route path="/userProjects" element={<UserProjects />} />

      <Route path="/assignUserStories" element={<AssignUserStories />} />
      <Route path="/tasks" element={<Task />} />
      <Route path="/viewTasks" element={<ViewTasks />} />
    </>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} >
      <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
