import { collection, addDoc, getDocs, onSnapshot, setDoc, updateDoc, doc, deleteDoc, query, where, serverTimestamp  } from "firebase/firestore"; 
import db from './firebase'

//no need to set Id. Firebase automatically sets id in addDoc()
//Adding new items to firebase database
export const handleNew= async ()=>{
    const first = prompt('Enter first name')
    const middle = prompt('Enter middle name')
    const last = prompt('Enter last name')
  const born = prompt('Enter born year')
  const collectionRef = collection(db, 'users');
  const payload = {born, first, middle, last, timestamp: serverTimestamp()}
    const docRef = await addDoc(collectionRef, payload);
    console.log(docRef.id)
    console.log(docRef);
    console.log(payload);
  }

  //editing the data using setDoc by referencing to the unique id of each element. It overwrites the whole document
// export const handleEdit = async (id)=>{
//   const first = prompt('Enter first name')
//   const middle = prompt('Enter middle name')
//   const last = prompt('Enter last name')
//   const born = prompt('Enter born year')
//   const docRef = doc(db, 'users', id );
// const payload = {born, first, middle, last}
// await setDoc(docRef, payload);
// }

 // editing data using updateDoc to modify the data only mentioned in the payload and it doesnot overwrite the other values such as timeStamp
 export const handleEdit = async (id)=>{
  const first = prompt('Enter first name')
  const middle = prompt('Enter middle name')
  const last = prompt('Enter last name')
  const born = prompt('Enter born year')
  const docRef = doc(db, 'users', id );
const payload = {born, first, middle, last, timestamp: serverTimestamp()}
await updateDoc(docRef, payload);
}

//deleting 
export const handleDelete = async (id)=>{
  const docRef = doc(db, 'users', id );
  console.log(docRef);
await deleteDoc(docRef)
}

//deleting the elements that match the query
export const handleQueryDelete  = async()=>{
  const first = prompt('Enter first name')
  const middle = prompt('Enter middle name')
  const last = prompt('Enter last name')
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, where('first','==',first),where('middle','==',middle),where('last','==',last));
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map(doc=>({...doc.data(), id:doc.id}));
results.forEach(async result =>{
  const docRef = doc(db, 'users', result.id );
  await deleteDoc(docRef)

})
} 