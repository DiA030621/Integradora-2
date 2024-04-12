import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, get, onValue } from "firebase/database";
import {
 getFirestore,
 collection,
 addDoc,
 serverTimestamp,
 query,
 where,
 getDocs,
 doc,
} from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyDGLbH0DjAdhJbjTy7DMBIXg1OFjeht2PE",
 authDomain: "p11-22.firebaseapp.com",
 databaseURL: "https://p11-22-default-rtdb.firebaseio.com/",
 projectId: "p11-22",
 storageBucket: "p11-22.appspot.com",
 messagingSenderId: "8022651113",
 appId: "1:8022651113:web:72523f27814aad8695c078",
 measurementId: "G-XP7HWCTM8X"
};

// Verifica si ya existe una instancia de la aplicación
if (!getApps().length) {
 initializeApp(firebaseConfig);
}

// Inicializa la base de datos en tiempo real
const dbRealTime = getDatabase();

// Inicializa Firestore
const dbFirestore = getFirestore();

// Declara una variable global para almacenar la referencia del listener
let realtimeListener;

let longitude; // Declara la variable longitude
let latitude; // Declara la variable latitude

async function readDataRealTime() {
 const dataRef = ref(dbRealTime, "location/");

 try {
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("Datos leídos correctamente:", data); // Log para verificar la lectura de datos
      ({ latitude, longitude } = data); // Asigna los valores de latitude y longitude obtenidos de los datos
      const { month, day, year } = data;
      await insertDataInFirestore({ latitude, longitude, month, day, year });
      //compararYAlertar(data);
    } else {
      console.log("No hay datos disponibles");
    }
 } catch (error) {
    console.error("Error al leer los datos de la base de tiempo real:", error);
 }
}

async function insertDataInFirestore(data) {
 try {
    const latitude = data.latitude !== undefined ? data.latitude.toFixed(6) : "Valor por defecto";
    const longitude = data.longitude !== undefined ? data.longitude.toFixed(6) : "Valor por defecto";
    const month = data.month !== undefined ? data.month : "Valor por defecto";
    const day = data.day !== undefined ? data.day : "Valor por defecto";
    const year = data.year !== undefined ? data.year : "Valor por defecto";

    // Formatear los datos en formato JSON
    const jsonData = {
      latitude,
      longitude,
      month,
      day,
      year
    };

    // Agrega el campo Tiempo con el timestamp del servidor
    await addDoc(collection(dbFirestore, "Lecturas"), {
      ...jsonData,
      Tiempo: serverTimestamp(),
    });
    console.log("Datos insertados en Firestore");
 } catch (error) {
    console.error("Error al insertar datos en Firestore:", error);
 }
}

setInterval(readDataRealTime, 30000);

export { readDataRealTime, insertDataInFirestore, longitude, latitude };
