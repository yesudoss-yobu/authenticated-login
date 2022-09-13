import { configureStore, createSlice } from "@reduxjs/toolkit";
import image from '../components/assets/profile.jpg'

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [
      {
        profile:image,
        id: "700",
        login: "stalin",
        password: "1234",
        conpassword: "1234",
        role: "super admin",
        status: "active",
        data: "no",
      },
      {
        profile:image,
        id: "600",
        login: "doss",
        password: "4321",
        conpassword: "4321",
        role: "client",
        status: "offline",
        data: "no",
      },
    ],
    networks:[{
      id:'10',
      network:"sample",
      description:"sample"
    }],
networkId:"",
    userLogin: false,
    newModal: false,
    editModal: false,
    newNetworkModal:false,
    editNetworkModal:false
  },
  reducers: {
    deleteUser(state, action) {
      state.users.splice(action.payload.indexval, action.payload.position);
      
    },
    deleteNetwork(state,action){
state.networks.splice(action.payload.indexval, action.payload.position);
    },
    showToggle(state) {
      state.userLogin = !state.userLogin;
    },
    modalToggle(state) {
      state.newModal = !state.newModal;
    },
    editModal(state) {
      state.editModal = !state.editModal;
    },
    newNetworkToggle(state){
state.newNetworkModal = !state.newNetworkModal;
    },
    editNetworkToggle(state){
state.editNetworkModal = !state.editNetworkModal;
    },
    editPush(state, action) {
    
      state.users[action.payload.ind] = {
        profile:action.payload.profile,
        id: action.payload.id,
        login: action.payload.login,
        role:action.payload.role,
        password: action.payload.password,
        conpassword:action.payload.password,
        status:action.payload.status,
        data:action.payload.data
      };
    
    },
    editNetworkPush(state,action){
state.networks[action.payload.indexval]={id:action.payload.id,
network:action.payload.network,
description:action.payload.description}
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
    addnetwork(state,action){
      console.log(action.payload)
      state.networks.push(action.payload)
    },
    networkId(state,action){
      state.networkId = action.payload
    }
  },
});
const networkSlice = createSlice({
  name:"network",
  initialState:{
    networks:[{
      id:'10',
      network:"sample",
      description:"sample"
    }]
  },
reducers:{
  addnetwork(state,action){
state.networks.push(action.payload)
  }

}
})

export const counterActions = userSlice.actions;
export const networkActions = networkSlice.actions

export const store = configureStore({
  reducer: { user: userSlice.reducer,network:networkSlice.reducer },
});

// export default store;

//we use any export but use it correctly
