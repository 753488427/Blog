<script setup>
import ProfileSidebar from './ProfileSidebar.vue'

defineProps({
  showSidebar: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="section-layout" :class="{ 'without-sidebar': !showSidebar }">
    <div class="section-content"><slot /></div>
    <ProfileSidebar v-if="showSidebar" />
  </div>
</template>

<style scoped>
.section-layout{display:grid;grid-template-columns:minmax(0,1fr) 300px;align-items:start;gap:24px;min-width:0}.section-layout.without-sidebar{grid-template-columns:1fr}.section-content{min-width:0;max-width:100%}@media(max-width:1400px){.section-layout{grid-template-columns:1fr}}
</style>
