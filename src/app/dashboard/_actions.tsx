'use server'

import { auth } from "@clerk/nextjs/server"

export async function getWalletData() {
  const { sessionClaims } = await auth()
  return {
    publicKey: sessionClaims?.metadata.publicKey,
    privateKey: sessionClaims?.metadata.encryptedPrivateKey
  }
}