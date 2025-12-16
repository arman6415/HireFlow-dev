import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Companies from "./components/admin/Companies"
import CompanyCreate from "./components/admin/CompanyCreate"
import CompanySetup from "./components/admin/CompanySetup"
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from "./components/admin/PostJob"
import Applicants from "./components/admin/Applicants"
import CompanyApplicants from "./components/admin/CompanyApplicants"
import ProtectedRoute from "./components/ProtectedRoute"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/jobs',
        element: <Jobs />
      },
      {
        path: '/browse',
        element: <Browse />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/description/:id',
        element: <JobDescription />
      },
      {
        path: '/admin/companies',
        element: <Companies />
      },
      {
        path: '/admin/companies/create',
        element: <CompanyCreate />
      },
      {
        path: '/admin/jobs',
        element: <AdminJobs />
      },
      {
        path: '/admin/companies/:id',
        element: <CompanySetup />
      },
      {
        path: '/admin/companies/:id/applicants',
        element: <CompanyApplicants />
      },
      {
        path: '/admin/jobs/create',
        element: <PostJob />
      },
      {
        path: '/admin/jobs/:id/applicants',
        element: <Applicants />
      },
      {
        path: '/admin/jobs/edit/:id',
        element: <PostJob />
      },
    ]
  }
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App

