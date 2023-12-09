<template>
    <v-table>
        <v-text class="d-flex w-[1000px] mx-auto">
         
         <v-text-field
           :items="items"
           v-model="rate"
           placeholder="Rate"
           label="Product Rate"
           variant="outlined"
         ></v-text-field>
         </v-text>
    </v-table>
        <v-table class=" px-10">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Rate</th>
                <th>Tax</th>
                <th>Total</th>
              </tr>
              <tr></tr>
            </thead>
        </v-table>
</template>
<script>
export default{
    data(){
        return{
            
        }
    }
}
</script>