<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { IpcChannel } from '@common/constants'

const router = useRouter()
const { ipcRenderer } = window.electron

onMounted(async () => {
    const routeName = await ipcRenderer.invoke(IpcChannel.REDIRECT_TO_LAYOUT_HOME)
    await router.push({ name: routeName })
    console.info(`Layout home is redirected to ${routeName} page`)
})
</script>

<template>
    <div></div>
</template>
