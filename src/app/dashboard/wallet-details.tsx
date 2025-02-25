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
              {sessionClaims?.metadata.onboardingComplete ? "Yes" : "No"}
            </dd>
          </div>
          <div className="px-8 py-2">
            <dt className="text-sm font-semibold">Public Key</dt>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
              {sessionClaims?.metadata.applicationName}
            </dd>
          </div>
          <div className="px-8 py-2">
            <dt className="text-sm font-semibold">Encrypted Private Key</dt>
            <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2 flex gap-2">
              {sessionClaims?.metadata.applicationType}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}