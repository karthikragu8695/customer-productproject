import { createStore } from 'vuex'
import {firebase} from '../firebase'

export default createStore({
  state: {
    customers:[],
    products:[],
    Invoice:[]
  },
  getters: {
    customerDetails(state){
      return state.customers
    },
    productDetails(state){
      return state.products
    },
    loadedInvoices(state){
      return state.Invoice
    },
    loadedCustomer(state){
      return (customerId)=>{
        return state.customers.find((customer)=>{
          return customer.id = customerId
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
    invoiceDetails(state){
      return (invoiceId)=>{
        return state.invoices.find((invoice) => {
          return invoice.iid === invoiceId
        })
      }
    }
  },
  mutations: {
    CUSTOMER_DETAILS(state,payload){
      state.customers=payload
    },
    PRODUCT_DETAILS(state,payload){
      state.products=payload
    },INVOICE_DETAILS(state,payload){
      state.Invoice=payload
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
    },
    invoicedetails({commit}){
      firebase.database().ref('invoices').on('value',(snapshot)=>
      {
        let invoices=[]
        let data=snapshot.val()
        for (let i in data){
          invoices.push({
            iid:i,
            ...data[i]
          })
        }
        commit('INVOICE_DETAILS',invoices)
      })
    }
  },
  modules: {
  }
})
