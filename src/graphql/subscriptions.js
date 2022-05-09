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
export const onCreateDiagnosis = /* GraphQL */ `
  subscription OnCreateDiagnosis($therapist: String) {
    onCreateDiagnosis(therapist: $therapist) {
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
export const onUpdateDiagnosis = /* GraphQL */ `
  subscription OnUpdateDiagnosis($therapist: String) {
    onUpdateDiagnosis(therapist: $therapist) {
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
export const onDeleteDiagnosis = /* GraphQL */ `
  subscription OnDeleteDiagnosis($therapist: String) {
    onDeleteDiagnosis(therapist: $therapist) {
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
