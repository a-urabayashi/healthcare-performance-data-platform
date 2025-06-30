import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Clinic {
  id: string
  name: string
  address: string
  phone: string
  email: string
  subscription: string
}

interface ClinicState {
  clinics: Clinic[]
  selectedClinic: Clinic | null
  loading: boolean
  error: string | null
}

const initialState: ClinicState = {
  clinics: [],
  selectedClinic: null,
  loading: false,
  error: null,
}

const clinicSlice = createSlice({
  name: 'clinic',
  initialState,
  reducers: {
    fetchClinicsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchClinicsSuccess: (state, action: PayloadAction<Clinic[]>) => {
      state.clinics = action.payload
      state.loading = false
      state.error = null
    },
    fetchClinicsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    selectClinic: (state, action: PayloadAction<Clinic>) => {
      state.selectedClinic = action.payload
    },
    clearClinicError: (state) => {
      state.error = null
    },
  },
})

export const { 
  fetchClinicsStart, 
  fetchClinicsSuccess, 
  fetchClinicsFailure, 
  selectClinic, 
  clearClinicError 
} = clinicSlice.actions
export default clinicSlice.reducer