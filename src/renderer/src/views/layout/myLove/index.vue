<script setup lang="ts">
import { tabs } from './config'
import { onMounted } from 'vue'
onMounted(() => {
  console.log('MyLove Page Mounted')
})
</script>

<template>
  <div class="my-love">
    <h1 class="title">我喜欢</h1>
    <NTabs class="tabs">
      <NTabPane v-for="tab in tabs" :key="tab.name" :name="tab.name" :tab="tab.label">
        <component :is="tab.component"></component>
      </NTabPane>
    </NTabs>
  </div>
</template>

<style scoped lang="scss">
.my-love {
  .title {
    margin: 0;
  }
  .tabs {
    margin-top: 10px;
  }
}
</style>
