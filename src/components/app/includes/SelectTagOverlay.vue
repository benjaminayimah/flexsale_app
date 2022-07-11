<template>
    <teleport to="#selection_title">
        <h3>Add to tag</h3>
        <span class="text">Choose a tag to place your product</span>
    </teleport>
    <teleport to="#selection_sheet_body">
        <div class="grid">
            <div class="grid-item"></div>
            <div class="grid-item"></div>
            <div class="grid-item"></div>
            <div class="grid-item"></div>
            <div class="grid-item"></div>
            <div class="grid-item"></div>
        </div>
    </teleport>
<!-- <button class="button button-primary" @click.prevent="$store.commit('doSelectionSheet')">Done</button> -->
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'SelectTagOverlay',
    computed: mapGetters(['getSelectionSheet'])
}
</script>
<style scoped lang="scss">
h3{
    margin: 0;
}
.text{
    color: $gray-color;
    font-weight: 500;
}
.grid{
    gap: 20px;
    grid-template-columns: 1fr 1fr;
    margin: 30px 0 60px 0;
}
.grid-item{
    background-color: $dark-light;
    height: 200px;
    border-radius: 20px;
}

</style>
                                