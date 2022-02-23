<template>
    <form id="product_form">
        <div class="form-row">
            <label>Product Image:</label>
            <div class="img-hold">
                <div v-if="doingtempUpload" class="img-container">
                    <div class="img-main-wrap" id="img_main" :style="{backgroundImage: 'url('+require('@/assets/images/preview-img.png')+')'}">
                        <div id="loading_hold">
                            <i class="lazy-loader" :class="{ 'loader' : load }"></i>
                        </div>
                    </div>
                </div>
                <div v-else-if="imageUploaded" class="img-container">
                    <div class="img-main-wrap" id="img_main" :style="{backgroundImage: 'url('+getHostname+'/storage/'+getUser.current+'/temp/'+form.tempImage+')'}">
                        <div v-if="deleting" id="loading_hold">
                            <i class="lazy-loader" :class="{ 'loader' : load }"></i>
                        </div>
                        <button v-else class="button-secondary" id="deltmp" @click.prevent="deltmp(form.tempImage)">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 17.063 18">
                                <path fill="#0e142c"  d="M-163.673-438.167a2.146,2.146,0,0,1-2.154-1.973l-.724-10.631,1.188-.078.724,10.632a.961.961,0,0,0,.966.884h7.236a.962.962,0,0,0,.966-.885l.724-10.631,1.188.078-.724,10.631a2.146,2.146,0,0,1-2.154,1.973Zm-4.793-13.986v-1.166h5.08v-2.848h6.662v2.848h5.321v1.166Zm10.551-1.166V-455H-162.2v1.683Z" transform="translate(168.466 456.167)"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div v-else class="empty-state-container">
                    <button class="flex-column" @click.prevent="uploadClick('prod_img')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20.291 20.29">
                            <path d="M-4280.267-699.712a2.84,2.84,0,0,1-2.837-2.838v-4.175a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75v4.175a1.339,1.339,0,0,0,1.337,1.338h14.615a1.34,1.34,0,0,0,1.338-1.338v-4.175a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75v4.175a2.842,2.842,0,0,1-2.839,2.838Zm6.558-7.013v-10.717l-3.939,3.94a.751.751,0,0,1-1.061,0,.751.751,0,0,1,0-1.061l5.22-5.22a.748.748,0,0,1,.531-.219h.018a.745.745,0,0,1,.33.085h0l.012.006.007,0,.007,0,.01.006,0,0,.014.009h0a.762.762,0,0,1,.126.1l5.22,5.22a.751.751,0,0,1,0,1.061.748.748,0,0,1-.531.219.749.749,0,0,1-.53-.219l-3.939-3.94v10.718a.749.749,0,0,1-.749.749A.749.749,0,0,1-4273.709-706.725Z" transform="translate(4283.104 720.002)" fill="#566ff4"/>
                        </svg>
                    </button>
                    <span>Upload product image</span>
                    <span class="instruction">The file type must be <strong>"png, jpg or jpeg"</strong> and <strong>Less than 1MB</strong></span>
                    <input class="hide" @change="uploadTemp" name="image" id="prod_img" type="file" ref="img">
                    <div v-if="imageStatus.status" class="status-div-backdrop" @click="clrError">
                        <div class="status-div">
                            <button @click.prevent="">
                                <svg xmlns="http://www.w3.org/2000/svg"  height="12" viewBox="0 0 14 14">
                                    <path d="M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z" transform="translate(-5 -5)" fill="#ffffff"/>
                                </svg>
                            </button>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 39.159 34.195">
                                    <path d="M-12866.661-2756.781h-30.138a4.567,4.567,0,0,1-3.908-2.3,4.571,4.571,0,0,1,.014-4.536.025.025,0,0,0,.006-.013l15.066-25.148s0,0,0,0a4.579,4.579,0,0,1,3.895-2.2,4.579,4.579,0,0,1,3.9,2.2s0,0,0,0l15.063,25.148a.138.138,0,0,1,.01.013,4.571,4.571,0,0,1,.014,4.536,4.567,4.567,0,0,1-3.908,2.3Zm-17.248-30.967-15.056,25.139a2.572,2.572,0,0,0-.007,2.539,2.581,2.581,0,0,0,2.189,1.292h30.118a2.57,2.57,0,0,0,2.186-1.292,2.562,2.562,0,0,0,0-2.539l-15.057-25.139a2.574,2.574,0,0,0-2.186-1.227A2.576,2.576,0,0,0-12883.909-2787.748Zm.975,23.452a1,1,0,0,1,1-1,1,1,0,0,1,1,1,1,1,0,0,1-1,1A1,1,0,0,1-12882.935-2764.3Zm0-7v-8a1,1,0,0,1,1-1,1,1,0,0,1,1,1v8a1,1,0,0,1-1,1A1,1,0,0,1-12882.935-2771.3Z" transform="translate(12901.303 2790.976)" fill="#e63232"/>
                                </svg>
                            </div>
                            <div><span>{{ imageStatus.msg }}</span></div>
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="form-row">
            <label>Product name:</label>
            <input v-model="form.name" type="text" name="ProductName" class="form-control" placeholder="Product’s name eg. Ideal Milk" required>
        </div>
        <div class="form-row">
            <div id="unit_bg">
                <div>
                    <div class="form-check flex-row-st">
                        <input v-model="form.prodType" id="retail" value="0" class="form-check-input" type="radio" :checked="form.prodType == '0' ? true : false">
                        <label for="retail">Add Product Units</label>
                    </div>
                    <div :class="{ 'activate-dst': form.prodType == '1'}">
                        <div>If there are several units in this product, you may proceed to add the individual units here.</div>
                    <div class="flex-row align-content-center">
                        <div class="unit-input-hold">
                            <input type="text" name="BatchNumber" :disabled="form.prodType == '0' ? false : true" v-model="unitForm.batch" class="form-control" placeholder="Batch number">
                        </div>
                        <div class="unit-input-hold">
                            <Datepicker v-model="month" monthPicker :disabled="form.prodType == '0' ? false : true"></Datepicker>
                        </div>
                        <button class="button add-unit-btn button-primary" :disabled="form.prodType == '0' ? false : true" @click.prevent="addToUnit">Add</button>
                    </div>
                    <span v-if="error.active" class="err">{{ error.message }}</span>
                    <div class="unit-added-wrap" v-if="units.length > 0">
                        <ul v-show="form.prodType == '0'">
                            <li v-for="unit in units" :key="unit.batch">
                                <div class="unit-pill flex flex-row-js">
                                    <span class="pill-batch-no text-overflow-ellipsis">{{ unit.batchNumber }}</span>
                                    <span class="divider" v-show="unit.expiry">|</span>
                                    <span class="expiry-date text-overflow-ellipsis" v-show="unit.expiry">{{ unit.expiry }}</span>
                                    <button class="flex align-items-center justify-content-center" @click.prevent="delUnit(unit.batchNumber)">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 20 20">
                                            <path d="M5793.4-3003.846l-7.881-7.881-7.879,7.88a1.241,1.241,0,0,1-1.756,0,1.242,1.242,0,0,1,0-1.756l7.88-7.879-7.88-7.879a1.243,1.243,0,0,1,0-1.757,1.241,1.241,0,0,1,1.756,0l7.88,7.88,7.88-7.88a1.24,1.24,0,0,1,1.755,0,1.24,1.24,0,0,1,0,1.756l-7.88,7.88,7.88,7.88a1.241,1.241,0,0,1,0,1.757,1.236,1.236,0,0,1-.877.363A1.236,1.236,0,0,1,5793.4-3003.846Z" transform="translate(-5775.518 3023.483)" fill="#ffffff">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div>
                    <div class="or">
                        <div>Or</div>
                    </div>
                    <!-- <label class="checkbox-hold">
                        <input v-model="form.directStock" type="checkbox">
                        <span class="checkbox-custom"></span>
                        <span class="chk-label">Add stock number directly.</span>
                    </label> -->
                    
                    <div class="form-check flex-row-st">
                    <input v-model="form.prodType" id="wholesale" value="1" class="form-check-input" type="radio" :checked="form.prodType == '1' ? true : false" >
                    <label for="wholesale">Add stock number directly.</label>
                </div>
                    <div class="flex-row-st" :class="{ 'activate-dst': form.prodType == '0'}">
                        <div style="margin-right:10px">
                            <label>Stock:</label>
                            <input type="text" name="stockNumber" v-model="direct.quantity" :disabled="form.prodType == '1' ? false : true" class="form-control stk2" placeholder="100">
                        </div>
                        <div style="margin-right:10px">
                            <label>Batch No.:</label>
                            <input type="text" name="stockNumber" v-model="direct.batch" :disabled="form.prodType == '1' ? false : true" class="form-control" placeholder="Batch number">
                        </div>
                        <div class="unit-input-hold" style="margin:0; padding: 10px 0">
                            <label>Expiry date:</label>
                            <Datepicker v-model="month2" monthPicker :disabled="form.prodType == '1' ? false : true"></Datepicker>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="form-row">
            <label>Batch number:</label>
            <input v-model="form.batchNumber" type="text" name="BatchNumber" class="form-control" placeholder="Batch No.,Barcode, ISBN">
        </div> -->
        <div class="form-row">
            <label>Category:</label>
            <select id="category" class="form-control select">
                <option selected="selected">Select a category</option>
                <option value="men">men</option>
                </select>
            <div class="a-btn">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 15.883 15.882">
                        <path d="M-12729.059-1230.178v-5.942H-12735a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.942v-5.942a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.942h5.941a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.941v5.942a1,1,0,0,1-1,1A1,1,0,0,1-12729.059-1230.178Z" transform="translate(12736.001 1245.061)" fill="#566ff4"/>
                    </svg>
                    Create new Category
                </a>
            </div>
        </div>
        <div class="form-row">
            <label>Type of product:</label>
            
        </div>
        <div class="form-row">
            <label>Supply Cost per unit:</label>
            <div class="form-row-col">
                <div class="col-2 pl-0">
                    <input v-model="form.cost" type="text" name="costPrice" class="form-control" placeholder="100">
                </div>
            </div>
        </div>
        <div class="form-row">
            <label>Selling price per unit:</label>
            <div class="form-row-col">
                <div class="col-2">
                    <input v-model="form.sellingPrice" type="text" name="sellingPrice" class="form-control" placeholder="100">
                </div>
                <div class="col-2">
                    <div class="profit-row">
                        <div class="flex-row-st">
                            <div class="profit-label">
                                Profit per unit:
                            </div>
                            <div class="vals">
                                <span>GH₵</span><span>50</span>
                            </div>
                        </div>
                        <div class="flex-row-st">
                            <div class="profit-label">
                                Profit margin:
                            </div>
                            <div class="vals">
                                <span>40</span><span class="percent value">%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="form-row">
            <label>Stock:</label>
            <div class="form-row-col">
                <div class="col-2">
                    <input v-model="form.stock" type="text" name="stock" class="form-control" placeholder="100">
                </div>
                <div class="col-2">
                    <div class="profit-row">
                        <label class="checkbox-hold">
                                <input v-model="form.trackQty" type="checkbox">
                                <span class="checkbox-custom"></span>
                                <span class="chk-label">Automatically track quantity</span>
                        </label>
                    </div>
                </div>
            </div>
        </div> -->
        <div class="form-row">
            <label>Description:</label>
            <textarea v-model="form.description" class="form-control" name="description" rows="5"></textarea>
        </div>
        <div class="form-row">
            <label>Supplier:</label>
            <select v-model="form.supplier" id="supplier" class="form-control select">
                <option selected="selected">Select a supplier</option>
                <option value="0">ABC Enterprise</option>
                <option value="1">XYZ Ltd</option>
                </select>
            <div class="a-btn">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 15.883 15.882">
                        <path d="M-12729.059-1230.178v-5.942H-12735a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.942v-5.942a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.942h5.941a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.941v5.942a1,1,0,0,1-1,1A1,1,0,0,1-12729.059-1230.178Z" transform="translate(12736.001 1245.061)" fill="#566ff4"/>
                    </svg>
                    Create new Supplier
                </a>
            </div>
        </div>
        <teleport to="#form_submit_btn_holder">
            <div class="btn-wrap2">
                <button v-if="!getTempContainer.active" class="button button-primary" @click.prevent="doUpload">Submit</button>
                <button v-else class="button button-primary" @click.prevent="">Save changes</button>
            </div>
        </teleport>
    </form>
