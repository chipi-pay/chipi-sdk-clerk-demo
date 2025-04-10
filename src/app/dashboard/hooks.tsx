'use client'

import {
  useApprove,
  useStake,
  useTransfer,
} from "@chipi-pay/chipi-sdk";
import { useState, useEffect } from "react";
import { getWalletData } from "./_actions";

// Smart Contract Addresses
const VESU_CONTRACT = "0x037ae3f583c8d644b7556c93a04b83b52fa96159b2b0cbd83c14d3122aef80a2";  // VESU Token Contract
const STRK_CONTRACT = "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";  // STRK Token Contract
const USDC_CONTRACT = "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8";  // USDC Token Contract

export function Transfer() {
  const { transferAsync, transferData } = useTransfer();
  const [walletData, setWalletData] = useState<{ publicKey: string; privateKey: string } | null>(null);
  const [formData, setFormData] = useState({
    pin: '',
    recipient: '',
    amount: '',
  });

  useEffect(() => {
    const fetchWalletData = async () => {
      const data = await getWalletData();
      if (data.publicKey && data.privateKey) {
        setWalletData({
          publicKey: data.publicKey,
          privateKey: data.privateKey
        });
      }
    };
    fetchWalletData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletData) {
      alert("Wallet data not loaded");
      return;
    }

    try {
      const response = await transferAsync({
        encryptKey: String(formData.pin),
        wallet: {
          publicKey: walletData.publicKey,
          encryptedPrivateKey: walletData.privateKey
        },
        contractAddress: USDC_CONTRACT,
        recipient: formData.recipient,
        amount: formData.amount,
        decimals: 6,
      });
      console.log("Transfer response:", response);
      alert("Transfer successful");
    } catch (error: unknown) {
      console.error("Transfer error:", error);
      alert("Transfer failed: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
    <div className="bg-white overflow-hidden rounded-lg shadow">
      <div className="flex justify-between items-center p-8">
        <h3 className="text-xl font-semibold text-gray-900">Transfer USDC</h3>
      </div>
      <div className="pb-6 px-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">PIN</label>
            <input
              type="password"
              value={formData.pin}
              onChange={(e) => setFormData({...formData, pin: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipient Address</label>
            <input
              type="text"
              value={formData.recipient}
              onChange={(e) => setFormData({...formData, recipient: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="text"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Transfer
          </button>
        </form>
        {transferData && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">Transaction Details</h4>
              <a 
                href={`https://starkscan.co/tx/${transferData}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span className="text-sm">View on Starkscan</span>
                <svg 
                  className="h-4 w-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>
            <pre className="whitespace-pre-wrap overflow-auto bg-gray-100 p-3 rounded-md text-xs">
              {transferData}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export function Stake() {
  const { stakeAsync, stakeData } = useStake();
  const [walletData, setWalletData] = useState<{ publicKey: string; privateKey: string } | null>(null);
  const [formData, setFormData] = useState({
    pin: '',
    amount: '',
    contractAddress: VESU_CONTRACT
  });

  useEffect(() => {
    const fetchWalletData = async () => {
      const data = await getWalletData();
      if (data.publicKey && data.privateKey) {
        setWalletData({
          publicKey: data.publicKey,
          privateKey: data.privateKey
        });
      }
    };
    fetchWalletData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletData) {
      alert("Wallet data not loaded");
      return;
    }

    try {
      const response = await stakeAsync({
        encryptKey: String(formData.pin),
        wallet: {
          publicKey: walletData.publicKey,
          encryptedPrivateKey: walletData.privateKey
        },
        contractAddress: formData.contractAddress,
        recipient: walletData.publicKey,
        amount: formData.amount,
        decimals: 18,
      });
      console.log("Stake response:", response);
      alert("Stake successful");
    } catch (error: unknown) {
      console.error("Stake error:", error);
      alert("Stake failed: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="flex p-8">
        <h3 className="text-xl leading-6 font-semibold text-gray-900 my-auto">Stake Tokens</h3>
      </div>
      <div className="pb-6 px-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">PIN</label>
            <input
              type="password"
              value={formData.pin}
              onChange={(e) => setFormData({...formData, pin: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">VESU Contract Address</label>
            <input
              type="text"
              value={VESU_CONTRACT}
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="text"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Stake
          </button>
        </form>
        {stakeData && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">Transaction Details</h4>
              <a 
                href={`https://starkscan.co/tx/${stakeData}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span className="text-sm">View on Starkscan</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <pre className="whitespace-pre-wrap overflow-auto bg-gray-100 p-3 rounded-md text-xs">
              {stakeData}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export function Approve() {
  const { approveAsync, approveData } = useApprove();
  const [walletData, setWalletData] = useState<{ publicKey: string; privateKey: string } | null>(null);
  const [formData, setFormData] = useState({
    pin: '',
    spender: VESU_CONTRACT,
    amount: '',
    contractAddress: STRK_CONTRACT
  });

  useEffect(() => {
    const fetchWalletData = async () => {
      const data = await getWalletData();
      if (data.publicKey && data.privateKey) {
        setWalletData({
          publicKey: data.publicKey,
          privateKey: data.privateKey
        });
      }
    };
    fetchWalletData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletData) {
      alert("Wallet data not loaded");
      return;
    }

    try {
      const response = await approveAsync({
        encryptKey: String(formData.pin),
        wallet: {
          publicKey: walletData.publicKey,
          encryptedPrivateKey: walletData.privateKey
        },
        contractAddress: formData.contractAddress,
        spender: formData.spender,
        amount: formData.amount,
        decimals: 18,
      });
      console.log("Approve response:", response);
      alert("Approval successful");
    } catch (error: unknown) {
      console.error("Approve error:", error);
      alert("Approval failed: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="flex p-8">
        <h3 className="text-xl leading-6 font-semibold text-gray-900 my-auto">Approve Tokens</h3>
      </div>
      <div className="pb-6 px-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">PIN</label>
            <input
              type="password"
              value={formData.pin}
              onChange={(e) => setFormData({...formData, pin: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Spender VESU address</label>
            <input
              type="text"
              value={VESU_CONTRACT}
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="text"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Approve
          </button>
        </form>
        {approveData && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">Transaction Details</h4>
              <a 
                href={`https://starkscan.co/tx/${approveData}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span className="text-sm">View on Starkscan</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <pre className="whitespace-pre-wrap overflow-auto bg-gray-100 p-3 rounded-md text-xs">
              {approveData}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}