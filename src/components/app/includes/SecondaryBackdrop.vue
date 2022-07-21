<template>
    <div class="add-backdrop"></div>
</template>
<script>
export default {
    name: 'SecondaryBackdrop'
}
</script>
<style scoped>
.add-backdrop{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.8);
    /* backdrop-filter: saturate(180%) blur(20px); */
}
</style>