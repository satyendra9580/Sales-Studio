import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Avatar,
  Typography,
} from '@mui/material';

const URL = import.meta.env.VITE_URL;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users data
  useEffect(() => {
    fetch(`${URL}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h2" className="text-gray-700">
          Users
        </Typography>
        <TextField
          label="Search Users"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64"
        />
      </div>

      {/* Users Table */}
      <TableContainer component={Paper} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Joined At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id} hover>
                  {/* Name with Avatar */}
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
                      <Typography variant="body1" className="font-medium">
                        {user.name}
                      </Typography>
                    </div>
                  </TableCell>
                  {/* Email */}
                  <TableCell>{user.email}</TableCell>
                  {/* Phone Number */}
                  <TableCell>{user.phone || 'N/A'}</TableCell>
                  {/* Role */}
                  <TableCell>{user.role || 'N/A'}</TableCell>
                  {/* Joined At */}
                  <TableCell>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;