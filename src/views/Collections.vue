<template>
  <v-container>
    <div class="container-collection">
      <h1 class="my-7">Collections</h1>
      <v-alert
      v-if="!getCollections.length"
      outlined
      type="info"
      prominent
      border="left"
    >
      It doesn't look like you have any Crypto Collectibles associated with this wallet. Connect a wallet with some collectibles or start <a href="https://opensea.io" target='_blank'>Collecting Now</a>!
    </v-alert>
      <v-row>
        <v-col
          v-for="coll of getCollections" :key="coll.collName"
          :xl="3"
          :lg="4"
          :md="4"
          :sm="12"
          cols="12"
        >
          <v-card
            raised
            :href="'/collections/'+coll.collSlug"
          >
            <v-list-item
              three-line
            >
              <v-list-item-avatar>
                <v-img :src="coll.collLogo"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                  <v-list-item-title>{{ coll.collName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ coll.collDesc }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>

export default {
  name: 'Collections',
  data () {
    return {
      // todo
    }
  },
  computed: {
    getCollections () {
      return this.$store.state.Collections
    }
  },
  mounted () {
    this.$store.dispatch('getCollections')
  }
}

</script>
