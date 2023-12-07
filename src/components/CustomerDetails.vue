<template>
    <v-container>
                <v-table>
                    <thead>
                    <tr>
                        <th>Customer Id</th>
                        <th>Customer Name</th>
                        <th>Customer Phone</th>
                    </tr>
                    <tr v-for="customer in customers" :key="customer.id">
                        <td>{{ customer.id }}</td>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.phone }}</td>
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
      <v-btn color="success" @click="add">
        Complete Registration

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
            show:false
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
        }
    }
}
</script>