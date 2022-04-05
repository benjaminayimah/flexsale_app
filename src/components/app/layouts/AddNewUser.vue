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
export default {
    name: 'AddNewUser',
    computed: mapGetters(['getTempContainer', 'getToken', 'getHostname']),
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: ''
            }
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
                console.log(res.data)
            }).catch((err) => {
                console.log(err.response.data.errors)
            })
        },
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
</style>