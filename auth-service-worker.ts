import { initializeApp } from "firebase/app";
import { getAuth, getIdToken } from "firebase/auth";
import { getInstallations, getToken } from "firebase/installations";

declare const self: ServiceWorkerGlobalScope;

let firebaseConfig: Record<string, unknown> | null = null;

self.addEventListener("install", () => {
  const serializedFirebaseConfig = new URL(self.location.href).searchParams.get(
    "firebaseConfig"
  );
  if (!serializedFirebaseConfig) {
    throw new Error(
      "Firebase Config object not found in service worker query string."
    );
  }
  firebaseConfig = JSON.parse(serializedFirebaseConfig);
  console.log("Service worker installed with Firebase config", firebaseConfig);
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const { origin } = new URL(event.request.url);
  if (origin !== self.location.origin) return;
  event.respondWith(fetchWithFirebaseHeaders(event.request));
});

async function fetchWithFirebaseHeaders(request: Request) {
  if (!firebaseConfig) throw new Error("Firebase config is not initialized.");

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const installations = getInstallations(app);
  const headers = new Headers(request.headers);

  const [authIdToken, installationToken] = await Promise.all([
    getAuthIdToken(auth),
    getToken(installations),
  ]);

  headers.append("Firebase-Instance-ID-Token", installationToken);
  if (authIdToken) headers.append("Authorization", `Bearer ${authIdToken}`);

  const newRequest = new Request(request, { headers });
  return await fetch(newRequest);
}

async function getAuthIdToken(auth: ReturnType<typeof getAuth>) {
  await new Promise((resolve) => auth.onAuthStateChanged(resolve));
  if (!auth.currentUser) return null;
  return await getIdToken(auth.currentUser);
}
