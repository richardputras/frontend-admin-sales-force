import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _10f24626 = () => interopDefault(import('..\\pages\\activity\\index.vue' /* webpackChunkName: "pages/activity/index" */))
const _b19dbb20 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _f32eacda = () => interopDefault(import('..\\pages\\calculator\\index.vue' /* webpackChunkName: "pages/calculator/index" */))
const _6dd5f4ec = () => interopDefault(import('..\\pages\\contactperson\\index.vue' /* webpackChunkName: "pages/contactperson/index" */))
const _7bdc1c12 = () => interopDefault(import('..\\pages\\customer\\index.vue' /* webpackChunkName: "pages/customer/index" */))
const _a8260c70 = () => interopDefault(import('..\\pages\\division\\index.vue' /* webpackChunkName: "pages/division/index" */))
const _6cab2927 = () => interopDefault(import('..\\pages\\employee\\index.vue' /* webpackChunkName: "pages/employee/index" */))
const _63d89f35 = () => interopDefault(import('..\\pages\\forgetPassword.vue' /* webpackChunkName: "pages/forgetPassword" */))
const _0eec3fb7 = () => interopDefault(import('..\\pages\\glossary\\index.vue' /* webpackChunkName: "pages/glossary/index" */))
const _da6324f6 = () => interopDefault(import('..\\pages\\hrd\\index.vue' /* webpackChunkName: "pages/hrd/index" */))
const _73803dbc = () => interopDefault(import('..\\pages\\item\\index.vue' /* webpackChunkName: "pages/item/index" */))
const _53df7c49 = () => interopDefault(import('..\\pages\\kodeOtp.vue' /* webpackChunkName: "pages/kodeOtp" */))
const _2c9efbd4 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _4d7bb6c4 = () => interopDefault(import('..\\pages\\newPassword.vue' /* webpackChunkName: "pages/newPassword" */))
const _5d773c35 = () => interopDefault(import('..\\pages\\newPasswordSuccess.vue' /* webpackChunkName: "pages/newPasswordSuccess" */))
const _47e265ec = () => interopDefault(import('..\\pages\\procedure\\index.vue' /* webpackChunkName: "pages/procedure/index" */))
const _38975bb1 = () => interopDefault(import('..\\pages\\product_knowledge\\index.vue' /* webpackChunkName: "pages/product_knowledge/index" */))
const _08dcc642 = () => interopDefault(import('..\\pages\\roles\\index.vue' /* webpackChunkName: "pages/roles/index" */))
const _6d348b61 = () => interopDefault(import('..\\pages\\school\\index.vue' /* webpackChunkName: "pages/school/index" */))
const _e12cd16e = () => interopDefault(import('..\\pages\\supplier\\index.vue' /* webpackChunkName: "pages/supplier/index" */))
const _47979bc0 = () => interopDefault(import('..\\pages\\activity\\form.vue' /* webpackChunkName: "pages/activity/form" */))
const _56b90f6c = () => interopDefault(import('..\\pages\\candidate\\form.vue' /* webpackChunkName: "pages/candidate/form" */))
const _76c9f63c = () => interopDefault(import('..\\pages\\contactperson\\form.vue' /* webpackChunkName: "pages/contactperson/form" */))
const _1377482f = () => interopDefault(import('..\\pages\\customer\\form.vue' /* webpackChunkName: "pages/customer/form" */))
const _0f02d456 = () => interopDefault(import('..\\pages\\customer\\nodes.vue' /* webpackChunkName: "pages/customer/nodes" */))
const _c1b8fb84 = () => interopDefault(import('..\\pages\\division\\form.vue' /* webpackChunkName: "pages/division/form" */))
const _42426aff = () => interopDefault(import('..\\pages\\employee\\form.vue' /* webpackChunkName: "pages/employee/form" */))
const _3f3c426f = () => interopDefault(import('..\\pages\\glossary\\form.vue' /* webpackChunkName: "pages/glossary/form" */))
const _b2d3ba3e = () => interopDefault(import('..\\pages\\hrd\\form.vue' /* webpackChunkName: "pages/hrd/form" */))
const _5ced70b8 = () => interopDefault(import('..\\pages\\item\\form.vue' /* webpackChunkName: "pages/item/form" */))
const _647939cc = () => interopDefault(import('..\\pages\\maintenance\\form.vue' /* webpackChunkName: "pages/maintenance/form" */))
const _387f4c2c = () => interopDefault(import('..\\pages\\payroll\\form.vue' /* webpackChunkName: "pages/payroll/form" */))
const _7220bf35 = () => interopDefault(import('..\\pages\\product_knowledge\\form.vue' /* webpackChunkName: "pages/product_knowledge/form" */))
const _4246d985 = () => interopDefault(import('..\\pages\\school\\form.vue' /* webpackChunkName: "pages/school/form" */))
const _1e669ec6 = () => interopDefault(import('..\\pages\\supplier\\form.vue' /* webpackChunkName: "pages/supplier/form" */))
const _0086f5e3 = () => interopDefault(import('..\\pages\\warning\\form.vue' /* webpackChunkName: "pages/warning/form" */))
const _37f6da46 = () => interopDefault(import('..\\pages\\customer\\personInCharge\\form.vue' /* webpackChunkName: "pages/customer/personInCharge/form" */))
const _36f0cbe4 = () => interopDefault(import('..\\pages\\activity\\_id.vue' /* webpackChunkName: "pages/activity/_id" */))
const _445ae272 = () => interopDefault(import('..\\pages\\contactperson\\_id.vue' /* webpackChunkName: "pages/contactperson/_id" */))
const _22dbf3c2 = () => interopDefault(import('..\\pages\\customer\\_id.vue' /* webpackChunkName: "pages/customer/_id" */))
const _5b6f494f = () => interopDefault(import('..\\pages\\employee\\_id.vue' /* webpackChunkName: "pages/employee/_id" */))
const _7fb40d2d = () => interopDefault(import('..\\pages\\hrd\\_id.vue' /* webpackChunkName: "pages/hrd/_id" */))
const _0537c40a = () => interopDefault(import('..\\pages\\item\\_id.vue' /* webpackChunkName: "pages/item/_id" */))
const _2e0b712a = () => interopDefault(import('..\\pages\\roles\\_id.vue' /* webpackChunkName: "pages/roles/_id" */))
const _704ce456 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/activity",
    component: _10f24626,
    name: "activity"
  }, {
    path: "/admin",
    component: _b19dbb20,
    name: "admin"
  }, {
    path: "/calculator",
    component: _f32eacda,
    name: "calculator"
  }, {
    path: "/contactperson",
    component: _6dd5f4ec,
    name: "contactperson"
  }, {
    path: "/customer",
    component: _7bdc1c12,
    name: "customer"
  }, {
    path: "/division",
    component: _a8260c70,
    name: "division"
  }, {
    path: "/employee",
    component: _6cab2927,
    name: "employee"
  }, {
    path: "/forgetPassword",
    component: _63d89f35,
    name: "forgetPassword"
  }, {
    path: "/glossary",
    component: _0eec3fb7,
    name: "glossary"
  }, {
    path: "/hrd",
    component: _da6324f6,
    name: "hrd"
  }, {
    path: "/item",
    component: _73803dbc,
    name: "item"
  }, {
    path: "/kodeOtp",
    component: _53df7c49,
    name: "kodeOtp"
  }, {
    path: "/login",
    component: _2c9efbd4,
    name: "login"
  }, {
    path: "/newPassword",
    component: _4d7bb6c4,
    name: "newPassword"
  }, {
    path: "/newPasswordSuccess",
    component: _5d773c35,
    name: "newPasswordSuccess"
  }, {
    path: "/procedure",
    component: _47e265ec,
    name: "procedure"
  }, {
    path: "/product_knowledge",
    component: _38975bb1,
    name: "product_knowledge"
  }, {
    path: "/roles",
    component: _08dcc642,
    name: "roles"
  }, {
    path: "/school",
    component: _6d348b61,
    name: "school"
  }, {
    path: "/supplier",
    component: _e12cd16e,
    name: "supplier"
  }, {
    path: "/activity/form",
    component: _47979bc0,
    name: "activity-form"
  }, {
    path: "/candidate/form",
    component: _56b90f6c,
    name: "candidate-form"
  }, {
    path: "/contactperson/form",
    component: _76c9f63c,
    name: "contactperson-form"
  }, {
    path: "/customer/form",
    component: _1377482f,
    name: "customer-form"
  }, {
    path: "/customer/nodes",
    component: _0f02d456,
    name: "customer-nodes"
  }, {
    path: "/division/form",
    component: _c1b8fb84,
    name: "division-form"
  }, {
    path: "/employee/form",
    component: _42426aff,
    name: "employee-form"
  }, {
    path: "/glossary/form",
    component: _3f3c426f,
    name: "glossary-form"
  }, {
    path: "/hrd/form",
    component: _b2d3ba3e,
    name: "hrd-form"
  }, {
    path: "/item/form",
    component: _5ced70b8,
    name: "item-form"
  }, {
    path: "/maintenance/form",
    component: _647939cc,
    name: "maintenance-form"
  }, {
    path: "/payroll/form",
    component: _387f4c2c,
    name: "payroll-form"
  }, {
    path: "/product_knowledge/form",
    component: _7220bf35,
    name: "product_knowledge-form"
  }, {
    path: "/school/form",
    component: _4246d985,
    name: "school-form"
  }, {
    path: "/supplier/form",
    component: _1e669ec6,
    name: "supplier-form"
  }, {
    path: "/warning/form",
    component: _0086f5e3,
    name: "warning-form"
  }, {
    path: "/customer/personInCharge/form",
    component: _37f6da46,
    name: "customer-personInCharge-form"
  }, {
    path: "/activity/:id",
    component: _36f0cbe4,
    name: "activity-id"
  }, {
    path: "/contactperson/:id",
    component: _445ae272,
    name: "contactperson-id"
  }, {
    path: "/customer/:id",
    component: _22dbf3c2,
    name: "customer-id"
  }, {
    path: "/employee/:id",
    component: _5b6f494f,
    name: "employee-id"
  }, {
    path: "/hrd/:id",
    component: _7fb40d2d,
    name: "hrd-id"
  }, {
    path: "/item/:id",
    component: _0537c40a,
    name: "item-id"
  }, {
    path: "/roles/:id",
    component: _2e0b712a,
    name: "roles-id"
  }, {
    path: "/",
    component: _704ce456,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
