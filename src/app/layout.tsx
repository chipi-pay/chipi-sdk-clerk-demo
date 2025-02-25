import {
  ClerkProvider,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chipi-SDK + Clerk example",
  description:
    "Create invisible wallets and sign transactions with Chipi-SDK and Clerk"};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider signInFallbackRedirectUrl="/dashboard" signUpFallbackRedirectUrl="/dashboard" afterSignOutUrl="/" >
        <Providers>
        <body className={`${inter.className} min-h-screen flex flex-col`}>

          <header className="flex items-center h-20 gap-4 px-4 border-b border-black border-solid sm:px-8 border-opacity-20">
            <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
              <Image
                src="/chipi-chunky.png"
                alt="Chipi Logo"
                width={102}
                height={10}
                priority
              />
            </Link>
            <div className="grow" />

            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>



          <main className="grow">{children}</main>


          <footer className="flex items-center h-20 gap-1 px-8 font-medium border-t md:px-20">
            <a
              className="flex gap-2 px-3 py-2 text-m font-semibold text-gray-600 transition duration-100 rounded-md hover:text-gray-800"
              href="https://github.com/chipi-pay/chipi-sdk-clerk-example"
            >
              <span className="hidden sm:inline">View the Github Repo for this Chipi-SDK + Clerk example</span>
            </a>

            <nav className="flex justify-end grow sm:gap-2">
              <a
                className="flex gap-2 px-3 py-2 text-sm font-semibold text-gray-600 transition duration-100 rounded-md hover:text-gray-800"
                href="https://chipisdk.mintlify.app/"
              >
                <div className="m-auto">
                  <Docs />
                </div>
                <span className="hidden sm:inline"> Visit Chipi-SDK Docs</span>
              </a>
              <a
                className="flex gap-2 px-3 py-2 text-sm font-semibold text-gray-600 transition duration-100 rounded-md hover:text-gray-800"
                href="https://github.com/chipi-pay"
              >
                <div className="m-auto">
                  <Github />
                </div>
              </a>
              <a
                className="flex flex-col justify-center p-2 hover:underline"
                href="https://twitter.com/hichipipay"
              >
                <Twitter />
              </a>

            </nav>
          </footer>
        </body>
        </Providers>
      </ClerkProvider>

    </html>
  );
}


function Docs() {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99999 16.5L9.91661 16.3749C9.33774 15.5066 9.04831 15.0725 8.66591 14.7582C8.32737 14.4799 7.93729 14.2712 7.51799 14.1438C7.04437 14 6.52258 14 5.47901 14H4.33332C3.3999 14 2.93319 14 2.57667 13.8183C2.26307 13.6586 2.0081 13.4036 1.84831 13.09C1.66666 12.7335 1.66666 12.2668 1.66666 11.3333V4.16667C1.66666 3.23325 1.66666 2.76654 1.84831 2.41002C2.0081 2.09641 2.26307 1.84144 2.57667 1.68166C2.93319 1.5 3.3999 1.5 4.33332 1.5H4.66666C6.5335 1.5 7.46692 1.5 8.17996 1.86331C8.80717 2.18289 9.3171 2.69282 9.63668 3.32003C9.99999 4.03307 9.99999 4.96649 9.99999 6.83333M9.99999 16.5V6.83333M9.99999 16.5L10.0834 16.3749C10.6622 15.5066 10.9517 15.0725 11.3341 14.7582C11.6726 14.4799 12.0627 14.2712 12.482 14.1438C12.9556 14 13.4774 14 14.521 14H15.6667C16.6001 14 17.0668 14 17.4233 13.8183C17.7369 13.6586 17.9919 13.4036 18.1517 13.09C18.3333 12.7335 18.3333 12.2668 18.3333 11.3333V4.16667C18.3333 3.23325 18.3333 2.76654 18.1517 2.41002C17.9919 2.09641 17.7369 1.84144 17.4233 1.68166C17.0668 1.5 16.6001 1.5 15.6667 1.5H15.3333C13.4665 1.5 12.5331 1.5 11.82 1.86331C11.1928 2.18289 10.6829 2.69282 10.3633 3.32003C9.99999 4.03307 9.99999 4.96649 9.99999 6.83333"
        stroke="#344054"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Github() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 0.25C4.16562 0.25 0.25 4.16562 0.25 9C0.25 12.8719 2.75469 16.1422 6.23281 17.3016C6.67031 17.3781 6.83437 17.1156 6.83437 16.8859C6.83437 16.6781 6.82344 15.9891 6.82344 15.2563C4.625 15.6609 4.05625 14.7203 3.88125 14.2281C3.78281 13.9766 3.35625 13.2 2.98438 12.9922C2.67812 12.8281 2.24063 12.4234 2.97344 12.4125C3.6625 12.4016 4.15469 13.0469 4.31875 13.3094C5.10625 14.6328 6.36406 14.2609 6.86719 14.0312C6.94375 13.4625 7.17344 13.0797 7.425 12.8609C5.47813 12.6422 3.44375 11.8875 3.44375 8.54062C3.44375 7.58906 3.78281 6.80156 4.34062 6.18906C4.25313 5.97031 3.94687 5.07344 4.42812 3.87031C4.42812 3.87031 5.16094 3.64063 6.83437 4.76719C7.53438 4.57031 8.27813 4.47187 9.02188 4.47187C9.76563 4.47187 10.5094 4.57031 11.2094 4.76719C12.8828 3.62969 13.6156 3.87031 13.6156 3.87031C14.0969 5.07344 13.7906 5.97031 13.7031 6.18906C14.2609 6.80156 14.6 7.57812 14.6 8.54062C14.6 11.8984 12.5547 12.6422 10.6078 12.8609C10.925 13.1344 11.1984 13.6594 11.1984 14.4797C11.1984 15.65 11.1875 16.5906 11.1875 16.8859C11.1875 17.1156 11.3516 17.3891 11.7891 17.3016C13.5261 16.7152 15.0355 15.5988 16.1048 14.1096C17.1741 12.6204 17.7495 10.8333 17.75 9C17.75 4.16562 13.8344 0.25 9 0.25Z"
        fill="black"
      />
    </svg>
  );
}

function Twitter() {
  return (
    <svg
      width="19"
      height="15"
      viewBox="0 0 19 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.36796 14.5C4.34609 14.5 2.46136 13.9119 0.875 12.8973C2.22187 12.9844 4.59879 12.7757 6.07724 11.3655C3.85317 11.2634 2.85016 9.55768 2.71934 8.82873C2.90831 8.90162 3.80956 8.9891 4.31834 8.78499C1.75994 8.14351 1.36745 5.89833 1.45467 5.21311C1.93437 5.54843 2.74841 5.66506 3.06821 5.6359C0.684246 3.93015 1.54189 1.36422 1.96345 0.810218C3.67426 3.18042 6.23825 4.51161 9.41024 4.58565C9.35043 4.32335 9.31885 4.05026 9.31885 3.76978C9.31885 1.75682 10.9459 0.125 12.9529 0.125C14.0016 0.125 14.9465 0.570471 15.6098 1.28302C16.3106 1.11882 17.3652 0.734417 17.8808 0.402003C17.6209 1.33507 16.8118 2.11343 16.3224 2.40192C16.3185 2.39207 16.3265 2.41174 16.3224 2.40192C16.7523 2.3369 17.9155 2.11336 18.375 1.8016C18.1478 2.32578 17.29 3.19733 16.5861 3.68526C16.717 9.46129 12.2978 14.5 6.36796 14.5Z"
        fill="#47ACDF"
      />
    </svg>
  );
}



