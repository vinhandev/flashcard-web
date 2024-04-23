import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../service/firebase';

export type Card = {
  id: string;
  title: string;
  description: string;
  image: string;
  repeatLevel: number;
  type: 'word' | 'image';
};

export function useFirebase() {
  const col = collection(db, 'cards');

  async function add(card: Card) {
    const docRef = await addDoc(col, card);
    console.log('Document written with ID: ', docRef.id);
  }

  async function getAll() {
    const querySnapshot = await getDocs(col);
    const cards: Card[] = [];
    querySnapshot.forEach((doc) => {
      cards.push({
        ...doc.data(),
        id: doc.id,
      } as Card);
    });
    return cards;
  }

  async function update(id: string, card: Card) {
    const docRef = doc(db, 'cards', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, card);
    } else {
      console.log('No such document!');
    }
  }

  async function remove(id: string) {
    const docRef = doc(db, 'cards', id);
    await deleteDoc(docRef);
  }

  return {
    add,
    getAll,
    update,
    remove,
  };
}
