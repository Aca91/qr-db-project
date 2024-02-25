import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "../styles/Home.scss";

const Home = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const [year, setYear] = useState(0);
  const [users, setUsers] = useState([]);

  const userCollectionRef = collection(db, "aparati");

  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const createUser = async () => {
    await addDoc(userCollectionRef, {
      lokacija: location,
      tip: type,
      godiste: year,
    });
    await getUsers();
  };

  const update = async (id, age) => {
    const userDoc = doc(db, "aparati", id);
    const newField = { godiste: age + 1 };
    await updateDoc(userDoc, newField);
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "aparati", id);
    await deleteDoc(userDoc);
    await getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <Link to="/qrcode">GENERATE QR</Link>
      <p>HOME PAGE</p>
      <div className="add">
        <input
          type="text"
          placeholder="Lokacija"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Tip"
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Godiste"
          onChange={(event) => {
            setYear(event.target.value);
          }}
        />

        <button onClick={createUser}>Dodaj novi aparat</button>
      </div>
      {users.map((user) => {
        return (
          <div className="aparat" key={user.id}>
            <p>{user.lokacija}</p>
            <p>{user.tip}</p>
            <p>{user.godiste}</p>
            <button
              onClick={() => {
                update(user.id, user.godiste);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
