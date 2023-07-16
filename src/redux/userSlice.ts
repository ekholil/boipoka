import { createSlice } from "@reduxjs/toolkit";

type userDataType = {
  accessToken: string | null;
  name: string | null;
  email: string | null;
};

const storedData = localStorage.getItem("user");
let parsedData: userDataType | null = null;
if (storedData) {
  parsedData = JSON.parse(storedData);
}

const initialState: userDataType = parsedData || {
  accessToken: null,
  name: null,
  email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Update the state with the provided data
      state.accessToken = action.payload.accessToken;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logOut: (state) => {
      state = {
        accessToken: null,
        name: null,
        email: null,
      };
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
