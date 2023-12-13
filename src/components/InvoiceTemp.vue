<template>
    <v-container >
      <v-btn class="ml-[70px]" color="primary" @click="dialog=true">New Invoice</v-btn>

      <v-text class="d-flex w-[500px]  ml-[70px] mt-5">
          <v-text-field  label="search">
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
                <td></td>
              </tr>
            </thead>
        </v-table>
      <!-----------------dialog----------------------------------->
       <v-dialog v-model="dialog"  fullscreen transition="dialog-bottom-transition">
        
          <v-table>
              <v-text class="d-flex w-[1000px]  mt-10">
                <v-autocomplete 
                      class="ml-10"
                      placeholder="Name"
                      label="Customer name"
                      item-title="name"
                      :items="customers"
                      v-model="customer"
                      item-value="iid"
                      variant="outlined">
                </v-autocomplete>
                <v-autocomplete
                      class="ml-5 "
                      placeholder="phone number"
                      label="Phone Number"
                      item-title="phone"
                      :items="customers"
                      item-value="iid"
                      v-model="customer"
                      variant="outlined">
                </v-autocomplete>
                <!-------------------Date Picker------------------------->
                <v-col cols="3">
                                    <v-menu
                                        @click="dmenu=true"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                        <v-text-field 
                                        outlined
                                        v-model="idate"
                                        label="Invoice date"
                                        v-on="on"
                                        
                                        readonly
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker v-if="dmenu" v-model="idate"></v-date-picker>
                                    </v-menu>
                                </v-col>
              </v-text>
              <v-text class="d-flex w-[1000px]  mt-10">
                <v-autocomplete 
                      class="ml-10"
                      placeholder="Id"
                      label="product Id"
                      item-title="id"
                      :items="products"
                      v-model="product"
                      item-value="iid"
                      variant="outlined">
                </v-autocomplete>
                <v-autocomplete
                      class="ml-5 "
                      placeholder="product Name"
                      label="product Name"
                      item-title="name"
                      :items="products"
                      item-value="iid"
                      v-model="product"
                      variant="outlined">
                </v-autocomplete>
                <v-autocomplete
                      class="ml-5"
                      placeholder="product price"
                      :items="products"
                      item-value="iid"
                      item-title="price"
                      v-model="product"
                      label="price"
                      variant="outlined">
                </v-autocomplete>
                <v-text-field
                      class="ml-5"
                      placeholder="Quantity"
                      v-model="qt"
                      label="Quantity"
                      variant="outlined">
                </v-text-field>
              </v-text>
            </v-table>

            <v-table class="px-15">
              <thead>
              <tr>
                <th>product Name</th>
                <th>product Id</th>
                <th> Quantity </th>
                <th>product price</th>
                <th>Amount</th>
                
              </tr>
              <tr>
                <td>
                  <v-autocomplete v-model="product" item-value="iid" readonly item-title="name" :items="products"></v-autocomplete>
                </td>
                <td>
                  <v-autocomplete v-model="product" item-value="iid" readonly item-title="id" :items="products"></v-autocomplete>
                </td>
                <td>
                  <v-autocomplete v-model="qt" ></v-autocomplete>
                </td>
                <td>
                  <v-autocomplete v-model="product" item-value="iid" readonly item-title="price" :items="products"></v-autocomplete>
                </td>
                <td>
                 <v-card></v-card>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <v-text-field placeholder="0" label="Total Amount" readonly variant="outlined"> 
                </v-text-field>
                </td>
              </tr>
            </thead>
            
            </v-table>
            
          </v-dialog>
    </v-container>
</template>

<script>
export default{
  data(){
    return{
      name:'',
      price:'',
      dialog:false,
      show:false,
      showitem:false,
      editing:false,
      customer:null,
      product:null,
      dmenu:false,
      idate:null,
      qt:1,
      
      
    }
  },
  methods:{
    close(){
      this.showitem=false
      this.show=false
    }, 
    
    },
    computed:{
      customers(){
        return this.$store.getters.customerDetails
      },
      products(){
        return this.$store.getters.productDetails
      },
      
      
    }
  }
</script>
