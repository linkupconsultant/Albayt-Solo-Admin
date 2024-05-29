import {firestore} from "@/db/firebase";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    startAt,
    Timestamp,
    updateDoc,
    where
} from "firebase/firestore";
import {paketProps} from "@/components/CardPaket";
import {DataPembelian} from "@/app/Pembelian/page";

const convertDateFromTimestamp = (input: Timestamp, format: number) => {
    const date = new Date(input.seconds * 1000)
    switch (format){
        case 1:
            return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
        case 2:
            return `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`
    }

}

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

export const addPaket = async (isiPaket: paketProps, jadwals: Timestamp[]) => {
    const titleAwal = isiPaket.title
    const paketidAwal = isiPaket.paketID

    try {
        for (let i = 0; i < jadwals.length; i++) {
            const paketID = jadwals.length > 1 ? `${paketidAwal}_${convertDateFromTimestamp(jadwals[i], 2)}` : paketidAwal;
            const title = jadwals.length > 1 ? `${titleAwal} (${convertDateFromTimestamp(jadwals[i], 1)})` : titleAwal
            const userRef = doc(firestore, "paket", paketID);
            const userDoc = await getDoc(userRef);
            isiPaket.jadwal = jadwals[i]
            isiPaket.paketID = paketID
            isiPaket.title = title
            if (userDoc.exists()) {
                alert("ID Paket sudah digunakan, silakan buat ID lain")
            } else {
                await setDoc(userRef, isiPaket);
            }
        }
    } catch (error) {
        console.error("Paket gagal ditambahkan", error);
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
        console.error("Paket gagal di-edit", error);
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
    const MAXPERPAGE = 6
    const q = query(collection(firestore, 'pembelian'),orderBy('tanggalPemesanan', "desc"));

    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[page * MAXPERPAGE];
    const pemesananArray: any[] = [];

    const next =
        query(collection(firestore, "pembelian"),orderBy('tanggalPemesanan', 'desc'),
        startAt(lastVisible),
        limit(MAXPERPAGE)
    );

    const a = await getDocs(next)
    a.forEach((doc) => {
        pemesananArray.push(doc.data());
    });

    return [pemesananArray as DataPembelian[], querySnapshot.docs.length as number];
};

export const ambilPemesanan= async(purchaseID: string) => {
    const purchaseRef = doc(firestore, "pembelian", purchaseID);
    const purchaseSnapshot = await getDoc(purchaseRef);
    const purchaseData = purchaseSnapshot.data() as DataPembelian

    const paketData = await ambilPaket(purchaseData.paketID)

    return [purchaseData, paketData]
}

export const editPemesanan = async (purchaseID: string, isiPemesanan:DataPembelian) => {
    const purchaseRef = doc(firestore, "pembelian", purchaseID);

    try {
        const purchaseDoc = await getDoc(purchaseRef);
        if (purchaseDoc.exists()) {
            await updateDoc(purchaseRef, isiPemesanan);
        } else {
            console.error("Paket dengan ID yang diberikan tidak ditemukan");
        }
    } catch (error) {
        console.error("Error updating user purchase history:", error);
    }
};