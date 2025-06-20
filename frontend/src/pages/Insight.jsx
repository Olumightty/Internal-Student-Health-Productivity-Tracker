import React from 'react'
import PreviousEntriesTable from '../components/PreviousEntriesTable'
import useAllLogs from '../hooks/allLogs'
import CustomLoader from '../components/CustomLoader'
import NaV from '../components/NaV'

const Insight = () => {
    const {allLogs, loading} = useAllLogs()

    if (loading) {
      return <CustomLoader/>
    }
  return (
    <div>
        <NaV/>
        <h3 className="text-xl font-bold text-gray-800 mb-2 px-8">Insights</h3>
        <p className="text-gray-500 text-sm px-8">Logs from other students</p>
        <PreviousEntriesTable entries={allLogs} />
    </div>
  )
}

export default Insight