<template>
    <v-container>
        <v-btn @click="show=true" color="blue">Add Products</v-btn>
                <v-table class="mt-5">
                    <thead>
                    <tr>
                        <th>product Id</th>
                        <th>product Name</th>
                        <th>product Price</th>
                        <th>Action</th>
                        <th></th>
                    </tr>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.id }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.price }}</td>
                        <td ><v-btn @click="editcu(product)" min-height="3" min-width="1" rounded><v-icon color="orange">mdi-pencil</v-icon></v-btn>
                        <v-btn @click="deleteLi(product)" class="mx-3" min-height="3" min-width="1" rounded><v-icon color="red">mdi-delete</v-icon></v-btn></td>
                    </tr>
                    </thead>
                </v-table>
               
            <v-dialog v-model="show">
                <v-card
                        
                        class="mx-auto"
                        max-width="344"
                        title="User Registration">
                       
                <v-container>
                    <v-text-field
                        v-model="id"
                        color="primary"
                        label="Product Id"
                        variant="underlined">
                    </v-text-field>

                    <v-text-field
                        v-model="name"
                        color="primary"
                        label="Product name"
                        variant="underlined">
                    </v-text-field>
        
                    <v-text-field
                        v-model="price"
                        color="primary"
                        label="Product Price"
                        variant="underlined">
                    </v-text-field>
                    
                </v-container>

    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn color="red" @click="close">close</v-btn>
      <v-btn v-if="!editing" else color="success" @click="add">
        Complete Registration
        <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      <v-btn v-else color="success" @click="updatecu">update
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
                
            </v-dialog>
    </v-container>
</template>

<script>
import {firebase} from '../firebase'
export default{
    data(){
        return{
            id:'',
            name:'',
            price:'',
            show:false,
            store:{},
            editing:false
        }
    },
    methods:{
        add(){
            const product={
                id:this.id,
                name:this.name,
                price:this.price,
            }
            firebase.database().ref('products').push(product)
            this.close()
        },
        close(){
            this.show=false
            this.id=null
            this.name=null
            this.price=null
            this.editing=false
        },
        deleteLi(product){
            firebase.database().ref(`products/${product.iid}`).remove()
            .then(()=>{
                console.log('product delete')
            })
        },
        editcu(product){
            this.id=product.id
            this.name=product.name
            this.price=product.price
            this.show=true
            this.editing=true
            this.store=product
        },
        updatecu(){
           const product={
                id:this.id,
                name:this.name,
                price:this.product,
           }
           firebase.database().ref('products/'+this.store.iid).update(product)
           .then(()=>{
            console.log('product update')
            this.close()
           })
           .catch((error)=>{
            console.log(error.message)
            this.close()
           })
        }
    },
    computed:{
        products(){
            return this.$store.getters.productDetails
        }
    }
}
</script>