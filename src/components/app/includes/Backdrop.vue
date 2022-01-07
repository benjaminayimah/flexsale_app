<template>
    <div class="backdrop" :class="[{ 'backdrop-secondary': getMobile}, { 'backdrop-default': !getMobile}]"></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Backdrop',
    computed: mapGetters(['getMobile']),
}
</script>
<style scoped>
.backdrop-secondary{
    background-color: rgba(0, 0, 0, 0.2);
}
.backdrop-default{
    background-color: rgba(0, 0, 0, 0);
}

</style>
