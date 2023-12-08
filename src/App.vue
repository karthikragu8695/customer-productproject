<template>
  <v-app>
    <layout-page></layout-page>
  </v-app>
</template>

<script>
import LayoutPage from './views/LayoutPage.vue';

export default {
  name: 'App',
  components:{
    LayoutPage
  },

  data: () => ({
    //
  }),
}
</script>
