/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient($therapist: String) {
    onCreatePatient(therapist: $therapist) {
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
          diagnosisSpeechSentiment
          createdAt
          updatedAt
          patientMedicalDiagnosisId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient($therapist: String) {
    onUpdatePatient(therapist: $therapist) {
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
          diagnosisSpeechSentiment
          createdAt
          updatedAt
          patientMedicalDiagnosisId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient($therapist: String) {
    onDeletePatient(therapist: $therapist) {
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
          diagnosisSpeechSentiment
          createdAt
          updatedAt
          patientMedicalDiagnosisId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDiagnosis = /* GraphQL */ `
  subscription OnCreateDiagnosis($owner: String) {
    onCreateDiagnosis(owner: $owner) {
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
      diagnosisName
      diagnosisDescription
      diagnosisSpeechSentiment
      createdAt
      updatedAt
      patientMedicalDiagnosisId
      owner
    }
  }
`;
export const onUpdateDiagnosis = /* GraphQL */ `
  subscription OnUpdateDiagnosis($owner: String) {
    onUpdateDiagnosis(owner: $owner) {
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
      diagnosisName
      diagnosisDescription
      diagnosisSpeechSentiment
      createdAt
      updatedAt
      patientMedicalDiagnosisId
      owner
    }
  }
`;
export const onDeleteDiagnosis = /* GraphQL */ `
  subscription OnDeleteDiagnosis($owner: String) {
    onDeleteDiagnosis(owner: $owner) {
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
      diagnosisName
      diagnosisDescription
      diagnosisSpeechSentiment
      createdAt
      updatedAt
      patientMedicalDiagnosisId
      owner
    }
  }
`;
