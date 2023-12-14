<template>
    <v-container>
        <v-btn @click="show=true" color="blue">New Invoice</v-btn>
        <v-table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>price</th>
                    <th>Amount</th>
                </tr>
                <tr v-for="out in outside" :key="out.id">
                    <th>{{ out.no }}</th>
                    <th>{{ out.name }}</th>
                    <th>{{ out.rate }}</th>
                    <th>{{ out.amount }}</th>
                </tr>
            </thead>
        </v-table>
        <v-dialog v-model="show" class="pt-10 ">
            
            <v-table class=" mt-10 pt-10">
                <v-btn @click="show=false">close</v-btn>
            <v-btn @click="paste" >Save</v-btn>
                <tr >
                    <td>
                            <v-autocomplete 
                                    class="ml-5 mt-10 w-[500px]"
                                    placeholder="Name"
                                    label="Customer name"
                                    v-model="name"
                                    variant="outlined">
                            </v-autocomplete>  
                    </td>      
                    <td>
                            <v-autocomplete 
                                    class="ml-5 mt-10 w-[500px]"
                                    placeholder="Name"
                                    label="Customer name"
                                    v-model="customer"
                                    variant="outlined">
                            </v-autocomplete>
                    </td>
                </tr>
                <v-btn @click="splex=true" color="success" class="ml-5">Add Item</v-btn> 
            </v-table> 
            <v-table class="h-[500px] pt-5">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Amount</th>
                    </tr>
                    <tr v-for="product in products" :key="product.id">
                        <th>{{ product.name }}</th>
                        <th>{{ product.id }}</th>
                        <th>{{ product.Quantity }}</th>
                        <th>{{ product.rate }}</th>
                        <th>{{ product.amount }}</th>
                    </tr>
                </thead>
            </v-table>
             
                 
        </v-dialog>
                <v-dialog v-model="splex">
                    <v-table>
                        <tr >
                            <td>
                                <v-text-field
                                    class="ml-5 pt-10 "
                                    placeholder="Name"
                                    label="Product name"
                                    v-model="name"
                                    variant="outlined">
                                </v-text-field>
                            </td>
                            <td>
                                <v-text-field
                                    class="ml-5 pt-10"
                                    placeholder="Name"
                                    label="Product Id"
                                    v-model="id"
                                    variant="outlined">
                                </v-text-field>
                            </td>
                            <td>
                                <v-text-field
                                    class="ml-5 pt-10"
                                    placeholder="Name"
                                    label="Product Quantity"
                                    v-model="Quantity"
                                    variant="outlined">
                                </v-text-field>
                            </td>
                            <td>
                                <v-text-field
                                    class="ml-5 pt-10 mr-5"
                                    placeholder="Name"
                                    label="Product rate"
                                    v-model="rate"
                                    variant="outlined">
                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <v-text-field
                                    class="ml-5 pt-3 mr-5"
                                    placeholder="Amount"
                                    label="Amount"
                                    v-model="amount"
                                    variant="outlined">
                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td class="p-5">
                                <v-btn v-if="tediting" @click="updateTreatment" class="mr-5" color="blue">Update</v-btn>
                                <v-btn v-else @click="add" class="mr-5" color="green">Save</v-btn>
                                <v-btn color="red" class="mr-5" @click="close">Cancel</v-btn>
                            </td>
                         </tr>
                </v-table>    
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
            outside:[],
            out:'',
            products:[],
            product:'',
            name:'',
            id:'',
            rate:'',
            amount:'',
            Quantity:1
        }
    },
    methods:{
        close(){
            this.splex=false
            
           
        },
        add(){
            this.products.push(
                {
                   name:this.name,
                   id:this.id,
                   rate:this.rate,
                   Quantity:this.Quantity,
                   amount:this.amount 
                }
               
            )
            this.close()
        },
        paste(){
            this.outside.push(
                {
                    
                    name:this.name,
                    no:this.id,
                    rate:this.rate,
                    amount:this.amount
                }
            )
            this.show=false
            this.close()
        }
    }
}
</script>