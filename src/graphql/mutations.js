/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatient = /* GraphQL */ `
  mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
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
export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
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
export const deletePatient = /* GraphQL */ `
  mutation DeletePatient(
    $input: DeletePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    deletePatient(input: $input, condition: $condition) {
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
export const createDiagnosis = /* GraphQL */ `
  mutation CreateDiagnosis(
    $input: CreateDiagnosisInput!
    $condition: ModelDiagnosisConditionInput
  ) {
    createDiagnosis(input: $input, condition: $condition) {
      diagnosisId
      diagnosisName
      id
      createdAt
      updatedAt
      patientMedicalDiagnosisId
    }
  }
`;
export const updateDiagnosis = /* GraphQL */ `
  mutation UpdateDiagnosis(
    $input: UpdateDiagnosisInput!
    $condition: ModelDiagnosisConditionInput
  ) {
    updateDiagnosis(input: $input, condition: $condition) {
      diagnosisId
      diagnosisName
      id
      createdAt
      updatedAt
      patientMedicalDiagnosisId
    }
  }
`;
export const deleteDiagnosis = /* GraphQL */ `
  mutation DeleteDiagnosis(
    $input: DeleteDiagnosisInput!
    $condition: ModelDiagnosisConditionInput
  ) {
    deleteDiagnosis(input: $input, condition: $condition) {
      diagnosisId
      diagnosisName
      id
      createdAt
      updatedAt
      patientMedicalDiagnosisId
    }
  }
`;
export const createDrug = /* GraphQL */ `
  mutation CreateDrug(
    $input: CreateDrugInput!
    $condition: ModelDrugConditionInput
  ) {
    createDrug(input: $input, condition: $condition) {
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
export const updateDrug = /* GraphQL */ `
  mutation UpdateDrug(
    $input: UpdateDrugInput!
    $condition: ModelDrugConditionInput
  ) {
    updateDrug(input: $input, condition: $condition) {
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
export const deleteDrug = /* GraphQL */ `
  mutation DeleteDrug(
    $input: DeleteDrugInput!
    $condition: ModelDrugConditionInput
  ) {
    deleteDrug(input: $input, condition: $condition) {
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
export const createMedicalNote = /* GraphQL */ `
  mutation CreateMedicalNote(
    $input: CreateMedicalNoteInput!
    $condition: ModelMedicalNoteConditionInput
  ) {
    createMedicalNote(input: $input, condition: $condition) {
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
export const updateMedicalNote = /* GraphQL */ `
  mutation UpdateMedicalNote(
    $input: UpdateMedicalNoteInput!
    $condition: ModelMedicalNoteConditionInput
  ) {
    updateMedicalNote(input: $input, condition: $condition) {
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
export const deleteMedicalNote = /* GraphQL */ `
  mutation DeleteMedicalNote(
    $input: DeleteMedicalNoteInput!
    $condition: ModelMedicalNoteConditionInput
  ) {
    deleteMedicalNote(input: $input, condition: $condition) {
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
