import React from 'react'
import PreviousEntriesTable from '../components/PreviousEntriesTable'
import useUserLogs from '../hooks/userLogs'
import Header from '../components/Header'
import CustomLoader from '../components/CustomLoader'
import NaV from '../components/NaV'

const Dashboard = () => {
  const {userLogs, loading} = useUserLogs();

    if(loading) return <CustomLoader/>
  return (
    <>  
        <NaV/>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 px-8">Entries</h3>
          <PreviousEntriesTable entries={userLogs} />
        </div>
        
    </>
  )
}

export default Dashboard