</template>
<script>
import axios from 'axios'
import 'vue3-date-time-picker/dist/main.css'
import Datepicker from 'vue3-date-time-picker';
//import { ref } from 'vue';
import { mapGetters } from 'vuex'
export default {
    name: 'AddNewProduct',
    computed: mapGetters(['getToken', 'getHostname', 'getUser', 'getTempContainer']),
    components: { Datepicker },
    // setup() {
    //     const month = ref({ 
    //         month: new Date().getMonth(),
    //         year: new Date().getFullYear()
    //     });
    //     return {
    //         month,
    //     }
    // },
    data() {
        return {
            month: {
                month: new Date().getMonth(),
                year: new Date().getFullYear()
             },
             month2: {
                month: new Date().getMonth(),
                year: new Date().getFullYear()
             },
            doingProductUpload: false,
            duplicate: false,
            unitForm: {
                batch: '',
                expiry: ''
            },
            units: [],
            direct: { quantity: '', batch: ''},
            profit: '',
            profitMargin: '',
            image: '',
            form: {
                tempImage: '',
                name: '',
                cost: '',
                sellingPrice: '',
                stock: '',
                description: '',
                supplier: '',
                prodType: '0',
                batch: ''
                //directStock: false,
            },
            doingtempUpload: false,
            imageUploaded: false,
            deleting: false,
            load: false,
            imageStatus: {status: false, msg: ''},
            error: { active: false, message: ''}
        }
    },
    methods: {
        uploadClick(id) {
            document.getElementById(id).click()
        },
        showError(msg) {
            this.imageStatus.status = true
            this.imageStatus.msg = msg
            return false
        },
        clrError() {
            this.imageStatus.status = false
            this.imageStatus.msg = ''
            document.getElementById('prod_img').value = null
            return false
        },
        uploadTemp() {
            if(this.imageStatus.status) {
                this.clrError()
            }
            let file = this.$refs.img.files[0]
            if(file) {
                if(!(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")){
                    return this.showError('Unsupported file. The file type must be "png, jpg or jpeg"')
                    //return console.log('File type must be "png,jpg or jpeg')
                }else{
                    if(file.size > 1000000) {
                        return this.showError('This file is too large. The file size must be less than 1MB') 
                        //return console.log('File too large')
                    }else {
                        this.doingtempUpload = true
                        this.load = true
                        this.image = this.$refs.img.files[0];
                        let formData = new FormData();
                        formData.append('image', this.image);
                        axios.post( this.getHostname+'/api/temp-upload?token='+this.getToken,
                                formData,
                                {
                                    headers: {
                                        'Content-Type': ['multipart/form-data', 'application/json']
                                    },
                                }
                        ).then((res) => {
                            this.afterTempUpload(res.data.img)
                        }).catch((err) => {
                            console.log(err.response)
                                
                        })
                    }
                    
                }
                
            }
            
            
        },
        alertMsg(id, title, msg) {
            const payload = {
                id: id,
                title: title,
                body: msg
            }
            this.$store.commit('showAlert', payload)
        },
        doUpload() {
            let x = this.form
            if(x.prodType === '0'){
                x.batch = this.units
            }else{
                if(this.direct.batch !== '') {
                    const direct = { batchNumber: this.direct.batch, stock: this.direct.quantity, expiry: this.month2.year+'-'+ ('0'+parseInt(this.month2.month+1)).slice(-2) }
                    x.batch = direct  
                }else{
                    x.batch = ''
                }
            }
            if(x.name == '') {
                this.alertMsg('danger', 'Submition error', 'The name field is required')
            }else if(x.batch == '') {
                this.alertMsg('danger', 'Submition error', 'The batch field is required')
            }else {
                console.log(x.batch)
                const postUrl = this.getHostname+'/api/products?token='
                //console.log(this.form)
                axios.post( postUrl+this.getToken,
                        this.form,
                        {
                            headers: {
                                'Content-Type': ['application/json']
                            },
                        }
                ).then((res) => {
                    console.log(res.data)
                    this.$store.commit('addToProducts', res.data.product)
                    this.alertMsg('success', res.data.title, res.data.body)
                    this.resetTempImg()
                    
                }).catch((err) => {
                    console.log(err.response)  
                })
            }
            
        },
        deleteItem() {

        },
        resetTempImg() {
            this.form.tempImage = ''
            this.imageUploaded = false
            this.doingProductUpload = false
            return
        },
        addToUnit() {
            console.log(this.units)
            if(this.error.active === true) {
                this.error.active = false
            }
            if(this.unitForm.batch !== ''){
                const newUnit = { batchNumber: this.unitForm.batch, expiry: this.month.year+'-'+ ('0'+parseInt(this.month.month+1)).slice(-2)}
                if(this.units.length === 0) {
                    this.units.push(newUnit)
                    this.resetInput()
                }
                else if(this.units.length !== 0) {
                    this.units.forEach(element => {
                        if(element.batchNumber === this.unitForm.batch) {
                            this.duplicate = true
                            this.error.active = true
                            this.error.message = 'This batch number already exist'
                            return false
                        }
                    });
                    if(!this.duplicate) {
                        this.units.push(newUnit)
                        this.resetInput()
                    }else{
                        this.duplicate = false
                    } 
                }
                
            }
            
        },
        resetInput() {
            this.unitForm.batch = ''
            this.duplicate = false
        },
        delUnit(id) {
            this.units = this.units.filter(filter => filter.batchNumber != id)

        },
        deltmp(id) {
            this.deleting = true
            this.load = true
            axios.delete(this.getHostname+'/api/temp-upload/'+id+'?token='+this.getToken)
            .then(() => {
                this.imageUploaded = false
                this.deleting = false
                this.load = false
                this.doingProductUpload = false
                this.form.tempImage = ''
            }).catch((err) => {
                this.deleting = false
                this.load = false
                console.log(err)
            })
        },
        
        preventReload(event) {
            if(this.form.name || this.form.supplier || this.form.description || this.form. batchNumber || this.form.category || this.form.cost || this.form.sellingPrice || this.form.stock || this.doingProductUpload ) {
                event.returnValue = `Are you sure you want to leave?`;
            }
            
        },
        setTempImage() {
            this.doingtempUpload = true
            this.load = true
            let image = this.getTempContainer.data.image
            axios.post( this.getHostname+'/api/reset-temp-img?token='+this.getToken, { id: image})
            .then((res) => {
                this.afterTempUpload(res.data.image)
            }).catch((e) => {
                console.log(e.response)
            })
            
        },
        afterTempUpload(res) {
            this.form.tempImage = res
            this.image = null
            this.load = false
            this.imageUploaded = true
            this.doingProductUpload = true
            this.doingtempUpload = false
        },
        preloadForEdit() {
            if(this.getTempContainer.active){
                this.form.name = this.getTempContainer.data.name
                this.form.cost = this.getTempContainer.data.cost
                this.form.sellingPrice = this.getTempContainer.data.selling_price
                this.form.stock = this.getTempContainer.data.end
                this.form.description = this.getTempContainer.data.description
                this.form.supplier = this.getTempContainer.data.supplier
                this.form.prodType = this.getTempContainer.data.prod_type
                this.units = this.getTempContainer.array
            }
        },
        clearPreloader() {
            //console.log('cleared')
            for (let i in this.form)
            this.form[i] = ''
        }
        


                
    },

    mounted() {
        this.getTempContainer.active && this.getTempContainer.data.image ? this.setTempImage() : ''
    },
    unmounted() {
        this.imageUploaded ? axios.post(this.getHostname+'/api/del-alltemp-img?token='+this.getToken) : ''
        this.getTempContainer.active ? this.clearPreloader() : ''
    },
    beforeMount() {
        window.addEventListener('beforeunload', this.preventReload)
        this.preloadForEdit()
    },
    beforeUnmount() {
        window.removeEventListener('beforeunload', this.preventReload)
    }
}
</script>
<style scoped lang="scss">

.img-hold{
    width: 100%;
    height: 300px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    border: 1px dashed $gray-light;
    span{
    text-align: center;
    color: $gray-color;
    margin-top: 10px;
  }
  .empty-state-container{
      background-color: $dark-light;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
      padding: 20px;
      position: relative;
      button{
        border-radius: 50%;
        color: $white-color;
        cursor: pointer;
        background-color: rgba(86, 110, 244, 0.15);
        padding: 10px;
        height: 70px;
        width: 70px;
        &:hover{
            background-color: rgba(86, 110, 244, 0.2);
        }
        &:active{
            box-shadow: 0 0 0 0.2rem rgb(86 111 244 / 20%);
            border: 1px solid $primary-color;
            background-color: $primary-light;
        }
    }
    .instruction{
        color: $dark;
        font-size: 0.9rem;
    }
        .status-div-backdrop{
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 500;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.5);
                align-items: center;

            .status-div{
                position: relative;
                max-width: 300px;
                background-color: $white-color;
                padding: 20px;
                align-items: center;
                justify-content: center;
                border-radius: 16px;
                box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
                display: flex;
                flex-direction: row;
                div{
                    padding-right: 15px;
                }
                span{
                    margin: 0;
                    font-weight: 400;
                }
                button{
                    background-color: $dark;
                    position: absolute;
                    right: -10px;
                    top: -10px;
                    height: 30px;
                    width: 30px;
                }
        }

    }
  }
  
  .img-container{
      height: 100%;
      width: 100%;
      border-radius: 16px;
      padding: 20px;
      .img-main-wrap{
          height: 100%;
          width: 100%;
          border-radius: 8px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          position: relative;
          button, #loading_hold{
              position: absolute;
              top: 15px;
              right: 15px;
              height: 50px;
              width: 50px;
              border-radius: 50%;
              border: none;
              border-color: $danger;;
          }
          button{
              box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
              svg path{
                  fill: $danger;
              }
              &:hover{
                  background-color: $danger;
                    svg path{
                    fill: $white-color;
                }
              }
              &:active{
                box-shadow: 0 0 0 0.2rem rgb(14 20 44 / 10%);
                border: 1px solid $danger;
                //background-color: #ffffff;
            }
          }
          #loading_hold{
              background-color: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
          }
      }
  }
  

}

