<script setup>
import ProfileSidebar from './ProfileSidebar.vue'
</script>

<template>
  <div class="section-layout">
    <div class="section-content"><slot /></div>
    <ProfileSidebar />
  </div>
</template>

<style scoped>
.section-layout{display:grid;grid-template-columns:minmax(0,1fr) 300px;align-items:start;gap:24px}.section-content{min-width:0}@media(max-width:1180px){.section-layout{grid-template-columns:1fr}}
</style>
