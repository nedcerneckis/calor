/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
      id
      firstName
      surname
      dateOfBirth
      sex
      email
      therapist
      alcoholUse
      drugUse
      smokingStatus
      physicalLevel
      dietClass
      medicalDiagnosis {
        items {
          id
          diagnosisName
          diagnosisDescription
          createdAt
          updatedAt
          patientMedicalDiagnosisId
          owner
        }
        nextToken
      }
      medicalNotes {
        items {
          id
          content
          createdAt
          updatedAt
          patientMedicalNotesId
          owner
        }
        nextToken
      }
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
        id
        firstName
        surname
        dateOfBirth
        sex
        email
        therapist
        alcoholUse
        drugUse
        smokingStatus
        physicalLevel
        dietClass
        medicalDiagnosis {
          nextToken
        }
        medicalNotes {
          nextToken
        }
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
      id
      patient {
        id
        firstName
        surname
        dateOfBirth
        sex
        email
        therapist
        alcoholUse
        drugUse
        smokingStatus
        physicalLevel
        dietClass
        medicalDiagnosis {
          nextToken
        }
        medicalNotes {
          nextToken
        }
        createdAt
        updatedAt
      }
      diagnosisName
      diagnosisDescription
      createdAt
      updatedAt
      patientMedicalDiagnosisId
      owner
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
        id
        patient {
          id
          firstName
          surname
          dateOfBirth
          sex
          email
          therapist
          alcoholUse
          drugUse
          smokingStatus
          physicalLevel
          dietClass
          createdAt
          updatedAt
        }
        diagnosisName
        diagnosisDescription
        createdAt
        updatedAt
        patientMedicalDiagnosisId
        owner
      }
      nextToken
    }
  }
`;
export const getMedicalNote = /* GraphQL */ `
  query GetMedicalNote($id: ID!) {
    getMedicalNote(id: $id) {
      id
      patient {
        id
        firstName
        surname
        dateOfBirth
        sex
        email
        therapist
        alcoholUse
        drugUse
        smokingStatus
        physicalLevel
        dietClass
        medicalDiagnosis {
          nextToken
        }
        medicalNotes {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
      patientMedicalNotesId
      owner
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
        id
        patient {
          id
          firstName
          surname
          dateOfBirth
          sex
          email
          therapist
          alcoholUse
          drugUse
          smokingStatus
          physicalLevel
          dietClass
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
        patientMedicalNotesId
        owner
      }
      nextToken
    }
  }
`;
