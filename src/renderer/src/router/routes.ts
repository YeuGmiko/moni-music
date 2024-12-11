import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import { CustomRouteConfig, CustomRouteMeta, RedirectMeta, LayoutStaticRoute } from '@/router/types'

export const LayoutStaticRoutes: LayoutStaticRoute[] = [
  {
    title: '我的音乐',
    children: [
      {
        path: 'my-love',
        name: 'myLove',
        component: () => import('@/views/layout/myLove/index.vue'),
        meta: {
          title: '我喜欢',
          iconName: 'menu-love',
          order: 2,
          hidden: true
        }
      },
      {
        path: 'history',
        name: 'history',
        component: () => import('@/views/layout/history/index.vue'),
        meta: {
          title: '播放历史',
          iconName: 'menu-history',
          order: 3,
          hidden: true
        }
      },
      {
        path: 'album',
        name: 'album',
        component: () => import('@/views/layout/album/index.vue'),
        meta: {
          title: '我的专辑',
          iconName: 'menu-album',
          order: 4,
          hidden: true
        }
      },
      {
        path: 'music',
        name: 'music',
        component: () => import('@/views/layout/music/index.vue'),
        meta: {
          title: '我的歌曲',
          iconName: 'menu-music',
          order: 1
        }
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/layout/setting/index.vue'),
        meta: {
          hidden: true
        }
      }
    ]
  }
]

const LayoutRedirect: CustomRouteConfig<RedirectMeta> = {
  path: '',
  name: 'home',
  component: () => import('@/views/layout/home/index.vue'),
  meta: {
    isRedirect: true
  }
}

const LayoutRoutes: CustomRouteConfig<CustomRouteMeta>[] = [
  LayoutRedirect,
  ...LayoutStaticRoutes.map((item) => item.children).flat()
]

export const routes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/layout'
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: LayoutRoutes
  }
]
