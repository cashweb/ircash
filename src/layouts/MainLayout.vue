<template>
  <q-layout view="hHr LpR lff">
    <q-drawer
      v-model="myDrawerOpen"
      :width="splitterRatio"
      :breakpoint="800"
      show-if-above
    >
      <left-drawer :loaded="loaded" />
    </q-drawer>
    <q-drawer
      v-model="contactDrawerOpen"
      side="right"
      :width="splitterRatio"
      :breakpoint="800"
    >
      <right-drawer
        v-if="activeChatAddr !== null"
        :address="activeChatAddr"
        :contact="getContact(activeChatAddr)"
      />
    </q-drawer>
    <q-dialog v-model="contactBookOpen">
      <contact-book-dialog :contact-click="contactClicked" />
    </q-dialog>
    <q-page-container>
      <q-page :style-fn="tweak">
        <router-view
          @toggleContactDrawerOpen="toggleContactDrawerOpen"
          @toggleMyDrawerOpen="toggleMyDrawerOpen"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import LeftDrawer from '../components/panels/LeftDrawer.vue'
import RightDrawer from '../components/panels/RightDrawer.vue'
import ContactBookDialog from '../components/dialogs/ContactBookDialog.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import { debounce } from 'quasar'
import { defaultContacts, keyservers, networkName } from '../utils/constants'
import { KeyserverHandler } from '../cashweb/keyserver/handler'
import { errorNotify } from '../utils/notifications'

const compactWidth = 70
const compactCutoff = 325
const compactMidpoint = (compactCutoff + compactWidth) / 2

export default {
  components: {
    RightDrawer,
    LeftDrawer,
    ContactBookDialog
  },
  data () {
    return {
      trueSplitterRatio: compactCutoff,
      loaded: false,
      myDrawerOpen: !!this.activeChatAddr,
      contactDrawerOpen: false,
      contactBookOpen: false,
      compact: false,
      compactWidth
    }
  },
  methods: {
    ...mapActions({
      vuexSetActiveChat: 'chats/setActiveChat',
      addDefaultContact: 'contacts/addDefaultContact',
      refreshContacts: 'contacts/refreshContacts'
    }),
    ...mapGetters({
      getSortedChatOrder: 'chats/getSortedChatOrder',
      getDarkMode: 'appearance/getDarkMode'
    }),
    tweak (offset, viewportHeight) {
      const height = viewportHeight - offset + 'px'
      return { height, minHeight: height }
    },
    toggleContactDrawerOpen () {
      this.contactDrawerOpen = !this.contactDrawerOpen
    },
    toggleContactBookOpen () {
      this.contactBookOpen = !this.contactBookOpen
    },
    toggleMyDrawerOpen () {
      if (this.compact) {
        this.compact = false
        this.trueSplitterRatio = compactCutoff
      }
      this.myDrawerOpen = !this.myDrawerOpen
    },
    shortcutKeyListener (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        this.toggleContactBookOpen()
      }
    },
    contactClicked (newAddress) {
      this.vuexSetActiveChat(newAddress)
      this.$router.push(`/chat/${newAddress}`).catch(() => {
        // Don't care. Probably duplicate route
      })
    }
  },
  computed: {
    ...mapState('chats', ['chats', 'activeChatAddr']),
    ...mapGetters({
      getContact: 'contacts/getContact',
      lastReceived: 'chats/getLastReceived',
      totalUnread: 'chats/totalUnread',
      getRelayData: 'myProfile/getRelayData'
    }),
    splitterRatio: {
      get: function () {
        return this.trueSplitterRatio
      },
      set: debounce(function (inputRatio) {
        this.trueSplitterRatio = inputRatio
        this.$nextTick(() => {
          if (inputRatio < compactMidpoint) {
            this.trueSplitterRatio = compactWidth
            this.compact = true
          } else if (
            inputRatio > compactMidpoint &&
            inputRatio < compactCutoff
          ) {
            this.compact = false
            this.trueSplitterRatio = compactCutoff
          } else {
            this.compact = false
          }
        })
      }, 100)
    }
  },
  created () {
    this.$q.dark.set(this.getDarkMode())
    console.log('Loading')

    // Setup everything at once. This are independent processes
    try {
      this.$relayClient.setUpWebsocket(this.$wallet.myAddressStr)
    } catch (err) {
      console.error(err)
    }

    // Add default contacts
    for (const defaultContact of defaultContacts) {
      this.addDefaultContact(defaultContact)
    }
    this.$nextTick(this.refreshContacts)

    // const lastReceived = this.lastReceived
    const t0 = performance.now()
    const refreshMessages = () => {
      // Wait for a connected electrum client
      if (!this.$electrum.connected) {
        setTimeout(refreshMessages, 100)
        return
      }
      this.$relayClient
        .refresh()
        .then(() => {
          const t1 = performance.now()
          console.log(`Loading messages took ${t1 - t0}ms`)
          this.loaded = true
        })
        .catch((err) => {
          console.error(err)
          setTimeout(refreshMessages, 100)
        })
    }
    refreshMessages()

    const handler = new KeyserverHandler({ wallet: this.$wallet, keyservers: keyservers, networkName })
    // Update keyserver data if it doesn't exist.
    handler.getRelayUrl(this.$wallet.myAddressStr).catch(() => {
      handler.updateKeyMetadata(
        this.$relayClient.url,
        this.$wallet.identityPrivKey
      )
    })

    // Update profile if it doesn't exist.
    this.$relayClient.getRelayData(this.$wallet.myAddressStr).catch(() => {
      const relayData = this.getRelayData()
      this.$relayClient
        .updateProfile(
          this.$wallet.identityPrivKey,
          relayData.profile,
          relayData.inbox.acceptancePrice
        )
        .catch((err) => {
          console.error(err)
          // TODO: Move specialization down error displayer
          if (err.response.status === 413) {
            errorNotify(new Error(this.$t('profileDialog.avatarTooLarge')))
            this.$q.loading.hide()
            throw err
          }
          errorNotify(new Error(this.$t('profileDialog.unableContactRelay')))
          throw err
        })
    })

    this.$q.loading.hide()
  },
  mounted () {
    document.addEventListener('keydown', this.shortcutKeyListener)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.shortcutKeyListener)
  },
  watch: {
    totalUnread: function (unread) {
      this.updateBadge(unread)
    }
  }
}
</script>
