import axios from 'axios'
import { createStore } from 'vuex'
import router from '@/router'

export default createStore({
  state: {
    hostname: 'http://localhost:8000',
    //hostname: 'http://api.flexsale.store',
    token: localStorage.getItem('token') || null,
    windowHeight: '',
    windowWidth: '',
    defaultImage: require('@/assets/images/preview-img.svg'),
    onboard: { status: false, intro: false, basicInfo: false, avatar: false, final: false,
      form: {
        name: '',
        phone1: '',
        phone2: '',
        address: '',
        city: '',
        region: '',
        country: ''
      },
      imageForm: {
        store: '',
        image: ''
      },
      uploaded: false,
    },
    currency: 'GHS',
    user: {},
    userAdminID: '',
    stores: [],
    products: [],
    thisProduct: {},
    tags: [],
    filters: [],
    selectionSheet: false,
    discounts: [],
    tempDataContainer: { active: false, editMode: false, data: {}, array: [], propertyName: ''},
    editContainer: { active: false, data: {}, array: [], propertyName: '', password: false},
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
    addingProduct: { status: false, product: false, tag: false, discount: false, admin: false, store: false, supplier: false},
    sale: { active: false, minimize: false, maximize: false, array: []
    },
    todaysales: [],
    todaysaleItems: [],
    admins: [],
    suppliers: [],
    trash: [],


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
    suppliersALT: [
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
    customers: [
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
  },
  

  mutations: {
    //authentication
      setAuthToken(state, payload){
        state.token = payload;
    },
    setUser(state, payload) {
        state.user = payload
        payload.role === 1 ?  state.userAdminID = payload.id : state.userAdminID = payload.admin_id 
    },
    fetchProducts(state, payload) {
      state.products = payload
    },
    fetchDiscounts(state, payload) {
      state.discounts = payload
    },
    fetchSuppliers(state, payload) {
      state.suppliers = payload
    },
    addToProducts(state, payload) {
      state.products.push(payload)
    },
    addToSuppliers(state, payload) {
      state.suppliers.push(payload)
    },
    setStore(state, payload) {
      state.stores = payload
      payload.forEach(element => {
        if(element.id == state.user.current)
        state.currentStore = element
      });
    },
    computeWindow(state) {
      let appWidth = 1344
      let winWidth = window.innerWidth
      state.windowHeight = window.innerHeight
      state.windowWidth = winWidth
      if(winWidth < 500){
        return this.commit('setMobile')
      }else if(winWidth > appWidth){
        return this.commit('setDesktop')
      }else{
        return this.commit('setTablet', winWidth)
      }
    },
    setStoreTempImg(state, payload) {
      state.onboard.imageForm.image = payload
      state.onboard.uploaded = true
    },
    delStoreTempImg(state) {
      state.onboard.imageForm.image = ''
      state.onboard.uploaded = false
    },

    checkOnboard(state) {
      setTimeout(() => {
        if(state.stores.length < 1){
          state.onboard.status = true
          state.onboard.intro = true
          document.body.classList.add('fixed-body')
        }else{
          state.onboard.status = false
        }
      }, 1000);

    },
    forceSetOnboard(state, payload) {
      state.onboard.status = true
      document.body.classList.add('fixed-body')
      if(payload == 'basicInfo') {
        state.onboard.intro = false
        state.onboard.avatar = false
        state.onboard.final = false
        state.onboard.basicInfo = true
      }else if(payload == 'avatar') {
        state.onboard.intro = false
        state.onboard.final = false
        state.onboard.basicInfo = false
        state.onboard.avatar = true
      }else if(payload == 'final') {
        state.onboard.intro = false
        state.onboard.basicInfo = false
        state.onboard.avatar = false
        state.onboard.final = true
        this.commit('resetForm')
      }
    },
    forceCloseOnboard(state) {
      state.onboard.status = false
      this.commit('resetForm')
      document.body.classList.remove('fixed-body')
      if(state.onboard.uploaded) {
        this.dispatch('deleteTempStoreImg', state.onboard.form.tempImage)
      }
    },
    resetForm(state) {
      state.onboard.form.name = '',
      state.onboard.form.phone1 = '',
      state.onboard.form.phone2 = '',
      state.onboard.form.address = '',
      state.onboard.form.city = '',
      state.onboard.form.region = '',
      state.onboard.form.country = ''
      state.onboard.imageForm.store = '',
      state.onboard.imageForm.image = ''
      return
    },
    editProfileImage(state) {
      const image = state.currentStore.image
      if(image != null) {
        state.onboard.imageForm.image = image
        this.dispatch('setTempImage', image)
      }else
      this.commit('forceSetOnboard', 'avatar')
    },
    resetStoreImage(state) {
      state.onboard.uploaded = true
      this.commit('forceSetOnboard', 'avatar')
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
      document.body.classList.add('fixed-body')
      const thispayload = { type: payload.type, mode:payload.mode, id:payload.id }
      this.commit('setMainHomeWidth', thispayload)
    },
    setMainHomeWidth(state, payload) {
      state.addingProduct.status = true
      if(payload.type == 'product'){
        state.addingProduct.product = true
        if(payload.mode == 'edit') {
          const newPayload = { data: state.tempDataContainer.data, array: state.tempDataContainer.array, propertyName: state.tempDataContainer.propertyName }
          this.commit('setEditContainer', newPayload)
        }
      }else if(payload.type == 'tag'){
        state.addingProduct.tag = true
      }else if(payload.type == 'discount'){
        state.addingProduct.discount = true
      }else if(payload.type == 'admin') {
        if(payload.mode == 'edit'){
          this.dispatch('fetchThisAdmin', payload.id)
        }else if(payload.mode == 'pass') {
          const newData = { id: payload.id }
          state.editContainer.data = newData
          state.editContainer.active = true
          state.editContainer.password = true
          state.editContainer.active = true
          state.addingProduct.admin = true 
        }else{
          state.addingProduct.admin = true
        }
      }else if(payload.type == 'store') {
        state.addingProduct.store = true
        if(payload.mode == 'edit') {
          const newPayload = { data: state.currentStore}
          this.commit('setEditContainer', newPayload)
        }
      }else if(payload.type == 'supplier') {
        state.addingProduct.supplier = true
        if(payload.mode == 'edit') {
          const newPayload = { data: state.suppliers.find(data => data.id == payload.id)}
          this.commit('setEditContainer', newPayload)
        }
      }
      if(payload.mode == 'edit') {
        this.commit('editMode')
        const newArray = state.tempDataContainer.array.slice();
        state.tempArrayCopy = newArray
      }
      //copy to tempArrayCopy
      //for removing rows
    },
    editMode(state) {
      state.tempDataContainer.editMode = true
      return
    },
    unsetMainHomeWidth(state, payload){
      // this.commit('dismisAlert')
      this.commit('clearEditContainer')
      state.addingProduct.status = false
      state.addingProduct.tag = false
      state.addingProduct.product = false
      state.addingProduct.discount = false
      state.addingProduct.admin = false
      state.addingProduct.store = false
      state.addingProduct.supplier = false
      document.body.classList.remove('fixed-body')
    
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
      }else if(state.deleteModal.type === 'user') {
        this.dispatch('deleteUser', state.deleteModal.id)
      }else if(state.deleteModal.type === 'supplier') {
        this.dispatch('deleteSupplier', state.deleteModal.id)
      }
      else{
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
    fetchTodaysSales(state, payload) {
      state.todaysales = payload.sales
      state.todaysaleItems = payload.saleItems
    },
    addToTodaysSale(state, payload) {
      state.todaysales.push(payload.sale)
      state.todaysaleItems = payload.saleItems
      const tmp = state.tempDataContainer
      for (let i = 0; i < payload.items.length; i++) {
        const element = payload.items[i];
        if(tmp.active && tmp.array.length > 0 && tmp.propertyName == 'product' && element.prod_type == 0) {
          tmp.array = tmp.array.filter(item => item.id != element.id)
        }
      }
      const j = state.products.findIndex(x => x.id == payload.product.id)
      state.products.splice(j, 1, payload.product);
      if(tmp.active && tmp.propertyName == 'product') {
        tmp.data = payload.product
      }
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
    updateStore(state, payload) {
      state.currentStore = payload
      const i = state.stores.findIndex(x => x.id === payload.id)
      state.stores.splice(i, 1, payload);
    },
    updateAvatar(state, payload) {
      const i = state.stores.findIndex(x => x.id === payload.id)
      state.stores.splice(i, 1, payload);
      if (state.currentStore.id == payload.id) {
          state.currentStore = payload
      }
    },
    addStore(state, payload) {
      if(Object.keys(state.currentStore).length === 0) {
        state.currentStore = payload.store
      }
      state.stores.push(payload.store)
      state.user = payload.user
      state.onboard.imageForm.store = payload.store.id
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
    
    fetchAdmins(state, payload) {
      state.admins = payload
    },
    addToAdmins(state, payload) {
      state.admins.push(payload)
    },
    updateAdmins(state, payload) {
      const i = state.admins.findIndex(x => x.id === payload.id)
      state.admins.splice(i, 1, payload)
    },
    updateSuppliers(state, payload) {
      const i = state.suppliers.findIndex(x => x.id === payload.id)
      state.suppliers.splice(i, 1, payload)
    },
    
    setEditContainer(state, payload) {
      state.editContainer.active = true
      state.editContainer.array = payload.array
      state.editContainer.data = payload.data
      state.editContainer.propertyName = payload.propertyName
      if (payload.propertyName == 'user') {
          state.addingProduct.admin = true 
      }
    },
    clearEditContainer(state) {
      state.editContainer.active = false
      state.editContainer.array = []
      state.editContainer.data = ''
      state.editContainer.propertyName = ''
      if(state.editContainer.password) {
        state.editContainer.password = false
      }
      return
    },

    setTempDataContainer(state, payload) {
       state.tempDataContainer.array = payload.array
       state.tempDataContainer.data = payload.data
       state.tempDataContainer.propertyName = payload.propertyName
       state.tempDataContainer.active = true
       state.submitting = false
    },
    clearTempDataContainer(state) {
      state.tempDataContainer.array = []
      state.tempDataContainer.active = false
      state.tempDataContainer.editMode = false
      state.tempDataContainer.propertyName = ''
      state.tempDataContainer.data = {}
    },

    clrThisProduct(state) {
      state.thisProduct = []
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
    removeDeletedUser(state, payload) {
      state.admins = state.admins.filter(admin => admin.id != payload)
    },
    removeDeletedSupplier(state, payload) {
      state.suppliers = state.suppliers.filter(supplier => supplier.id != payload)
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
      if(state.sale.minimize){
        state.sale.minimize = false
      }
      state.sale.maximize = !state.sale.maximize
    },
    minimizeSale(state) {
      if(state.sale.maximize) {
        state.sale.maximize = false
      }
      state.sale.minimize = !state.sale.minimize
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
          state.commit('fetchSuppliers', res.data.suppliers)
          state.commit('fetchTodaysSales', { sales: res.data.sales, saleItems: res.data.sales_items })
          state.commit('checkOnboard')
          state.commit('setLoader')
        } catch (e) {
          state.commit('setLoader')
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
    async fetchAdmins(state){
      state.commit('setLoader') 
      try {
        const res = await axios.post(this.getters.getHostname+'/api/get-admin-users?token='+this.getters.getToken)
        state.commit('fetchAdmins', res.data.admins)
        state.commit('setLoader') 
      } catch (e) {
        console.log(e.response)
      }  
    },
    async fetchThisAdmin(state, payload){
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-this-admin-user?token='+this.getters.getToken, {id: payload})
      if(res.data.admin){
        const newData = { data: res.data.admin, array: [], propertyName: 'user' }
        state.commit('setEditContainer', newData)
      }else{
        console.log('does not exist')
      }
      state.commit('setLoader') 
    },
    
    async fetchThisFilter(state, payload){
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-this-filter?token='+this.getters.getToken, {id: payload})
      if(res.data.tag){
        const newData = { data: res.data.tag, array: res.data.filters, propertyName: 'tag' }
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
        const newData = { data: res.data.product, array: res.data.units, propertyName: 'product'}
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
        const newData = { data: res.data.discount, array: res.data.products, propertyName: 'discount'}
        state.commit('setTempDataContainer', newData)
      }else{
        console.log('does not exist')
      }
      state.commit('setLoader') 
    },
    async setTempImage(state, payload) {
      axios.post( this.getters.getHostname+'/api/reset-temp-img?token='+this.getters.getToken, { id: payload})
      .then(() => {
          state.commit('resetStoreImage')
      }).catch((e) => {
          console.log(e.response)
      })
      
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
      router.currentRoute.value.name === 'AllProducts' || router.currentRoute.value.name === 'ProdFilter'  ? '' : router.go(-1)
    }).catch((err) => {
        console.log(err)
    })
  },
  deleteUser(state, payload) {
    axios.delete(this.getters.getHostname+'/api/sign-up/'+payload+'?token='+this.getters.getToken)
    .then((res) => {
      //console.log(res.data)
      state.commit('removeDeletedUser', res.data.id)
      const newPayload = {
          id: 'success',
          body: res.data.status
      }
      state.commit('closeDeleteModal')
      state.commit('showAlert', newPayload)
    }).catch((err) => {
        console.log(err)
    })
  },
  deleteSupplier(state, payload) {
    axios.delete(this.getters.getHostname+'/api/suppliers/'+payload+'?token='+this.getters.getToken)
    .then((res) => {
      state.commit('removeDeletedSupplier', res.data.id)
      const newPayload = {
          id: 'success',
          body: res.data.status
      }
      state.commit('closeDeleteModal')
      state.commit('showAlert', newPayload)
    }).catch((err) => {
        console.log(err)
    })
  },
  
  // do this for close delete temp
  // deleteTempProdImg(state, payload) {
  //   axios.delete(this.getters.getHostname+'/api/del-prod-temp/'+payload+'?token='+this.getters.getToken)
  //   .then(() => {
  //       state.commit('delStoreTempImg')
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // },
  deleteTempStoreImg(state, payload) {
    axios.delete(this.getters.getHostname+'/api/del-store-temp/'+payload+'?token='+this.getters.getToken)
    .then(() => {
        state.commit('delStoreTempImg')
    }).catch((err) => {
      console.log(err)
    })
  },


  },
  getters: {
    getHostname: (state) => state.hostname,
    getWindowHeight: (state) => state.windowHeight,
    getWindowWidth: (state) => state.windowWidth,
    auth(state){
        return state.token !== null
    },
    getMainMenu: (state) => state.mainMenu,
    getUser(state) {
        return state.user
    },
    getOnboard: (state) => state.onboard,
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
    getEditContainer: (state) => state.editContainer,
    getDeleteModal: (state) => state.deleteModal,
    getDefaultImage: (state) => state.defaultImage,
    getCurrency: (state) => state.currency,
    getSuppliers: (state) => state.suppliers,
    getCustomers: (state) => state.customers,
    getStats: (state) => state.stats,
    getActivities: (state) => state.activities,
    getTempArrayCopy: (state) => state.tempArrayCopy,
    getTodaysales: (state) => state.todaysales,
    getTodaysaleItems: (state) => state.todaysaleItems,
    getSale: (state) => state.sale,
    getAdmins: (state) => state.admins,
    getUserAdminID: (state) => state.userAdminID,
    getTrash: (state) => state.trash,
    // delete this afterwards
    getSuppliersALT: (state) => state.suppliersALT,





    getSubmitting: (state) => state.submitting
    





    


    





  }
})
