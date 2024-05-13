import { firestore } from "@/db/firebase";
import {collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, where, query} from "firebase/firestore";
import {getPaket} from "@/db/firestore";
import {paketProps} from "@/components/CardPaket";

export const ambilSemuaPaket = async (flag: "<" | ">") => {
    const specificDate = new Date("2024-09-24");

    const q = query(collection(firestore, "paket"));

    const querySnapshot = await getDocs(q);
    const paketArray: any[] = [];

    querySnapshot.forEach((doc) => {
        const jadwal = new Date(doc.data().jadwal);
        switch (flag) {
            case "<":
                if (jadwal < specificDate) {
                    paketArray.push(doc.data());
                }
                break
            case ">":
                if (jadwal > specificDate) {
                    paketArray.push(doc.data());
                }
                break
        }
    });

    return paketArray;
};

export const ambilPaket = async(paketID: string) => {
    const paketRef = doc(firestore, "paket", paketID);
    const paketSnapshot = await getDoc(paketRef);

    return paketSnapshot.data() as paketProps
}

export const editPaket = async (paketID: string, isiPaket:paketProps) => {
    const userRef = doc(firestore, "paket", paketID);

    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            await updateDoc(userRef, isiPaket);
        } else {
            console.error("Paket dengan ID yang diberikan tidak ditemukan");
        }
    } catch (error) {
        console.error("Error updating user purchase history:", error);
    }
};

export const deletePaket = async (paketID: string) => {
    const userRef = doc(firestore, "paket", paketID);

    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            await deleteDoc(userRef);
        } else {
            console.error("Paket dengan ID yang diberikan tidak ditemukan");
        }
    } catch (error) {
        console.error("Error deleting paket:", error);
    }
};

export const ambilSemuaPemesanan = async () => {
    const q = query(collection(firestore, 'pembelian'));

    const querySnapshot = await getDocs(q);
    const pemesananArray: any[] = [];

    querySnapshot.forEach((doc) => {
        pemesananArray.push(doc.data());
    });

    return pemesananArray;
};