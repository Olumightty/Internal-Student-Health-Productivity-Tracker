import React from 'react'
import { NavLink } from 'react-router-dom'

const NaV = () => {
  return (
    <nav className="my-6 mx-auto w-fit">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border">
          <NavLink
            to={'/create'}
            className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`
              }
          >
           Create
          </NavLink>
          <NavLink
            to={'/myLogs'}
            className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`
              }
          >
            My Logs
          </NavLink>
          <NavLink
            to={'/insights'}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-medium transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`
            }
          >
            Insights
          </NavLink>
        </div>
      </nav>
  )
}

export default NaV