<template>
<div v-if="getAddingProduct.store">
    <teleport to="#add_title">
        <span v-if="getEditContainer.active">Update store details</span>
        <span v-else>Create new store</span>
    </teleport>
    <teleport to="#add_submit_button">
        <button class="button button-primary top-submit-btn" @click.prevent="doSubmitUpdate">Save</button>
    </teleport>
    <teleport to="#add_master_body_container">
        <form id="product_form" @submit.prevent="" class="overlay-hero-form">
            <div class="form-row">
                <label>Store name:</label>
                <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Full name" required>
            </div>
            <div class="form-row">
                <label>Phone 1:</label>
                <input v-model="form.phone1" type="text" name="phone" class="form-control" placeholder="Phone number" required>
            </div>
            <div class="form-row">
                <label>Phone 2:</label>
                <input v-model="form.phone2" type="text" name="Otherphone" class="form-control" placeholder="Phone number" required>
            </div>
            <div class="form-row">
                <label>Address:</label>
                <input v-model="form.address" type="text" name="address" class="form-control" placeholder="Store address" required>
            </div>
            <div class="form-row">
                <label>City:</label>
                <input v-model="form.city" type="text" name="city" class="form-control" placeholder="City" required>
            </div>
            <div class="form-row">
                <label>Region:</label>
                <input v-model="form.region" type="text" name="region" class="form-control" placeholder="Region" required>
            </div>
            <div class="form-row">
                <label>Country:</label>
                <input v-model="form.country" type="text" name="country" class="form-control" placeholder="Country" required>
            </div>
        </form>
</teleport>
</div>

</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'AddNewStore',
    computed: {
        ...mapGetters(['getToken', 'getHostname', 'getEditContainer', 'getCurrentStore', 'getAddingProduct']),
    },
    data() {
        return {
            form: {
                name: '',
                phone1: '',
                phone2: '',
                address: '',
                city: '',
                region: '',
                country: ''
            },
        }
    },
    methods: {
        doSubmitUpdate() {
            let id = this.getCurrentStore.id
                const putUrl = this.getHostname+'/api/store/'+id+'?token='+this.getToken
                    axios.put(putUrl, this.form,
                        {
                            headers: {
                                'Content-Type': ['application/json']
                            },
                        }
                ).then((res) => {
                    const payload = {
                        id: 'success',
                        title: res.data.title,
                        body: res.data.message
                    }
                    this.$store.commit('updateStore', res.data.store)
                    this.$store.commit('showAlert', payload)
                    this.$store.commit('unsetMainHomeWidth', true)
                }).catch((err) => {
                    console.log(err.data)
                    if(err.response.status === 422) {
                        const payload = {
                            id: 'danger',
                            title: 'Error!',
                            body: err.response.data.message
                        }
                        this.$store.commit('showAlert', payload)
                    }
                })
        },
        preloadForEdit() {
            if(this.getEditContainer.active){
                this.form.name = this.getEditContainer.data.name
                this.form.phone1 = this.getEditContainer.data.phone_1
                this.form.phone2 = this.getEditContainer.data.phone_2
                this.form.address = this.getEditContainer.data.address
                this.form.city = this.getEditContainer.data.city
                this.form.region = this.getEditContainer.data.region
                this.form.country = this.getEditContainer.data.country
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