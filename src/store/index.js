import axios from 'axios'
import { createStore } from 'vuex'


export default createStore({
  state: {
    hostname: 'http://localhost:8000',
    token: localStorage.getItem('token') || null,
    user: {},
    mobile: false,
    tablet: false,
    desktop: false,
    mainMenu: [
      { id: 1, name: 'Home', icon: '', url: '/dashboard', mobile: false},
      { id: 2, name: 'Products', icon: '', url: '/fd', mobile: false},
      { id: 3, name: 'Discounts', icon: '', url: '/fdfd', mobile: false},
      { id: 4, name: 'My Suppliers', icon: '', url: '/dfd', mobile: false},
      { id: 5, name: 'Invoice', icon: '', url: '/dfd', mobile: false},
      { id: 6, name: 'Reports', icon: '', url: '/dfd', mobile: false},
    ]
  },
  mutations: {
    //authentication
      setAuthToken(state, payload){
        state.token = payload;
    },
    setUser(state, payload) {
        state.user = payload
    },
    destroyToken(state){
        localStorage.removeItem('token')
        state.token = null
        location.reload()
    },
    //end auth
  },
  actions: {
    //authentication && Logout
    /*
    async signIn(state, credentials){
      axios.post(this.getters.getHostname+'/api/sign-in', credentials)
      .then((res) => {
          state.commit('setAuthToken', res.data.token)
          localStorage.setItem('token', res.data.token)
          location.reload()
      }).catch((err) => {
        console.log(err.response)
      })
  },*/
  getAuthUser(state, payload) {            
      axios.post(this.getters.getHostname+'/api/user?token='+payload)
      .then((res) => {
          state.commit('setUser', res.data.user)   
      }).catch(() => {
          state.commit('destroyToken')    
      })      
    },
    async Logout(state){
        axios.delete(this.getters.getHostname+'/api/logout')
        state.commit('destroyToken') 
    },
    //end auth && logout
  },
  getters: {
    getHostname: (state) => state.hostname,
    auth(state){
        return state.token !== null
    },
    getMainMenu: (state) => state.mainMenu,
    getUser(state) {
        return state.user
    },
    getToken: (state) => state.token,
  }
})
