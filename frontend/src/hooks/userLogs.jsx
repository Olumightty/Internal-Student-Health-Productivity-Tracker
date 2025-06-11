import React, { useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from '../components/AuthenticationContext';

const useUserLogs = () => {
    const [userLogs, setUserLogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const {user} = useAuthContext()
    const fetchUserLogs = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://z9fle6zssg.execute-api.us-east-1.amazonaws.com/dev/log?userId=${user.profile.sub}`);
          const data = response.data;
          console.log(data);
          setUserLogs(data.logs);
          
        } catch (error) {
          console.error('Error fetching user logs:', error);
        }finally{
          setLoading(false);
        }
      };
      useEffect(() => {
        fetchUserLogs()
      }, [])
  return {userLogs, loading}
}

export default useUserLogs