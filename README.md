# 🌟 STRK Staking dApp with Chipi SDK

<p align="center">
  <img src="./public/chipi-chunky.png" alt="Chipi Pay Logo" width="300" height="auto"/>
</p>

A seamless web3 application for staking STRK tokens using invisible wallets powered by Chipi SDK and Clerk authentication.

## 🚀 Features

- **🔐 Invisible Wallets**: Create and manage StarkNet wallets without exposing private keys
- **💳 Gas-free Transactions**: All transactions are sponsored through Chipi's paymaster
- **🔄 STRK Token Operations**:
  - Transfer STRK tokens
  - Approve STRK for VESU contract
  - Stake STRK into VESU
- **👤 User Authentication**: Secure login and session management with Clerk
- **📱 Responsive Design**: Beautiful UI that works on all devices

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Authentication**: Clerk
- **Blockchain**: StarkNet via Chipi SDK
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📋 Detailed Setup Guide

### 1. Project Setup

```bash
git clone https://github.com/yourusername/starknet-staking-dapp.git
cd starknet-staking-dapp
npm install
```

### 2. Environment Configuration

Create a `.env` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Chipi SDK
NEXT_PUBLIC_AVNU_API_KEY=your_avnu_api_key
```

### 3. Clerk Configuration and Metadata Setup

#### Types Configuration

Create a new file `src/types/clerk.d.ts` to define the metadata types:

```typescript:src/types/clerk.d.ts
declare namespace Clerk {
  interface UserPublicMetadata {
    locale?: string;
    wallet?: {
      account: string;
      publicKey: string;
      encryptedPrivateKey: string;
    };
  }

  interface UserPrivateMetadata {
    // Add any private metadata fields here
  }

  interface UserUnsafeMetadata {
    // Add any unsafe metadata fields here
  }
}
```

#### Understanding Clerk Metadata Types

Clerk provides three types of metadata, each with specific use cases:

1. **Public Metadata** (`UserPublicMetadata`)
   - Accessible from both frontend and backend
   - Can only be modified from the backend
   - Used for:
     ```typescript
     {
       locale: string;  // User's language preference
       wallet: {
         account: string;    // Wallet account details
         publicKey: string;  // StarkNet public key
         encryptedPrivateKey: string;  // Encrypted private key
       }
     }
     ```
   - Location: `src/app/onboarding/_actions.ts` for updates
   - Access: Throughout the application using `user.publicMetadata`

2. **Private Metadata** (`UserPrivateMetadata`)
   - Only accessible from backend routes
   - Used for sensitive data
   - Example usage in server actions:
     ```typescript:src/app/api/user/_actions.ts
     export async function updateUserPrivateData(userId: string) {
       await clerkClient.users.updateUserMetadata(userId, {
         privateMetadata: {
           // Add private data here
         }
       });
     }
     ```

3. **Unsafe Metadata** (`UserUnsafeMetadata`)
   - Accessible and modifiable from both frontend and backend
   - Used for non-sensitive temporary data
   - Example usage in components:
     ```typescript:src/app/components/UserPreferences.tsx
     const { user } = useUser();
     
     const updatePreferences = async () => {
       await user?.update({
         unsafeMetadata: {
           // Add temporary data here
         }
       });
     };
     ```

#### Metadata Usage in Different Parts of the Application

1. **Server Components and Actions**
```typescript:src/app/onboarding/_actions.ts
import { clerkClient } from "@clerk/nextjs";

export async function createWallet(userId: string, walletData: Clerk.UserPublicMetadata['wallet']) {
  return await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      wallet: walletData
    }
  });
}
```

2. **Client Components**
```typescript:src/app/components/WalletInfo.tsx
'use client';

import { useUser } from "@clerk/nextjs";

export function WalletInfo() {
  const { user } = useUser();
  const wallet = user?.publicMetadata?.wallet;
  
  return (
    <div>
      <p>Public Key: {wallet?.publicKey}</p>
    </div>
  );
}
```

3. **Middleware Usage**
```typescript:src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(["/", "/onboarding"])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // Redirect to sign-in if accessing private route without auth
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Redirect to onboarding if wallet not created
  if (userId && !sessionClaims?.metadata?.wallet && 
      req.nextUrl.pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return NextResponse.next();
});

// Configure middleware matcher
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|images|favicon).*)',
    '/(api|trpc)(.*)',
  ],
};
```

The middleware handles:
- Route protection
- Authentication checks
- Onboarding flow redirection
- Public route access

### 4. Middleware Configuration

The application uses Clerk middleware to protect routes and handle authentication flow. Create or update `src/middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher(["/", "/onboarding"])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // Redirect to sign-in if accessing private route without auth
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Redirect to onboarding if wallet not created
  if (userId && !sessionClaims?.metadata?.wallet && 
      req.nextUrl.pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return NextResponse.next();
});

// Configure middleware matcher
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|images|favicon).*)',
    '/(api|trpc)(.*)',
  ],
};
```

The middleware handles:
- Route protection
- Authentication checks
- Onboarding flow redirection
- Public route access

### 5. Project Structure

- `src/middleware.ts`: Route protection and authentication flow
- `src/app/providers.tsx`: ChipiSDK configuration
- `src/app/onboarding/`: Wallet creation flow
- `src/app/dashboard/hooks.tsx`: Token operations

### 6. Key Components

#### ChipiProvider (`providers.tsx`)
The ChipiProvider configures the SDK with your API key and network settings:
- Manages StarkNet connection
- Handles transaction sponsoring
- Configures network settings

#### Onboarding Flow
The onboarding process includes:
1. User authentication with Clerk
2. PIN selection for wallet encryption
3. Invisible wallet creation
4. Storage of encrypted credentials

#### Available Operations (`hooks.tsx`)
- **Transfer**: Send USDC tokens to other addresses
- **Stake**: Stake STRK tokens into VESU contract
- **Approve**: Approve STRK tokens for staking

## 🔧 Usage Guide

### Setting Up a New Wallet

1. Sign in using Clerk authentication
2. Complete the onboarding process:
   - Set a secure PIN (minimum 6 digits)
   - Your StarkNet wallet will be created automatically
   - Credentials are encrypted and stored securely

### Performing Operations

#### Transfer USDC
- Enter your PIN
- Specify recipient address
- Enter amount
- Confirm transaction

#### Stake STRK
- Enter your PIN
- Specify amount to stake
- Contract address is pre-configured
- Confirm transaction

#### Approve STRK
- Enter your PIN
- Amount to approve
- VESU contract is pre-configured
- Confirm transaction

## 🔐 Security Considerations

- PINs are never stored in plain text
- Private keys are encrypted before storage
- All transactions require PIN verification
- Clerk handles secure authentication
- Gas fees are sponsored through Chipi's paymaster
- Metadata is securely stored in Clerk's infrastructure
- Public metadata is read-only from frontend
- Private keys are always encrypted before storage
- Middleware ensures proper route protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details
