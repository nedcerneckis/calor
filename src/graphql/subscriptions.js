/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient {
    onCreatePatient {
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
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient {
    onUpdatePatient {
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
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient {
    onDeletePatient {
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
export const onCreateDiagnosis = /* GraphQL */ `
  subscription OnCreateDiagnosis {
    onCreateDiagnosis {
      diagnosisId
      diagnosisName
      id
      createdAt
      updatedAt
      patientMedicalDiagnosisId
    }
  }
`;
export const onUpdateDiagnosis = /* GraphQL */ `
  subscription OnUpdateDiagnosis {
    onUpdateDiagnosis {
      diagnosisId
      diagnosisName
      id
      createdAt
      updatedAt
      patientMedicalDiagnosisId
    }
  }
`;
export const onDeleteDiagnosis = /* GraphQL */ `
  subscription OnDeleteDiagnosis {
    onDeleteDiagnosis {
      diagnosisId
      diagnosisName
      id
      createdAt
      updatedAt
      patientMedicalDiagnosisId
    }
  }
`;
export const onCreateDrug = /* GraphQL */ `
  subscription OnCreateDrug {
    onCreateDrug {
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
export const onUpdateDrug = /* GraphQL */ `
  subscription OnUpdateDrug {
    onUpdateDrug {
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
export const onDeleteDrug = /* GraphQL */ `
  subscription OnDeleteDrug {
    onDeleteDrug {
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
export const onCreateMedicalNote = /* GraphQL */ `
  subscription OnCreateMedicalNote {
    onCreateMedicalNote {
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
export const onUpdateMedicalNote = /* GraphQL */ `
  subscription OnUpdateMedicalNote {
    onUpdateMedicalNote {
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
export const onDeleteMedicalNote = /* GraphQL */ `
  subscription OnDeleteMedicalNote {
    onDeleteMedicalNote {
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
