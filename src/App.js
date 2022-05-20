import './App.css';
import db from './firebase'
import {app} from './firebase'
import { collection, addDoc, getDocs, onSnapshot, setDoc, doc , query, orderBy } from "firebase/firestore"; 
import {signInWithPopup, GoogleAuthProvider, getAuth,FacebookAuthProvider  } from "firebase/auth";
import { useEffect, useState } from 'react';
import {handleNew, handleEdit, handleDelete, handleQueryDelete} from './util'
function App() {
  const auth = getAuth(app);
  const signInWithGoogle=()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result)=>{
      const user = result.user;
      console.log(user);
    })
  }
  const signInWithFacebook=()=>{
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
    .then((result)=>{
      const user = result.user;
      console.log(user);
    })
  }

  // fetching data from firebase database to display on the browser
const [data,setData] = useState([]);
useEffect(()=>{
const collectionRef = collection(db, 'users')
const q = query(collectionRef, orderBy('timestamp','asc'))// for timestamp ordering

//for normal random ordering without query
//  const unsub =  onSnapshot(collection(db,'users'),(snapshot)=>{
//    setData(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
//   })

// for the items to be ordered based on the timestamp (ascending or descending)
const unsub =  onSnapshot(q,(snapshot)=>{
  setData(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})));
 })
  return ()=>unsub()
},[])


  return (
   <>
<button onClick={()=>signInWithGoogle()}>Sign in with Google</button> 
<button onClick={()=>signInWithFacebook()}>Sign in with Facebook</button>

<button onClick={handleNew} style={{display: 'block'}}>New</button>
<button onClick={handleQueryDelete} style={{display: 'block'}}>QueryDelete</button>

<ul>
{
  data.map((items)=>{
    const {first, middle, last, born,id} = items;
    return(
      < >
    <li key={id}><button  onClick={()=>handleEdit(id)}>Edit</button> <button onClick={()=>handleDelete(id)}>Delete</button> &nbsp;{first} {middle} {last} - {born}</li>
      </>

    )
  })
}
  </ul>
 </>
  );
}

export default App;
