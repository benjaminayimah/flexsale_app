<template>
<div v-if="getAddingProduct.supplier">
    <teleport to="#add_title">
        <span v-if="getEditContainer.active">Edit supplier</span>
        <span v-else>Add supplier</span>
    </teleport>
    <teleport to="#add_submit_button">
        <button class="button button-primary top-submit-btn" @click.prevent="doSubmit">{{ getEditContainer.active ? 'Save' : 'Submit'}}</button>
    </teleport>
    <teleport to="#add_master_body_container">
        <form id="supplier_form" @submit.prevent="" class="overlay-hero-form">
            <div class="form-row">
                <label>Name:</label>
                <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Supplier name" required>
            </div>
            <div class="form-row">
                <label>Email:</label>
                <input v-model="form.email" type="email" name="email" class="form-control" placeholder="example@gmail.com">
            </div>
            <div class="form-row" >
                <label>Phone:</label>
                <input v-model="form.phone" type="tel" name="phone" class="form-control" placeholder="+233 24 123 4567">
            </div>
            <div class="form-row">
                <label>Location:</label>
                <input v-model="form.location" type="text" name="address" class="form-control" placeholder="Lapaz, Accra">
            </div>
        </form>
    </teleport>
</div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'AddNewSupplier',
    computed: mapGetters(['getToken', 'getHostname', 'getEditContainer', 'getAddingProduct', 'getCurrentStore' ]),
    data() {
        return {
            form: {
                name: '',
                phone: '',
                email: '',
                location: ''
            },
            id: ''
        }
    },
    methods: {
    doSubmit() {
         if(this.getEditContainer.active) {
            const id = this.getEditContainer.data.id
            this.id = id
            const putUrl = this.getHostname+'/api/suppliers/'+id+'?token='+this.getToken
            this.doUpdate(putUrl)
         }else{
            const postUrl = this.getHostname+'/api/suppliers?token='+this.getToken
            this.doPost(postUrl)
            }
        },
        doPost(url) {
             axios.post(url, this.form,
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then((res) => {
                this.successRes(res.data)
            }).catch((err) => {
                this.errorRes(err)
            })

        },
        doUpdate(url) {
            axios.put(url, this.form,
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then((res) => {
                this.successRes(res.data)
            }).catch((err) => {
                this.errorRes(err)
            })
        },
        successRes(res) {
            const payload = {
                id: 'success',
                title: res.title,
                body: res.message
            }
            this.$store.commit('showAlert', payload)
            if(this.getEditContainer.active) {
                this.$store.commit('updateSuppliers', res.supplier)
            }else{
                this.$store.commit('addToSuppliers', res.supplier)
            }
            this.$store.commit('unsetMainHomeWidth', true)
            this.$router.currentRoute.value.name === 'DetailedSupplier'  ?  this.$router.push({ name: this.$router.currentRoute.value.name, params: { id: this.id, name: res.supplier.name }, replace: true }) : ''
        },
        errorRes(err) {
            console.log(err.data)
            if(err.response.status === 422) {
                const payload = {
                    id: 'danger',
                    title: 'Error!',
                    body: err.response.data.message
                }
                this.$store.commit('showAlert', payload)
            }
        },
        preloadForEdit() {
            if(this.getEditContainer.active){
                this.form.name = this.getEditContainer.data.name
                this.form.phone = this.getEditContainer.data.phone
                this.form.email = this.getEditContainer.data.email
                this.form.location = this.getEditContainer.data.location
            }
        }
    },
    created() {
        this.preloadForEdit()
    }
}
</script>
<style scoped lang="scss">

</style>