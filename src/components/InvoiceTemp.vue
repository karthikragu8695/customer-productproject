<template>
    <v-container >
      <v-text class="d-flex">
          <v-text-field 
              label="Customer name"
              placeholder="Name"
              variant="outlined">
          </v-text-field>
          <v-text-field class="ml-5"
              label="product Id"
              placeholder="Id"
              variant="outlined">
          </v-text-field>
          <v-text-field class="ml-5"
              label="product Name"
              placeholder="Product"
              variant="outlined">
          </v-text-field>
          
       </v-text>
       <v-btn color="primary" @click="dialog=true">Add</v-btn>
      
       <v-dialog v-model="dialog"  fullscreen transition="dialog-bottom-transition">
       
        <v-table class="p-5">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Rate</th>
                <th>Gst</th>
                <th>Total</th>
              </tr>
              <tr>
                <td>soap</td>
                <td>30</td>
                <td>4</td>
                <td>34</td>
              </tr>
            </thead>
        </v-table>
        <v-btn color="primary" @click="dialog=false">save</v-btn>
      </v-dialog>
    </v-container>
</template>

<script>
export default{
  data(){
    return{
      dialog:false
    }
  }
}

</script>

<style>
body{
  background-color: black;
}
td,tr,th{
  border:2px solid black;
}

</style>