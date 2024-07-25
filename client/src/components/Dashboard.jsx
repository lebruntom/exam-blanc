import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useCookies } from 'react-cookie';
import './Dashboard.css';

const Dashboard = () => {
    const baseURI = import.meta.env.VITE_API_BASE_URL

    const [clientsStats, setClientsStat] = useState(null)
    const [clients, setClients] = useState([])
    const [cookies] = useCookies();


    const [csrfToken, setCsrfToken] = useState("")

    useEffect(() => {
  
      fetch(baseURI + 'api/csrf-token', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json', 
        },
      })
      .then(response => response.json()) 
      .then(data => {
        setCsrfToken(data.csrfToken)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du CSRF token:', error);
      });
    }, []);

    useEffect(() => {

        fetch(baseURI + 'api/dashboard/stats', {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
            token: cookies.token
          },
        })
        .then(response => response.json()) 
        .then(data => {
            setClientsStat(data.stats);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération du CSRF token:', error);
        });


        
        fetch(baseURI + 'api/dashboard/clients', {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
            token: cookies.token
          },
        })
        .then(response => response.json()) 
        .then(data => {
          setClients(data.clients);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération du CSRF token:', error);
        });


      }, []);

      const handleDeleteClient = (id)=> {
        fetch(baseURI + `api/dashboard/clients/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json', 
            token: cookies.token,
            CSRF: csrfToken
          },
        })
        .then(response => response.json()) 
        .then(data => {
          console.log(data);
          setClients((ps)=> ([...ps.filter((el)=> el.id !== parseInt(data.id))]))
        })
        .catch(error => {
          console.error('Erreur lors de la récupération du CSRF token:', error);
        });
      }


    return (
        <>
            <Header />
            
            {clientsStats && <div className='dashboard-title'>Le site comprend {clientsStats.nbClients} clients</div>}

            {clients.map((el)=> {
              return (
                <div key={el.id} className='dashboard_line'>
                    <div>{el.email}</div>
                    <div>{el.firstname}</div>
                    <div>{el.lastname}</div>
                    <div onClick={()=> handleDeleteClient(el.id)}>supprimer</div>
                </div>
              )
            })}
        </>
    );
};

export default Dashboard;