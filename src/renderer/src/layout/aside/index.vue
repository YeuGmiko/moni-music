<script setup lang="ts">
import { LayoutStaticRoutes } from '@/router/routes'
import StaticPart from './static/index.vue'
</script>

<template>
  <div class="aside">
    <div class="logo window-drag">
      <svg class="logo-svg" aria-hidden="true">
        <use xlink:href="#icon-logo"></use>
      </svg>
      Moni墨莉
    </div>
    <div class="route-part-list">
      <StaticPart
        v-for="part in LayoutStaticRoutes"
        :key="part.title"
        :title="part.title"
        :data="part.children"
      />
    </div>
  </div>
</template>

<style scoped>
.aside {
  user-select: none;
}
.logo {
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  background-image: linear-gradient(90deg, #1ed4ad, #01cc67);
  background-clip: text;
  color: transparent;
}
.logo-svg {
  width: 40px;
  height: 100%;
}
</style>
