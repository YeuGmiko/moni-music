<script setup lang="ts">
import { useSongStore } from '@/store/song'
import { useMessage } from 'naive-ui'

const messages = useMessage()
const songStore = useSongStore()
const { update } = songStore

async function refreshMusic() {
    await update()
    messages.success('更新歌曲成功')
}
</script>

<template>
    <div class="app-setting">
        <h1>设置</h1>
        <NTabs>
            <NTabPane name="基础">
                <NForm label-placement="left">
                    <NFormItem label="刷新音乐库">
                        <NButton @click="refreshMusic">刷新</NButton>
                    </NFormItem>
                </NForm>
            </NTabPane>
        </NTabs>
    </div>
</template>

<style scoped lang="scss"></style>
