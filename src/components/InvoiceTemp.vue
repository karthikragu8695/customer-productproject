<template>
    <v-container >
      <v-btn class="ml-[70px]" color="primary" @click="dialog=true">New Invoice</v-btn>

      <v-text class="d-flex w-[500px]  ml-[70px] mt-5">
          <v-text-field v-model="userName" label="search">
          </v-text-field>
       </v-text>
       <v-table class="p-5">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Reg No</th>
                <th>Name</th>
                <th>Invoice Amount</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>karthik</td>
                <td>20000</td>
                <td>1</td>
              </tr>
            </thead>
        </v-table>
      <!-----------------dialog----------------------------------->
       <v-dialog v-model="dialog"  fullscreen transition="dialog-bottom-transition">
        
          <v-table>
              <v-text class="d-flex w-[1000px]  mt-10">
                <v-text-field 
                      class="ml-10"
                      :items="items"
                      placeholder="Name"
                      label="Customer name"
                      variant="outlined">
                </v-text-field>
                <v-text-field 
                      class="ml-5 "
                      :items="items"
                      v-model="id"
                      placeholder="Reg Num"
                      label="Register Number"
                      variant="outlined">
                </v-text-field>
                <v-text-field
                      class="ml-5"
                      v-model="tax"
                      :items="items"
                      placeholder="2021-12-09"
                      label="Invoice Date"
                      variant="outlined">
                </v-text-field>
              </v-text>
              <v-btn color="primary" class="ml-10" @click="customer=true" >Add Customer</v-btn>
              <v-btn color="primary" class="ml-5" >Add Product</v-btn>
            </v-table>
            <v-table class="px-15">
              <thead>
              <tr>
                <th>Service</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>Dental</td>
                <td>Full Month</td>
                <td>1</td>
                <td>1200</td>
                <td>1220</td>
                <td>delete</td>
              </tr>
            </thead>
            </v-table>
          </v-dialog>
          <!---------------------------------Inside customer--------------------------------->
          <v-dialog v-model="customer">
            <v-card  class="mx-auto"
                        max-width="344">
              <v-card-title>Customer Details</v-card-title>
              <v-container >
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
            <v-card-actions>
              <v-spacer></v-spacer>
                 <v-btn color="red" @click="close">close</v-btn>
                  <v-btn  else color="success">Save
                    <v-icon icon="mdi-chevron-right" end></v-icon>
                  </v-btn>
                  <v-btn color="success">update
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
      dialog:false,
      customer:false,
    }
  }, 
}
</script>
