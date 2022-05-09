import { Box, Card, CardContent, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { API } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import * as queries from '../../graphql/queries';

const Reports = () => {

  const [patient, setPatient] = useState({
    id: '',
    firstName: '',
    surname: '',
    dateOfBirth: null,
    sex: '',
    email: '',
    alcoholUse: '',
    drugUse: '',
    physicalLevel: '',
    smokingStatus: '',
    dietClass: '',
    medicalDiagnosis: {
      items: []
    }
  });
  const [patients, setPatients] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const patientsData = await API.graphql({
        query: queries.listPatients,
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      setPatients(patientsData.data.listPatients.items);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchPatient = async (id) => {
    try {
      const patientData = await API.graphql({
        query: queries.getPatient,
        variables: { id: id },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      setPatient(patientData.data.getPatient);
    } catch (err) {
      console.log(err);
    }
  }

  const handlePatientSelect = (event) => {
    fetchPatient(event.target.value.id);
  };

  const handleDiagnosisSelect = (event) => {
    console.log(event.target.value);
    setDate(new Date(event.target.value.updatedAt));
    setDiagnosis(event.target.value);
  }

  const listPatients = patients.map((patient) => {
    return (
      <MenuItem key={patient.id} value={patient}>
        {patient.dateOfBirth} {patient.firstName} {patient.surname}
      </MenuItem>
    );
  })

  const listDiagnoses = patient.medicalDiagnosis.items.map((diagnosis) => {
    const dateList = new Date(diagnosis.updatedAt);

    return (
      <MenuItem key={diagnosis.id} value={diagnosis}>
        {dateList.toUTCString()}
      </MenuItem>
    );
  })

  return (
    <Card sx={{ height: '85vh', width: '100%' }}>
      <CardContent >
        {diagnosis ?
          <Box sx={{ display: 'grid', placeItems: 'center' }}>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, mt: 1, mb: 1 }}>
              {patient.firstName} {patient.surname}
            </Typography>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, mt: 1, mb: 20 }}>
              {date.toUTCString()}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  Overall speech sentiment: {diagnosis.diagnosisSpeechSentiment}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  Happy: {diagnosis.happy.toFixed(2)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Neutral: {diagnosis.neutral.toFixed(2)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Sad: {diagnosis.sad.toFixed(2)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Angry: {diagnosis.angry.toFixed(2)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Disgusted: {diagnosis.disgusted.toFixed(2)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Fearful: {diagnosis.fearful.toFixed(2)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Surprised: {diagnosis.surprised.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xl >
              <VictoryChart
                theme={VictoryTheme.material}
                style={{ parent: { maxWidth: '100%' } }}
              >
                <VictoryBar 
                  horizontal
                  style={{
                    data: { fill: '#c63a31' },
                  }}
                  data={[
                    { x: 'Happy', y: diagnosis.happy },
                    { x: 'Neutral', y: diagnosis.neutral },
                    { x: 'Sad', y: diagnosis.sad },
                    { x: 'Angry', y: diagnosis.angry },
                    { x: 'Disgust', y: diagnosis.disgusted },
                    { x: 'Fearful', y: diagnosis.fearful },
                    { x: 'Surprised', y: diagnosis.surprised }
                  ]}
                />
                </VictoryChart>
              </Grid>
            </Grid>
          </Box>
          :
          patient.id !== '' ?
            <Box sx={{ display: 'grid', placeItems: 'center' }}>
              <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, mt: 5, mb: 20 }}>
                Choose a diagnostic report by date
              </Typography>
              <TextField
                label="Date"
                select
                fullWidth
                onChange={handleDiagnosisSelect}
                sx={{ m: 1, minWidth: 250, maxWidth: 500 }}
                variant="outlined"
                value={diagnosis}
              >
                {listDiagnoses}
              </TextField>
            </Box>
            :
            <Box sx={{ display: 'grid', placeItems: 'center' }}>
              <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, mt: 5, mb: 20 }}>
                Choose a Patient
              </Typography>
              <TextField
                label="Patient"
                select
                fullWidth
                onChange={handlePatientSelect}
                sx={{ m: 1, minWidth: 250, maxWidth: 500 }}
                variant="outlined"
                value={patient}
              >
                {listPatients}
              </TextField>
            </Box>
        }
      </CardContent>
    </Card>
  );
};

export default Reports;