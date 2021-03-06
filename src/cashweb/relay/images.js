export function arrayBufferToBase64 (buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export function entryToImage (entry) {
  const rawAvatar = entry.getBody()

  const value = entry.getHeadersList()[0].getValue()
  const avatarDataURL = 'data:' + value + ';base64,' + arrayBufferToBase64(rawAvatar)
  return avatarDataURL
}
