<template>
  <v-container>
    <h1 class="my-7">Member Profile</h1>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-if="!memberUsername"
          v-model="enteredName"
          outlined
          label="Set Username"
          append-outer-icon="mdi-content-save"
          v-on:keyup.enter="saveUsername(enteredName)"
          @click:append-outer="saveUsername(enteredName)"
        ></v-text-field>
        <h1
          v-if="memberUsername"
        >
        {{ memberUsername }}
        <v-icon
          class="is-clickable"
          @click.native="deleteUsername"
        >
        mdi-lead-pencil
        </v-icon>
        </h1>
        <span>{{ getWeb3Wallet }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Member',
  data () {
    return {
      web3Wallet: '',
      enteredName: '',
      firebaseMember: {}
    }
  },
  computed: {
    memberUsername () {
      return this.$store.state.memberUsername
    },
    getWeb3Wallet () {
      return this.$store.state.web3Wallet
    }
  },
  methods: {
    saveUsername (name) {
      this.username = { 'username': name }
      this.$store.dispatch('updateUsername', this.username)
      this.enteredName = ''
    },
    deleteUsername () {
      this.$store.dispatch('deleteUsername')
    }
  },
  mounted () {
    // this.web3Wallet = this.$store.state.web3Wallet
    // this.firebaseMember = { 'wallet': this.web3Wallet }
    // console.log(this.firebaseMember)
    // this.$store.dispatch('createMember', this.firebaseMember)
    // this.$store.dispatch('getUsername', this.firebaseMember)
  }
}

</script>

<style>
.is-clickable {
  cursor: pointer
}
</style>
