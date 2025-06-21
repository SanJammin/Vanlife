import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFireStore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDgPPVREapxd_CQRuA4YtGbGgJKIlGDAXw",
  authDomain: "vanlife-3233f.firebaseapp.com",
  projectId: "vanlife-3233f",
  storageBucket: "vanlife-3233f.firebasestorage.app",
  messagingSenderId: "436787931323",
  appId: "1:436787931323:web:2e746a10537e40d013e19e",
  measurementId: "G-80C9EFE4XD"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFireStore(app);

function sleep(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans";
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data.vans;
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data.vans;
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    );
    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data;
}