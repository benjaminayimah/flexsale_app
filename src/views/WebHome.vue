<template>
  <div class="web">
    <Header />
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/web/includes/Header.vue'

export default {
  name: 'Web',
  components: { Header}
}
</script>
