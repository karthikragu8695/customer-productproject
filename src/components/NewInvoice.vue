<template>
    <v-container>
        <v-btn @click="show=true" color="blue">New Invoice</v-btn>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="2">Invoice No</v-col>
                    <v-col cols="2.5">Invoice Date</v-col>
                    <v-col cols="3">Customer Name</v-col>
                    <v-col cols="2.5">Invoice Amount</v-col>
                    <v-col cols="2">Actions</v-col>
                </v-row>
                <v-row v-for="out in outside" :key="out.id">
                    <v-col cols="">{{ out.no }}</v-col>
                    <v-col cols="3">{{ out.name }}</v-col>
                    <v-col cols="3">{{ out.amount }}</v-col>
                    <v-col cols="3"></v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-dialog v-model="show" fullscreen  hide-overlay class="pt-10 ">
            
            <v-table class=" mt-10 pt-10">
                <v-btn @click="show=false">close</v-btn>
            <v-btn @click="paste" >Save</v-btn>
           
                <v-row >
                    <v-col cols="3">
                        <v-text-field
                            class="ml-10 mt-10"
                            label="Invoice No"
                            v-model="no"
                            variant="outlined">
                        </v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            class="ml-10 mt-10"
                            label="Date"
                            v-model="date"
                            variant="outlined">
                        </v-text-field>
                    </v-col>
                    <v-col cols-3>
                        <v-autocomplete 
                            class="ml-10 mt-10"
                            label="Customer Id"
                            item-title="id"
                            :items="customers"
                            v-model="customer"
                            item-value="iid"
                            variant="outlined">
                </v-autocomplete> 
            </v-col>      
                    <v-col cols="3">
                        <v-autocomplete
                            class="ml-5 mt-10"
                            label="Customer name"
                            item-title="name"
                            :items="customers"
                            item-value="iid"
                            v-model="customer"
                            variant="outlined">
                </v-autocomplete>
                
            </v-col>
        </v-row>
                <v-btn @click="splex=true" color="success" class="ml-5">Add Item</v-btn> 
            </v-table> 
            <v-card max-width="700" class=" pt-5">
                <v-card-text>
                    <v-row>
                        <v-col cols="2">Name</v-col>
                        <v-col cols="2">Id</v-col>
                        <v-col cols="2">Quantity</v-col>
                        <v-col cols="2">price</v-col>
                        <v-col cols="2">Amount</v-col>
                        <v-col cols="2"></v-col>
                    </v-row>
                    <v-row v-for="item in items" :key="item.id">
                        <v-col cols="2">{{ item.name }}</v-col>
                        <v-col cols="2">{{ item.id }}</v-col>
                        <v-col cols="2">{{ item.quantity }}</v-col>
                        <v-col cols="2">{{ item.price }}</v-col>
                        <v-col cols="2">{{ item.amount }}</v-col>
                        <v-col cols="2">
                             <v-btn @click="editInvoice(item)" >Ed</v-btn>
                             <v-btn @click="deleteInvoice(item)" >De</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="2"></v-col>
                <v-col cols="4"></v-col>
                <v-col cols="3">
                    <v-text-field
                                    label="Total Amount"
                                    v-model="tamount"
                                    readonly
                                    variant="outlined">
                                </v-text-field>
                </v-col>
            </v-row>
                </v-card-text>
                
            </v-card>
            
        </v-dialog>
                <v-dialog v-model="splex">
                    <v-card>
                        <v-card-text>
                        <v-row >
                            <v-col cols="3">
                               <v-autocomplete variant="outlined" @update:model-value="getRate" v-model="product" item-value="iid" label="Product name" item-title="name" :items="products"></v-autocomplete>
                            </v-col>
                           
                            <v-col cols="3">
                                <v-text-field
                                    label="Product Id"
                                    v-model="id"
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    label="Product Quantity"
                                    v-model="quantity"
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    label="Product rate"
                                    v-model="price"
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    label="Amount"
                                    v-model="amountIn"
                                    readonly
                                    variant="outlined">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="p-5">
                                <v-btn v-if="tediting" class="mr-5" color="blue">Update</v-btn>
                                <v-btn v-else @click="add" class="mr-5" color="green">Save</v-btn>
                                <v-btn color="red" class="mr-5" @click="close">Cancel</v-btn>
                            </v-col>
                         </v-row>
                    </v-card-text>
                </v-card>    
        </v-dialog>
    </v-container>
</template>
<script>
export default{
    data(){
        return{
            show:false,
            no:'',
            splex:false,
            dmenu:false,
            tediting:false,
            outside:[],
            out:'',
            customer:null,
            product:null,
            name:'',
            id:'',
            price:'',
            quantity:1,
            items: [], 
            amount:null,
        }
    },
    methods:{
        close(){
            this.splex=false
        },
        getRate(v){
            let product = this.$store.getters.loadedProduct(v)
            this.price = product.price
            this.id = product.id
            this.name = product.name
        },
        add(){
            this.items.push(
                {
                   name:this.name,
                   id:this.id,
                   price:this.price,
                   quantity:this.quantity,
                   amount:this.amountIn
                }
               
            )
            this.close()
        },
        paste(){
            this.outside.push(
                {
                    no:this.no,
                    date:this.date,
                    name:this.name,
                    amount:this.amountIn,

                }
            )
            this.show=false
            this.close()
        },
        editInvoice(product){
            this.splex=true
            this.name=product.name
            this.id=product.id
            this.price=product.price
            this.quantity=product.quantity
            this.store=product
        },
        deleteInvoice(product){
            let index=this.products.indexOf(product)
            this.products.splice(index,1)
        },
        // totamount(){
        //     let tamount = 0
        //     for(let i in items)
        //     {
        //         store.push({
        //             iid:i,
        //     ...data[i]
        //         }
        //         )
        //     }
        //     tamount = +tamount + +items[i].amount
        // },
        
        
        
    },
    computed:{
        products(){
        return this.$store.getters.productDetails
      },
      customers(){
        return this.$store.getters.customerDetails
      },amountIn(){
            return this.quantity*+this.price
      },tamount(){
        let amount = 0
        let items = this.items
        for(let i in items){
            amount = +amount + +items[i].amount
        }
        return amount
      }
    }
}
</script>