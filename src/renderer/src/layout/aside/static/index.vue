<script setup lang="ts">
import { CustomRouteConfig, CustomRouteMeta, LayoutSideRouteMeta } from '@/router/types'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
    title: string
    data: CustomRouteConfig<CustomRouteMeta>[]
}>()
const route = useRoute()
const router = useRouter()

const routes = computed(() => {
    const res = props.data.filter(
        (route) => !route.meta?.isRedirect && !route.meta?.hidden
    ) as CustomRouteConfig<LayoutSideRouteMeta>[]
    return res.sort((a, b) => {
        return (a.meta?.order ?? Number.MAX_VALUE) - (b.meta?.order ?? Number.MAX_VALUE)
    })
})

function handleItem(item: CustomRouteConfig<LayoutSideRouteMeta>) {
    router.push({
        name: item.name
    })
}
const currentRouteName = computed(() => route.name)
</script>

<template>
    <div class="static-part">
        <p class="title">{{ title }}</p>
        <ul class="route-list">
            <li
                v-for="item in routes"
                :key="item.path"
                class="route"
                :class="{ active: item.name === currentRouteName }"
                @click="handleItem(item)"
            >
                <i
                    v-if="item.meta?.iconName"
                    :class="['iconfont', `icon-${item.meta.iconName}`]"
                ></i>
                <span class="route-name">{{ item.meta?.title }}</span>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.title {
    color: rgba(0, 0, 0, 0.4);
}
.route-list {
    padding-left: 0;
    list-style: none;

    .route {
        padding: 3px 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-sizing: border-box;
        border-radius: 3px;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.4);
        }

        &.active {
            background-image: linear-gradient(90deg, #1fd4ae, #00cc66) !important;
            color: white;
        }

        & + li {
            margin-top: 5px;
        }

        .route-name {
            flex: 1;
            text-wrap: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}

.iconfont {
    font-weight: bold;
    font-size: 20px;
}
</style>
