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
    hideRight: false,
    
    navPage: { title: '' },
    dynamicFloatingDiv: { left: '', top: ''}
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

    //page dimensions
    setMobile(state) {
      state.tablet = false
      state.desktop = false
      state.mobile = true
      state.hideRight = false
    },
    setTablet(state, payload) {
      state.mobile = false
      state.desktop = false
      state.tablet = true
      if(payload <= 987){
        state.hideRight = true
      }else{
        state.hideRight = false
      }
    },
    setDesktop(state) {
      state.tablet = false
      state.mobile = false
      state.desktop = true
      state.hideRight = false
    },
    setPagetitle(state, payload) {
      state.navPage.title = payload
    },
    setDynamicFloatingDiv(state, payload) {
      const rect = payload.getBoundingClientRect()
      let top = rect.top
      let left = rect.left
      state.dynamicFloatingDiv.left = left
      state.dynamicFloatingDiv.top = top
      payload.classList.add('this-will-change')
    },
    reSetDynamicFloatingDiv(state, payload) {
      state.dynamicFloatingDiv.left = null
      state.dynamicFloatingDiv.top = null
      payload.classList.remove('this-will-change')

    },
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
    getCurrentpage: (state) => state.navPage,
    getFloatingDiv: (state) => state.dynamicFloatingDiv,
    getMobile: (state) => state.mobile,
    getTablet: (state) => state.tablet,
    getDesktop: (state) => state.desktop,
    getHideRight: (state) => state.hideRight,



  }
})
