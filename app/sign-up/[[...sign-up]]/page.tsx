import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto h-screen">
      <SignUp />
    </div>
  );
}
