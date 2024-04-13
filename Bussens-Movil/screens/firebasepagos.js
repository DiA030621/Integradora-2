import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
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

// Declara una variable global para almacenar el último ID insertado
let lastInsertedId = null;

// Función para leer datos en tiempo real
// Función para leer datos en tiempo real
async function readDataRealTimePago() {
  const pagosRef = ref(dbRealTime, "pagos/");
  onValue(pagosRef, async (snapshot) => {
    try {
      const data = snapshot.val();
      console.log("Datos de pagos leídos:", data);

      if (data) {
        const id = data.id;
        // Verificar si el ID ha cambiado desde el último insert
        if (id !== lastInsertedId) {
          await insertDataInFirestorePagos(data);
          lastInsertedId = id; // Actualizar el último ID insertado
        } else {
          console.log("El ID no ha cambiado, no se insertarán datos");
        }
      } else {
        console.log("No hay datos de pagos disponibles");
      }
    } catch (error) {
      console.error(
        "Error al leer los datos de pagos de la base de datos en tiempo real:",
        error
      );
    }
  });
}


// Función para insertar datos en Firestore
async function insertDataInFirestorePagos(data) {
  try {
    const id = data.id !== undefined ? data.id : "Valor por defecto";
    const monto = data.monto !== undefined ? data.monto : "Valor por defecto";
    const pago = data.pago !== undefined ? data.pago : "Valor por defecto";

    // Formatear los datos en formato JSON
    const jsonData = {
      id,
      monto,
      pago,
    };

    // Agrega el campo Tiempo con el timestamp del servidor
    await addDoc(collection(dbFirestore, "Pagos"), {
      ...jsonData,
      Tiempo: serverTimestamp(),
    });
    console.log("Datos de pagos insertados en Firestore");
  } catch (error) {
    console.error("Error al insertar datos de pagos en Firestore:", error);
  }
}

// Llamar a la función para leer datos en tiempo real
readDataRealTimePago();

export { readDataRealTimePago };