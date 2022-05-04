import { Box, Button, Card, CardContent, Grid, IconButton, MenuItem, Modal, TextField, Tooltip, Typography } from '@mui/material'
import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react'
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as yup from 'yup';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';

const Patients = () => {

  const [patients, setPatients] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const validPatientSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    surname: yup.string().required('Surname is required'),
    dateOfBirth: yup.string().required('Date of birth is required'),
    sex: yup.string().required('Sex is required'),
    email: yup.string().required('Email is required'),
    alcoholUse: yup.string().required('Pick an option'),
    drugUse: yup.string().required('Pick an option'),
    physicalLevel: yup.string().required('Pick an option'),
    dietClass: yup.string().required('Pick an option'),
    smokingStatus: yup.string().required('Pick an option'),
  });


  const createFormik = useFormik({
    initialValues: {
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
    },
    validationSchema: validPatientSchema,
    onSubmit: () => {
      addPatient();
      setIsCreateOpen(false);
    }
  });

  const editFormik = useFormik({
    initialValues: {
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
    },
    validationSchema: validPatientSchema,
    onSubmit: (values) => {
      editPatient(values);
      setIsEditOpen(false);
    }
  });

  const onCreateOpen = () => {
    setIsCreateOpen(true);
  };

  const onCreateClose = () => {
    setIsCreateOpen(false);
  };

  const onEditClose = () => {
    setIsEditOpen(false);
  }

  const onView = (currentCell) => {
    console.log(currentCell);
  }

  const onEdit = (currentCell) => {
    console.log(currentCell.row);
    editFormik.setValues(currentCell.row);
    setIsEditOpen(true);
  }

  // ASYNC FUNCTIONS
  const deletePatient = async (id) => {
    await API.graphql({
      query: mutations.deletePatient,
      variables: { input: {id} },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    })
    fetchPatients();
  }

  const fetchPatients = async () => {
    try {
      const patientData = await API.graphql({
        query: queries.listPatients,
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      setPatients(patientData.data.listPatients.items);
    } catch (err) {
      console.log(err);
    }
  }

  const editPatient = async (patient) => {
    const { medicalNotes, medicalDiagnosis, createdAt, updatedAt, ...rest } = patient;
    const patientToEdit = rest;
    console.log(patientToEdit)
    try {
      await API.graphql({
        query: mutations.updatePatient,
        variables: { input: patientToEdit },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  }

  const addPatient = async () => {
    const patientToCreate = {
      ...createFormik.values,
      dateOfBirth: createFormik.values.dateOfBirth.toISOString().substring(0, 10)
    }

    try {
      await API.graphql({
        query: mutations.createPatient,
        variables: { input: patientToCreate },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      fetchPatients();
    } catch (err) {
      console.log(err);
    }
  }
  // END OF ASYNC FUNCTIONS 

  const columns = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      editable: true
    },
    {
      field: "surname",
      headerName: "Surname",
      flex: 1,
      editable: true
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      flex: 1,
      minWidth: 100,
      editable: true
    },
    {
      field: "sex",
      headerName: "Sex",
      type: "date",
      flex: 1,
      editable: true
    },
    {
      field: "email",
      headerName: "Email",
      type: "dateTime",
      flex: 1,
      minWidth: 200,
      editable: true
    },
    {
      field: "alcoholUse",
      headerName: "Alcohol Use",
      flex: 1,
      editable: true
    },
    {
      field: "drugUse",
      headerName: "Drug Use",
      type: "dateTime",
      flex: 1,
      editable: true
    },
    {
      field: "physicalLevel",
      headerName: "Physical Level",
      type: "dateTime",
      flex: 1,
      editable: true
    },
    {
      field: "dietClass",
      headerName: "Diet Class",
      type: "dateTime",
      flex: 1,
      editable: true
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minwidth: 120,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (currentCell) => {
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Tooltip title="View">
              <IconButton onClick={() => onView(currentCell)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton onClick={() => onEdit(currentCell)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => deletePatient(currentCell.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      }
    }
  ];

  const editPatientModal = (
    <Modal
      open={isEditOpen}
      onClose={onEditClose}
    >
      <Box
        component="form"
        onSubmit={editFormik.handleSubmit}
        noValidate
        sx={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          bgcolor: 'background.paper',
          width: '40%',
          border: '2px solid #000',
          boxShadow: 30,
          p: 8,

        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Patient
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="first-name"
              variant="outlined"
              onChange={editFormik.handleChange}
              value={editFormik.values.firstName}
              error={editFormik.touched.firstName && Boolean(editFormik.errors.firstName)}
              helperText={editFormik.touched.firstName && editFormik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="surname"
              name="surname"
              label="Surname"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              onChange={editFormik.handleChange}
              value={editFormik.values.surname}
              error={editFormik.touched.surname && Boolean(editFormik.errors.surname)}
              helperText={editFormik.touched.surname && editFormik.errors.surname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
              onChange={editFormik.handleChange}
              value={editFormik.values.email}
              error={editFormik.touched.email && Boolean(editFormik.errors.email)}
              helperText={editFormik.touched.email && editFormik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                onChange={(date) => editFormik.setFieldValue('dateOfBirth', date)}
                value={editFormik.values.dateOfBirth}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    error={editFormik.touched.dateOfBirth && Boolean(editFormik.errors.dateOfBirth)}
                    helperText={editFormik.touched.dateOfBirth && editFormik.errors.dateOfBirth}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="sex"
              name="sex"
              label="Sex"
              select
              fullWidth
              variant="outlined"
              onChange={editFormik.handleChange}
              value={editFormik.values.sex}
              error={editFormik.touched.sex && Boolean(editFormik.errors.sex)}
              helperText={editFormik.touched.sex && editFormik.errors.sex}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="alcoholUse"
              name="alcoholUse"
              label="Alcohol Use"
              select
              fullWidth
              variant="outlined"
              onChange={editFormik.handleChange}
              value={editFormik.values.alcoholUse}
              error={editFormik.touched.alcoholUse && Boolean(editFormik.errors.alcoholUse)}
              helperText={editFormik.touched.alcoholUse && editFormik.errors.alcoholUse}
            >
              <MenuItem value={"None"}>None</MenuItem>
              <MenuItem value={"Light"}>Light</MenuItem>
              <MenuItem value={"Moderate"}>Moderate</MenuItem>
              <MenuItem value={"Heavy"}>Heavy</MenuItem>
              <MenuItem value={"Very heavy"}>Very heavy</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="drugUse"
              name="drugUse"
              label="Drug Use"
              select
              fullWidth
              variant="outlined"
              onChange={editFormik.handleChange}
              value={editFormik.values.drugUse}
              error={editFormik.touched.drugUse && Boolean(editFormik.errors.drugUse)}
              helperText={editFormik.touched.drugUse && editFormik.errors.drugUse}
            >
              <MenuItem value={"None"}>None</MenuItem>
              <MenuItem value={"Light"}>Light</MenuItem>
              <MenuItem value={"Moderate"}>Moderate</MenuItem>
              <MenuItem value={"Heavy"}>Heavy</MenuItem>
              <MenuItem value={"Very heavy"}>Very heavy</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="smokingStatus"
              name="smokingStatus"
              label="Smoking Status"
              select
              fullWidth
              variant="outlined"
              onChange={editFormik.handleChange}
              value={editFormik.values.smokingStatus}
              error={editFormik.touched.smokingStatus && Boolean(editFormik.errors.smokingStatus)}
              helperText={editFormik.touched.smokingStatus && editFormik.errors.smokingStatus}
            >
              <MenuItem id={"Non-Smoker"} value={"Non-Smoker"}>Non-Smoker</MenuItem>
              <MenuItem id={"Smoker"} value={"Smoker"}>Smoker</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="dietClass"
              name="dietClass"
              label="Diet Class"
              select
              fullWidth
              variant="outlined"
              onChange={editFormik.handleChange}
              value={editFormik.values.dietClass}
              error={editFormik.touched.dietClass && Boolean(editFormik.errors.dietClass)}
              helperText={editFormik.touched.dietClass && editFormik.errors.dietClass}
            >
              <MenuItem id={"Very Bad"} value={"Very Bad"}>Very Bad</MenuItem>
              <MenuItem id={"Bad"} value={"Bad"}>Bad</MenuItem>
              <MenuItem id={"Okay"} value={"Okay"}>Okay</MenuItem>
              <MenuItem id={"Good"} value={"Good"}>Good</MenuItem>
              <MenuItem id={"Very Good"} value={"Very Good"}>Very Good</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="physicalLevel"
              name="physicalLevel"
              label="Physical Level"
              select
              fullWidth
              variant="outlined"
              onChange={editFormik.handleChange}
              value={editFormik.values.physicalLevel}
              error={editFormik.touched.physicalLevel && Boolean(editFormik.errors.physicalLevel)}
              helperText={editFormik.touched.physicalLevel && editFormik.errors.physicalLevel}
            >
              <MenuItem id={"Sedentary"} value={"Sedentary"}>Sedentary</MenuItem>
              <MenuItem id={"Slightly active"} value={"Slightly active"}>Slightly active</MenuItem>
              <MenuItem id={"Moderately active"} value={"Slightly active"}>Slightly active</MenuItem>
              <MenuItem id={"Active"} value={"Active"}>Active</MenuItem>
              <MenuItem id={"Very active"} value={"Very active"}>Very active</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button onClick={onEditClose} >Back</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>

  );

  const addPatientModal = (
    <Modal
      open={isCreateOpen}
      onClose={onCreateClose}
    >
      <Box
        component="form"
        onSubmit={createFormik.handleSubmit}
        noValidate
        sx={{
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          bgcolor: 'background.paper',
          width: '40%',
          border: '2px solid #000',
          boxShadow: 30,
          p: 8,

        }}
      >
        <Typography variant="h6" gutterBottom>
          Add a Patient
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="first-name"
              variant="outlined"
              onChange={createFormik.handleChange}
              value={createFormik.values.firstName}
              error={createFormik.touched.firstName && Boolean(createFormik.errors.firstName)}
              helperText={createFormik.touched.firstName && createFormik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="surname"
              name="surname"
              label="Surname"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              onChange={createFormik.handleChange}
              value={createFormik.values.surname}
              error={createFormik.touched.surname && Boolean(createFormik.errors.surname)}
              helperText={createFormik.touched.surname && createFormik.errors.surname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
              onChange={createFormik.handleChange}
              value={createFormik.values.email}
              error={createFormik.touched.email && Boolean(createFormik.errors.email)}
              helperText={createFormik.touched.email && createFormik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                onChange={(date) => createFormik.setFieldValue('dateOfBirth', date)}
                value={createFormik.values.dateOfBirth}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    error={createFormik.touched.dateOfBirth && Boolean(createFormik.errors.dateOfBirth)}
                    helperText={createFormik.touched.dateOfBirth && createFormik.errors.dateOfBirth}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="sex"
              name="sex"
              label="Sex"
              select
              fullWidth
              variant="outlined"
              onChange={createFormik.handleChange}
              value={createFormik.values.sex}
              error={createFormik.touched.sex && Boolean(createFormik.errors.sex)}
              helperText={createFormik.touched.sex && createFormik.errors.sex}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="alcoholUse"
              name="alcoholUse"
              label="Alcohol Use"
              select
              fullWidth
              variant="outlined"
              onChange={createFormik.handleChange}
              value={createFormik.values.alcoholUse}
              error={createFormik.touched.alcoholUse && Boolean(createFormik.errors.alcoholUse)}
              helperText={createFormik.touched.alcoholUse && createFormik.errors.alcoholUse}
            >
              <MenuItem value={"None"}>None</MenuItem>
              <MenuItem value={"Light"}>Light</MenuItem>
              <MenuItem value={"Moderate"}>Moderate</MenuItem>
              <MenuItem value={"Heavy"}>Heavy</MenuItem>
              <MenuItem value={"Very heavy"}>Very heavy</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="drugUse"
              name="drugUse"
              label="Drug Use"
              select
              fullWidth
              variant="outlined"
              onChange={createFormik.handleChange}
              value={createFormik.values.drugUse}
              error={createFormik.touched.drugUse && Boolean(createFormik.errors.drugUse)}
              helperText={createFormik.touched.drugUse && createFormik.errors.drugUse}
            >
              <MenuItem value={"None"}>None</MenuItem>
              <MenuItem value={"Light"}>Light</MenuItem>
              <MenuItem value={"Moderate"}>Moderate</MenuItem>
              <MenuItem value={"Heavy"}>Heavy</MenuItem>
              <MenuItem value={"Very heavy"}>Very heavy</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="smokingStatus"
              name="smokingStatus"
              label="Smoking Status"
              select
              fullWidth
              variant="outlined"
              onChange={createFormik.handleChange}
              value={createFormik.values.smokingStatus}
              error={createFormik.touched.smokingStatus && Boolean(createFormik.errors.smokingStatus)}
              helperText={createFormik.touched.smokingStatus && createFormik.errors.smokingStatus}
            >
              <MenuItem id={"Non-Smoker"} value={"Non-Smoker"}>Non-Smoker</MenuItem>
              <MenuItem id={"Smoker"} value={"Smoker"}>Smoker</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="dietClass"
              name="dietClass"
              label="Diet Class"
              select
              fullWidth
              variant="outlined"
              onChange={createFormik.handleChange}
              value={createFormik.values.dietClass}
              error={createFormik.touched.dietClass && Boolean(createFormik.errors.dietClass)}
              helperText={createFormik.touched.dietClass && createFormik.errors.dietClass}
            >
              <MenuItem id={"Very Bad"} value={"Very Bad"}>Very Bad</MenuItem>
              <MenuItem id={"Bad"} value={"Bad"}>Bad</MenuItem>
              <MenuItem id={"Okay"} value={"Okay"}>Okay</MenuItem>
              <MenuItem id={"Good"} value={"Good"}>Good</MenuItem>
              <MenuItem id={"Very Good"} value={"Very Good"}>Very Good</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="physicalLevel"
              name="physicalLevel"
              label="Physical Level"
              select
              fullWidth
              variant="outlined"
              onChange={createFormik.handleChange}
              value={createFormik.values.physicalLevel}
              error={createFormik.touched.physicalLevel && Boolean(createFormik.errors.physicalLevel)}
              helperText={createFormik.touched.physicalLevel && createFormik.errors.physicalLevel}
            >
              <MenuItem id={"Sedentary"} value={"Sedentary"}>Sedentary</MenuItem>
              <MenuItem id={"Slightly active"} value={"Slightly active"}>Slightly active</MenuItem>
              <MenuItem id={"Moderately active"} value={"Slightly active"}>Slightly active</MenuItem>
              <MenuItem id={"Active"} value={"Active"}>Active</MenuItem>
              <MenuItem id={"Very active"} value={"Very active"}>Very active</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button onClick={onCreateClose} >Back</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );

  return (
    <Card sx={{ height: '85vh', width: '100%' }}>
      <Button onClick={onCreateOpen} variant="contained" color="success">Add patient</Button>
      <CardContent sx={{ display: 'flex', height: '95%' }}>
        { addPatientModal } 
        { editPatientModal } 
        <Box sx={{ flexGrow: 1 }}>
          <DataGrid
            isCellEditable={() => false}
            disableSelectionOnClick
            rows={patients}
            columns={columns}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default Patients