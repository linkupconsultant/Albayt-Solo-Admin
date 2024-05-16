import { firestore } from "@/db/firebase";
import {collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, where, query, startAt, endAt, limit, startAfter} from "firebase/firestore";
import {getPaket} from "@/db/firestore";
import {paketProps} from "@/components/CardPaket";
import {DataPembelian} from "@/app/Pembelian/page";

export const ambilSemuaPaket = async (flag: "<" | ">") => {
    const specificDate = new Date();

    let q;
    if (flag === "<") {
        q = query(
            collection(firestore, "paket"),
            where("jadwal", "<", specificDate)
        );
    } else if (flag === ">") {
        q = query(
            collection(firestore, "paket"),
            where("jadwal", ">", specificDate)
        );
    } else {
        throw new Error("Invalid flag value");
    }

    const querySnapshot = await getDocs(q);
    const paketArray: any[] = [];

    querySnapshot.forEach((doc) => {
        paketArray.push(doc.data());
    });

    return paketArray;
};

export const ambilPaket = async(paketID: string) => {
    const paketRef = doc(firestore, "paket", paketID);
    const paketSnapshot = await getDoc(paketRef);

    return paketSnapshot.data() as paketProps
}

export const addPaket = async (paketID: string, isiPaket:paketProps) => {
    const userRef = doc(firestore, "paket", paketID);
    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            alert("ID Paket sudah digunakan, silakan buat ID lain")
            return
        }
    } catch (error) {
        console.error("Error updating user purchase history:", error);
    }
};

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

export const ambilSemuaPemesanan = async (page: number) => {
    const q = query(collection(firestore, 'pembelian'));

    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[page * 6];
    const pemesananArray: any[] = [];

    const next =
        query(collection(firestore, "pembelian"),
        startAt(lastVisible),
        limit(6)
    );

    const a = await getDocs(next)
    a.forEach((doc) => {
        pemesananArray.push(doc.data());
    });

    return [pemesananArray as DataPembelian[], querySnapshot.docs.length as number];
};

