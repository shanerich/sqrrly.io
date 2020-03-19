<template>
  <v-container>
      <h1 class="my-7">Playlists</h1>
    <v-row>
      <v-col
        :xl="4"
        :lg="6"
        :md="6"
        :sm="6"
        cols="12"
      >
        <v-text-field
          v-model="newPlaylist"
          outlined
          color="brown darken-2"
          label="Create Playlist"
          append-outer-icon="mdi-playlist-plus"
          v-on:keyup.enter="addPlaylist(newPlaylist)"
          @click:append-outer="addPlaylist(newPlaylist)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-alert
      v-if="!getPlaylists.length"
      outlined
      type="info"
      prominent
      border="left"
    >
      It doesn't look like you've created any playlists. Create one above.
    </v-alert>
    <v-row>
      <v-col
        v-for="playlist of getPlaylists" :key="playlist.name"
        :xl="4"
        :lg="6"
        :md="6"
        :sm="6"
        cols="12"
      >
        <v-card
            raised
            :href="'/playlists/'+playlist.name"
          >
            <div
              class="d-flex flex-no-wrap justify-space-between"
            >
              <div>
                <v-card-title
                  v-text="playlist.name"
                ></v-card-title>
                <v-card-subtitle></v-card-subtitle>
              </div>
              <div class="d-flex">
                <v-card-actions align-items="center">
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        color="brown darken-2"
                        @click="'/'"
                        v-on="on"
                      >
                        <v-icon>mdi-lead-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit Name</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        color="brown darken-2"
                        @click="'/playlists/'+playlist.name"
                        v-on="on"
                      >
                        <v-icon>mdi-playlist-play</v-icon>
                      </v-btn>
                    </template>
                    <span>View Playlist</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        color="brown darken-2"
                        @click.prevent="deleteModal(playlist.name)"
                        v-on="on"
                      >
                        <v-icon>mdi-trash-can</v-icon>
                      </v-btn>
                    </template>
                    <span>Delete Playlist</span>
                  </v-tooltip>
                </v-card-actions>
              </div>
            </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="deleteAlert" persistent max-width="378">
      <v-card>
        <v-card-title class="headline">Delete Playlist?</v-card-title>
        <v-card-text>Are you sure you want to delete this playlist and remove all items associated with it? This can't be undone.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            outlined
            text
            @click.stop="deleteAlert = false"
          >Cancel</v-btn>
          <v-btn
            color="success"
            outlined
            text
            @click.stop="deletePlaylist"
          >Delete Playlist</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

export default {
  name: 'Playlists',
  data () {
    return {
      newPlaylist: '',
      objPlaylist: {},
      selectedForDelete: '',
      deleteAlert: false
    }
  },
  mounted () {
    this.$store.dispatch('getPlaylists')
  },
  computed: {
    getPlaylists () {
      return this.$store.state.Playlists
    }
  },
  methods: {
    addPlaylist (newPlaylist) {
      this.objPlaylist = { 'name': newPlaylist }
      this.$store.dispatch('addPlaylist', this.objPlaylist)
      this.objPlaylist = ''
      this.newPlaylist = ''
    },
    deleteModal (name) {
      this.deleteAlert = true
      this.selectedForDelete = name
    },
    deletePlaylist () {
      this.objPlaylist = { 'name': this.selectedForDelete }
      this.$store.dispatch('deletePlaylist', this.objPlaylist)
      // TODO: delete playlist from items playlists array
      this.deleteAlert = false
      this.objPlaylist = ''
      this.selectedForDelete = ''
    }
  }
}

</script>
