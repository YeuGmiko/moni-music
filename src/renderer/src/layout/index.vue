<script setup lang="ts">
import { useMessage } from 'naive-ui'
import Aside from './aside/index.vue'
import Header from './header/index.vue'
import Audio from './audio/index.vue'
import { ref } from 'vue'

const message = useMessage()
const refreshKey = ref<number>(0)

function refresh() {
    refreshKey.value++
    message.success('页面刷新成功')
}
</script>

<template>
    <div class="layout-container">
        <div class="layout">
            <Aside class="aside" />
            <div class="container">
                <Header class="header" @refresh="refresh" />
                <NScrollbar>
                    <div :key="refreshKey" class="main">
                        <RouterView v-slot="{ Component }">
                            <Transition name="page" mode="out-in">
                                <KeepAlive>
                                    <component :is="Component"></component>
                                </KeepAlive>
                            </Transition>
                        </RouterView>
                    </div>
                </NScrollbar>
            </div>
        </div>
        <Audio class="audio"></Audio>
    </div>
</template>

<style scoped lang="scss">
.layout-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.layout {
    flex: 1;
    display: flex;
    overflow: hidden;
}

.aside {
    padding: 10px;
    min-width: 200px;
    height: 100%;
    box-sizing: border-box;
    background-color: #f0f0f0;
}

.container {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.main {
    flex: 1;
    padding: 10px 20px;
    box-sizing: border-box;
}

.page-enter-active {
    animation: page-enter 0.15s ease-out;
}

.page-leave-active {
    animation: page-leave 0.15s ease-out;
}

@keyframes page-enter {
    from {
        opacity: 0;
        transform: translateX(-5%);
    }
    to {
        opacity: 1;
        transform: translateX(0%);
    }
}
@keyframes page-leave {
    from {
        opacity: 1;
        transform: translateX(0%);
    }
    to {
        opacity: 0;
        transform: translateX(5%);
    }
}
</style>
