"use client";

import Link from "next/link";
import {
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
} from "@/lib/firebase/auth";
import { Button } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { firebaseConfig } from "@/lib/firebase/config";

interface User {
  email?: string | null;
}

interface HomeProps {
  initialUser: User | null;
}

function useUserSession(initialUser: User | null): User | null | undefined {
  const [user, setUser] = useState<User | null | undefined>(initialUser);
  const router = useRouter();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const serializedFirebaseConfig = encodeURIComponent(
        JSON.stringify(firebaseConfig)
      );
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;

      navigator.serviceWorker
        .register(serviceWorkerUrl)
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser) => {
      if (user === undefined) return;
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}

export default function Home({ initialUser }: HomeProps) {
  const user = useUserSession(initialUser);

  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signInWithGoogle();
  };

  return (
    <div className="flex flex-col gap-12 items-center justify-center h-screen">
      <h2>Networking Bingo</h2>
      {user ? (
        <div className="flex flex-row gap-4">
          <Link href="/admin">
            <Button buttonText={"Admin"} />
          </Link>
          <Link href="/player/code">
            <Button buttonText={"Player"} />
          </Link>
          <Button buttonText={"Sign Out"} onClick={handleSignOut} />
        </div>
      ) : (
        <Button buttonText={"Sign In"} onClick={handleSignIn} />
      )}
    </div>
  );
}
