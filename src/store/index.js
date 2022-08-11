import axios from 'axios'
import { createStore } from 'vuex'
import router from '@/router'
import country from './modules/country'
export default createStore({
  state: {
    // hostname: 'http://localhost:8000',
    hostname: 'https://api.flexsale.store',
    thisHostname: 'https://app.flexsale.store',
    token: localStorage.getItem('token') || null,
    rememberToken: '',
    // OAuth: '617984689362-02931j85j49mm913mn3lf72j4njggajg.apps.googleusercontent.com',
    OAuth: '749226126008-jhs808q75ioafn76o109qcuh4peav4jl.apps.googleusercontent.com',
    windowHeight: '',
    windowWidth: '',
    bodyWidth: '',
    defaultImage: require('@/assets/images/preview-img.svg'),
    onboard: { status: false, intro: false, basicInfo: false, avatar: false, final: false,
      form: {
        name: '',
        phone1: '',
        phone2: '',
        address: '',
        city: '',
        region: '',
        country: null
      },
      imageForm: {
        storeID: '',
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
    selectionSheet: { active: false, selectProd: false, selectTag: false, prodID: '' },
    discounts: [],
    tempDataContainer: { active: false, editMode: false, data: {}, array: [], propertyName: ''},
    tempProduct: { active: false, data: {}, array: []},
    editContainer: { active: false, data: {}, array: [], propertyName: '', password: false},
    saleRecords: { data: {}, array: [], title: '', startDate: '', endDate: ''},
    // tempArrayCopy: [],
    currentStore: {},
    searchIn: false,
    mobile: false,
    tablet: false,
    desktop: false,
    hideRight: false,
    alert: { status: { show: false, success: false, danger: false, warning: false, info: false }, title: '', body: '' },
    loader: false,
    deleteModal: {active: false, trash: false, deleting: false, id: '', type: '' },
    oAuthSignUpModal: { active: false, user: {}, type: '' },
    trashModal: { active: false, restore: false, type: '', deleting: false, count: ''},
    navPage: { title: '', mobile: false, back: true},
    dynamicFloatingDiv: { left: '', top: '', bottom: ''},
    showDialog: false,
    addingProduct: { active: false, product: false, tag: false, discount: false, admin: false, store: false, supplier: false, stock: false},
    sale: { active: false, minimize: false, maximize: false, mobile: false, array: []
    },
    todaysales: [],
    todaysaleItems: [],
    yesterdaySale: Number,
    salesStats: [],
    admins: [],
    suppliers: [],
    trash: [],
    bulkSelection: { active: false, array: []},
    notifications: [],
    signinStatus: { creating: false, created: false, proceeding: false, progressFill: 1 },

    submitting: true,
    customers: [],
    activities: [],
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
    setRememberToken(state, payload) {
      state.rememberToken = payload
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
    fetchSalesStats(state, payload) {
      state.salesStats = payload
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
    closeOAuthModal(state) {
      const modal = state.oAuthSignUpModal
      modal.active = false
      modal.user = ''
      modal.type = ''
    },
    showOAuthModal(state, payload) {
      const modal = state.oAuthSignUpModal
      modal.user = payload.user
      modal.type = payload.user.type
      modal.active = true
    },
    computeWindow(state) {
      let appWidth = 1344
      let winWidth = window.innerWidth
      state.windowHeight = window.innerHeight
      state.windowWidth = winWidth
      // state.bodyWidth = document.getElementById('main_home').innerWidth
      if(winWidth < 500){
        this.commit('setMobile')
      }else if(winWidth > appWidth){
        this.commit('setDesktop')
      }else{
        this.commit('setTablet', winWidth)
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
    setBodyBgColor(state) {
      if(state.token !== null) {
        document.body.classList.remove('body-dark')
      }else {
        if(!state.mobile)
        document.body.classList.add('body-dark')
      }
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
      }else {
        state.onboard.avatar = false
        state.onboard.final = false
        state.onboard.basicInfo = false
        state.onboard.intro = true
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
      state.onboard.form.country = null,
      state.onboard.imageForm.storeID = '',
      state.onboard.imageForm.image = ''
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
    setSelectionSheet(state, payload) {
      if(payload.type == 'product') {
        state.selectionSheet.selectProd = true
      }else {
        state.selectionSheet.selectTag = true
        state.selectionSheet.prodID = payload.id
      }
      state.selectionSheet.active = true
      document.body.classList.add('fixed-body')
    },
    unSetSelectionSheet(state) {
      state.selectionSheet.active = false
      state.selectionSheet.selectProd = false
      state.selectionSheet.selectTag = false
      state.selectionSheet.prodID = ''
      document.body.classList.remove('fixed-body')
    },
    setLoader(state) {
        state.loader = true
    },
    unSetLoader(state) {
      state.loader = false
    },
    getMainHomeWidth(state, payload) {
      state.selectionSheet.active ? this.commit('unSetSelectionSheet') : ''
      document.body.classList.add('fixed-body')
      const thispayload = { type: payload.type, mode:payload.mode, id:payload.id }
      this.commit('setMainHomeWidth', thispayload)
    },
    setMainHomeWidth(state, payload) {
      state.addingProduct.active = true
      if(payload.type == 'product'){
        state.addingProduct.product = true
        if(payload.mode == 'edit') {
          const newPayload = { data: state.products.find(data => data.id == payload.id)}
          this.commit('setEditContainer', newPayload)
        }
      }else if(payload.type == 'tag'){
        state.addingProduct.tag = true
        payload.mode == 'edit' ? this.commit('editMode') : ''
      }else if(payload.type == 'discount'){
        state.addingProduct.discount = true
        payload.mode == 'edit' ? this.commit('editMode') : ''
      }else if(payload.type == 'admin') {
        if(payload.mode == 'edit'){
          this.dispatch('fetchThisAdmin', payload.id)
        }else if(payload.mode == 'pass') {
          const newData = { id: payload.id }
          state.editContainer.data = newData
          state.editContainer.active = true
          state.editContainer.password = true
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
      }else if(payload.type == 'stock') {
        state.addingProduct.stock = true
        this.dispatch('fetchProdBatch', payload.id)
      }
    },
    refreshStock(state, payload) {
      if(state.tempProduct.active) {
        state.tempProduct.array = payload
      }
      if(state.editContainer.active) {
        state.editContainer.array = payload
      }
    },
    updateStock(state, payload) {
      const i = state.editContainer.array.findIndex(x => x.id === payload.id)
      state.editContainer.array.splice(i, 1, payload)
      if(state.tempProduct.active) {
        const i = state.tempProduct.array.findIndex(x => x.id === payload.id)
        state.tempProduct.array.splice(i, 1, payload)
      }
    },
    addToStock(state, payload) {
      state.editContainer.array.push(payload)
      state.tempProduct.active ? state.tempProduct.array.push(payload) : ''
    },
    editMode(state) {
      state.tempDataContainer.editMode = true
        const newArray = state.tempDataContainer.array.slice();
        state.tempArrayCopy = newArray
    },
    toggleBulkSeletion(state) {
      state.bulkSelection.active = !state.bulkSelection.active
      state.bulkSelection.array = []
    },
    addToSelections(state, payload) {
      state.bulkSelection.array.push(payload)
    },
    removeFromSelections(state, payload) {
      state.bulkSelection.array = state.bulkSelection.array.filter(item => item != payload)
    },
    clearSelection(state) {
      state.bulkSelection.active = false
      state.bulkSelection.array = []
    },
    unsetMainHomeWidth(state, payload){
      // this.commit('dismisAlert')
      this.commit('clearEditContainer')
      state.addingProduct.active = false
      state.addingProduct.tag = false
      state.addingProduct.product = false
      state.addingProduct.discount = false
      state.addingProduct.admin = false
      state.addingProduct.store = false
      state.addingProduct.supplier = false
      state.addingProduct.stock = false
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

    setCreating(state) {
      state.signinStatus.creating = true
    },
    setCreated(state) {
      state.signinStatus.created = true
    },
    setProceeding(state) {
      state.signinStatus.proceeding = true
    },
    unSetCreating(state) {
      state.signinStatus.creating = false
    },
    unSetCreated(state) {
      state.signinStatus.created = false
    },
    unSetProceeding(state) {
      state.signinStatus.proceeding = false
    },
    signInSuccess(state, payload) {
      this.commit('setAuthToken', payload)
      localStorage.setItem('token', payload)
      this.dispatch('getAuthUser')
      return true
    },
    loadDashboard(state) {
      this.commit('setProceeding')
      var interval = setInterval(() => {
        state.signinStatus.progressFill++
            if (state.signinStatus.progressFill === 254) {
              clearInterval(interval)
              router.push({ name: 'Dashboard'})
            }
      }, 20)
    },
    dismisAlert(state) {
        for (let i in state.alert.status)
        state.alert.status[i] = false
        state.alert.body = ''
        state.alert.title = ''
    },
    setDeleteModal(state, payload) {
      document.body.classList.add('fixed-body')
      state.deleteModal.active = true
      state.deleteModal.id = payload.id
      state.deleteModal.type = payload.type  
      if (payload.type === 'trash') {
        state.deleteModal.trash = true
      }
    },
    closeDeleteModal(state) {
      state.deleteModal.active = false
      state.deleteModal.deleting = false
      state.deleteModal.trash = false
      state.deleteModal.id = ''
      state.deleteModal.type = ''
      document.body.classList.remove('fixed-body')
    },
    doDelete(state) {
      state.deleteModal.deleting = true
      const id = state.deleteModal.id
      const type = state.deleteModal.type
      if(type === 'discount'){
        this.dispatch('deleteDiscount', id)
      }else if(type === 'tag') {
        this.dispatch('deleteTag', id)
      }else if(type === 'product') {
        this.dispatch('deleteProduct', id)
      }else if(type === 'user') {
        this.dispatch('deleteUser', state.deleteModal.id)
      }else if(type === 'supplier') {
        this.dispatch('deleteSupplier', id)
      }
      else if(type === 'trash') {
        this.dispatch('moveToTrash', id)
      }
      else if(type === 'stock') {
        this.dispatch('deleteStock', id)
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
    setTrashRestoreDeleteModal(state, payload) {
      document.body.classList.add('fixed-body')
      state.trashModal.active = true
      state.trashModal.type = payload.type
      state.trashModal.count = payload.count
      if(payload.type === 'bulk-Restore')  
      state.trashModal.restore = true
    },
    closeTrashRestoreDeleteModal(state) {
      state.trashModal.deleting = false
      state.trashModal.active = false
      state.trashModal.restore = false
      state.trashModal.count = ''
      state.trashModal.type = ''
      document.body.classList.remove('fixed-body')
    },
    doRestoreDeleteTrash(state) {
      state.trashModal.deleting = true
      if(state.trashModal.type === 'bulk-Restore'){
        this.dispatch('bulkRestoreTrash', state.bulkSelection.array)
      }else if(state.trashModal.type === 'delete-Selected') {
        this.dispatch('deleteSelectedTrash', state.bulkSelection.array)
      }else if(state.trashModal.type === 'bulk-Delete') {
        this.dispatch('bulkDeleteTrash')
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
    addToTagItems(state, payload) {
      state.filters.push(payload)
    },
    fetchTodaysSales(state, payload) {
      state.todaysales = payload.sales
      state.todaysaleItems = payload.saleItems
      state.yesterdaySale = payload.yesterdaySale
    },
    fetchTrash(state, payload) {
      state.trash = payload
    },
    addToTodaysSale(state, payload) {
      state.todaysales.push(payload.sale)
      state.todaysaleItems = payload.saleItems
      payload.product.forEach(element => {
        const j = state.products.findIndex(x => x.id == element.id)
        state.products.splice(j, 1, element)
      });
      const tmp = state.tempProduct
      if(tmp.active) {
        payload.items.forEach(data => {
          const k = tmp.array.findIndex(x => x.id == data.id)
          tmp.array.splice(k, 1, data)
        });
      }
      if (router.currentRoute.value.params.name === 'todays-sales' || (router.currentRoute.value.params.name === 'custom-date-range' && new Date(state.saleRecords.endDate).toISOString().slice(0,10)  === new Date().toISOString().slice(0,10))) {
          state.saleRecords.array.push(payload.sale)
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
      state.stores.splice(i, 1, payload)
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
      state.onboard.imageForm.storeID = payload.store.id
    },
    updateTags(state, payload) {
      state.tags = payload.tags
      state.tempDataContainer.data = payload.data
    },
    updateProduct(state, payload) {
        const i = state.products.findIndex(x => x.id === payload.id)
        state.products.splice(i, 1, payload)
        const filtered = state.filters.find(y => y.id === payload.id)
        if(filtered) {
          filtered.stock = payload.stock
        }
        state.tempProduct.active ? state.tempProduct.data = payload : ''
    },
    updateStockFilter(state, payload) {
      const i = state.filters.findIndex(x => x.id === payload.id)
      state.filters.splice(i, 1, payload)
    },
    updateTrash(state, payload) {
      const i = state.products.findIndex(x => x.id === payload.product.id)
      state.products.splice(i, 1, payload.product);
      if(state.editContainer.active) {
        state.tempDataContainer.array = payload.units
        state.tempDataContainer.data = payload.product
      }
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
    setNotifications(state, payload) {
      state.notifications = []
      payload.forEach(element => {
        element.forEach(data => {
          state.notifications.push(data)
        });
      });
    },
    addCheckedProdToArray(state, payload) {
      state.tempDataContainer.array.push(payload)
    },
    removeCheckedProdFromArray(state, payload) {
      state.tempDataContainer.array = state.tempDataContainer.array.filter(product => product.id !== payload.id)
    },
    fetchFilters(state, payload) {
      state.filters = payload
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
      if(state.tempDataContainer.active == true) {
        state.tempDataContainer.data = payload
      }
    },
    setEditContainer(state, payload) {
      state.editContainer.active = true
      state.editContainer.data = payload.data
      payload.array ? state.editContainer.array = payload.array : ''
      payload.propertyName ? state.editContainer.propertyName = payload.propertyName : ''
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
    },
    // fetchDetailedSupplier(state, payload) {
    //   const data = state.suppliers.find(data => data.id == payload)
    //   const newData = { data: data, array: [], propertyName: '' }
    //   this.commit('setTempDataContainer', newData)
    // },
    setTempProduct(state, payload) {
      if(payload.active) {
        state.tempProduct.array = payload.array
        state.tempProduct.data = payload.data
        state.tempProduct.active = true
        state.submitting = false
      }else {
        state.tempProduct.array = []
        state.tempProduct.data = ''
        state.tempProduct.active = false
      }
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
    setSaleRecordResult(state, payload) {
      state.saleRecords.array = payload.array
      state.saleRecords.data = payload.data
      state.saleRecords.title = payload.resultTItle
      state.saleRecords.startDate = payload.startDate
      state.saleRecords.endDate = payload.endDate
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
    emptyTrash(state) {
      state.trash = []
    },
    removeFromTrash(state, payload) {
      state.trash = state.trash.filter(product => product.id != payload)
    },
    restoreThisProduct(state, payload) {
      this.commit('removeFromTrash', payload.id)
      state.products.push(payload)
      if(state.tempProduct.active) {
        state.tempProduct.data = payload
      }
    },
    restoreSelectdTrash(state, payload) {
      payload.forEach(element => {
        this.commit('removeFromTrash', element.id)
      state.products.push(element)
      });
    },
    removeSelectedTrash(state, payload) {
      payload.forEach(element => {
        this.commit('removeFromTrash', element.id)
      });
    },
    


    removeDeletedUser(state, payload) {
      state.admins = state.admins.filter(admin => admin.id != payload)
    },
    removeDeletedSupplier(state, payload) {
      state.suppliers = state.suppliers.filter(supplier => supplier.id != payload)
    },
    removeDeletedStock(state, payload) {
      state.editContainer.array = state.editContainer.array.filter(stock => stock.id != payload)
      state.tempProduct.active ? state.tempProduct.array = state.tempProduct.array.filter(stock => stock.id != payload) : ''
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
      const saleArr = state.sale.array
      if(saleArr == 0) {
        const payload = { id: 1, title: 'New sale: 001'}
        state.sale.array.push(payload)
        state.sale.active = true
        state.mobile ? document.body.classList.add('fixed-body') : ''
      }
    },
    closeSale(state) {
      state.sale.array = []
      state.sale.active = false
      state.sale.maximize = false
      state.sale.minimize = false
      state.sale.mobile = false
      this.commit('removeBodyFixed')
    },
    maximizeSale(state) {
      if(state.sale.minimize){
        state.sale.minimize = false
      }
      state.sale.maximize = !state.sale.maximize
    },
    minimizeSale(state) {
      this.commit('removeBodyFixed')
      if(state.sale.maximize) {
        state.sale.maximize = false
      }
      if (!state.sale.mobile && state.mobile) {
        state.sale.mobile = true
         
        
      }else if(!state.sale.minimize && !state.mobile){
        state.sale.minimize = true
      }else{
        state.sale.minimize = false
        state.sale.mobile = false
      }
    },
    removeBodyFixed() {
      const doc = document.body.classList
      doc.contains('fixed-body') ? doc.remove('fixed-body') : ''
    }
  },

  actions: {
    async getAuthUser(state) {  
      state.commit('setLoader')          
        try {
          const res = await axios.post(this.getters.getHostname+'/api/user?token='+this.getters.getToken, { store: this.getters.getCurrentStore.id})
          state.commit('setUser', res.data.user)
          state.commit('setStore', res.data.stores)
          state.commit('fetchTags', res.data.tags)
          state.commit('fetchProducts', res.data.products)
          state.commit('fetchDiscounts', res.data.discounts)
          state.commit('fetchSuppliers', res.data.suppliers)
          state.commit('fetchSalesStats', res.data.salesStats)
          state.commit('fetchTodaysSales', { sales: res.data.sales, saleItems: res.data.sales_items, yesterdaySale: res.data.yesterday_sale })
          state.commit('setRememberToken', res.data.remember_token)
          // state.commit('checkOnboard')
          state.commit('unSetLoader')

        } catch (e) {
          state.commit('unSetLoader')
          state.commit('destroyToken') 
        }      
    },
    //OAuth signin
    async signUpnOAuthUser(state, payload) {  
        return await axios.post(this.getters.getHostname+'/api/oauth-sign-up', payload, { store: this.getters.getCurrentStore.id})    
    },
    async resfreshUser(state) {  
      state.commit('setLoader')          
        try {
          const res = await axios.post(this.getters.getHostname+'/api/refresh-user?token='+this.getters.getToken, { store: this.getters.getCurrentStore.id})
          if (res.data.user) {
            state.commit('setUser', res.data.user)
          }
          state.commit('unSetLoader')
        } catch (e) {
          state.commit('unSetLoader')
        }      
    },
    getLogout(state){
        state.commit('setLoader') 
        axios.delete(this.getters.getHostname+'/api/logout?token='+this.getters.getToken, { store: this.getters.getCurrentStore.id})
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
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-all-filters?token='+this.getters.getToken, { store: this.getters.getCurrentStore.id})
      state.commit('fetchFilters', res.data.filters)
      state.commit('unSetLoader') 
    },
    async fetchAdmins(state){
      state.commit('setLoader') 
      try {
        const res = await axios.post(this.getters.getHostname+'/api/get-admin-users?token='+this.getters.getToken, { store: this.getters.getCurrentStore.id})
        state.commit('fetchAdmins', res.data.admins)
        state.commit('unSetLoader') 
      } catch (e) {
        console.log(e.response)
      }  
    },
    async fetchThisAdmin(state, payload){
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-this-admin-user?token='+this.getters.getToken, {id: payload}, { store: this.getters.getCurrentStore.id})
      if(res.data.admin){
        const newData = { data: res.data.admin, propertyName: 'user' }
        state.commit('setEditContainer', newData)
      }else{
        console.log('does not exist')
      }
      state.commit('unSetLoader') 
    },
    async fetchProdBatch(state, payload){
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/fetch-prod-batches?token='+this.getters.getToken, {id: payload},{ store: this.getters.getCurrentStore.id})
      if(res.data.units) {
        const newPayload = { data: res.data.product, array: res.data.units}
        state.commit('setEditContainer', newPayload)
      }
      state.commit('unSetLoader') 
    },
    async fetchThisFilter(state, payload){
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-this-filter?token='+this.getters.getToken, {id: payload}, { store: this.getters.getCurrentStore.id})
      if(res.data.tag){
        const newData = { data: res.data.tag, array: res.data.filters, propertyName: 'tag' }
        state.commit('setTempDataContainer', newData)
      }else{
        console.log('does not exist')
      }
      state.commit('unSetLoader') 
    },
    
    async fetchThisSupplier(state, payload){
      state.commit('setLoader') 
       const res = await axios.post(this.getters.getHostname+'/api/supplier-this-supplier?token='+this.getters.getToken, {id: payload}, { store: this.getters.getCurrentStore.id})
       if(res.data.supplier) {
        //  console.log(res.data)
        const newData = { data: res.data.supplier, array: res.data.products, propertyName: 'supplier'}
        state.commit('setTempDataContainer', newData)
       }else{
         console.log('does not exist')
       }
       state.commit('unSetLoader') 
    },
    async fetchThisProduct(state, payload){
      state.commit('setLoader') 
       const res = await axios.post(this.getters.getHostname+'/api/product-detail?token='+this.getters.getToken, {id: payload},  { store: this.getters.getCurrentStore.id})
       if(res.data.product) {
        const newData = { data: res.data.product, array: res.data.units, active: true}
        state.commit('setTempProduct', newData)
       }else{
         console.log('does not exist')
       }
       state.commit('unSetLoader') 
    },
    async fetchSaleRecords(state, payload) {
      state.commit('setLoader') 
       const res = await axios.post(this.getters.getHostname+'/api/filter-sale-record?token='+this.getters.getToken, payload, { store: this.getters.getCurrentStore.id})
       if(res.data.result) {
        const newData = { data: '', array: res.data.result, resultTItle: res.data.title, startDate: res.data.start_date, endDate: res.data.end_date}
        state.commit('setSaleRecordResult', newData)
        if(res.data.type === 3) {
          router.push({ name: 'SaleRecords', params: { name: 'custom-date-range' }})
        }
        window.scrollTo(0,0)
       }else{
         console.log('does not exist')
       }
       state.commit('unSetLoader') 
    },

    async fetchThisDiscount(state, payload){
      state.commit('setLoader') 
      const res = await axios.post(this.getters.getHostname+'/api/get-this-discount?token='+this.getters.getToken, {id: payload}, { store: this.getters.getCurrentStore.id})
      if(res.data.discount){
        const newData = { data: res.data.discount, array: res.data.products, propertyName: 'discount'}
        state.commit('setTempDataContainer', newData)
      }else{
        console.log('does not exist')
      }
      state.commit('unSetLoader') 
    },
    async setTempImage(state, payload) {
      axios.post( this.getters.getHostname+'/api/reset-temp-img?token='+this.getters.getToken, { id: payload}, { store: this.getters.getCurrentStore.id})
      .then(() => {
          state.commit('resetStoreImage')
      }).catch((e) => {
          console.log(e.response)
      })
  },
  async fetchTrash(state) {
    axios.get(this.getters.getHostname+'/api/trash?token='+this.getters.getToken, { store: this.getters.getCurrentStore.id})
      .then((res) => {
          state.commit('fetchTrash', res.data.trash)
      }).catch((e) => {
          console.log(e.response)
      })
  },
  async restoreThisProduct(state, payload) {
    axios.put(this.getters.getHostname+'/api/trash/'+payload+'?token='+this.getters.getToken, { store: this.getters.getCurrentStore.id})
      .then((res) => {
        state.commit('restoreThisProduct', res.data.product)
        const newPayload = {
          id: 'success',
          body: res.data.status
        }
        state.commit('showAlert', newPayload)
      }).catch((e) => {
          console.log(e.response)
      })
  },
  async bulkRestoreTrash(state, payload) {
    axios.post(this.getters.getHostname+'/api/bulk-restore-trash?token='+this.getters.getToken, { items: payload}, { store: this.getters.getCurrentStore.id})
      .then((res) => {
        state.commit('restoreSelectdTrash', res.data.products)
        const newPayload = {
          id: 'success',
          body: res.data.status
        }
        state.commit('showAlert', newPayload)
        state.commit('closeTrashRestoreDeleteModal')
        state.commit('clearSelection')
      }).catch((e) => {
          console.log(e.response)
      })
  },
  async setNotification(state) {
    axios.post( this.getters.getHostname+'/api/notification?token='+this.getters.getToken, { id: 'me' }, { store: this.getters.getCurrentStore.id})
    .then((res) => {
      state.commit('setNotifications', res.data.notifications)
    }).catch((e) => {
        console.log(e.response)
    })
  },

    // Deletions
    deleteTag(state, payload) {
      axios.delete(this.getters.getHostname+'/api/tag/'+payload+'?token='+this.getters.getToken)
      .then((res) => {
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
    axios.delete(this.getters.getHostname+'/api/discount/'+payload+'?token='+this.getters.getToken, { store: this.getters.getCurrentStore.id})
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
      // console.log(res.data)
      state.commit('removeFromTrash', res.data.id)
      const newPayload = {
          id: 'success',
          body: res.data.status
      }
     state.commit('closeDeleteModal')
      state.commit('showAlert', newPayload)
      router.currentRoute.value.name === 'AllProducts' || router.currentRoute.value.name === 'ProdFilter' || router.currentRoute.value.name === 'Trash'  ? '' : router.go(-1)
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
      router.currentRoute.value.name === 'DetailedSupplier' ? router.go(-1) : ''
    }).catch((err) => {
        console.log(err)
    })
  },
  deleteStock(state, payload) {
    axios.delete(this.getters.getHostname+'/api/product-batch/'+payload+'?token='+this.getters.getToken)
    .then((res) => {
      state.commit('removeDeletedStock', res.data.id)
      state.commit('updateProduct', res.data.stock)
      const newPayload = {
          id: 'success',
          body: res.data.status
      }
      state.commit('showAlert', newPayload)
      state.commit('closeDeleteModal')
    }).catch((err) => {
        console.log(err)
    })
  },
  moveToTrash(state, payload) {
    axios.post( this.getters.getHostname+'/api/move-to-trash?token='+this.getters.getToken, { id: payload})
    .then((res) => {
      state.commit('removeDeletedProduct', res.data.id)
      const newPayload = {
          id: 'success',
          body: res.data.status
      }
      state.commit('showAlert', newPayload)
      state.commit('closeDeleteModal')
      router.currentRoute.value.name === 'Products' ? '' : router.go(-1)
    }).catch((err) => {
        console.log(err)
    })
  },
  deleteSelectedTrash(state, payload) {
    axios.post(this.getters.getHostname+'/api/bulk-delete-trash-selection?token='+this.getters.getToken, { items: payload})
    .then((res) => {
      console.log(res.data)
      state.commit('removeSelectedTrash', res.data.products)
      const newPayload = {
          id: 'success',
          body: res.data.status
      }
      state.commit('showAlert', newPayload)
      state.commit('closeTrashRestoreDeleteModal')
      state.commit('clearSelection')
      router.currentRoute.value.name === 'Products' || router.currentRoute.value.name === 'Trash'  ? '' : router.go(-1)
    }).catch((err) => {
        console.log(err)
    })
  },
  bulkDeleteTrash(state) {
    axios.post(this.getters.getHostname+'/api/empty-trash?token='+this.getters.getToken)
    .then((res) => {
      console.log(res.data)
      state.commit('emptyTrash')
      const newPayload = {
          id: 'success',
          body: res.data.status
      }
      state.commit('showAlert', newPayload)
      state.commit('closeTrashRestoreDeleteModal')
      router.currentRoute.value.name === 'AllProducts' || router.currentRoute.value.name === 'ProdFilter' || router.currentRoute.value.name === 'Trash'  ? '' : router.go(-1)
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
    getThisHostname: (state) => state.thisHostname,
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
    getRememberToken: (state) => state.rememberToken,
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
    getTempProduct: (state) => state.tempProduct,
    getEditContainer: (state) => state.editContainer,
    getDeleteModal: (state) => state.deleteModal,
    getOAuthModal: (state) => state.oAuthSignUpModal,
    getTrashRestoreDeleteModal: (state) => state.trashModal,
    getDefaultImage: (state) => state.defaultImage,
    getCurrency: (state) => state.currency,
    getSuppliers: (state) => state.suppliers,
    getCustomers: (state) => state.customers,
    getActivities: (state) => state.activities,
    getTodaysales: (state) => state.todaysales,
    getTodaysaleItems: (state) => state.todaysaleItems,
    getSale: (state) => state.sale,
    getAdmins: (state) => state.admins,
    getUserAdminID: (state) => state.userAdminID,
    getTrash: (state) => state.trash,
    getSaleRecords: (state) => state.saleRecords,
    getYesterdaySale: (state) => state.yesterdaySale,
    getBulkSelection: (state) => state.bulkSelection,
    getNotifications: (state) => state.notifications,
    getSearch: (state) => state.searchIn,
    getBodyWidth: (state) => state.bodyWidth,
    getSignInStatus: (state) => state.signinStatus,
    getOAuth: (state) => state.OAuth,
    getSalesStats: (state) => state.salesStats,






  getSubmitting: (state) => state.submitting
    
  },
  modules: {
    country
  }
})
