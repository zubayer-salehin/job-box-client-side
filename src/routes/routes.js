import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import Main from "../layout/main/Main";
import AccountCreator from "../pages/register/AccountCreator";
import Home from "../pages/home/Home";
import Jobs from "../pages/Jobs";
import Login from "../pages/Login";
import JobDetails from "../pages/JobDetails"
import Signup from "../pages/Signup";
import PrivateRoute from "../utils/PrivateRoute";
import AddJob from "../pages/employeeDashboard/AddJob";
import EmployerDashboard from "../pages/employeeDashboard/EmployerDashboard";
import CandidateDashboard from "../pages/candidateDashboard/CandidateDashboard";
import AppliedJobs from "../pages/candidateDashboard/AppliedJobs";
import PostJob from "../pages/employeeDashboard/PostJob";
import ApplyCandidate from "../pages/employeeDashboard/ApplyCandidate";
import CandidateDetails from "../pages/employeeDashboard/CandidateDetails";
import ChatWithCandidate from "../pages/employeeDashboard/ChatWithCandidate";
import ChatWithEmployer from "../pages/candidateDashboard/ChatWithEmployer";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/job-details/:id",
        element: <JobDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/register",
        element: (
          <PrivateRoute>
            <AccountCreator />
          </PrivateRoute>
        ),
      },
      {
        path: "/register/:type",
        element: (
          <PrivateRoute>
            <AccountCreator />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "applied-jobs",
        element: <AppliedJobs />,
      },
      {
        path: "add-job",
        element: <AddJob />,
      },
      {
        path: "post-job",
        element: <PostJob />,
      },
      {
        path: "apply-candidate/:jobId",
        element: <ApplyCandidate />,
      },
      {
        path: "candidate-details/:id",
        element: <CandidateDetails />,
      },
      {
        path: "chat-with-candidate/:jobAndCandidateId",
        element: <ChatWithCandidate />,
      },
      {
        path: "chat-with-employer/:jobAndCandidateId",
        element: <ChatWithEmployer />,
      },
      {
        path: "employer",
        element: <EmployerDashboard />,
      },
      {
        path: "candidate",
        element: <CandidateDashboard />,
      },
    ],
  },
]);

export default routes;
