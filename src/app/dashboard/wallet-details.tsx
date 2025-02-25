import { auth } from "@clerk/nextjs/server";

export async function WalletDetails() {
  const { sessionClaims } = await auth()

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg" style={{ boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)` }}>
      <div className="flex p-8">
        <h3 className="text-xl leading-6 font-semibold text-gray-900 my-auto">Wallet Metadata</h3>
      </div>
      <div className="pb-6 max-h-96">
        <dl>
          <div className="px-8 py-2">
            <dt className="text-sm font-semibold">Wallet Deployed?</dt>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
              {sessionClaims?.metadata.walletCreated ? "Yes" : "No"}
            </dd>
          </div>
          <div className="px-8 py-2">
            <dt className="text-sm font-semibold">Public Key</dt>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
              {sessionClaims?.metadata.publicKey ? (
                <>
                  {`${sessionClaims.metadata.publicKey.slice(0, 4)}...${sessionClaims.metadata.publicKey.slice(-6)}`}
                  <a
                    href={`https://starkscan.co/contract/${sessionClaims.metadata.publicKey}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </>
              ) : null}
            </dd>
          </div>
          <div className="px-8 py-2">
            <dt className="text-sm font-semibold">Encrypted Private Key</dt>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
              {sessionClaims?.metadata.encryptedPrivateKey ? 
                `${sessionClaims.metadata.encryptedPrivateKey.slice(0, 4)}...${sessionClaims.metadata.encryptedPrivateKey.slice(-6)}`
              : null}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}