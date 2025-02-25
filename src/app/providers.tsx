"use client";
import { ChipiProvider } from "@chipi-pay/chipi-sdk";

//
// const AVNU_API_KEY = process.env.NEXT_PUBLIC_AVNU_API_KEY!;
const AVNU_API_KEY = '98564df8-122b-4708-a2d2-ea6c93b85d46';
if (!AVNU_API_KEY) {
  throw new Error("AVNU_API_KEY is not set");
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChipiProvider
      config={{
        apiKey: AVNU_API_KEY,
        rpcUrl:
          "https://starknet-mainnet.infura.io/v3/2OXKaYz1Tj90DatgCJYKGIVrHvW",
        network: "mainnet",
      }}
    >
      {children}
    </ChipiProvider>
  );
}