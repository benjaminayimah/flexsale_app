<template>
    <form id="product_form">
        <div class="form-row">
            <label>Name:</label>
            <input v-model="form.name" type="text" name="name" class="form-control" placeholder="Full name" required>
        </div>
        <div class="form-row">
            <label>Email:</label>
            <input v-model="form.email" type="email" name="email" class="form-control" placeholder="example@gmail.com" required>
        </div>
        <div class="form-row">
            <label>Select Store:</label>
            <span class="sub-info">Your users (sellers) can only access the selected stores.</span>
            <ul>
                <store-selected-check v-for="store in getStores" :key="store.id" v-bind:store="store" v-bind:checked="this.form.store" v-on:check="check" />
            </ul>
        </div>
        <!-- <div class="form-row">
            <div class="profit-row" v-for="store in getStores" :key="store.id">
                <label class="checkbox-hold">
                    <input v-model="form.trackQty" type="checkbox">
                    <span class="checkbox-custom"></span>
                    <span class="chk-label">{{ store.name }}</span>
                </label>
            </div>
        </div> -->
        <div class="form-row">
            <label>Password:</label>
            <input v-model="form.password" type="password" name="password" class="form-control" placeholder="Enter password" required>
        </div>
    </form>
    <teleport to="#form_submit_btn_holder">
            <div class="btn-wrap2">
                <button v-if="!getTempContainer.active" class="button button-primary" @click.prevent="doSubmit">Create user</button>
                <button v-else class="button button-primary" @click.prevent="doSubmit">Save changes</button>
            </div>
        </teleport>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import StoreSelectedCheck from '../includes/StoreSelectedCheck.vue'
export default {
  components: { StoreSelectedCheck },
    name: 'AddNewUser',
    computed: {
        ...mapGetters(['getTempContainer', 'getToken', 'getHostname', 'getStores']),
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                store: []
            },
        }
    },
    methods: {
        async doSubmit() {
            axios.post( this.getHostname+'/api/create-admin-user?token='+this.getToken,
                    this.form,
                    {
                        headers: {
                            'Content-Type': ['application/json']
                        },
                    }
            ).then((res) => {
                this.$store.commit('addToAdmins', res.data.admin)
                const payload = {
                    id: 'success',
                    title: res.data.title,
                    body: res.data.message
                }
                this.$store.commit('showAlert', payload)
                this.$store.commit('unsetMainHomeWidth', true)



            }).catch((err) => {
                console.log(err.response)
            })
        },
        check(item) {
            let array = this.form.store
            if(array.length > 0){
                let check = array.filter(data => data.id == item.id)
                if(check == '') {
                    this.form.store.push(item)
                }else{
                    this.form.store = array.filter(data => data.id != item.id)
                }
            }else{
                this.form.store.push(item)
            }
        }
    }
}
</script>
<style scoped lang="scss">
.profit-row{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}
.chk-label{
    margin-left: 28px;
}
.sub-info{
    color: $gray-color;
}
ul{
    margin-left: 0;
    padding: 0;
}
</style>