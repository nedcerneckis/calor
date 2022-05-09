/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatient = /* GraphQL */ `
  mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
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
          patientId
          diagnosisName
          diagnosisSpeechSentiment
          angry
          disgusted
          fearful
          happy
          neutral
          sad
          surprised
          createdAt
          updatedAt
          therapist
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
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
          patientId
          diagnosisName
          diagnosisSpeechSentiment
          angry
          disgusted
          fearful
          happy
          neutral
          sad
          surprised
          createdAt
          updatedAt
          therapist
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePatient = /* GraphQL */ `
  mutation DeletePatient(
    $input: DeletePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    deletePatient(input: $input, condition: $condition) {
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
          patientId
          diagnosisName
          diagnosisSpeechSentiment
          angry
          disgusted
          fearful
          happy
          neutral
          sad
          surprised
          createdAt
          updatedAt
          therapist
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createDiagnosis = /* GraphQL */ `
  mutation CreateDiagnosis(
    $input: CreateDiagnosisInput!
    $condition: ModelDiagnosisConditionInput
  ) {
    createDiagnosis(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      patientId
      diagnosisName
      diagnosisSpeechSentiment
      angry
      disgusted
      fearful
      happy
      neutral
      sad
      surprised
      createdAt
      updatedAt
      therapist
    }
  }
`;
export const updateDiagnosis = /* GraphQL */ `
  mutation UpdateDiagnosis(
    $input: UpdateDiagnosisInput!
    $condition: ModelDiagnosisConditionInput
  ) {
    updateDiagnosis(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      patientId
      diagnosisName
      diagnosisSpeechSentiment
      angry
      disgusted
      fearful
      happy
      neutral
      sad
      surprised
      createdAt
      updatedAt
      therapist
    }
  }
`;
export const deleteDiagnosis = /* GraphQL */ `
  mutation DeleteDiagnosis(
    $input: DeleteDiagnosisInput!
    $condition: ModelDiagnosisConditionInput
  ) {
    deleteDiagnosis(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      patientId
      diagnosisName
      diagnosisSpeechSentiment
      angry
      disgusted
      fearful
      happy
      neutral
      sad
      surprised
      createdAt
      updatedAt
      therapist
    }
  }
`;
