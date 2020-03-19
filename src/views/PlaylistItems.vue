<template>
  <v-container>
    <h1 class="my-7">{{ this.$route.params.playlist }} playlist</h1>
    <v-alert
      v-if="!getPlaylistItems.length"
      outlined
      type="info"
      prominent
      border="left"
    >
      It doesn't look like you've added any items to this playlist. Go select a <router-link to="/collections">Collection</router-link> and add some items.
    </v-alert>
    <v-row>
      <v-col
        v-for="item of getPlaylistItems" :key="item.name"
        :xl="4"
        :lg="6"
        :md="6"
        :sm="12"
        cols="12"
      >
        <v-card
          raised
        >
          <div
            class="d-flex flex-no-wrap"
          >
            <v-avatar
              class="ma-3"
              size="78"
              tile
            >
              <v-img contain :src="item.img"></v-img>
            </v-avatar>
            <div class="d-flex flex-no-wrap justify-space-between" style="width:100%">
              <v-card-title
                v-text="item.name"
              ></v-card-title>
              <div class="d-flex">
                <v-card-actions align-items="center">
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        color="brown darken-2"
                        @click="getItem(item.name)"
                        v-on="on"
                      >
                        <v-icon>mdi-eye-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>View Item</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        color="brown darken-2"
                        @click.prevent="deleteModal(item.id)"
                        v-on="on"
                      >
                        <v-icon>mdi-trash-can</v-icon>
                      </v-btn>
                    </template>
                    <span>Delete Item</span>
                  </v-tooltip>
                </v-card-actions>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="deleteAlert" persistent max-width="378">
      <v-card>
        <v-card-title class="headline">Delete Item from Playlist?</v-card-title>
        <v-card-text>Are you sure you want to delete this item from the playlist?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="brown darken-2" text @click="deleteAlert = false">Cancel</v-btn>
          <v-btn color="brown darken-2" text @click="deletePlaylist">Delete Item</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          v-for="single of overlayItem" :key="single.name"
          max-height="1016"
          width="100vw"
          max-width="1920"
          class="img-card pb-7"
          flat
        >
          <v-img
            contain
            :src="single.img"
          ></v-img>
        </v-card>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script>

export default {
  name: 'PlaylistItems',
  data () {
    return {
      singleModal: false,
      playlistModal: false,
      overlayItem: [],
      deleteAlert: false,
      objItemForDelete: {},
      selectedForDelete: ''
    }
  },
  computed: {
    getPlaylistItems () {
      return this.$store.state.PlaylistItems
    }
  },
  mounted () {
    this.$store.dispatch('setPlaylistItems', this.$route.params.playlist)
  },
  methods: {
    getItem (name) {
      this.overlayItem = this.getPlaylistItems
        .filter(data => data.name === name)
      this.singleModal = true
    },
    deleteModal (id) {
      this.deleteAlert = true
      this.selectedForDelete = id
    },
    deletePlaylist () {
      this.objItemForDelete = {
        'playlist': this.$route.params.playlist,
        'id': this.selectedForDelete
      }
      this.$store.dispatch('deletePlaylistItem', this.objItemForDelete)
      this.deleteAlert = false
      this.objItemForDelete = {}
      this.selectedForDelete = ''
    }
  }
}

</script>
