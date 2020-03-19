<template>
  <v-container>
    <v-btn
      text
      color="brown darken-2"
      @click.native="singleModal=true"
    >
      <v-icon>mdi-eye-outline</v-icon>
    </v-btn>
    <v-bottom-sheet
      v-model="singleModal"
      fullscreen
      hide-overlay
    >
      <v-card
        height="100vh"
        max-height="1080"
        width="100vw"
        max-width="1920"
        flat
      >
        <v-toolbar
          color="transparent"
          dense
          flat
        >
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              text
              color="brown darken-2"
              @click="singleModal=false"
            >
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card
          max-height="1016"
          width="100vw"
          max-width="1920"
          class="img-card pb-7"
          flat
        >
          <v-img
            contain
            src="https://storage.opensea.io/files/90aacdd242a67fb061ee85f23f651ff0.svg"
          ></v-img>
        </v-card>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script>

export default {
  name: 'Test',
  data () {
    return {
      singleModal: false
    }
  }
}
</script>

<style>
.img-card .v-image {
  height: calc(100vh - 104px);
}
</style>
