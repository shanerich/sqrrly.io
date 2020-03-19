<template>
  <v-app id="sqrrly">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      class="hidden-md-and-up"
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template>
          <v-list-item href="/collections">
            <v-list-item-action>
              <v-icon>mdi-image-multiple</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                Collections
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item href="/playlists">
            <v-list-item-action>
              <v-icon>mdi-playlist-edit</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                Playlists
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item href="/member">
            <v-list-item-action>
              <v-icon>mdi-account-box</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                Profile
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item href="https://commerce.coinbase.com/checkout/aae97394-332f-4888-a507-347c75b66748">
            <v-list-item-action>
              <v-icon>mdi-credit-card-outline </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                Pay what you want
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      color="white"
    >
      <v-app-bar-nav-icon
        class="d-sm-inline-flex d-md-none"
        color="brown darken-2"
        @click="drawer = !drawer" />
      <div class="d-flex flex-no-wrap align-center">
        <a href="/">
          <v-img
            alt="sqrrly logo"
            class="shrink mr-2"
            contain
            src="@/assets/sqrrly2-logo.png"
            transition="scale-transition"
            width="155"
            link="/"
          />
        </a>
      </div>
      <!--
      <v-btn v-if="authenticated" text color="brown darken-2">Authenticated</v-btn>
      <v-btn v-if="!authenticated" text color="brown darken-2">Not Authenticated</v-btn>
      -->
      <v-spacer></v-spacer>
      <!--
      <v-btn text color="brown darken-2">{{ getWeb3Wallet }}</v-btn>
      -->
      <v-btn
        href="/collections"
        outlined
        class="hidden-sm-and-down"
        color="brown darken-2"
        v-if="authenticated"
      >
        <span class="mr-2">Collections</span>
        <v-icon>mdi-image-multiple</v-icon>
      </v-btn>
      <v-btn
        href="/playlists"
        outlined
        class="ml-3 hidden-sm-and-down"
        color="brown darken-2"
        v-if="authenticated"
      >
        <span class="mr-2">Playlists</span>
        <v-icon>mdi-playlist-edit</v-icon>
      </v-btn>
      <!--
      <v-btn
        href="/member"
        outlined
        class="ml-3 hidden-sm-and-down"
        color="brown darken-2"
        v-if="authenticated"
      >
        <span class="mr-2">Profile</span>
        <v-icon>mdi-account-box</v-icon>
      </v-btn>
      -->
      <v-btn
        href="https://commerce.coinbase.com/checkout/aae97394-332f-4888-a507-347c75b66748"
        outlined
        class="ml-3 hidden-sm-and-down"
        color="brown darken-2"
        v-if="authenticated"
      >
        <span class="mr-2">Pay what you want</span>
        <v-icon>mdi-credit-card-outline</v-icon>
      </v-btn>
      <vth-status
        deferred
        v-on:update="onVuethereumUpdate"
      >
        <template slot-scope="web3">
          <v-btn
            outlined
            color="brown darken-2"
            @click.native="web3.getWeb3"
            v-show="!authenticated"
          >
            <span class="mr-2">Sign In</span>
            <v-icon>mdi-wallet-outline</v-icon>
          </v-btn>
        </template>
      </vth-status>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer
      app
      color="grey lighten-4"
    >
      <div
        class="d-flex flex-no-wrap align-center justify-space-between"
        style="width:100%"
        color="white"
      >
        <div>
          <span class="px-4">&copy; {{ new Date().getFullYear() }} sqrrly. All Rights Reserved.</span>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-btn
            outlined
          >
            ABOUT
          </v-btn>
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    memberWallet: '',
    firebaseMember: {}
  }),
  computed: {
    authenticated () {
      return this.$store.state.authenticated
    },
    getWeb3Wallet () {
      return this.$store.state.web3Wallet
    }
  },
  methods: {
    onVuethereumUpdate (web3obj) {
      this.memberWallet = web3obj.account
      this.$store.dispatch('setWeb3Wallet', this.memberWallet)
      this.firebaseMember = { 'wallet': this.memberWallet }
      this.$store.dispatch('createMember', this.firebaseMember)
    }
  }
}
</script>

<style>
main {
  background: url('./assets/subtle_white_feathers.png') repeat center;
}
#sqrrly .v-navigation-drawer__border {
  display: none
}
</style>
