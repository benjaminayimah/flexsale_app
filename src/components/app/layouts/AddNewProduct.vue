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
                                <div class="img-container">
                                    <button class="flex-column" @click.prevent="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20.291 20.29">
                                        <path d="M-4280.267-699.712a2.84,2.84,0,0,1-2.837-2.838v-4.175a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75v4.175a1.339,1.339,0,0,0,1.337,1.338h14.615a1.34,1.34,0,0,0,1.338-1.338v-4.175a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75v4.175a2.842,2.842,0,0,1-2.839,2.838Zm6.558-7.013v-10.717l-3.939,3.94a.751.751,0,0,1-1.061,0,.751.751,0,0,1,0-1.061l5.22-5.22a.748.748,0,0,1,.531-.219h.018a.745.745,0,0,1,.33.085h0l.012.006.007,0,.007,0,.01.006,0,0,.014.009h0a.762.762,0,0,1,.126.1l5.22,5.22a.751.751,0,0,1,0,1.061.748.748,0,0,1-.531.219.749.749,0,0,1-.53-.219l-3.939-3.94v10.718a.749.749,0,0,1-.749.749A.749.749,0,0,1-4273.709-706.725Z" transform="translate(4283.104 720.002)" fill="#566ff4"/>
                                    </svg>
                                </button>
                                <span>Upload product image</span>
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
                                <div class="col-2">
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
import { mapGetters } from 'vuex'
export default {
    name: 'AddNewProduct',
    computed: mapGetters(['getAddingProduct']),
    props: ['thisWidth'],
    data() {
        return {
            form: {
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

            }
        }
    },
    created() {
        console.log('me')
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
    background-color: $dark-light;
    border: 1px dashed $gray-light;
    span{
    text-align: center;
    color: $gray-color;
    margin-top: 10px;
  }
  button{
    border-style: none;
    padding: 8px;
    border-radius: 50%;
    color: $white-color;
    cursor: pointer;
    background-color: rgba(86, 110, 244, 0.15);
    padding: 10px;
    height: 70px;
    width: 70px;
    transition: 0.1s ease-in-out;
      &:hover{
           background-color: rgba(86, 110, 244, 0.2);
    }
    &:active{
      box-shadow: 0 0 0 0.2rem rgb(86 111 244 / 20%);
      border: 1px solid $primary-color;
      background-color: $primary-light;
    }
  }
  .img-container{
      display: flex;
      flex-direction: column;
      height: 100%;
      align-items: center;
      justify-content: center;
      padding: 20px;
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
        padding: 0 20px;
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