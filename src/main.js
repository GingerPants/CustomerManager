// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
import Customers from './components/Customers'
import About from './components/About'
import Add from './components/Add'
import Edit from './components/Edit'
import CustomerDetails from './components/CustomerDetails'

Vue.use(vueResource)
Vue.use(VueRouter)
Vue.use(VueLocalStorage)
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true //created computed members from your variable declarations
})

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path:'/', component: Customers},
    {path: '/about', component: About},
    {path: '/add', component: Add},
    {path: '/customer/:id', component: CustomerDetails},
    {path: '/edit/:id', component: Edit},
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  template: `
    <div id="app">
      <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Customer Manager</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><router-link to="/add">Add Customer</router-link></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
      <router-view></router-view>
    </div>
  `
}).$mount('#app')

// Use localStorage from Vue object
Vue.localStorage.set('someNumber', 123)
Vue.localStorage.get('someNumber')

// Fallback value if nothing found in localStorage
Vue.localStorage.get('propertyThatNotExists', 'fallbackValue') // Will return 'fallbackValue' string

// Default type if value isn't registered in localStorage section
Vue.localStorage.get('property', null, Number)

//register localStorage variables and adds computed variables to local components
//to be used like regular computeds that are stored in the localstorage
var vm = new Vue({
  localStorage: {
    first_name: {
      type: Object,
      default: {
        hello: 'world'
      }
    },
    someNumber: {
      type: Number,
    },
    someBoolean: {
      type: Boolean
    },
    stringOne: '',
    stringTwo: {
      type: String,
      default: 'helloworld!'
    },
    stringThree: {
      default: 'hello'
    }
  },
  methods: {
    someMethod () {
      let lsValue = this.$localStorage.get('someObject')
      this.$localStorage.set('someBoolean', true)
      this.$localStorage.remove('stringOne')
    }
  }
})