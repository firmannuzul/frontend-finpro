import { Account, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { CredentialInput } from "next-auth/providers/credentials";

interface CustomUser extends User {
  username?: string;
  role?: string;
  provider?: string;
}

interface CustomAdapterUser extends AdapterUser {
  username?: string;
  role?: string;
  provider?: string;
}

export type SignInParams = {
  user: CustomUser | CustomAdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  email?: {
    verificationRequest?: boolean;
  };
  credentials?: Record<string, CredentialInput>;
};