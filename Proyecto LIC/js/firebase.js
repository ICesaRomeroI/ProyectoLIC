import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  import {getFirestore,collection, addDoc, getDocs,getCountFromServer, deleteDoc, 
    doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMmdGs8TpdNGyEJ3A1L2uuTAQe4hO9WFQ",
    authDomain: "prueba-ee087.firebaseapp.com",
    databaseURL: "https://prueba-ee087-default-rtdb.firebaseio.com",
    projectId: "prueba-ee087",
    storageBucket: "prueba-ee087.appspot.com",
    messagingSenderId: "403177697333",
    appId: "1:403177697333:web:8d93223dd435298ffec17c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveVenta=(Compras) =>{
    addDoc(collection(db,'Compra'), Compras)
}

export const saveEvent=(Evento)=>{
  addDoc(collection(db,'eventos'),Evento);
}


export const getEventos=()=>getDocs(collection(db,'eventos'))

export const getEvento=(id)=>getDoc(doc(db,'eventos',id))

export const getEventListSize=async()=>{
  const Eventos = collection(db, "eventos");
  const snapshot = await getCountFromServer(Eventos);
  return snapshot.data().count;
}
