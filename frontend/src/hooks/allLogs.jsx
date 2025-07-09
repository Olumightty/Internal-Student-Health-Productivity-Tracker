import React, { useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from '../components/AuthenticationContext';

const useAllLogs = () => {
    const [allLogs, setAllLogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const {user} = useAuthContext()
    const fetchUserLogs = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_GATEWAY_URL}?userId=${user.profile.sub}&getAll=true`, {
            headers:{
              Authorization: `Bearer ${user.id_token}`
            }
          });
          const data = response.data;
          // console.log(data);
          setAllLogs(data.logs);
          
        } catch (error) {
          console.error('Error fetching user logs:', error);
        }finally{
          setLoading(false);
        }
      };
      useEffect(() => {
        fetchUserLogs()
      }, [])
  return {allLogs, loading}
}

export default useAllLogs