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
  displayName?: string | null;
}
function useUserSession(): User | null {
  const [user, setUser] = useState<User | null>(null);
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
      setUser(authUser ?? null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user !== null) {
      onAuthStateChanged((authUser) => {
        if (user?.email !== authUser?.email) {
          router.refresh();
        }
      });
    }
  }, [user, router]);

  return user;
}

export default function Home() {
  const user = useUserSession();

  console.log({ user });
  // console.log(user.toJSON());
  console.log(user?.displayName);

  if (user === undefined) {
    return null;
  }

  return (
    <div className="flex flex-col gap-12 items-center justify-start h-screen">
      <h2>Networking Bingo</h2>
      {user ? (
        <div className="flex flex-col items-center justify-center gap-12">
          <p>Welcome {user.displayName}</p>
          <div className="flex flex-row gap-4">
            <Link href="/admin">
              <Button buttonText={"Admin"} />
            </Link>
            <Link href="/player/code">
              <Button buttonText={"Player"} />
            </Link>
          </div>
          <Button buttonText={"Sign Out"} onClick={() => signOut()} />
        </div>
      ) : (
        <Button buttonText={"Sign In"} onClick={() => signInWithGoogle()} />
      )}
    </div>
  );
}
