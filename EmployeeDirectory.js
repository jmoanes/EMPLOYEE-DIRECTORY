import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");

  const fetchEmployees = async () => {
    const querySnapshot = await getDocs(collection(db, "employees"));
    setEmployees(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "employees"), { name });
    setName("");
    fetchEmployees();
  };

  const removeEmployee = async (id) => {
    await deleteDoc(doc(db, "employees", id));
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee Directory</h2>
      <form onSubmit={addEmployee}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Employee name"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name}
            <button onClick={() => removeEmployee(emp.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
