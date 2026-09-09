import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "./components/componets_lite/Home";
import Login from "./components/authantication/Login";
import Register from "./components/authantication/Register";

import PrivacyPolicy from "./components/componets_lite/Privacypolcy";
import Termservices from "./components/componets_lite/Termservices";

import Jobs from "./components/componets_lite/Jobs";
import Browse from "./components/componets_lite/Browse";
import Profile from "./components/componets_lite/Profile";
import Description from "./components/componets_lite/Description";

import Company from "./components/componets_lite/Admincompany/Company";
import CompanyCreate from "./components/componets_lite/Admincompany/CompanyCreate";
import CompanySetup from "./components/componets_lite/Admincompany/CompanySetup";
import AdminJobs from "./components/componets_lite/Admincompany/AdminJobs";

import CreateJob from "./components/componets_lite/Admincompany/CreateJob";
import PostJobs from "./components/componets_lite/Admincompany/PostJobs";
import Applicants from "./components/componets_lite/Applicants";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },

  {
    path: "/Termservices",
    element: <Termservices />,
  },

  {
    path: "/jobs",
    element: <Jobs />,
  },

  {
    path: "/browse",
    element: <Browse />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },

  {
    path: "/description/:id",
    element: <Description />,
  },

  // =========================
  // ADMIN
  // =========================

  {
    path: "/admin",
    element: (
      <Navigate
        to="/admin/company"
        replace
      />
    ),
  },

  {
    path: "/admin/company",
    element: <Company />,
  },

  {
    path: "/admin/company/create",
    element: <CompanyCreate />,
  },

  {
    path: "/admin/company/:id",
    element: <CompanySetup />,
  },

  {
    path: "/admin/jobs",
    element: <AdminJobs />,
  },
{
  path: "/admin/jobs/create",
  element: <CreateJob />
},

  {
  path:"/admin/jobs/:id/edit",
  element:<PostJobs />,
  },
  {
     path:"/admin/jobs/:id/applicants",
  element: <Applicants />,
  },
]);


const App = () => {
  return (
    <RouterProvider router={appRouter} />
  );
};

export default App;