.a-btn{
    margin-top: 10px;
    a{
        color: $primary-color; 
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        font-weight: 600;
        &:hover{
            text-decoration: underline;
        }
        svg{
            margin-right: 5px;
        }
    }
}
.flex-row-st{
    align-items: center;
    margin-bottom: 5px;
    &:last-child{
        margin-bottom: 0; 
    }
}
.form-row-hold{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.form-row-col{
    display: flex;
    flex-direction: row;
    .col-2{
        width: 50%;
        display: flex;
        flex-direction: column;
        padding: 0 10px;
        .profit-row{
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
        }
        .profit-label{
            border-bottom: dashed 1px ;
            margin-right: 10px;
        }
    }
}
label{
    position: relative;
}
.vals{
    color: $success;
    font-weight: 600;
}
.checkbox-hold .checkbox-custom{
    border-color: #ced4da;
}
.chk-label{
    margin-left: 28px;
}
.checkbox-custom {
     border: 2px solid rgba(21, 31, 57, 0.6);
}
#unit_bg{
    background-color: $primary-light;
    padding: 20px;
    border-radius: 16px;
    .add-unit-btn{
        height: 48px;
    }
}
.unit-input-hold{
    padding: 15px 0;
    margin-right: 10px
}
.exp-date{
    max-width: 140px;
}
ul{
    padding: 0;
}
li{
    max-width: 86%;
    list-style-type: none;
    padding: 0 15px 15px 0;
    .unit-pill{
        //border: 1px solid #e2e4e7;
        border-radius: 27px;
        padding: 0 6px 0 18px;
        background-color: $primary-color;
    span{
        align-items: center;
        display: flex;
        //margin-right: 20px;
        height: 44px;
        &:last-child{
            padding-right: 18px;
        }
    }
    .pill-batch-no{
        color: #ffffff;
        font-weight: 500;
    }
    .divider{
        color: $dark-light;
    }
    .expiry-date{
        color: #ffffff;
    }
    button{
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        background-color: transparent;
            &:hover{
                background-color: rgba(14, 20, 44, 0.1);
            }
        }
    }

}
.err{
    color: $danger;
}
hr{
    margin: 20px 0;
    border-color: $gray-light;
}
.or div{
         background-color: $primary-light;
}
.stk2{
    max-width: 65px;
    text-align: center;
    padding: 6px;
}
.activate-dst{
    opacity: 0.5;
}
</style>