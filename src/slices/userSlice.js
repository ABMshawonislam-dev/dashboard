import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    loggeduser: (state,action) => {
            state.value = action.payload
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { loggeduser } = userSlice.actions

export default userSlice.reducer