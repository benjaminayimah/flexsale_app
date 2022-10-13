<template>
    <div class="main-page-body">
       <change-password />
    </div>
</template>
<script>
import ChangePassword from '../../components/app/layouts/ChangePassword.vue';
export default {
    name: "SettingsSecurity",
    data() {
        return {
            title: "Security"
        };
    },
    created() {
        window.scrollTo(0, 0);
        this.setPage();
    },
    methods: {
        setPage() {
            const title = { title: this.title, back: true };
            this.$store.commit("setPagetitle", title);
        }
    },
    components: { ChangePassword }
}
</script>
<style scoped lang="scss">

</style>