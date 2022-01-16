<template>
<transition name="fade">
    <div class="add-backdrop"></div>
</transition>
<transition name="slide">
    <div class="add-wrap" :style="{width: thisWidth+'px'}">
        <div class="add-content">
            <div class="add-prd-head">
                <div class="add-head-wrap">
                    <div class="add-head-hold" :style="{width: thisWidth+'px'}">
                        <div class="head-content">
                            <div class="heading">
                                <h1>Add New Product</h1>
                            </div>
                            <div class="btn-wrap flex-row">
                                <button class="button secondary-primary" @click.prevent="$store.commit('unsetMainHomeWidth')">Cancel</button>
                                <button class="button button-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-body">
                <div class="form-wrap">
                    <form action="">
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
                                    <div class="img-main-wrap" id="img_main" :style="{backgroundImage: 'url('+getHostname+'/storage/'+getUser.id+'/temp/'+form.tempImage.image+')'}">
                                        <div v-if="deleting" id="loading_hold">
                                            <i class="lazy-loader" :class="{ 'loader' : load }"></i>
                                        </div>
                                        <button v-else class="secondary-primary" id="deltmp" @click.prevent="deltmp(form.tempImage.image)">
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
                                    <div v-if="imageStatus.status" class="status-div-backdrop" @mousedown="clrError">
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
                            <input v-model="form.name" type="text" name="ProductName" class="form-control" placeholder="Product’s name eg. Ideal Milk">
                        </div>
                        <div class="form-row">
                            <label>Batch number:</label>
                            <input v-model="form.batchNumber" type="text" name="BatchNumber" class="form-control" placeholder="Batch No.,Barcode, ISBN">
                        </div>
                        <div class="form-row">
                            <label>Category:</label>
                            <select v-model="form.category" id="category" class="form-control select">
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
                            <div class="form-row-hold">
                                <div class="form-check flex-row-st">
                                    <input v-model="form.prodType" id="retail" value="0" class="form-check-input" type="radio" checked>
                                    <label for="retail">
                                        Retail
                                    </label>
                                </div>
                                <div class="form-check flex-row-st">
                                    <input v-model="form.prodType" id="wholesale" value="1" class="form-check-input" type="radio" >
                                    <label for="wholesale">
                                        Wholesale
                                    </label>
                                </div>
                            </div>
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
                        <div class="form-row">
                            <label>Stock:</label>
                            <div class="form-row-col">
                                <div class="col-2">
                                    <input v-model="form.stock" type="text" name="stock" class="form-control" placeholder="100">
                                </div>
                                <div class="col-2">
                                    <div class="profit-row">
                                        <label class="checkbox-hold">
                                                <input v-model="form.autoContinue" type="checkbox">
                                                <span class="checkbox-custom"></span>
                                                <span class="chk-label">Automatically track quantity</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <div class="btn-wrap2 flex-row">
                            <button class="button button-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'AddNewProduct',
    computed: mapGetters(['getAddingProduct', 'getToken', 'getHostname', 'getUser']),
    props: ['thisWidth'],
    data() {
        return {
            doingProductUpload: false,
            form: {
                image: '',
                tempImage: {},
                name: '',
                batchNumber: '',
                category: '',
                cost: '',
                sellingPrice: '',
                stock: '',
                description: '',
                supplier: '',
                autoContinue: true,
                prodType: '0'
            },
            doingtempUpload: false,
            imageUploaded: false,
            deleting: false,
            load: false,
            imageStatus: {status: false, msg: ''}
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
                        this.form.image = this.$refs.img.files[0];
                        let formData = new FormData();
                        formData.append('image', this.form.image);
                        axios.post( this.getHostname+'/api/temp-upload?token='+this.getToken,
                                formData,
                                {
                                    headers: {
                                        'Content-Type': ['multipart/form-data', 'application/json']
                                    },
                                }
                        ).then((res) => {
                            const newImg = {
                                id: res.data.id,
                                image: res.data.img,
                            }
                            this.form.tempImage = newImg
                             this.form.image = null
                            //document.getElementById('prod_img').value = null
                            this.doingtempUpload = false
                            this.load = false
                            this.imageUploaded = true
                            this.doingProductUpload = true
                        }).catch((err) => {
                            console.log(err.response)
                                
                        })
                    }
                    
                }
                
            }
            
            
        },
        deltmp(id) {
            this.deleting = true
            axios.delete(this.getHostname+'/api/temp-upload/'+id+'?token='+this.getToken)
            .then(() => {
                this.imageUploaded = false
                this.deleting = false
                this.doingProductUpload = false
            }).catch((err) => {
                this.deleting = false
                console.log(err)
            })
        },
        preventReload(event) {
            if (this.doingProductUpload) {
                event.returnValue = `Are you sure you want to leave?`;
            }
        }
    },
    created() {
    // window.addEventListener('beforeunload', (event) => {
    // event.returnValue = `Are you sure you want to leave?`;
    // });
    },
    unmounted() {
        axios.post(this.getHostname+'/api/del-alltemp-img?token='+this.getToken)

    },
    beforeMount() {
        window.addEventListener('beforeunload', this.preventReload)
    },
    beforeUnmount() {
        window.removeEventListener('beforeunload', this.preventReload)
    }

        
}
</script>
<style scoped lang="scss">
.add-backdrop{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 200;
}
.add-wrap{
    background-color: $white-color;
    height: 100%;
    position: fixed;
    z-index: 201;
    top: 0;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
        -ms-overflow-style: none; 
        scrollbar-width: none; 
    }
}
.add-content{
    .add-prd-head{
        z-index: 500;
        display: flex;
        align-items: center;
        position: relative;
        .add-head-wrap{
            height: 80px;
            width: 100%;
        }
        .add-head-hold{
            position: fixed;
            top: 0;
            display: flex;
            height: 80px;
            border-bottom: 1px solid $dark-light;
            background-color: $white-color;
        }
        .head-content{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            padding: 0 30px;
        }
    }
    .heading{
        display: flex;
        height: 100%;
        align-items: center;
        h1{
            font-size: 1.2rem;
            font-weight: 700;
            margin: 0;
        }
    }
    .btn-wrap{
        height: 100%;
        button{
            margin-right: 10px;
            height: 44px;
            border-radius: 12px;
            &:last-child{
                margin-right: 0;
            }
        }
        
    }
    .btn-wrap2{
        height: 80px;
        margin-bottom: 20px;
        button{
            margin-right: 10px;
            height: 48px;
            border-radius: 12px;
            width: 100%;
            &:last-child{
                margin-right: 0;
            }
        }
    }
    .add-body{
        overflow-y: auto;
    }
    
}
.form-wrap{
    padding: 20px 120px;
}
.mob-view{
    .form-wrap{
        padding: 15px !important;
    }
    .head-content{
        padding: 0 15px !important;
    }
    .add-head-wrap, .add-head-hold{
        height: 60px !important;
    }

} 
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
                  background-color: rgba(230, 50, 50, 0.1);
              }
              &:active{
                box-shadow: 0 0 0 0.2rem rgb(14 20 44 / 20%);
                border: 1px solid $danger;
                background-color: #ffffff;
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
            text-decoration-line: underline;
            text-decoration-style: dotted;
            margin-right: 8px;
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



.slide-enter-from,
.slide-leave-to {
  transform: translateY(200px);
  
}
</style>