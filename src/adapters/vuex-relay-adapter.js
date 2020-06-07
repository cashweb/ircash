import { RelayClient } from '../relay/client'
import { defaultRelayUrl } from '../utils/constants'
import { store as levelDbStore } from '../adapters/level-message-store'
import { path } from 'ramda'

export function getRelayClient ({ wallet, electrumClient, store, relayUrl = defaultRelayUrl }) {
  const observables = { connected: false }
  const client = new RelayClient(relayUrl, wallet, electrumClient, {
    getPubKey: (address) => {
      const destPubKey = store.getters['contacts/getPubKey'](address)
      return destPubKey
    },
    messageStore: levelDbStore
  })
  client.events.on('disconnected', () => {
    observables.connected = false
  })
  client.events.on('error', (err) => {
    console.log(err)
  })
  client.events.on('opened', () => { observables.connected = true })
  client.events.on('messageSending', ({ address, senderAddress, index, items, outpoints, transactions }) => {
    store.commit('chats/sendMessageLocal', { address, senderAddress, index, items, outpoints, transactions })
  })
  client.events.on('messageSendError', ({ address, senderAddress, index, items, outpoints, transactions, retryData }) => {
    store.commit('chats/sendMessageLocal', { address, senderAddress, index, items, outpoints, transactions, retryData, status: 'error' })
  })
  client.events.on('messageSent', ({ address, senderAddress, index, items, outpoints, transactions }) => {
    store.commit('chats/sendMessageLocal', { address, senderAddress, index, items, outpoints, transactions, status: 'confirmed' })
  })
  client.events.on('receivedMessage', ({ outbound, copartyAddress, copartyPubKey, index, newMsg }) => {
    store.dispatch('chats/receiveMessage', { outbound, copartyAddress, copartyPubKey, index, newMsg })
    if (outbound) {
      return
    }
    const { serverTime, items } = newMsg
    const lastRead = store.getters['chats/lastRead'](copartyAddress)
    store.commit('chats/readAll', copartyAddress)
    if ((lastRead && serverTime <= lastRead) || serverTime <= Date.now() - 1000) {
      return
    }

    const contactsMap = store.getters['contacts/getContacts']
    const senderContact = contactsMap[copartyAddress]
    const newItems = [{
      type: 'text',
      text: `**${path(['profile', 'name'], senderContact)}** *([${copartyAddress}](${copartyAddress}))*`
    },
    ...items.filter(item => item.type !== 'stealth')
    ]

    const contacts = Object.entries(contactsMap)
    const stampAmount = Math.trunc(0.9 * (newMsg.stampValue / contacts.length))

    for (const [contact] of contacts) {
      if (contact === copartyAddress) {
        // Don't echo messages
        continue
      }
      console.log(stampAmount)
      client.sendMessageImpl({ address: contact, items: newItems, stampAmount })
      console.log(contacts[contact])
    }
  })

  return { client, observables }
}
