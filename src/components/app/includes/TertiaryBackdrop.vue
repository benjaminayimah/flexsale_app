<template>
    <div class="tertiary-backdrop" :style="{ zIndex: zIndex }"></div>
</template>
<script>
export default {
    name: 'TertiaryBackdrop',
    props: ['zIndex']
}
</script>
<style scoped>
.tertiary-backdrop{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>