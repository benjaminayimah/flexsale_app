<template>
    <div>
        <section id="home"></section>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "Logout",
        created() {
            this.submitLogout()
        },
        methods: {
            ...mapActions({
                signOut: 'Logout'
            }),
            submitLogout(){
                this.signOut()
            }

        }
    }
</script>

<style scoped>
#home{
    display: flex;
    height: 100vh;
}

</style>