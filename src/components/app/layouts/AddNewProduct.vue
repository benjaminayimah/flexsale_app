<template>
    <teleport to="#add_title">
        <span>{{ getEditContainer.active ? 'Edit Product' : 'Add New Product'}}</span>
    </teleport>
    <teleport to="#add_submit_button">
        <button :class="{ 'button-disabled' : error.active || submiting }" :disabled="error.active || submiting ? true : false" class="button button-primary top-submit-btn" @click.prevent="doSubmit">
            <span v-if="getEditContainer.active">
                {{ submiting ? 'Saving' : 'Save'}}
            </span>
            <span v-else>
                {{ submiting ? 'Adding' : 'Add'}}
            </span>
            <spinner v-if="submiting" v-bind:size="20" v-bind:white="true" />
        </button>
    </teleport>
    <teleport to="#add_master_body_container">
        <form id="product_form" @submit.prevent="" class="overlay-hero-form">
            <div class="form-row">
                <label>Product Image:</label>
                <div class="img-hold">
                    <div v-if="doingtempUpload" class="img-container">
                        <div class="img-main-wrap" id="img_main" :style="{backgroundImage: 'url('+getDefaultImage+')'}">
                            <div id="loading_hold">
                                <i class="lazy-loader" :class="{ 'loader' : load }"></i>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="imageUploaded" class="img-container">
                        <div class="img-main-wrap" id="img_main" :style="{backgroundImage: 'url('+getHostname+'/storage/'+getUserAdminID+'/temp/'+form.tempImage+')'}">
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
                        <image-status-overlay v-if="imageStatus.status" v-bind:imageStatus="imageStatus" @clrError="clrError" />
                    </div>
                </div>
            </div>
            <div class="form-row" :class="{ 'input-has-error' : validation.error && validation.errors.name}">
                <label>Product name:</label>
                <input v-model="form.name" type="text" name="ProductName" class="form-control" placeholder="Product’s name eg. Ideal Milk" required>
                <span class="span" v-if="validation.error && validation.errors.name">
                    {{ validation.errors.name[0] }}
                </span>
            </div>
            <div class="form-row">
                <div id="unit_bg" v-if="!this.getEditContainer.active">
                    <div class="flex justify-between align-items-center">
                        <div style="margin-right:10px">
                            <label>Stock:</label>
                            <input type="text" name="stockNumber" v-model="form.stock"  class="form-control stk2 input-height-2" placeholder="0">
                        </div>
                        <div style="margin-right:10px">
                            <label>Batch No.:</label>
                            <input type="text" name="stockNumber" @blur="addToUnit(this.form.batch)" v-model="form.batch" class="form-control input-height-2" placeholder="Batch number">
                        </div>
                        <div class="unit-input-hold" style="margin:0; padding: 10px 0">
                            <label>Expiry date:</label>
                            <input type="date" v-model="form.expiryDate" class="form-control input-height-2" >
                        </div>
                    </div>
                    <span v-if="error.active" class="err">{{ error.message }}</span>
                </div>
            </div>
            <div class="form-row">
                <label>Supply Cost per unit:</label>
                <div class="form-row-col">
                    <div class="col-2 pl-0">
                        <input v-model="form.cost" type="number" name="costPrice" class="form-control" placeholder="0">
                    </div>
                </div>
            </div>
            <div class="form-row">
                <label>Selling price per unit:</label>
                <div class="form-row-col">
                    <div class="col-2">
                        <input v-model="form.sellingPrice" type="number" name="sellingPrice" class="form-control" placeholder="0">
                    </div>
                    <div class="col-2">
                        <div class="profit-row">
                            <div class="flex-row-st">
                                <div class="profit-label">
                                    Profit per unit:
                                </div>
                                <div class="vals">
                                    <span>GH₵</span><span>{{ Intl.NumberFormat("en-US").format(computeProfit) }}</span>
                                </div>
                            </div>
                            <div class="flex-row-st">
                                <div class="profit-label">
                                    Profit margin:
                                </div>
                                <div class="vals">
                                    <span>{{ computePM }}</span><span class="percent value">%</span>
                                </div>
                            </div>
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
                    <option selected="selected" :value="null">Select a supplier</option>
                    <option :value="supplier.id" v-for="supplier in getSuppliers" :key="supplier.id">{{ supplier.name }}</option>
                </select>
                <!-- <div class="a-btn">
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 0 15.883 15.882">
                            <path d="M-12729.059-1230.178v-5.942H-12735a1,1,0,0,1-1-1,1,1,0,0,1,1-1h5.942v-5.942a1,1,0,0,1,1-1,1,1,0,0,1,1,1v5.942h5.941a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-5.941v5.942a1,1,0,0,1-1,1A1,1,0,0,1-12729.059-1230.178Z" transform="translate(12736.001 1245.061)" fill="#566ff4"/>
                        </svg>
                        Create new Supplier
                    </a>
                </div> -->
            </div>
        </form>
    </teleport>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import ImageStatusOverlay from '../includes/ImageStatusOverlay.vue'
