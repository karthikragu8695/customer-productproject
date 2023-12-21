<template>
    <v-app-bar :elevation="10">
        <v-app-bar-nav-icon @click="draw=!draw"></v-app-bar-nav-icon>
        <v-app-bar-title>Shop</v-app-bar-title>
      <v-row align="center" justify="center" class="md-hidden">
        <v-col cols="auto">
          <v-btn size="lx-small " class="px-5 py-2">  <v-icon>mdi-home-outline</v-icon>Home</v-btn>
        </v-col>
        <v-col cols="auto">
           <v-btn size="lx-small " class="px-5 py-2"> <v-icon>mdi-store-outline</v-icon>Store</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn size="lx-small " class="px-5 py-2"><v-icon size="large" icon="mdi-email">
          </v-icon>cart</v-btn>
        </v-col>
      </v-row>
      <v-btn variant="outlined" color="green">Save</v-btn>
      <v-btn variant="outlined" color="green">Logout</v-btn>
      </v-app-bar>
    <v-navigation-drawer v-model="draw" >
      <v-divider></v-divider>
      <v-list-item link to="/"><v-icon> mdi-human-queue</v-icon>&nbsp;&nbsp;customer</v-list-item>
      <v-list-item link to="/auth"><v-icon>mdi-briefcase-account </v-icon>&nbsp;&nbsp;Product</v-list-item>
      <v-list-item link to="/NewInvoice"><v-icon>mdi-cash-register </v-icon>&nbsp;&nbsp;Invoice</v-list-item>
      <v-list-item link to="/Invoice" title=""></v-list-item>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
</template>
<script>
export default{
    name:'layout-page',
    data:()=>({
        draw:false
    }),
    
}
</script>