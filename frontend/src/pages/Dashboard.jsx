import React, { useEffect }  from 'react'
import DailyLogForm from '../components/DailyLogForm'
import PreviousEntriesTable from '../components/PreviousEntriesTable'
import useUserLogs from '../hooks/userLogs'
import Header from '../components/Header'

const Dashboard = () => {
  const {userLogs, loading} = useUserLogs();
  const [todaysEntry, setTodaysEntry] = React.useState(null);
  
    // const mockEntries = [
    //     {
    //       id: 1,
    //       date: '2025-06-09',
    //       productivity: 'Completed AWS Lambda tutorial and deployed my first serverless function',
    //       feedback: 'Great hands-on session, would love more real-world examples',
    //       blockers: 'Had trouble with IAM permissions setup'
    //     },
    //     {
    //       id: 2,
    //       date: '2025-06-08',
    //       productivity: 'Learned about Auto Scaling and Load Balancing concepts',
    //       feedback: 'Content was well structured, but could use more visual diagrams',
    //       blockers: 'None today'
    //     }
    //   ];

    useEffect(() => {
      const date = new Date().toISOString().split('T')[0];
      console.log(date);
      const entry = userLogs.find(entry => String(entry.createdAt).split('T')[0] === date);
      setTodaysEntry(entry);
    }, [userLogs, loading])
  return (
    <>  
        {!todaysEntry || loading && <DailyLogForm todaysEntry={null} />}
        <PreviousEntriesTable entries={userLogs} />
    </>
  )
}

export default Dashboard