import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";
import api from"../api/api";
import {Profile} from "./types";
const STORAGE_KEY="profile_data_v1";
export const fetchProfile=createAsyncThunk<Profile | null, void,{rejectValue:string}>("profile/fetchProfile",async(_,{rejectWithValue})=>{try{
  const local=localStorage.getItem(STORAGE_KEY);
  if (local){
    return JSON.parse(local) as Profile;
  }
  const resp=await api.get<Profile[]>("/profiles");
  const data=resp.data && resp.data.length? resp.data[0]:null;
  if (data)localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
  return data;
}
catch (err:any){return rejectWithValue(err.message || "Failed to fetch profile");}
});
 export const saveProfile=createAsyncThunk<Profile,Profile,{rejectValue:string}>("profile/saveProfile",async(profile,{rejectWithValue})=>{
  try{
    const getResp=await api.get<Profile[]>("/profiles");
    const existing=getResp.data?.[0];
    if (existing&& existing.id){
      const update=await api.put<Profile>(`/profiles/${existing.id}`,profile);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(update.data));
      return update.data;
    }
    else{
      const create=await api.post<Profile>("/profiles",profile);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(create.data));
      return create.data;
    }
  } catch (err:any){
    return rejectWithValue(err.response?.data?.message ||err.message||"Failed to save");
  }
 });

 export const deleteProfile=createAsyncThunk<void,number|undefined,{rejectValue:string}>("profile/deleteProfile",async(id,{rejectWithValue})=>{
  try{if (id){
    await api.delete(`/profiles/${id}`);

  }
else{
  const resp=await api.get("/profiles");
  const p= resp.data?.[0];
  if (p?.id)await api.delete(`/profiles/${p.id}`);
}
localStorage.removeItem(STORAGE_KEY);
} catch(err:any){return rejectWithValue(err.message || "Failed to detect");}
 });

 interface State{
  data:Profile|null;
  status:"idle"|"loading"|"succeeded"|"failed";
  error?:string|null;
 }
 const initialState:State={data:null,
  status:"idle",
  error:null,
 };
 const profileSlice=createSlice({name:"profile",initialState,reducers:{
  setLocalProfile(state,action:PayloadAction<Profile|null>){state.data=action.payload;
    if(action.payload)localStorage.setItem(STORAGE_KEY,JSON.stringify(action.payload));
    else localStorage.removeItem(STORAGE_KEY);
  }
 },
 extraReducers:builder=>{
  builder
  .addCase(fetchProfile.pending,(s)=>{s.status="loading";s.error=null;})
  .addCase(fetchProfile.fulfilled,(s,action)=>{s.status="succeeded";s.data=action.payload;})
  .addCase(fetchProfile.rejected,(s,action)=>{s.status="failed";s.error=action.payload as string;})
  .addCase(saveProfile.pending,(s)=>{s.status="loading";s.error=null;})
  .addCase(saveProfile.fulfilled,(s,action)=>{s.status="succeeded";s.data=action.payload;})
  .addCase(saveProfile.rejected,(s,action)=>{s.status="failed";s.error=action.payload as string;})
  .addCase(deleteProfile.pending,(s)=>{s.status="loading";s.error=null;})
  .addCase(deleteProfile.fulfilled,(s)=>{s.status="succeeded";s.data=null;})
  .addCase(deleteProfile.rejected,(s,action)=>{s.status="failed";s.error=action.payload as string;});

 }
});

export const {setLocalProfile}=profileSlice.actions;
export default profileSlice.reducer;