import validationMixin from '../../../mixins/validationMixin'
import Spinner from '../includes/Spinner.vue'
export default {
    name: "AddNewProduct",
    components: { ImageStatusOverlay, Spinner },
    mixins: [ validationMixin ],
    computed: {
        ...mapGetters(["getToken", "getHostname", "getUser", "getDefaultImage", "getEditContainer", "getUserAdminID", "getDiscounts", "getSuppliers", "getAddingProduct", 'getCurrentStore']),
        computeProfit() {
            let profit = (this.form.sellingPrice - this.form.cost);
            return profit.toFixed(2);
        },
        computePM() {
            if (this.computeProfit > 0) {
                let pm = ((this.computeProfit / this.form.sellingPrice) * 100);
                return pm.toFixed(2);
            }
            else
            return 0;
        }
    },
    data() {
        return {
            doingProductUpload: false,
            profit: "",
            profitMargin: "",
            image: "",
            form: {
                tempImage: "",
                name: "",
                cost: '',
                sellingPrice: '',
                stock: "",
                description: "",
                supplier: null,
                prodType: "0",
                batch: "",
                expiryDate: new Date().toISOString().slice(0, 10),
            },
            doingtempUpload: false,
            imageUploaded: false,
            deleting: false,
            load: false,
            imageStatus: { status: false, msg: "" },
            error: { active: false, message: "" }
        };
    },
    methods: {
        uploadClick(id) {
            document.getElementById(id).click();
        },
        showError(msg) {
            this.imageStatus.status = true;
            this.imageStatus.msg = msg;
            return false;
        },
        clrError() {
            this.imageStatus.status = false;
            this.imageStatus.msg = "";
            document.getElementById("prod_img").value = null;
            return false;
        },
        uploadTemp() {
            if (this.imageStatus.status) {
                this.clrError();
            }
            let file = this.$refs.img.files[0];
            if (file) {
                if (!(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")) {
                    return this.showError("Unsupported file. The file type must be \"png, jpg or jpeg\"");
                }
                else {
                    if (file.size > 1000000) {
                        return this.showError("This file is too large. The file size must be less than 1MB");
                    }
                    else {
                        this.doingtempUpload = true;
                        this.load = true;
                        this.image = this.$refs.img.files[0];
                        let formData = new FormData();
                        formData.append("image", this.image);
                        axios.post(this.getHostname + "/api/temp-upload?token=" + this.getToken, formData, {
                            headers: {
                                "Content-Type": ["multipart/form-data", "application/json"]
                            },
                        }).then((res) => {
                            this.afterTempUpload(res.data.img);
                        }).catch((err) => {
                            console.log(err.response);
                        });
                    }
                }
            }
        },
        alertMsg(id, title, msg) {
            const payload = {
                id: id,
                title: title,
                body: msg
            };
            this.$store.commit("showAlert", payload);
        },
        doSubmit() {
            let x = this.form;
            if (x.name == "") {
                this.alertMsg("danger", "Submition error", "The name field is required");
            }
            else {
                if (this.getEditContainer.active) {
                    this.submiting = true
                    let id = this.getEditContainer.data.id;
                    const putUrl = this.getHostname + "/api/products/" + id + "?token=" + this.getToken;
                    axios.put(putUrl, x, {
                        headers: {
                            "Content-Type": ["application/json"]
                        },
                    }).then((res) => {
                        this.submiting = false
                        this.$store.commit("updateProduct", res.data.product)
                        this.alertMsg("success", res.data.title, res.data.body)
                        this.$store.commit("unsetMainHomeWidth", true)
                        this.$router.currentRoute.value.name !='Products' ? this.$router.push({ name: this.$router.currentRoute.value.name, params: { id: res.data.product.id, name: res.data.product.name }, replace: true }) : ''
                    }).catch((err) => {
                        this.submiting = false
                        console.log(err.response);
                    });
                }
                else {
                    if (x.batch == "") {
                        this.alertMsg("danger", "Submition error", "The batch field is required");
                    }else {
                        this.submiting = true
                        const postUrl = this.getHostname + "/api/products?token=";
                        axios.post(postUrl + this.getToken, x, {
                            headers: {
                                "Content-Type": ["application/json"]
                            },
                        }).then((res) => {
                            this.submiting = false
                            this.$store.commit("addToProducts", res.data.product);
                            this.alertMsg("success", res.data.title, res.data.body);
                            this.resetTempImg();
                            this.$store.commit('unsetMainHomeWidth')
                        }).catch((err) => {
                            this.submiting = false
                            console.log(err.response);
                        });
                    }
                }
            }
        },
        resetTempImg() {
            this.form.tempImage = "";
            this.imageUploaded = false;
            this.doingProductUpload = false;
            return;
        },
        addToUnit(id) {
            if (this.error.active === true) {
                this.error.active = false;
            }
            if (id !== "") {
                axios.post(this.getHostname + "/api/check-unit?token=" + this.getToken, { batch_no: id })
                .then((res) => {
                    if (res.data.status === 2) {
                        this.showUnitError();
                    }
                }).catch((e) => {
                    console.log(e.response);
                });
            }
        },
        showUnitError() {
            this.error.active = true;
            this.error.message = "This batch number already exist";
            return;
        },
        dismisUnitError() {
            if (this.error.active) {
                // this.duplicate = false;
                this.error.active = false;
                this.error.message = "";
            }
        },
        deltmp(id) {
            this.deleting = true;
            this.load = true;
            axios.delete(this.getHostname + "/api/temp-upload/" + id + "?token=" + this.getToken)
                .then(() => {
                this.imageUploaded = false;
                this.deleting = false;
                this.load = false;
                this.doingProductUpload = false;
                this.form.tempImage = "";
            }).catch((err) => {
                this.deleting = false;
                this.load = false;
                console.log(err);
            });
        },
        preventReload(event) {
            if (this.form.name || this.form.supplier || this.form.description || this.form.batch || this.form.cost || this.form.sellingPrice || this.form.stock || this.doingProductUpload) {
                event.returnValue = `Are you sure you want to leave?`;
            }
        },
        setTempImage() {
            this.doingtempUpload = true;
            this.load = true;
            let image = this.getEditContainer.data.image;
            axios.post(this.getHostname + "/api/reset-temp-img?token=" + this.getToken, { id: image })
                .then((res) => {
                this.afterTempUpload(res.data.image);
            }).catch((e) => {
                console.log(e.response);
            });
        },
        afterTempUpload(res) {
            this.form.tempImage = res;
            this.image = null;
            this.load = false;
            this.imageUploaded = true;
            this.doingProductUpload = true;
            this.doingtempUpload = false;
        },
        preloadForEdit() {
            if (this.getEditContainer.active) {
                this.form.name = this.getEditContainer.data.name;
                this.form.cost = this.getEditContainer.data.cost;
                this.form.sellingPrice = this.getEditContainer.data.selling_price;
                this.form.description = this.getEditContainer.data.description;
                this.form.supplier = this.getEditContainer.data.supplier;
                this.form.supplier = this.getEditContainer.data.supplier_id;
            }
        },
        clearPreloader() {
            for (let i in this.form)
            this.form[i] = "";
        }
    },
    created() {
        this.getEditContainer.active && this.getEditContainer.data.image ? this.setTempImage() : ""
        this.preloadForEdit();
    },
    unmounted() {
        this.getEditContainer.active ? this.clearPreloader() : "";
    },
    beforeMount() {
        window.addEventListener("beforeunload", this.preventReload);
    },
    beforeUnmount() {
        window.removeEventListener("beforeunload", this.preventReload);
    },
}
</script>
<style scoped lang="scss">
.img-hold{
    width: 100%;
    height: 300px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    border: 1px solid #f0f3ff;
    span{
    text-align: center;
    color: $gray-color;
    margin-top: 10px;
  }
  .empty-state-container{
      background-color: rgba(240, 243, 255, 0.4);
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
  }
  
  .img-container{
      height: 100%;
      width: 100%;
      border-radius: 16px;
      .img-main-wrap{
          height: 100%;
          width: 100%;
          border-radius: 16px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          position: relative;
          button, #loading_hold{
              position: absolute;
              top: 15px;
              right: 15px;
              height: 45px;
              width: 45px;
              border-radius: 50%;
              border: none;
              border-color: $danger;;
          }
          button{
              box-shadow: 0 1px 15px 0 rgb(14 20 44 / 12%);
              background-color: rgba(0, 0, 0, 0.7);
              svg path{
                  fill: $white-color;
              }
              &:hover{
                    background-color: rgba(0, 0, 0, 0.9);
                    svg path{
                    fill: $white-color;
                }
              }
              &:active{
                box-shadow: 0 0 0 0.2rem rgb(14 20 44 / 10%);
                border: 1px solid $white-color;
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
.form-check-input:checked {
  flex-shrink: 0;
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
    background-color: #F9FAFF;
    padding: 20px;
    border-radius: 16px;
    border: 1px solid #f0f3ff;
}
.unit-input-hold{
    padding: 15px 0;
}
.exp-date{
    max-width: 140px;
}
ul{
    padding: 0;
    display: flex;
    flex-wrap: wrap;
}
li{
    display: flex;
    list-style-type: none;
    padding: 0 10px 10px 0;
    position: relative;
    .unit-pill{
        //border: 1px solid #e2e4e7;
        border-radius: 27px;
        padding: 0 10px;
        background-color: $white-color;
        box-shadow: 0 1px 3px 0 rgb(14 20 44 / 15%);
        span{
            align-items: center;
            display: flex;
            font-size: 15px;
            height: 38px;
        &:last-child{
            padding-right: 18px;
        }
    }
    .pill-batch-no{
        color: $dark;
        font-weight: 600;
    }
    .divider{
        color: $gray-color;
        margin: 0 5px;
    }
    .expiry-date{
        color: #7e8596;
    }
    button{
        width: 26px;
        height: 26px;
        border-radius: 50%;
        margin-left: 5px;
        display: flex;
        position: absolute;
        right: 0;
        top: -8px;
        background-color: $gray-color;
            &:hover{
                background-color:#FA4848;
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
    background-color: #F9FAFF;
}
.stk2{
    max-width: 65px;
    text-align: center;
    padding: 6px;
}

.input-height-2 {
    height: 48px !important;
}


</style>