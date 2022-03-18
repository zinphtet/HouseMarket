import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
	apiKey: 'AIzaSyBdpnTTugeYGGiFoDdhpXNPjoiVEYLiVEo',
	authDomain: 'house-market-805f0.firebaseapp.com',
	projectId: 'house-market-805f0',
	storageBucket: 'house-market-805f0.appspot.com',
	messagingSenderId: '692252892834',
	appId: '1:692252892834:web:f635356e5ddf72064281fb',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

//firestor
export const db = getFirestore();