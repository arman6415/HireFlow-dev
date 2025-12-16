import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth)

  if (user === null) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
