export { default as Form } from '../..\\components\\Form.vue'
export { default as Loading } from '../..\\components\\Loading.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Menubar } from '../..\\components\\Menubar.vue'
export { default as Sidebar } from '../..\\components\\Sidebar.vue'
export { default as SidebarResources } from '../..\\components\\SidebarResources.vue'
export { default as WidgetDummy } from '../..\\components\\WidgetDummy.vue'
export { default as DataTable } from '../..\\components\\datatable\\DataTable.vue'

export const LazyForm = import('../..\\components\\Form.vue' /* webpackChunkName: "components_Form" */).then(c => c.default || c)
export const LazyLoading = import('../..\\components\\Loading.vue' /* webpackChunkName: "components_Loading" */).then(c => c.default || c)
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components_Logo" */).then(c => c.default || c)
export const LazyMenubar = import('../..\\components\\Menubar.vue' /* webpackChunkName: "components_Menubar" */).then(c => c.default || c)
export const LazySidebar = import('../..\\components\\Sidebar.vue' /* webpackChunkName: "components_Sidebar" */).then(c => c.default || c)
export const LazySidebarResources = import('../..\\components\\SidebarResources.vue' /* webpackChunkName: "components_SidebarResources" */).then(c => c.default || c)
export const LazyWidgetDummy = import('../..\\components\\WidgetDummy.vue' /* webpackChunkName: "components_WidgetDummy" */).then(c => c.default || c)
export const LazyDataTable = import('../..\\components\\datatable\\DataTable.vue' /* webpackChunkName: "components_datatable/DataTable" */).then(c => c.default || c)
