"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { useCreateWallet } from "@chipi-pay/chipi-sdk";

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();
  const { createWalletAsync, isLoading, isError } = useCreateWallet();

  const handleSubmit = async (formData: FormData) => {
    try {
      const pin = formData.get('pin') as string;
      
      if (!pin || pin.trim() === '') {
        throw new Error('PIN is required');
      }

      if (!/^\d+$/.test(pin)) {
        throw new Error('PIN must contain only numbers');
      }

      console.log('Creating wallet...');
      const response = await createWalletAsync(pin);
      console.log('Wallet creation response:', response);

      if (!response.success || !response.wallet) {
        throw new Error('Failed to create wallet');
      }

      console.log('Updating Clerk metadata...');
      const result = await completeOnboarding({
        publicKey: response.wallet.publicKey,
        encryptedPrivateKey: response.wallet.encryptedPrivateKey,
      });
      console.log('Clerk update result:', result);

      if (result.error) {
        throw new Error(result.error);
      }

      await user?.reload();
      router.push("/dashboard");
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      // You might want to show this error to the user
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  }

  if (isLoading) {
    return <div>Creating wallet...</div>;
  }

  if (isError) {
    return <div>Error creating wallet</div>;
  }

  return (
    <div className="px-8 py-12 sm:py-16 md:px-20">
      <div className="mx-auto bg-white overflow-hidden rounded-lg shadow-lg max-w-sm">
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-900">
            Let&apos;s get you onboarded!
          </h3>
        </div>
        <form action={handleSubmit}>
          <div className="space-y-4 px-8 pb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700"> Enter your PIN </label>
              <p className="text-xs text-gray-500">This PIN will be used to create your wallet and encrypt your private key.</p>
              <input
                type="number"
                name="pin"
                pattern="\d*"
                minLength={6}
                maxLength={6}
                required
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="px-8 py-4 bg-gray-50">
            <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
