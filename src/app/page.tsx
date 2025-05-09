import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"

export default function Home() {
  return (
    <main className="">
      <article className="grid">
        <div className="px-8 py-20 md:px-20 lg:py-48 text-center">
          <h1 className="text-5xl font-semibold text-transparent md:text-6xl gradient md:leading-[1.5em]">
            User Onboarding starts here.
          </h1>
          <p className="mt-2 text-lg">
            Create invisible wallets and sponsor transactions with Chipi-SDK and Clerk
          </p>

          <SignedIn>
            <div className="mt-8 inline-block">
              <a href="/dashboard" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                Go to Dashboard
              </a>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="mt-8 inline-block">
              <SignInButton>
                <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">Sign in</button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>
      </article>
    </main>
  );
}