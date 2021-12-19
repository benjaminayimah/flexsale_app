<template>
    <h1>left</h1>
    <a href="#"  @click.prevent="$store.commit('destroyToken')">Logout</a>
</template>
<script>
export default {
    name: 'LeftNav'
}
</script>
<style scoped lang="scss">

</style>