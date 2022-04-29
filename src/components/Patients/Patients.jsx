import { Card, CardContent, Typography } from '@mui/material'
import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';


const Patients = () => {

  // create a useEffect hook to fetch patients from graphql and set state
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients(){
    try{
      const patientData = await API.graphql({ query: queries.listPatients });
      setPatients(patients);
    } catch(err){
      console.log(err);
    }
  }
  



  return (
    <Card sx={{ minWidth: 200, minHeight: 600 }}>
      <CardContent sx={{ alignItems: 'center' }}>
        <Typography>
          {JSON.stringify(patients)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Patients