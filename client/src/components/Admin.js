import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/Admin.module.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', age: '', email: '' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get('http://localhost:8005/api/getUsers')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:8005/api/deleteUser/${id}`)
      .then(() => {
        fetchUsers();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleCreateUser = () => {
    axios
      .post('http://localhost:8005/api/createUser', newUser)
      .then(() => {
        fetchUsers();
        setNewUser({ name: '', age: '', email: '' });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  const handleUpdateUser = (id) => {
    axios
      .put(`http://localhost:8005/api/updateUser/${id}`, editUser)
      .then(() => {
        fetchUsers();
        setEditUser(null);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div className={styles.Admin}>
      <h1>User List</h1>
      <ul>
        {users.map((users) => (
          <li key={users._id}>
            {users.name} - {users.age} - {users.email}
            <button onClick={() => setEditUser(users)}>Edit</button>
            <button onClick={() => handleDeleteUser(users._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Create User</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleCreateUser}>Create</button>
      </div>

      {editUser && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="Name"
            value={editUser.name || ''}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            value={editUser.age || ''}
            onChange={(e) => setEditUser({ ...editUser, age: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser.email || ''}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <button onClick={() => handleUpdateUser(editUser._id)}>Update</button>
          <button onClick={() => setEditUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Admin;
