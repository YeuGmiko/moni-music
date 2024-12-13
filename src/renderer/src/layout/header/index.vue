<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { WindowIpcChannel } from '@common/constants'

const emit = defineEmits(['refresh'])

const router = useRouter()
const IpcRenderer = window.electron.ipcRenderer
const isMaximize = ref<boolean>(false)

function Refresh() {
    emit('refresh')
}

function toSetting() {
    router.push({ name: 'setting' })
}

async function WindowMinimize() {
    await IpcRenderer.invoke(WindowIpcChannel.MINIMIZE)
}
async function WindowMaximize() {
    const res = await IpcRenderer.invoke(WindowIpcChannel.MAXIMIZE)
    if (res) isMaximize.value = true
}
async function Windowing() {
    const res = await IpcRenderer.invoke(WindowIpcChannel.WINDOWING)
    if (res) isMaximize.value = false
}
async function WindowClose() {
    await IpcRenderer.invoke(WindowIpcChannel.CLOSE)
}
</script>

<template>
    <div class="header window-drag">
        <NSpace class="navigation-controller">
            <span class="op" @click="router.back()">
                <i class="iconfont icon-arrow-left"></i>
            </span>
            <span class="op" @click="router.forward()">
                <i class="iconfont icon-arrow-right"></i>
            </span>
            <span class="op" @click="Refresh">
                <i class="iconfont icon-refresh"></i>
            </span>
        </NSpace>
        <div class="window-controller">
            <span class="op" @click="toSetting">
                <i class="iconfont icon-menu"></i>
            </span>
            <NDivider vertical />
            <NSpace>
                <span class="op" @click="WindowMinimize">
                    <i class="iconfont icon-window-minimize"></i>
                </span>
                <span v-if="!isMaximize" class="op" @click="WindowMaximize">
                    <i class="iconfont icon-window-maximize"></i>
                </span>
                <span v-else class="op" @click="Windowing">
                    <i class="iconfont icon-window-windowing"></i>
                </span>
                <span class="op" @click="WindowClose">
                    <i class="iconfont icon-window-close"></i>
                </span>
            </NSpace>
        </div>
    </div>
</template>

<style scoped lang="scss">
* {
    -webkit-app-region: no-drag;
}
.header {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.op {
    padding: 3px;
    font-weight: bold;
    cursor: pointer;
}
.window-controller {
    display: flex;
    align-items: center;
}
</style>
