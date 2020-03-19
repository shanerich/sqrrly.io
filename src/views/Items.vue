<template>
  <v-container>
    <v-row>
      <v-col>
        <div
          v-for="coll of getCollectionNameImg" :key="coll.collName"
          class="d-flex my-4"
        >
          <div>
            <v-img
              height="48"
              width="48"
              :src="coll.collImg"
            ></v-img>
          </div>
          <div class="ml-4">
            <h1>{{ coll.collName}}</h1>
          </div>
        </div>
      </v-col>
    </v-row>
    <div class="d-flex mb-2">
      <v-spacer></v-spacer>
      <v-btn
        text
        href="/"
        outlined
        color="brown darken-2"
      >
        <span class="mr-2">Create Playlist for Entire Collection</span>
        <v-icon>mdi-playlist-check</v-icon>
      </v-btn>
    </div>
    {{ itemsAttrs }}
    <v-row>
      <v-col
        v-for="item of getCollectionItems" :key="item.itemName"
        :xl="6"
        :lg="6"
        :md="6"
        :sm="12"
        cols="12"
      >
        <v-card
          raised
        >
          <div class="d-flex flex-no-wrap">
            <v-avatar
              class="ma-3"
              size="180"
              tile
            >
              <v-img contain :src="item.itemPrevImg"></v-img>
            </v-avatar>
            <div class="d-flex flex-no-wrap justify-space-between" style="width:100%">
              <div>
              <v-card-title>{{ item.itemName }}</v-card-title>
              <v-card-subtitle>
                <v-chip
                  v-for="(chip, index) in getChipList(item.itemId)" :key="index"
                  class="mr-1 my-1"
                  label
                  dense
                  outlined
                  close
                  close-icon="mdi-close-outline"
                  :href="'/playlists/'+chip"
                  @click:close="removeFromPlaylist(item.itemId, chip, item.itemName, item.itemImg)"
                >{{ chip }}</v-chip>
              </v-card-subtitle>
              </div>
            <v-col
              cols="auto"
              class="text-center pl-0"
            >
              <v-row
                class="flex-column ma-0 fill-height"
                justify="center"
              >
                <v-col class="px-0">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        text
                        color="brown darken-2"
                        v-on="on"
                        @click.native="getItem(item.itemId, item.itemBigImg, item.itemLink)"
                      >
                        <v-icon>mdi-eye-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>View Item</span>
                  </v-tooltip>
                </v-col>

                <v-col class="px-0">
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        text
                        color="brown darken-2"
                        v-on="on"
                        @click.prevent="fireSettingsModal(item.itemId, item.itemName, item.itemImg)"
                      >
                        <v-icon>mdi-cogs</v-icon>
                      </v-btn>
                    </template>
                    <span>Settings</span>
                  </v-tooltip>
                </v-col>

                <v-col class="px-0">
                  <v-dialog
                    max-width="378"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        text
                        color="brown darken-2"
                        v-on="on"
                        @click.prevent="selectData(item.itemId, item.itemName, item.itemImg)"
                      >
                        <v-icon>mdi-playlist-plus</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">Add to playlists</v-card-title>
                      <v-card-text>
                        <v-text-field
                          v-model="newPlaylist"
                          outlined
                          dense
                          color="brown darken-2"
                          class="mb-2"
                          label="Create Playlist"
                          append-outer-icon="mdi-playlist-plus"
                          v-on:keyup.enter.prevent="addPlaylist(newPlaylist)"
                          @click:append-outer="addPlaylist(newPlaylist)"
                        ></v-text-field>
                        <v-checkbox
                          v-for="playlist of getPlaylists" :key="playlist.name"
                          :label="playlist.name"
                          @change="addOrRemoveItem(playlist.name, $event)"
                          class="mt-0"
                        ></v-checkbox>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-col>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="settingsModal"
      max-width="800px"
    >
      <v-card id="settings">
        <v-card-title class="headline">Item Settings</v-card-title>
        <div class="d-flex justify-center">
          <v-card
            flat
            tile
            outlined
            width="100%"
            max-width="500"
            max-height="282"
            :color="this.itemColor"
            class="d-flex align-center justify-center settings-img-card"
          >
            <img
              class="settings-img"
              :src="this.selectedImg"
            >
            <img
              v-if="QRflag"
              class="settings-qr"
              src="@/assets/sqrrly-qr.jpg"
            >
          </v-card>
        </div>
        <div class="mt-7 px-6"><h3>Background Color</h3></div>
        <div class="d-flex flex-no-wrap mt-4 px-6">
          <div class="color-sq mr-2">
            <v-btn
              color="#fff"
              depressed
              tile
              link
              ripple
              min-width="32"
              min-height="32"
              @click.prevent="itemColor = '#fff'"
            ></v-btn>
          </div>
          <div class="color-sq mr-2">
            <v-btn
              color="#000"
              depressed
              tile
              link
              ripple
              min-width="41"
              min-height="41"
              @click.prevent="itemColor = '#000'"
            ></v-btn>
          </div>
          <div
            v-for="swatch of Swatches" :key="swatch.color"
            class="color-sq mr-2"
          >
            <v-btn
                :color="swatch.color"
                depressed
                tile
                link
                ripple
                min-width="41"
                min-height="41"
                @click.prevent="itemColor = swatch.color"
              >
            </v-btn>
          </div>
        </div>
        <v-switch
          v-model="QRflag"
          label="Display QR Code to Item URL?"
          @change="changeQRswitch($event)"
          class="mt-7 px-6"
        ></v-switch>
        {{ QRflag }} {{ itemColor }}
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            outlined
            text
            @click.stop="settingsModal = false"
          >Cancel</v-btn>
          <v-btn
            color="success"
            outlined
            text
            @click.stop="saveSettings(itemColor, QRflag)"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-bottom-sheet
      v-model="singleModal"
      fullscreen
      hide-overlay
    >
      <v-card
        v-for="single of overlayItem" :key="single.id"
        height="100vh"
        width="100vw"
        :color="single.color"
        tile
        class="d-flex justify-center align-center"
      >
        <div class="wh-100">
          <img
            class="wh-100"
            style="object-fit: scale-down"
            :src="single.img"
          >
          <qrcode-vue
            v-if="single.QRflag"
            renderAs="svg"
            class="qr-code"
            :value="single.link"
          ></qrcode-vue>
        </div>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import * as Vibrant from 'node-vibrant'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'Items',
  data () {
    return {
      selectedId: '',
      selectedName: '',
      selectedImg: '',
      newPlaylist: '',
      objPlaylist: {},
      objPlaylistItem: {},
      singleModal: false,
      playlistModal: false,
      checkbox: false,
      overlayItem: [],
      itemsAttrs: [],
      settingsModal: false,
      itemColor: '#000',
      QRflag: false,
      Swatches: []
    }
  },
  computed: {
    getWeb3Wallet () {
      return this.$store.state.web3Wallet
    },
    getCollectionNameImg () {
      return this.$store.state.CollectionNameImg
    },
    getCollectionItems () {
      return this.$store.state.Items
    },
    getPlaylists () {
      return this.$store.state.Playlists
    }
  },
  created () {
    firebase
      .firestore()
      .collection('members')
      .doc(this.getWeb3Wallet)
      .collection('items')
      .onSnapshot((snap) => {
        snap.forEach((doc) => {
          const inArr = this.itemsAttrs.findIndex(i => i.id === doc.id)
          if (inArr === -1) {
            this.itemsAttrs.push({
              'id': doc.id,
              'names': doc.data().playlists,
              'color': doc.data().color,
              'QRflag': doc.data().QRflag,
              'img': doc.data().img
            })
          } else {
            for (let i = 0; i < this.itemsAttrs.length; i += 1) {
              if ((this.itemsAttrs[i].id === this.selectedId) && (this.itemsAttrs[i].id === doc.id)) {
                this.itemsAttrs[i].names = doc.data().playlists
                this.itemsAttrs[i].color = doc.data().color
                this.itemsAttrs[i].QRflag = doc.data().QRflag
                this.itemsAttrs[i].img = doc.data().img
                this.selectedFlag = 1
              }
            }
          }
        })
      })
  },
  methods: {
    getChipList (itemId) {
      for (var y = 0; y < this.itemsAttrs.length; y += 1) {
        if (this.itemsAttrs[y].id === itemId) {
          return this.itemsAttrs[y].names
        }
      }
    },
    addOrRemoveItem (name, event) {
      if (event === true) {
        this.objPlaylistItem = {
          'id': this.selectedId,
          'playlist': name,
          'name': this.selectedName,
          'img': this.selectedImg
        }
        this.$store.dispatch('addPlaylistItem', this.objPlaylistItem)
      }
      if (event === false) {
        this.objPlaylistItem = {
          'id': this.selectedId,
          'playlist': name,
          'name': this.selectedName,
          'img': this.selectedImg
        }
        this.$store.dispatch('deletePlaylistItem', this.objPlaylistItem)
      }
    },
    removeFromPlaylist (id, playlist, name, img) {
      this.selectedId = id
      this.objPlaylistItem = {
        'id': id,
        'playlist': playlist,
        'name': name,
        'img': img
      }
      this.$store.dispatch('deletePlaylistItem', this.objPlaylistItem)
    },
    getItem (id, img, link) {
      firebase
        .firestore()
        .collection('members')
        .doc(this.getWeb3Wallet)
        .collection('items')
        .doc(id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.exists) {
            firebase
              .firestore()
              .collection('members')
              .doc(this.getWeb3Wallet)
              .collection('items')
              .doc(id)
              .update({ 'img': img, 'link': link })
              .then(() => {
                for (var i = 0; i < this.itemsAttrs.length; i += 1) {
                  if (this.itemsAttrs[i].id === id) {
                    this.itemsAttrs[i].img = img
                    this.itemsAttrs[i].link = link
                    this.overlayItem = this.itemsAttrs
                      .filter(data => data.id === id)
                    this.singleModal = true
                  }
                }
              })
          } else {
            firebase
              .firestore()
              .collection('members')
              .doc(this.getWeb3Wallet)
              .collection('items')
              .doc(id)
              .set({ 'img': img, 'link': link })
              .then(() => {
                for (var i = 0; i < this.itemsAttrs.length; i += 1) {
                  if (this.itemsAttrs[i].id === id) {
                    this.itemsAttrs[i].img = img
                    this.itemsAttrs[i].link = link
                    this.overlayItem = this.itemsAttrs
                      .filter(data => data.id === id)
                    this.singleModal = true
                  }
                }
              })
          }
        })
    },
    addPlaylist (playlistName) {
      this.objPlaylist = { 'name': playlistName }
      this.$store.dispatch('addPlaylist', this.objPlaylist)
      this.objPlaylist = ''
      this.newPlaylist = ''
    },
    selectData (id, name, img) {
      this.selectedId = id
      this.selectedName = name
      this.selectedImg = img
    },
    fireSettingsModal (id, name, img) {
      this.Swatches = []
      this.selectedId = id
      this.selectedName = name
      this.selectedImg = img
      this.itemColor = '#fff'
      this.settingsModal = true
      Vibrant.from(this.selectedImg).getPalette()
        .then((palette) => {
          this.Swatches.push({ 'color': palette.Vibrant.hex })
          this.Swatches.push({ 'color': palette.LightVibrant.hex })
          this.Swatches.push({ 'color': palette.DarkVibrant.hex })
          this.Swatches.push({ 'color': palette.Muted.hex })
          this.Swatches.push({ 'color': palette.LightMuted.hex })
        })
      var filterObj = this.itemsAttrs.filter(obj => {
        return obj.id === id
      })
      if (typeof filterObj[0].color !== 'undefined') {
        this.itemColor = filterObj[0].color
      }
      if (typeof filterObj[0].QRflag !== 'undefined') {
        this.QRflag = filterObj[0].QRflag
      }
    },
    changeQRswitch (event) {
      if (event === true) {
        this.QRflag = true
      }
      if (event === false) {
        this.QRflag = false
      }
    },
    saveSettings (color, QRflag) {
      this.settingsModal = false
      firebase
        .firestore()
        .collection('members')
        .doc(this.getWeb3Wallet)
        .collection('items')
        .doc(this.selectedId)
        .update({ 'color': color, 'QRflag': QRflag })
    }
  },
  beforeMount () {
    this.$store.dispatch('getCollectionNameImg', this.$route.params.slug)
    this.$store.dispatch('getItems', this.$route.params.slug)
    this.$store.dispatch('getPlaylists')
  },
  components: {
    QrcodeVue
  }
}

</script>

<style>
.card-img-padding-center {
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0;
}
.v-input__slot {
  margin-bottom: 0 !important;
}
.settings-img-card {
  border: 1px solid #000 !important;
  overflow: hidden;
}
.settings-img {
  max-height: 282px;
}
.settings-qr {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 41px;
}
.color-sq {
  border: 1px solid #000;
}
.wh-100 {
  width: 100vw;
  height: 100vh;
}
.qr-code {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
.qr-code svg {
  border: 4px solid #fff;
}
</style>
