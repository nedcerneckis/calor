/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
      patientId
      firstName
      surname
      dateOfBirth
      sex
      email
      alcoholUse
      drugUse
      physicalLevel
      dietClass
      prescribedDrugs {
        items {
          drugId
          drugName
          dosage
          description
          id
          createdAt
          updatedAt
          patientPrescribedDrugsId
        }
        nextToken
      }
      medicalDiagnosis {
        items {
          diagnosisId
          diagnosisName
          id
          createdAt
          updatedAt
          patientMedicalDiagnosisId
        }
        nextToken
      }
      medicalNotes {
        items {
          medicalNoteId
          content
          id
          createdAt
          updatedAt
          patientMedicalNotesId
        }
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        patientId
        firstName
        surname
        dateOfBirth
        sex
        email
        alcoholUse
        drugUse
        physicalLevel
        dietClass
        prescribedDrugs {
          nextToken
        }
        medicalDiagnosis {
          nextToken
        }
        medicalNotes {
          nextToken
        }
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDiagnosis = /* GraphQL */ `
  query GetDiagnosis($id: ID!) {
    getDiagnosis(id: $id) {
      diagnosisId
      diagnosisName
      id
      createdAt
      updatedAt
      patientMedicalDiagnosisId
    }
  }
`;
export const listDiagnoses = /* GraphQL */ `
  query ListDiagnoses(
    $filter: ModelDiagnosisFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDiagnoses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        diagnosisId
        diagnosisName
        id
        createdAt
        updatedAt
        patientMedicalDiagnosisId
      }
      nextToken
    }
  }
`;
export const getDrug = /* GraphQL */ `
  query GetDrug($id: ID!) {
    getDrug(id: $id) {
      drugId
      drugName
      dosage
      description
      id
      createdAt
      updatedAt
      patientPrescribedDrugsId
    }
  }
`;
export const listDrugs = /* GraphQL */ `
  query ListDrugs(
    $filter: ModelDrugFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDrugs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        drugId
        drugName
        dosage
        description
        id
        createdAt
        updatedAt
        patientPrescribedDrugsId
      }
      nextToken
    }
  }
`;
export const getMedicalNote = /* GraphQL */ `
  query GetMedicalNote($id: ID!) {
    getMedicalNote(id: $id) {
      medicalNoteId
      patientID {
        patientId
        firstName
        surname
        dateOfBirth
        sex
        email
        alcoholUse
        drugUse
        physicalLevel
        dietClass
        prescribedDrugs {
          nextToken
        }
        medicalDiagnosis {
          nextToken
        }
        medicalNotes {
          nextToken
        }
        id
        createdAt
        updatedAt
      }
      content
      id
      createdAt
      updatedAt
      patientMedicalNotesId
    }
  }
`;
export const listMedicalNotes = /* GraphQL */ `
  query ListMedicalNotes(
    $filter: ModelMedicalNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedicalNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        medicalNoteId
        patientID {
          patientId
          firstName
          surname
          dateOfBirth
          sex
          email
          alcoholUse
          drugUse
          physicalLevel
          dietClass
          id
          createdAt
          updatedAt
        }
        content
        id
        createdAt
        updatedAt
        patientMedicalNotesId
      }
      nextToken
    }
  }
`;
