import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  User_Fullname: '',
  User_Email: '',
  access_token: '',
  User_PhoneNumber: '',
  isLoading: false,
  User_Avatar: '',
  User_Address: '',
  User_Id: '',
  isPermis: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { User_Email = '', User_Fullname = '', User_PhoneNumber = '',
        access_token = '', User_Address = '', User_Avatar = '', _id = '', User_Id = '', Role_Id = '' } = action.payload
      state.User_Fullname = User_Fullname
      state.User_Email = User_Email
      state.access_token = access_token
      state.User_PhoneNumber = User_PhoneNumber
      state.User_Address = User_Address
      state.User_Avatar = User_Avatar
      state.User_Id = _id || User_Id;
      if (Role_Id === '686d164d833c9c6a3a7729e6' || Role_Id === '686d164d833c9c6a3a7729e9') {
        state.isPermis = true;
      } else {
        state.isPermis = false;
      }
    },
    resetUser: (state, action) => {
      state.User_Fullname = ''
      state.User_Email = ''
      state.access_token = ''
      state.User_PhoneNumber = ''
      state.User_Address = ''
      state.User_Avatar = ''
      state.User_Id = ''
      state.isPermis = false
    },
  },
})

export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer