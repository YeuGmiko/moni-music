import type { RouteRecordRaw } from 'vue-router'

export type CustomRouteMeta = LayoutSideRouteMeta | LayoutRouteMeta | RedirectMeta

export type LayoutSideRouteMeta = {
  title: string
  iconName: string
  order?: number
}

export type LayoutRouteMeta = {
  hidden: true
}

export type RedirectMeta = {
  isRedirect: true
}

export type CustomRouteConfig<Meta extends CustomRouteMeta> = {
  meta?: Meta
} & RouteRecordRaw

export type LayoutStaticRoute = {
  title: string
  children: CustomRouteConfig<CustomRouteMeta>[]
}

// 类型守卫函数
export function isRouteMeta(meta: CustomRouteMeta): meta is LayoutSideRouteMeta {
  return (meta as LayoutSideRouteMeta).title !== undefined;
}

export function isRedirectMeta(meta: CustomRouteMeta): meta is RedirectMeta {
  return (meta as RedirectMeta).isRedirect !== undefined;
}
