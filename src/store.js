import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: 0,
    web3Wallet: '',
    memberUsername: '',
    Collections: [],
    CollectionNameImg: [],
    Items: [],
    Playlists: [],
    PlaylistItems: [],
    itemsPlaylists: []
  },
  mutations: {
    authenticate (state, payload) {
      state.authenticated = payload
    },
    storeWeb3Wallet (state, payload) {
      state.web3Wallet = payload
    },
    storeUsername (state, payload) {
      state.memberUsername = payload
    },
    blankUsername (state, payload) {
      state.memberUsername = payload
    },
    storeCollections (state, payload) {
      state.Collections.push(payload)
    },
    storeCollectionNameImg (state, payload) {
      state.CollectionNameImg.push(payload)
    },
    storeItems (state, payload) {
      state.Items.push(payload)
    },
    storePlaylistItems (state, payload) {
      state.PlaylistItems.push(payload)
    },
    pushPlaylist (state, payload) {
      state.Playlists.push(payload)
    },
    filterPlaylist (state, payload) {
      state.Playlists = state.Playlists.filter((res) => {
        return res.name !== payload.name
      })
    },
    storeItemsPlaylists (state, payload) {
      state.itemsPlaylists.push(payload)
    }
  },
  actions: {
    setAuthenticated ({ commit }, payload) {
      commit('authenticate', payload)
    },
    setWeb3Wallet ({ commit }, payload) {
      commit('storeWeb3Wallet', payload)
    },
    createMember ({ dispatch }, payload) {
      firebase
        .firestore()
        .collection('members')
        .doc(payload.wallet)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.exists) {
            dispatch('setAuthenticated', 1)
            dispatch('getUsername')
          } else {
            firebase
              .firestore()
              .collection('members')
              .doc(payload.wallet)
              .set({ 'username': '' })
          }
        })
    },
    getUsername ({ state, commit }) {
      firebase
        .firestore()
        .collection('members')
        .doc(state.web3Wallet)
        .get()
        .then((querySnapshot) => {
          commit('storeUsername', querySnapshot.data().username)
        })
        .catch((err) => {
          console.log('couldn\'t get username' + err)
        })
    },
    updateUsername ({ state, commit }, payload) {
      firebase
        .firestore()
        .collection('members')
        .doc(state.web3Wallet)
        .set(payload)
        .then(() => {
          commit('storeUsername', payload.username)
        })
        .catch((err) => {
          console.error('Error writing document: ', err)
        })
    },
    deleteUsername ({ commit }) {
      commit('blankUsername', '')
    },
    getCollections ({ state, commit }) {
      this.state.Collections.length = 0
      axios.get(`https://api.opensea.io/api/v1/collections?limit=300&asset_owner=${state.web3Wallet}`, { headers: { 'X-API-KEY': 'e67997c876d84919910a75c823328e8d' } })
        .then((response) => {
          let allCollections = response.data
          for (let i = 0; i < allCollections.length; i += 1) {
            const collName = allCollections[i].name
            const collLogo = allCollections[i].image_url
            const collDesc = allCollections[i].description
            const collSlug = allCollections[i].slug
            const collObj = {
              collName,
              collLogo,
              collDesc,
              collSlug
            }
            commit('storeCollections', collObj)
          }
        })
    },
    getCollectionNameImg ({ state, commit }, payload) {
      this.state.CollectionNameImg = []
      axios.get(`https://api.opensea.io/api/v1/assets?limit=1&collection=${payload}&owner=${state.web3Wallet}`, { headers: { 'X-API-KEY': 'e67997c876d84919910a75c823328e8d' } })
        .then((response) => {
          let thisItem = response.data.assets
          const collName = thisItem[0].collection.name
          const collImg = thisItem[0].collection.image_url
          const itemObj = {
            collName,
            collImg
          }
          commit('storeCollectionNameImg', itemObj)
        })
    },
    getItems ({ state, commit }, payload) {
      this.state.Items.length = 0
      axios.get(`https://api.opensea.io/api/v1/assets?limit=300&collection=${payload}&owner=${state.web3Wallet}`, { headers: { 'X-API-KEY': 'e67997c876d84919910a75c823328e8d' } })
        .then((response) => {
          let allItems = response.data.assets
          for (let i = 0; i < allItems.length; i += 1) {
            const itemId = allItems[i].token_id
            const itemName = allItems[i].name
            const itemImg = allItems[i].image_url
            const itemPrevImg = allItems[i].image_preview_url
            const itemBigImg = allItems[i].image_original_url
            const itemLink = allItems[i].external_link
            const itemDesc = allItems[i].description
            const itemsObj = {
              itemId,
              itemName,
              itemImg,
              itemPrevImg,
              itemBigImg,
              itemLink,
              itemDesc
            }
            commit('storeItems', itemsObj)
          }
        })
    },
    getPlaylists ({ state, commit }) {
      this.state.Playlists.length = 0
      firebase
        .firestore()
        .collection('members')
        .doc(state.web3Wallet)
        .collection('playlists')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const objPlaylist = { 'name': doc.id }
            commit('pushPlaylist', objPlaylist)
          })
        })
    },
    addPlaylist ({ state, commit }, payload) {
      firebase
        .firestore()
        .collection('members')
        .doc(state.web3Wallet)
        .collection('playlists')
        .doc(payload.name)
        .set({})
        .then(() => {
          commit('pushPlaylist', payload)
        })
        .catch((err) => {
          console.error('Error writing document: ', err)
        })
    },
    deletePlaylist ({ state, commit }, payload) {
      firebase
        .firestore()
        .collection('members')
        .doc(state.web3Wallet)
        .collection('playlists')
        .doc(payload.name)
        .delete()
        .then(() => {
          commit('filterPlaylist', payload)
        })
        .catch((err) => {
          console.error('Error writing document: ', err)
        })
    },
    addPlaylistItem ({ state, dispatch }, payload) {
      firebase
        .firestore()
        .collection('members')
        .doc(state.web3Wallet)
        .collection('playlists')
        .doc(payload.playlist)
        .collection('items')
        .doc(payload.id)
        .set({ name: payload.name, img: payload.img })
        .then(() => {
          dispatch('addItemPlaylists', payload)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    deletePlaylistItem ({ state, dispatch }, payload) {
      firebase
        .firestore()
        .collection('members')
        .doc(state.web3Wallet)
        .collection('playlists')
        .doc(payload.playlist)
        .collection('items')
        .doc(payload.id)
        .delete()
        .then(() => {
          dispatch('setPlaylistItems', payload.playlist)
          dispatch('deleteItemPlaylists', payload)
        })
    },
    setPlaylistItems ({ state, commit }, payload) {
      this.state.PlaylistItems = []
      firebase
        .firestore()
        .collection('members')
        .doc(state.web3Wallet)
        .collection('playlists')
        .doc(payload)
        .collection('items')
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty === false) {
            querySnapshot.forEach((doc) => {
              const objPlaylistItem = {
                'id': doc.id,
                'name': doc.data().name,
                'img': doc.data().img
              }
              commit('storePlaylistItems', objPlaylistItem)
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    addItemPlaylists ({ state }, payload) {
      this.state.itemsPlaylists = []
      firebase
        .firestore()
        .collection('members')
        .doc(state.web3Wallet)
        .collection('items')
        .doc(payload.id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.exists) {
            firebase
              .firestore()
              .collection('members')
              .doc(state.web3Wallet)
              .collection('items')
              .doc(payload.id)
              .update({
                playlists: firebase.firestore.FieldValue.arrayUnion(payload.playlist)
              })
          } else {
            firebase
              .firestore()
              .collection('members')
              .doc(state.web3Wallet)
              .collection('items')
              .doc(payload.id)
              .set({ playlists: [payload.playlist] })
          }
        })
    },
    deleteItemPlaylists ({ state }, payload) {
      this.state.itemsPlaylists = []
      firebase
        .firestore()
        .collection('members')
        .doc(state.web3Wallet)
        .collection('items')
        .doc(payload.id)
        .update({
          playlists: firebase.firestore.FieldValue.arrayRemove(payload.playlist)
        })
    }
  },
  plugins: [createPersistedState()]
})
