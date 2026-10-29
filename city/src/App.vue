<script setup>
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <div class="site-frame">
    <SiteHeader />
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
    <SiteFooter />
  </div>
</template>
