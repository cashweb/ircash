import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import modules from './modules'
import { rehydateChat } from './modules/chats'
import { rehydrateWallet } from './modules/wallet'
import { path, pathOr, mapObjIndexed } from 'ramda'
import { rehydrateContacts } from './modules/contacts'
import { displayNetwork } from '../utils/constants'

Vue.use(Vuex)

const parseState = (value) => {
  if (typeof value === 'string') { // If string, parse, or else, just return
    return (JSON.parse(value || '{}'))
  } else {
    return (value || {})
  }
}
const STORE_SCHEMA_VERSION = 3

let lastSave = Date.now()

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  // Hack to allow us to easily rehydrate the store
  restoreState: async (key, storage) => {
    const value = storage.getItem(key)
    const newState = parseState(value)
    if (newState.networkName !== displayNetwork) {
      return {
        wallet: {
          seedPhrase: path(['wallet', 'seedPhrase'], newState)
        }
      }
    }

    if (newState.version !== STORE_SCHEMA_VERSION) {
      // Import everything else from the server again
      return {
        wallet: {
          xPrivKey: path(['wallet', 'xPrivKey'], newState),
          seedPhrase: path(['wallet', 'seedPhrase'], newState)
        },
        relayClient: {
          token: path(['relayClient', 'token'], newState)
        },
        chats: {
          chats: mapObjIndexed((addressData, address) => {
            console.log(`Loading lastRead time ${addressData.lastRead} for address ${address}`)
            return {
              messages: [],
              stampAmount: path(['stampAmount'], addressData),
              lastRead: path(['lastRead'], addressData)
            }
          }, pathOr({}, ['chats', 'chats'], newState))
        },
        version: STORE_SCHEMA_VERSION,
        networkName: displayNetwork,
        myProfile: newState.myProfile
      }
    }
    rehydrateContacts(newState.contacts)
    await rehydateChat(newState.chats, newState.contacts)
    await rehydrateWallet(newState.wallet)
    return newState
  },
  reducer (state) {
    return {
      wallet: {
        xPrivKey: path(['wallet', 'xPrivKey'], state),
        seedPhrase: path(['wallet', 'seedPhrase'], state)
      },
      relayClient: {
        token: path(['relayClient', 'token'], state)
      },
      chats: {
        activeChatAddr: pathOr(null, ['chats', 'activeChatAddr'], state),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        chats: mapObjIndexed((addressData, address) => {
          return ({
            ...addressData,
            // Overwrite messages because storing them would be prohibitive.
            messages: {}
          })
        }, pathOr({}, ['chats', 'chats'], state))
      },
      contacts: state.contacts,
      myProfile: state.myProfile,
      networkName: displayNetwork,
      version: STORE_SCHEMA_VERSION
    }
  },
  saveState (key, state, storage) {
    storage.setItem(key, JSON.stringify(state))
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filter: (mutation) => {
    if (lastSave + 1000 >= Date.now()) {
      return false
    }
    lastSave = Date.now()

    return true
  },
  asyncStorage: true
})

export default new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin]
  // strict: true
})
