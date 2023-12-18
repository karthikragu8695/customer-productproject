import { createStore } from 'vuex'
import {firebase} from '../firebase'

export default createStore({
  state: {
    customers:[],
    products:[]
  },
  getters: {
    customerDetails(state){
      return state.customers
    },
    productDetails(state){
      return state.products
    },
    loadedCustomer(state){
      return (customerId)=>{
        return state.customers.find((customer)=>{
          return customer.id=customerId
        })
      }
    },
    loadedProduct (state) {
      return (productId) => {
          return state.products.find((product) => {
              return product.iid === productId
          })
      }
  },
  },
  mutations: {
    CUSTOMER_DETAILS(state,payload){
      state.customers=payload
    },
    PRODUCT_DETAILS(state,payload){
      state.products=payload
    }
  },
  actions: {
    customerdetails({commit}){
      firebase.database().ref('customers').on('value',(snapshot)=>{
        let customers=[]
        let data=snapshot.val()
        for(let i in data)
        {
          customers.push({
            iid:i,
            ...data[i]
          })
        }
        commit('CUSTOMER_DETAILS',customers)
      })
    },
    productDetails({commit}){
      firebase.database().ref('products').on('value',(snapshot)=>{
        let products=[]
        let data=snapshot.val()
        for(let i in data)
        {
          products.push({
            iid:i,
            ...data[i]
          })
        }
        commit('PRODUCT_DETAILS',products)
      })
    }
  },
  modules: {
  }
})
