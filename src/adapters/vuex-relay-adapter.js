import { RelayClient } from '../relay/client'
import { defaultRelayUrl } from '../utils/constants'
import { store as levelDbStore } from '../adapters/level-message-store'

export async function getRelayClient ({ wallet, electrumClient, store, relayUrl = defaultRelayUrl }) {
  const observables = { connected: false }
  const client = new RelayClient(relayUrl, wallet, electrumClient, {
    getPubKey: (address) => {
      const destPubKey = store.getters['contacts/getPubKey'](address)
      return destPubKey
    },
    messageStore: await levelDbStore
  })
  client.events.on('disconnected', () => {
    observables.connected = false
  })
  client.events.on('error', (err) => {
    console.log(err)
  })
  client.events.on('opened', () => { observables.connected = true })
  client.events.on('messageSending', ({ address, senderAddress, index, items, outpoints, transactions, previousHash }) => {
    store.commit('chats/sendMessageLocal', { address, senderAddress, index, items, outpoints, transactions, previousHash })
  })
  client.events.on('messageSendError', ({ address, senderAddress, index, items, outpoints, transactions, previousHash }) => {
    store.commit('chats/sendMessageLocal', { address, senderAddress, index, items, outpoints, transactions, previousHash, status: 'error' })
  })
  client.events.on('messageSent', ({ address, senderAddress, index, items, outpoints, transactions, previousHash }) => {
    store.commit('chats/sendMessageLocal', { address, senderAddress, index, items, outpoints, transactions, previousHash, status: 'confirmed' })
  })
  client.events.on('receivedMessage', (args) => {
    store.dispatch('chats/receiveMessage', args)
  })
  client.events.on('hasNewMessages', (hasNewMessages) => {
    console.log('before dispatch hasNewMessages: ' + hasNewMessages)
    if (hasNewMessages === true) {
      console.log('dispatch hasNewMessages')
      store.dispatch('chats/hasNewMessages')
    }
  })

  return { client, observables }
}
