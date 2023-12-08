<template>
    <v-container>
                <v-table>
                    <thead>
                    <tr>
                        <th>Customer Id</th>
                        <th>Customer Name</th>
                        <th>Customer Phone</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr v-for="customer in customers" :key="customer.id">
                        <td>{{ customer.id }}</td>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.phone }}</td>
                        <td ><v-btn @click="editcu(customer)">edit</v-btn></td>
                        <td ><v-btn @click="deleteLi(customer)">delete</v-btn></td>
                    </tr>
                    </thead>
                </v-table>
                <v-btn @click="show=true">Add</v-btn>
            <v-dialog v-model="show">
                <v-card
                        
                        class="mx-auto"
                        max-width="344"
                        title="User Registration">
                       
                <v-container>
                    <v-text-field
                        v-model="id"
                        color="primary"
                        label="Customer Id"
                        variant="underlined">
                    </v-text-field>

                    <v-text-field
                        v-model="name"
                        color="primary"
                        label="Customer name"
                        variant="underlined">
                    </v-text-field>

                    <v-text-field
                        v-model="phone"
                        color="primary"
                        label="Customer Phone"
                        variant="underlined">
                    </v-text-field>

                    <v-checkbox
                        v-model="terms"
                        color="secondary"
                        label="I agree to site terms and conditions">
                    </v-checkbox>
                </v-container>

    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn color="red" @click="close">close</v-btn>
      <v-btn v-if="!editing" else color="success" @click="add">
        Complete Registration
        <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      <v-btn v-else color="success" @click="updatecu">
        update
        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
                
            </v-dialog>
    </v-container>
</template>

<script>
export default{
    data(){
        return{
            id:'',
            name:'',
            phone:'',
            customers:[],
            show:false,
            store:{},
            editing:false
        }
    },
    methods:{
        add(){
            this.customers.push({
                id:this.id,
                name:this.name,
                phone:this.phone    
            })
            this.close()
        },
        close(){
            this.show=false
            this.id=null
            this.name=null
            this.phone=null
            this.editing=false
        },
        deleteLi(customer){
            let index=this.customers.indexOf(customer)
            this.customers.splice(index,1)
        },
        editcu(customer){
            this.id=customer.id
            this.name=customer.name
            this.phone=customer.phone
            this.show=true
            this.editing=true
            this.store=customer
        },
        updatecu(){
            let targetobj=this.customers.find(obj =>obj.id=this.store.id)
            targetobj.id=this.id
            targetobj.name=this.name
            targetobj.phone=this.phone
            this.close()
        }
    }
}
</script>