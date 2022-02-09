import axios from 'axios'
import { createStore } from 'vuex'


export default createStore({
  state: {
    hostname: 'http://localhost:8000',
    token: localStorage.getItem('token') || null,
    windowHeight: '',
    user: {},
    stores: [],
    products: [],
    thisProduct: {},
    tags: [],
    filters: [],
    checkedProducts: [],
    selectionSheet: false,
    discounts: [],
    thisDiscount: {},
    //viewingMode: false,
    tagEditForm: { id: '', name: '', active: false, viewingMode: true },
    thisTempHold: { active: false, editMode: false, data: {}},
    currentStore: {},
    mobile: false,
    tablet: false,
    desktop: false,
    hideRight: false,
    alert: { status: { show: false, success: false, danger: false, warning: false, info: false }, title: 'dfd', body: '' },
    loader: false,

    navPage: { title: '', mobile: false, back: true},
    dynamicFloatingDiv: { left: '', top: '', bottom: ''},
    showDialog: false,
    addingProduct: { status: false, width: '', product: false, tag: false, discount: false}
  },
  mutations: {
    //authentication
      setAuthToken(state, payload){
        state.token = payload;
    },
    setUser(state, payload) {
        state.user = payload
    },
    fetchProducts(state, payload) {
      state.products = payload
    },
    fetchDiscounts(state, payload) {
      state.discounts = payload
    },
    addToProducts(state, payload) {
      state.products.push(payload)
    },
    setStore(state, payload) {
      state.stores = payload
      payload.forEach(element => {
        if(element.id == state.user.current)
        state.currentStore = element
      });
    },
    computeWindow(state) {
      state.windowHeight = window.innerHeight
    },
    // setThiStore(state, payload) {
    //   state.thiStore = payload
    //   console.log(payload)
    // },
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
      if(payload.back) {
        state.navPage.back = true
        state.navPage.title = payload.title
      }
      else{
        state.navPage.back = false
        state.navPage.title = payload.title
      }
    },
    setMobileTitle(state) {
      state.navPage.mobile = true
    },
    unSetMobileTitle(state) {
      state.navPage.mobile = false
    },
    setSelectionSheet(state) {
      state.selectionSheet = !state.selectionSheet
    },
    setLoader(state) {
        state.loader = !state.loader
    },
    getMainHomeWidth(state, payload) {
      let homeWidth = document.getElementById('main_home').offsetWidth
      let appSection = document.getElementById('app_section')
      appSection.style.left = appSection.offsetLeft+'px'
      document.body.classList.add('fixed-body')
      const thispayload = { dimension: homeWidth, addType: payload }
      this.commit('setMainHomeWidth', thispayload)
    },
    setMainHomeWidth(state, payload) {
      state.addingProduct.width = payload.dimension
      state.addingProduct.status = true
      if(payload.addType == 'product'){
        state.addingProduct.product = true
      }else if(payload.addType == 'tag'){
        state.addingProduct.tag = true
      }else if(payload.addType == 'discount'){
        state.addingProduct.discount = true
      }
    },
    unsetMainHomeWidth(state){
      // this.commit('dismisAlert')
      state.addingProduct.status = false
      state.addingProduct.tag = false
      state.addingProduct.product = false
      state.addingProduct.discount = false
      state.addingProduct.width = ''
      document.body.classList.remove('fixed-body')
      let appSection = document.getElementById('app_section')
      appSection.style.left = '0px'
      if(state.checkedProducts && !state.tagEditForm.active) {
        state.checkedProducts = []
      }

    },
    showAlert(state, payload) {
      this.commit('dismisAlert')
      if(payload.id === 'success'){
          state.alert.status.show = true
          state.alert.status.success = true
          state.alert.title = payload.title
          state.alert.body = payload.body
      }else if(payload.id === 'danger'){
          state.alert.status.show = true
          state.alert.status.danger = true
          state.alert.title = payload.title
          state.alert.body = payload.body
      }   
    },
    dismisAlert(state) {
        for (let i in state.alert.status)
        state.alert.status[i] = false
        state.alert.body = ''
        state.alert.title = ''
    },

    fetchTags(state, payload) {
      state.tags = payload
    },
    addToTags(state, payload) {
      state.tags.push(payload)
    },
    addToDiscounts(state, payload) {
      state.discounts.push(payload)
    },
    updateTags(state, payload) {
      state.tags = payload.tags
      state.tagEditForm.name = payload.tag
    },
    updateDiscounts(state, payload) {
      state.discounts = payload.discounts
      state.thisDiscount = payload.discount
    },
    addCheckedProdToArray(state, payload) {
      state.checkedProducts.push(payload)
    },
    removeCheckedProdFromArray(state, payload) {
      state.checkedProducts = state.checkedProducts.filter(product => product.id !== payload.id)
    },
    clrCheckedProdArray(state) {
      state.checkedProducts = []
      state.tagEditForm.active = false
      state.tagEditForm.viewingMode = true
      state.thisDiscount = {}
    },
    fetchFilters(state, payload) {
      state.filters = payload
      //console.log(payload)
    },
    fetchThisFilter(state, payload) {
      state.checkedProducts = payload.array
      state.tagEditForm.id = payload.id
      state.tagEditForm.name = payload.name
      state.tagEditForm.active = true
    },
    fetchThisProduct(state, payload) {
      state.thisProduct = payload
    },
    fetchThisDiscount(state, payload) {
       state.checkedProducts = payload.array
       state.thisDiscount = payload.discount
       state.tagEditForm.id = payload.discount.id
       state.tagEditForm.name = payload.discount.name
       state.tagEditForm.active = true
    },
    // fetchThisDiscount(state, payload) {
    //   state.thisProduct = payload
    // },


    clrThisProduct(state) {
      state.thisProduct = ''
    },
    removeDeletedTags(state, payload) {
      state.tags = state.tags.filter(tag => tag.id != payload)
      state.filters = state.filters.filter(filter => filter.tag_id != payload);
    },
    removeDeletedDiscount(state, payload) {
      state.discounts = state.discounts.filter(discount => discount.id != payload)
      // state.filters = state.filters.filter(filter => filter.tag_id != payload);
    },
    

    setDynamicFloatingDiv(state, payload) {
      const rect = payload.getBoundingClientRect()
      let top = rect.top
      let left = rect.left
      if(state.mobile) {
        state.dynamicFloatingDiv.left = '0'
        state.dynamicFloatingDiv.bottom = '0'
      }else{
        state.dynamicFloatingDiv.left = left
        state.dynamicFloatingDiv.top = top
        state.dynamicFloatingDiv.bottom = '100'
      }
      payload.classList.add('this-will-change')
    },
    reSetDynamicFloatingDiv(state, payload) {
      state.dynamicFloatingDiv.left = null
      state.dynamicFloatingDiv.top = null
      state.dynamicFloatingDiv.bottom = null
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
      state.commit('setLoader')          
      axios.post(this.getters.getHostname+'/api/user?token='+payload)
      .then((res) => {
          state.commit('setUser', res.data.user)
          state.commit('setStore', res.data.stores)
          state.commit('fetchTags', res.data.tags)
          state.commit('fetchProducts', res.data.products)
          state.commit('fetchDiscounts', res.data.discounts)
          state.commit('setLoader')          
      }).catch(() => {
          state.commit('destroyToken')    
      })      
    },
    // async fetchProducts(state, payload){
    //   const res = await axios.get(this.getters.getHostname+'/api/products?token='+payload)
    //   state.commit('fetchProducts', res.data.products)
    //   //console.log(res.data)
    // },
    async getLogout(state){
        axios.delete(this.getters.getHostname+'/api/logout?token='+this.getters.getToken)
        .then(()=> {
          state.commit('destroyToken')
        })
    },
    //end auth && logout
    getSwitchStore(state, payload) { 
      axios.post(this.getters.getHostname+'/api/switch-store?token='+this.getters.getToken, 
      { 'storeID' : payload})
      .then((res) => {
        if(res.data.status === 1) {
          window.location.href = '/'
        }
      }).catch((err) => {
          console.log(err.response) 
      })      
    },
    // async fetchTags(state, payload){
    //   //state.commit('unCheckAllAndEmpty')
    //   const res = await axios.get(this.getters.getHostname+'/api/tag?token='+payload)
    //   console.log(res.data.filters)
    //   //state.commit('fetchTags', res.data.filters)
    // },
    async fetchFilters(state){
      //state.commit('unCheckAllAndEmpty')
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-all-filters?token='+this.getters.getToken)
      state.commit('fetchFilters', res.data.filters)
      state.commit('setLoader') 
    },
    async fetchThisFilter(state, payload){
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-this-filter?token='+this.getters.getToken, {id: payload})
      const newData = { id: payload, name: res.data.name, array: res.data.filter}
      state.commit('fetchThisFilter', newData)
      state.commit('setLoader') 
    },
    async fetchThisProduct(state, payload){
      state.commit('setLoader') 
       const res = await axios.post(this.getters.getHostname+'/api/product-detail?token='+this.getters.getToken, {id: payload})
       state.commit('fetchThisProduct', res.data.product)
       state.commit('setLoader') 
    },
    async fetchThisDiscount(state, payload){
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-this-discount?token='+this.getters.getToken, {id: payload})
      const newData = { discount: res.data.discount, array: res.data.products}
      state.commit('fetchThisDiscount', newData)
      state.commit('setLoader') 
    },


  },
  getters: {
    getHostname: (state) => state.hostname,
    getWindowHeight: (state) => state.windowHeight,
    auth(state){
        return state.token !== null
    },
    getMainMenu: (state) => state.mainMenu,
    getUser(state) {
        return state.user
    },
    getCurrentStore: (state) => state.currentStore,
    getToken: (state) => state.token,
    getCurrentpage: (state) => state.navPage,
    getFloatingDiv: (state) => state.dynamicFloatingDiv,
    getMobile: (state) => state.mobile,
    getTablet: (state) => state.tablet,
    getDesktop: (state) => state.desktop,
    getHideRight: (state) => state.hideRight,
    getAddingProduct: (state) => state.addingProduct,
    getStores: (state) => state.stores,
    getAlert: (state) => state.alert,
    getTags: (state) => state.tags,
    getProducts: (state) => state.products,
    getCheckedProducts: (state) => state.checkedProducts,
    getAllFilters: (state) => state.filters,
    getViewingMode: (state) => state.viewingMode,
    getTagEditMode: (state) => state.tagEditForm,
    getThisProduct: (state) => state.thisProduct,
    getDiscounts: (state) => state.discounts,
    getSelectionSheet: (state) => state.selectionSheet,
    getThisDiscount: (state) => state.thisDiscount,
    getLoader: (state) => state.loader,





    


    





  }
})
