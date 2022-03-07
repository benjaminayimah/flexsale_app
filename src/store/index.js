import axios from 'axios'
import { createStore } from 'vuex'
import router from '@/router'

export default createStore({
  state: {
    hostname: 'http://localhost:8000',
    //hostname: 'http://api.flexsale.store',
    token: localStorage.getItem('token') || null,
    windowHeight: '',
    defaultImage: require('@/assets/images/preview-img.svg'),
    currency: 'GH₵',
    user: {},
    stores: [],
    products: [],
    thisProduct: {},
    tags: [],
    filters: [],
    selectionSheet: false,
    discounts: [],
    tempDataContainer: { active: false, editMode: false, data: {}, array: [], propertyName: ''},
    tempArrayCopy: [],
    currentStore: {},
    mobile: false,
    tablet: false,
    desktop: false,
    hideRight: false,
    alert: { status: { show: false, success: false, danger: false, warning: false, info: false }, title: '', body: '' },
    loader: false,
    deleteModal: {active: false, deleting: false, id: '', type: '' },
    navPage: { title: '', mobile: false, back: true},
    dynamicFloatingDiv: { left: '', top: '', bottom: ''},
    showDialog: false,
    addingProduct: { status: false, width: '', product: false, tag: false, discount: false},
    sale: { active: false, minimize: false, maximize: false, array: []
    },

    submitting: true,
    stats: [
      {id: 1, index: 0, count: '1,200', title: 'Products'},
      {id: 2, index: 1, count: '200', title: 'Low stocks'},
      {id: 3, index: 2, count: '50', title: 'Expiry alert'},
      {id: 4, index: 3, count: '15', title: 'Expiry alert'},
      {id: 5, index: 4, count: '15', title: 'Expiry alert'},
      {id: 6, index: 5, count: '15', title: 'Expiry alert'},
      {id: 7, index: 6, count: '15', title: 'Expiry alert'},
  ],
  suppliers: [
      {id: 1, index: 0, name: 'Jon Doe', image: 'profile-1.png'},
      {id: 2, index: 1, name: 'Walter White', image: 'profile-2.png'},
      {id: 3, index: 2, name: 'Jane Smith', image: 'profile-3.png'},
      {id: 4, index: 3, name: 'monicca brown', image: ''},
      {id: 5, index: 4, name: 'monicca brown', image: 'profile-4.png'},
      {id: 6, index: 5, name: 'Tyler Cooper', image: 'profile-5.png'},
      {id: 7, index: 6, name: 'Harisson Smichel', image: ''},
      {id: 8, index: 7, name: 'Harisson Smichel', image: 'profile-6.png'},
      {id: 9, index: 8, name: 'Jadon Sancho', image: 'profile-7.png'},
      {id: 10, index: 9, name: 'Sarah', image: ''},
      {id: 11, index: 10, name: 'Sarah', image: 'profile-8.png'},
      {id: 12, index: 11, name: 'Chris Sharw', image: 'profile-9.png'},
      {id: 13, index: 12, name: 'Dominic Campbel', image: 'profile-10.png'},
  ],
  activities: [
    {id: 1, type: 'addition', body: 'Lorem ipsum dolor', time: '4 hours ago'},
    {id: 2, type: 'addition', body: 'Lorem ipsum dolor', time: '4 hours ago'},
    {id: 3, type: 'addition', body: 'Lorem ipsum dolor', time: '4 hours ago'},
    {id: 4, type: 'addition', body: 'Lorem ipsum dolor', time: '4 hours ago'},
    {id: 5, type: 'addition', body: 'Lorem ipsum dolor', time: '4 hours ago'},
  ],
  todaysales: [
    {id: 1, type: 'addition', body: 'Lorem ipsum dolor', time: '4 hours ago'},
    {id: 2, type: 'addition', body: 'Lorem ipsum dolor', time: '4 hours ago'},
    // {id: 3, type: 'addition', body: 'Lorem ipsum dolor', time: '4 hours ago'},
    // {id: 4, type: 'addition', body: 'Lorem ipsum dolor', time: '4 hours ago'},
    // {id: 5, type: 'addition', body: 'Lorem ipsum dolor', time: '4 hours ago'},
  ],

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
    doSelectionSheet(state) {
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
      const thispayload = { dimension: homeWidth, type: payload.type, mode:payload.mode }
      this.commit('setMainHomeWidth', thispayload)
    },
    setMainHomeWidth(state, payload) {
      state.addingProduct.width = payload.dimension
      state.addingProduct.status = true
      if(payload.type == 'product'){
        state.addingProduct.product = true
      }else if(payload.type == 'tag'){
        state.addingProduct.tag = true
      }else if(payload.type == 'discount'){
        state.addingProduct.discount = true
      }
      if(payload.mode == 'edit') {
        state.tempDataContainer.editMode = true
        const newArray = state.tempDataContainer.array.slice();
        state.tempArrayCopy = newArray

      }
      //copy to tempArrayCopy
      //for removing rows
    },
    unsetMainHomeWidth(state, payload){
      // this.commit('dismisAlert')
      state.addingProduct.status = false
      state.addingProduct.tag = false
      state.addingProduct.product = false
      state.addingProduct.discount = false
      state.addingProduct.width = ''
      document.body.classList.remove('fixed-body')
      let appSection = document.getElementById('app_section')
      appSection.style.left = '0px'
      if(!state.tempDataContainer.active) {
        state.tempDataContainer.array = []
      }
      if(state.tempDataContainer.editMode) {
        state.tempDataContainer.editMode = false
        if(state.tempArrayCopy.length > 0 && payload !== true) {
          const oldArray = state.tempArrayCopy.slice();
          state.tempDataContainer.array = oldArray
        }
        state.tempArrayCopy = []
      }
    },
    showAlert(state, payload) {
      this.commit('dismisAlert')
      if(payload.id === 'success'){
          state.alert.title = payload.title
          state.alert.body = payload.body
          state.alert.status.success = true
          state.alert.status.show = true
          setTimeout(() => {
            this.commit('dismisAlert')
          }, 3000);
      }else if(payload.id === 'danger'){
          state.alert.title = payload.title
          state.alert.body = payload.body
          state.alert.status.danger = true
          state.alert.status.show = true
      }   
    },
    dismisAlert(state) {
        for (let i in state.alert.status)
        state.alert.status[i] = false
        state.alert.body = ''
        state.alert.title = ''
    },
    setDeleteModal(state, payload) {
      state.deleteModal.active = true
      state.deleteModal.id = payload.id
      state.deleteModal.type = payload.type
      document.body.classList.add('fixed-body')
    },
    closeDeleteModal(state) {
      state.deleteModal.active = false
      state.deleteModal.deleting = false
      state.deleteModal.id = ''
      state.deleteModal.type = ''
      document.body.classList.remove('fixed-body')
    },
    doDelete(state) {
      state.deleteModal.deleting = true
      if(state.deleteModal.type === 'discount'){
        this.dispatch('deleteDiscount', state.deleteModal.id)
      }else if(state.deleteModal.type === 'tag') {
        this.dispatch('deleteTag', state.deleteModal.id)
      }else if(state.deleteModal.type === 'product') {
        this.dispatch('deleteProduct', state.deleteModal.id)
      }else{
        const newPayload = {
            id: 'danger',
            body: 'Error deleting item try again'
          }
          this.commit('closeDeleteModal')
          this.commit('showAlert', newPayload)
      }
    },
    fetchTags(state, payload) {
      state.tags = payload
    },
    addToTags(state, payload) {
      state.tags.push(payload)
    },
    addToDiscounts(state, payload) {
      state.discounts.push(payload.discount)
      if(payload.products.length > 0){
        payload.products.forEach(element => {
          const i = state.products.findIndex(x => x.id === element.id)
          state.products.splice(i, 1, element)
        });
      }
    },
    updateTags(state, payload) {
      state.tags = payload.tags
      state.tempDataContainer.data = payload.data
    },
    updateProduct(state, payload) {
      const i = state.products.findIndex(x => x.id === payload.product.id)
      state.products.splice(i, 1, payload.product);
      state.tempDataContainer.array = payload.units
      state.tempDataContainer.data = payload.product
    },
    updateDiscounts(state, payload) {
      state.discounts = payload.discounts
      state.tempDataContainer.data = payload.discount
      state.products = payload.products
      let oldChecked = state.tempDataContainer.array
      if(oldChecked.length > 0) {
          oldChecked.forEach(element => {
          element.discount = payload.discount.id
        });
      }

    },
    addCheckedProdToArray(state, payload) {
      state.tempDataContainer.array.push(payload)
    },
    removeCheckedProdFromArray(state, payload) {
      state.tempDataContainer.array = state.tempDataContainer.array.filter(product => product.id !== payload.id)
    },
    fetchFilters(state, payload) {
      state.filters = payload
      //console.log(payload)
    },
    setTempDataContainer(state, payload) {
       state.tempDataContainer.array = payload.array
       state.tempDataContainer.data = payload.data
       state.tempDataContainer.active = true
       state.submitting = false
    },
    clearTempDataContainer(state) {
      state.tempDataContainer.array = []
      state.tempDataContainer.active = false
      state.tempDataContainer.editMode = false
      state.tempDataContainer.data = {}
    },

    clrThisProduct(state) {
      state.thisProduct = ''
    },
    removeDeletedTags(state, payload) {
      state.tags = state.tags.filter(tag => tag.id != payload)
      state.filters = state.filters.filter(filter => filter.tag_id != payload);
    },
    removeDeletedDiscount(state, payload) {
      state.discounts = state.discounts.filter(discount => discount.id != payload.disID)
      let oldChecked = payload.array
      if(oldChecked.length > 0) {
          oldChecked.forEach(element => {
          const i = state.products.findIndex(x => x.id === element.id)
          state.products[i].discount = null
        });
      }

    },
    removeDeletedProduct(state, payload) {
      state.products = state.products.filter(product => product.id != payload)
      if(state.filters.length > 0) {
        state.filters = state.filters.filter(product => product.id != payload)
      }
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
    addToSale(state) {
      const payload = { id: 1, title: 'New sale: 001'}
      state.sale.array.push(payload)
      state.sale.active = true
    },
    closeSale(state) {
      state.sale.array = []
      state.sale.active = false
      state.sale.maximize = false
      state.sale.minimize = false
    },
    maximizeSale(state) {
      state.sale.maximize = !state.sale.maximize
    }

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
  async getAuthUser(state) {  
      state.commit('setLoader')          
        try {
          const res = await axios.post(this.getters.getHostname+'/api/user?token='+this.getters.getToken)
          state.commit('setUser', res.data.user)
          state.commit('setStore', res.data.stores)
          state.commit('fetchTags', res.data.tags)
          state.commit('fetchProducts', res.data.products)
          state.commit('fetchDiscounts', res.data.discounts)
          state.commit('setLoader') 
        } catch (e) {
          state.commit('setLoader')
          console.log(e.response)
          state.commit('destroyToken') 
        }      
    },

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
    async fetchFilters(state){
      //state.commit('unCheckAllAndEmpty')
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-all-filters?token='+this.getters.getToken)
      state.commit('fetchFilters', res.data.filters)
      //console.log(res.data)
      state.commit('setLoader') 
    },
    async fetchThisFilter(state, payload){
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-this-filter?token='+this.getters.getToken, {id: payload})
      if(res.data.tag){
        const newData = { data: res.data.tag, array: res.data.filters}
        state.commit('setTempDataContainer', newData)
      }else{
        console.log('does not exist')
      }
      state.commit('setLoader') 
    },
    async fetchThisProduct(state, payload){
      state.commit('setLoader') 
       const res = await axios.post(this.getters.getHostname+'/api/product-detail?token='+this.getters.getToken, {id: payload})
       if(res.data.product) {
         //console.log(res.data)
        // state.commit('fetchThisProduct', res.data.product)
        const newData = { data: res.data.product, array: res.data.units}
        state.commit('setTempDataContainer', newData)
       }else{
         console.log('does not exist')
       }
       state.commit('setLoader') 
    },
    async fetchThisDiscount(state, payload){
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-this-discount?token='+this.getters.getToken, {id: payload})
      if(res.data.discount){
        const newData = { data: res.data.discount, array: res.data.products}
        state.commit('setTempDataContainer', newData)
      }else{
        console.log('does not exist')
      }
      state.commit('setLoader') 
    },

    // Deletions
    deleteTag(state, payload) {
      axios.delete(this.getters.getHostname+'/api/tag/'+payload+'?token='+this.getters.getToken)
      .then((res) => {
          console.log(res.data)
          state.commit('removeDeletedTags', res.data.id)
          const newPayload = {
              id: 'success',
              body: res.data.status
          }
          state.commit('closeDeleteModal')
          state.commit('showAlert', newPayload)
          router.go(-1)
      }).catch((err) => {
          console.log(err)
      })
  },
  deleteDiscount(state, payload) {
    axios.delete(this.getters.getHostname+'/api/discount/'+payload+'?token='+this.getters.getToken)
    .then((res) => {
        const payload = {
          disID: res.data.id, array: res.data.products 
        }
        state.commit('removeDeletedDiscount', payload)
        const newPayload = {
            id: 'success',
            body: res.data.status
        }
        state.commit('closeDeleteModal')
        state.commit('showAlert', newPayload)
        router.go(-1)
      }).catch((err) => {
          console.log(err)
      })
  },
  deleteProduct(state, payload) {
    axios.delete(this.getters.getHostname+'/api/products/'+payload+'?token='+this.getters.getToken)
    .then((res) => {
      //console.log(res.data)
      state.commit('removeDeletedProduct', res.data.id)
      const newPayload = {
          id: 'success',
          body: res.data.status
      }
      state.commit('closeDeleteModal')
      state.commit('showAlert', newPayload)
      //document.body.classList.remove('fixed-body')
      
      router.currentRoute.value.name === 'AllProducts' || router.currentRoute.value.name === 'ProdFilter'  ? '' : router.go(-1)
      //console.log(router.currentRoute.value.name)
        
    }).catch((err) => {
        console.log(err)
    })
  }


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
    getAllFilters: (state) => state.filters,
    getTagEditMode: (state) => state.tagEditForm,
    getThisProduct: (state) => state.thisProduct,
    getDiscounts: (state) => state.discounts,
    getSelectionSheet: (state) => state.selectionSheet,
    getLoader: (state) => state.loader,
    getTempContainer: (state) => state.tempDataContainer,
    getDeleteModal: (state) => state.deleteModal,
    getDefaultImage: (state) => state.defaultImage,
    getCurrency: (state) => state.currency,
    getSuppliers: (state) => state.suppliers,
    getStats: (state) => state.stats,
    getActivities: (state) => state.activities,
    getTempArrayCopy: (state) => state.tempArrayCopy,
    getTodaysales: (state) => state.todaysales,
    getSale: (state) => state.sale,



    getSubmitting: (state) => state.submitting
    





    


    





  }
})
