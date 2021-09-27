import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_3f708786 from 'nuxt_plugin_plugin_3f708786' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_bootstrapvue_41b4b9d8 from 'nuxt_plugin_bootstrapvue_41b4b9d8' // Source: .\\bootstrap-vue.js (mode: 'all')
import nuxt_plugin_configplugin621893ea_6b69c872 from 'nuxt_plugin_configplugin621893ea_6b69c872' // Source: .\\config.plugin.621893ea.js (mode: 'all')
import nuxt_plugin_nuxtplugin5d5d85d2_605dd5d4 from 'nuxt_plugin_nuxtplugin5d5d85d2_605dd5d4' // Source: .\\nuxt.plugin.5d5d85d2.js (mode: 'all')
import nuxt_plugin_toast_56f2e158 from 'nuxt_plugin_toast_56f2e158' // Source: .\\toast.js (mode: 'client')
import nuxt_plugin_nuxtvueselect_11c90792 from 'nuxt_plugin_nuxtvueselect_11c90792' // Source: .\\nuxt-vue-select.js (mode: 'client')
import nuxt_plugin_pluginrouting_7966ee20 from 'nuxt_plugin_pluginrouting_7966ee20' // Source: .\\nuxt-i18n\\plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_54faef02 from 'nuxt_plugin_pluginmain_54faef02' // Source: .\\nuxt-i18n\\plugin.main.js (mode: 'all')
import nuxt_plugin_moment_4788dbe2 from 'nuxt_plugin_moment_4788dbe2' // Source: .\\moment.js (mode: 'all')
import nuxt_plugin_axios_ea7ad6ae from 'nuxt_plugin_axios_ea7ad6ae' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_axios_3566aa80 from 'nuxt_plugin_axios_3566aa80' // Source: ..\\plugins\\axios (mode: 'all')
import nuxt_plugin_helpers_16d71a4f from 'nuxt_plugin_helpers_16d71a4f' // Source: ..\\plugins\\helpers (mode: 'all')
import nuxt_plugin_vueswal_9db69a28 from 'nuxt_plugin_vueswal_9db69a28' // Source: ..\\plugins\\vue-swal (mode: 'all')
import nuxt_plugin_vuecircularcountdowntimer_11afe609 from 'nuxt_plugin_vuecircularcountdowntimer_11afe609' // Source: ..\\plugins\\vue-circular-count-down-timer (mode: 'all')
import nuxt_plugin_vuelidate_4345260a from 'nuxt_plugin_vuelidate_4345260a' // Source: ..\\plugins\\vuelidate (mode: 'all')
import nuxt_plugin_ckeditor5_7e43b76c from 'nuxt_plugin_ckeditor5_7e43b76c' // Source: ..\\plugins\\ckeditor5 (mode: 'all')
import nuxt_plugin_vueformulate_6e4473f2 from 'nuxt_plugin_vueformulate_6e4473f2' // Source: ..\\plugins\\vueformulate (mode: 'all')
import nuxt_plugin_plugin_b69ebcd0 from 'nuxt_plugin_plugin_b69ebcd0' // Source: .\\auth\\plugin.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Outclass","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fstackpath.bootstrapcdn.com\u002Fbootstrap\u002F4.2.1\u002Fcss\u002Fbootstrap.min.css"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fuse.fontawesome.com\u002Freleases\u002Fv5.7.0\u002Fcss\u002Fall.css"}],"script":[{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fpopper.js\u002F1.14.6\u002Fumd\u002Fpopper.min.js"},{"src":"https:\u002F\u002Fcode.jquery.com\u002Fjquery-3.3.1.slim.min.js"},{"src":"https:\u002F\u002Fstackpath.bootstrapcdn.com\u002Fbootstrap\u002F4.2.1\u002Fjs\u002Fbootstrap.min.js"},{"src":"https:\u002F\u002Fcdn.ckeditor.com\u002F4.15.1\u002Fstandard\u002Fckeditor.js"},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fjquery-validate\u002F1.19.1\u002Fjquery.validate.min.js"}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_3f708786 === 'function') {
    await nuxt_plugin_plugin_3f708786(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_41b4b9d8 === 'function') {
    await nuxt_plugin_bootstrapvue_41b4b9d8(app.context, inject)
  }

  if (typeof nuxt_plugin_configplugin621893ea_6b69c872 === 'function') {
    await nuxt_plugin_configplugin621893ea_6b69c872(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxtplugin5d5d85d2_605dd5d4 === 'function') {
    await nuxt_plugin_nuxtplugin5d5d85d2_605dd5d4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_56f2e158 === 'function') {
    await nuxt_plugin_toast_56f2e158(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_nuxtvueselect_11c90792 === 'function') {
    await nuxt_plugin_nuxtvueselect_11c90792(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_7966ee20 === 'function') {
    await nuxt_plugin_pluginrouting_7966ee20(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_54faef02 === 'function') {
    await nuxt_plugin_pluginmain_54faef02(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_4788dbe2 === 'function') {
    await nuxt_plugin_moment_4788dbe2(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_ea7ad6ae === 'function') {
    await nuxt_plugin_axios_ea7ad6ae(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_3566aa80 === 'function') {
    await nuxt_plugin_axios_3566aa80(app.context, inject)
  }

  if (typeof nuxt_plugin_helpers_16d71a4f === 'function') {
    await nuxt_plugin_helpers_16d71a4f(app.context, inject)
  }

  if (typeof nuxt_plugin_vueswal_9db69a28 === 'function') {
    await nuxt_plugin_vueswal_9db69a28(app.context, inject)
  }

  if (typeof nuxt_plugin_vuecircularcountdowntimer_11afe609 === 'function') {
    await nuxt_plugin_vuecircularcountdowntimer_11afe609(app.context, inject)
  }

  if (typeof nuxt_plugin_vuelidate_4345260a === 'function') {
    await nuxt_plugin_vuelidate_4345260a(app.context, inject)
  }

  if (typeof nuxt_plugin_ckeditor5_7e43b76c === 'function') {
    await nuxt_plugin_ckeditor5_7e43b76c(app.context, inject)
  }

  if (typeof nuxt_plugin_vueformulate_6e4473f2 === 'function') {
    await nuxt_plugin_vueformulate_6e4473f2(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_b69ebcd0 === 'function') {
    await nuxt_plugin_plugin_b69ebcd0(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
