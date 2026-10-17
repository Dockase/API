import type { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "Get an API key",
  description:
    "Create a Dockase developer account — your first API key is issued instantly.",
};

export default function SignupPage() {
  return <SignupForm />;
}
