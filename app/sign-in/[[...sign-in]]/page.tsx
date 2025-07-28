import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto h-screen">
      
      <SignIn />
    </div>
  );
}

