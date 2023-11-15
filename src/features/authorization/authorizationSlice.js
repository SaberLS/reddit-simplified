import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "../../utilities/authorization_utilities";

export const requestToken = createAsyncThunk(
  "authorization/requestToken",
  async (code) => {
    const result = await getAccessToken(code);
    //console.log(result);
    return result;
  }
);

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState: {
    accessToken: "",
    expires_in: 0,
    refresh_token: "",
    scope: "",
    requestingToken: false,
    failedToGetToken: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestToken.pending, (state) => {
        state.requestingToken = true;
        state.failedToGetToken = false;
      })
      .addCase(requestToken.fulfilled, (state, action) => {
        const { payload } = action;
        state.requestingToken = false;
        state.failedToGetToken = false;
        state.accessToken = payload.access_token;
        state.expires_in = payload.expires_in;
        state.refresh_token = payload.refresh_token;
        state.scope = payload.scope;
        //console.log("token",state.accessToken);
      })
      .addCase(requestToken.rejected, (state) => {
        state.requestingToken = false;
        state.failedToGetToken = true;
      });
  },
});

export const selectAccessToken = (state) => state.authorization.accessToken;

export default authorizationSlice.reducer;
