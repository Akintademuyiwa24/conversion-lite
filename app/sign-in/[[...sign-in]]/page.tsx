import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div data-testid="sign-in-page" className="flex flex-col justify-center items-center mx-auto h-screen">

      <SignIn />
    </div>
  );
}

