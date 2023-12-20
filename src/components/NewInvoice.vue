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
                <v-row v-for="invoice in invoices" :key="invoice.id">
                    <v-col cols="2">{{ invoice.no }}</v-col>
                    <v-col cols="2.5">{{ invoice.date }}</v-col>
                    <v-col cols="3">{{ invoice.name }}</v-col>
                    <v-col cols="2.5">{{ invoice.amount }}</v-col>
                    <v-col cols="2">
                        <v-btn @click="editInvoice(invoice)" icon small ><v-icon color="red">mdi-pencil</v-icon></v-btn>
                        <v-btn @click="deleteInvoice()" class="ml-5" icon small><v-icon color="red">mdi-delete</v-icon> </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-dialog v-model="show" fullscreen  hide-overlay class="pt-10 ">
            
            <v-table class=" mt-10 pt-10">
                <v-btn @click="show=false">close</v-btn>
            <v-btn v-if="!shows" @click="paste" >Save</v-btn>
            <v-btn  v-else @click="updateInvoice">update</v-btn>
           
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
                            @update:model-value="getName"
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
                             <v-btn @click="editItem(item)" icon small ><v-icon color="red">mdi-pencil</v-icon></v-btn>
                             <v-btn @click="deleteItem(item)" class="ml-5" icon small><v-icon color="red">mdi-delete</v-icon> </v-btn>
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
                                <v-btn v-if="tediting" @click="updateItem" class="mr-5" color="blue">Update</v-btn>
                                <v-btn v-else @click="add" class="mr-5" color="green">Save</v-btn>
                                <v-btn color="red" class="mr-5" @click="cancel()">Cancel</v-btn>
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
            shows:false,
            no:'',
            date:null,
            splex:false,
            dmenu:false,
            tediting:false,
            outside:[],
            store:[],
            out:'',
            customer:null,
            product:null,
            invoicestore:[],
            name:'',
            id:'',
            price:'',
            quantity:1,
            items: [], 
            amount:null,
            sname:null,
        }
    },
    methods:{

        getRate(v){
            let product = this.$store.getters.loadedProduct(v)
            this.price = product.price
            this.id = product.id
            this.name = product.name
        },
        getName(v){
            let customer = this.$store.getters.loadedCustomer(v)
            this.sname = customer.name
        },
    //Items------------------------------------------------->

        add(){
            this.items.push(
                {
                   name: this.name,
                   id: this.id,
                   price: this.price,
                   quantity: this.quantity,
                   amount: this.amountIn,
                   items: this.items,
                   product: this.product
                }
            )
            this.refresh()
        },
        
        close(){
            this.no=null
            this.date=null
            this.sname=null
            this.items=[]
            this.tediting=false
            this.customer=null
            this.show=false
        },
        editItem(product){
            this.splex=true
            this.tediting=true
            this.name=product.name
            this.id=product.id
            this.price=product.price
            this.quantity=product.quantity
            this.store=product
        },
        updateItem(){
            let index = this.items.indexOf(this.store)
            this.items.splice(index,1)
            this.items.push(
                {
                   name: this.name,
                   id: this.id,
                   price: this.price,
                   quantity: this.quantity,
                   amount: this.amountIn,
                }
            )
            this.tediting=false
            this.refresh()
        },
        deleteItem(product){
            let index=this.items.indexOf(product)
            this.items.splice(index,1)
        },
    //invoice------------------------------------------------->

        paste(){
            this.invoices.push(
                {
                    no:this.no,
                    date:this.date,
                    name:this.sname,
                    amount:this.tamount,
                    items:this.items,
                    customer: this.customer
                }
            )
            this.close()
        },
        editInvoice(invoice){
            this.show=true
            this.no=invoice.no
            this.date=invoice.date
            this.items = invoice.items
            this.customer = invoice.customer
            this.shows = true
            this.invoicestore = invoice
        },
        deleteInvoice(invoice){
            let index = this.invoices.indexOf(invoice)
            this.invoices.splice(index,1)
        },
        updateInvoice(){
            let index = this.items.indexOf(this.invoicestore)
            this.items.splice(index,1)
            this.items.push(
                {
                    no:this.no,
                    date:this.date,
                    name:this.sname,
                    amount:this.tamount,
                    
                }
            )
            this.show=false
            this.close()
            this.shows=false
        },
        refresh(){
            this.splex=false
            this.name=null
            this.id=null
            this.price=null
            this.amount=null
            this.quantity=1
            
        },
        cancel(){
            this.splex=false
        }

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
      },
      invoices(){
        return this.$store.getters.loadedInvoices
      }
    }
}
</script>