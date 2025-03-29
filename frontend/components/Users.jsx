// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Avatar,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem,
//   IconButton,
//   Menu,
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// const URL = import.meta.env.VITE_URL;

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   // States for Add User Dialog
//   const [addDialogOpen, setAddDialogOpen] = useState(false);
//   const [addFormData, setAddFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     role: '',
//   });

//   // States for Edit User Dialog
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [editFormData, setEditFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     role: '',
//   });
//   const [selectedUser, setSelectedUser] = useState(null);

//   // States for Dropdown Menu
//   const [menuAnchorEl, setMenuAnchorEl] = useState(null);
//   const [menuUser, setMenuUser] = useState(null);

//   // Fetch users data
//   useEffect(() => {
//     fetch(`${URL}/api/users`)
//       .then((res) => res.json())
//       .then((data) => setUsers(data))
//       .catch((err) => console.error('Error fetching users:', err));
//   }, []);

//   // Filter users based on search query
//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Handlers for Add User Dialog
//   const handleAddDialogOpen = () => {
//     setAddDialogOpen(true);
//   };

//   const handleAddDialogClose = () => {
//     setAddDialogOpen(false);
//     setAddFormData({ name: '', email: '', password: '', phone: '', role: '' });
//   };

//   const handleAddInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddFormSubmit = (e) => {
//     e.preventDefault();

//     fetch(`${URL}/api/users`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(addFormData),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error('Failed to add user');
//         }
//         return res.json();
//       })
//       .then((newUser) => {
//         setUsers((prev) => [...prev, newUser]);
//         handleAddDialogClose();
//       })
//       .catch((err) => console.error('Error adding user:', err));
//   };

//   // Handlers for Edit User Dialog
//   const handleEditDialogOpen = (user) => {
//     setSelectedUser(user);
//     // Pre-fill edit form with selected user's data (excluding password)
//     setEditFormData({
//       name: user.name,
//       email: user.email,
//       phone: user.phone || '',
//       role: user.role,
//     });
//     setEditDialogOpen(true);
//     handleMenuClose();
//   };

//   const handleEditDialogClose = () => {
//     setEditDialogOpen(false);
//     setSelectedUser(null);
//   };

//   const handleEditInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditFormSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedUser) return;

//     fetch(`${URL}/api/users/${selectedUser._id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(editFormData),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error('Failed to update user');
//         }
//         return res.json();
//       })
//       .then((updatedUser) => {
//         setUsers((prev) =>
//           prev.map((user) => (user._id === updatedUser._id ? updatedUser : user))
//         );
//         handleEditDialogClose();
//       })
//       .catch((err) => console.error('Error updating user:', err));
//   };

//   // Handlers for Dropdown Menu
//   const handleMenuOpen = (event, user) => {
//     setMenuAnchorEl(event.currentTarget);
//     setMenuUser(user);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchorEl(null);
//     setMenuUser(null);
//   };

//   const handleDeleteUser = () => {
//     if (!menuUser) return;

//     fetch(`${URL}/api/users/${menuUser._id}`, {
//       method: 'DELETE',
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error('Failed to delete user');
//         }
//         return res.json();
//       })
//       .then(() => {
//         setUsers((prev) => prev.filter((user) => user._id !== menuUser._id));
//         handleMenuClose();
//       })
//       .catch((err) => console.error('Error deleting user:', err));
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <Typography variant="h4" component="h2" className="text-gray-700">
//           Users
//         </Typography>
//         <div className="flex items-center space-x-4">
//           <TextField
//             label="Search Users"
//             variant="outlined"
//             size="small"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-64"
//           />
//           <Button variant="contained" color="primary" onClick={handleAddDialogOpen}>
//             Add User
//           </Button>
//         </div>
//       </div>

//       {/* Users Table */}
//       <TableContainer component={Paper} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone Number</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Joined At</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <TableRow key={user._id} hover>
//                   {/* Name with Avatar */}
//                   <TableCell>
//                     <div className="flex items-center space-x-3">
//                       <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
//                       <Typography variant="body1" className="font-medium">
//                         {user.name}
//                       </Typography>
//                     </div>
//                   </TableCell>
//                   {/* Email */}
//                   <TableCell>{user.email}</TableCell>
//                   {/* Phone Number */}
//                   <TableCell>{user.phone || 'N/A'}</TableCell>
//                   {/* Role */}
//                   <TableCell>{user.role || 'N/A'}</TableCell>
//                   {/* Joined At */}
//                   <TableCell>
//                     {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                   </TableCell>
//                   {/* Actions Dropdown */}
//                   <TableCell align="center">
//                     <IconButton onClick={(e) => handleMenuOpen(e, user)}>
//                       <MoreVertIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center text-gray-500 py-4">
//                   No users found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Dropdown Menu for Actions */}
//       <Menu
//         anchorEl={menuAnchorEl}
//         open={Boolean(menuAnchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem onClick={() => handleEditDialogOpen(menuUser)}>Edit</MenuItem>
//         <MenuItem onClick={handleDeleteUser}>Delete</MenuItem>
//       </Menu>

//       {/* Add User Dialog */}
//       <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
//         <DialogTitle>Add New User</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleAddFormSubmit} id="add-user-form">
//             <TextField
//               autoFocus
//               margin="dense"
//               name="name"
//               label="Name"
//               type="text"
//               fullWidth
//               value={addFormData.name}
//               onChange={handleAddInputChange}
//               required
//             />
//             <TextField
//               margin="dense"
//               name="email"
//               label="Email"
//               type="email"
//               fullWidth
//               value={addFormData.email}
//               onChange={handleAddInputChange}
//               required
//             />
//             <TextField
//               margin="dense"
//               name="password"
//               label="Password"
//               type="password"
//               fullWidth
//               value={addFormData.password}
//               onChange={handleAddInputChange}
//               required
//             />
//             <TextField
//               margin="dense"
//               name="phone"
//               label="Phone Number"
//               type="tel"
//               fullWidth
//               value={addFormData.phone}
//               onChange={handleAddInputChange}
//               required
//             />
//             <TextField
//               margin="dense"
//               name="role"
//               label="Role"
//               select
//               fullWidth
//               value={addFormData.role}
//               onChange={handleAddInputChange}
//               required
//             >
//               <MenuItem value="admin">Admin</MenuItem>
//               <MenuItem value="user">User</MenuItem>
//               <MenuItem value="advertiser">Advertiser</MenuItem>
//             </TextField>
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddDialogClose}>Cancel</Button>
//           <Button type="submit" form="add-user-form" variant="contained" color="primary">
//             Add User
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit User Dialog */}
//       <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
//         <DialogTitle>Edit User</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleEditFormSubmit} id="edit-user-form">
//             <TextField
//               autoFocus
//               margin="dense"
//               name="name"
//               label="Name"
//               type="text"
//               fullWidth
//               value={editFormData.name}
//               onChange={handleEditInputChange}
//               required
//             />
//             <TextField
//               margin="dense"
//               name="email"
//               label="Email"
//               type="email"
//               fullWidth
//               value={editFormData.email}
//               onChange={handleEditInputChange}
//               required
//             />
//             <TextField
//               margin="dense"
//               name="phone"
//               label="Phone Number"
//               type="tel"
//               fullWidth
//               value={editFormData.phone}
//               onChange={handleEditInputChange}
//               required
//             />
//             <TextField
//               margin="dense"
//               name="role"
//               label="Role"
//               select
//               fullWidth
//               value={editFormData.role}
//               onChange={handleEditInputChange}
//               required
//             >
//               <MenuItem value="admin">Admin</MenuItem>
//               <MenuItem value="user">User</MenuItem>
//               <MenuItem value="advertiser">Advertiser</MenuItem>
//             </TextField>
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditDialogClose}>Cancel</Button>
//           <Button type="submit" form="edit-user-form" variant="contained" color="primary">
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Users;



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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  IconButton,
  Menu,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const URL = import.meta.env.VITE_URL;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // States for Add User Dialog
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
  });

  // States for Edit User Dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });
  const [selectedUser, setSelectedUser] = useState(null);

  // States for Dropdown Menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuUser, setMenuUser] = useState(null);

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

  // Handlers for Add User Dialog
  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setAddFormData({ name: '', email: '', password: '', phone: '', role: '' });
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    fetch(`${URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addFormData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add user');
        }
        return res.json();
      })
      .then((newUser) => {
        setUsers((prev) => [...prev, newUser]);
        handleAddDialogClose();
      })
      .catch((err) => console.error('Error adding user:', err));
  };

  // Handlers for Edit User Dialog
  const handleEditDialogOpen = (user) => {
    setSelectedUser(user);
    // Pre-fill edit form with selected user's data (excluding password)
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
    });
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    fetch(`${URL}/api/users/${selectedUser._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update user');
        }
        return res.json();
      })
      .then((updatedUser) => {
        setUsers((prev) =>
          prev.map((user) => (user._id === updatedUser._id ? updatedUser : user))
        );
        handleEditDialogClose();
      })
      .catch((err) => console.error('Error updating user:', err));
  };

  // Handlers for Dropdown Menu
  const handleMenuOpen = (event, user) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuUser(user);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuUser(null);
  };

  const handleDeleteUser = () => {
    if (!menuUser) return;

    fetch(`${URL}/api/users/${menuUser._id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete user');
        }
        return res.json();
      })
      .then(() => {
        setUsers((prev) => prev.filter((user) => user._id !== menuUser._id));
        handleMenuClose();
      })
      .catch((err) => console.error('Error deleting user:', err));
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6">
        <Typography variant="h4" component="h2" className="text-gray-700 text-xl md:text-2xl">
          Users
        </Typography>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
          <TextField
            label="Search Users"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button variant="contained" color="primary" onClick={handleAddDialogOpen}>
            Add User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <TableContainer component={Paper} className="overflow-auto" style={{ maxHeight: '70vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Joined At</TableCell>
              <TableCell align="center">Actions</TableCell>
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
                  {/* Actions Dropdown */}
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dropdown Menu for Actions */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleEditDialogOpen(menuUser)}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteUser}>Delete</MenuItem>
      </Menu>

      {/* Add User Dialog */}
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose} fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddFormSubmit} id="add-user-form">
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={addFormData.name}
              onChange={handleAddInputChange}
              required
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={addFormData.email}
              onChange={handleAddInputChange}
              required
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={addFormData.password}
              onChange={handleAddInputChange}
              required
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone Number"
              type="tel"
              fullWidth
              value={addFormData.phone}
              onChange={handleAddInputChange}
              required
            />
            <TextField
              margin="dense"
              name="role"
              label="Role"
              select
              fullWidth
              value={addFormData.role}
              onChange={handleAddInputChange}
              required
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="advertiser">Advertiser</MenuItem>
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button type="submit" form="add-user-form" variant="contained" color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditFormSubmit} id="edit-user-form">
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={editFormData.name}
              onChange={handleEditInputChange}
              required
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={editFormData.email}
              onChange={handleEditInputChange}
              required
            />
            <TextField
              margin="dense"
              name="phone"
              label="Phone Number"
              type="tel"
              fullWidth
              value={editFormData.phone}
              onChange={handleEditInputChange}
              required
            />
            <TextField
              margin="dense"
              name="role"
              label="Role"
              select
              fullWidth
              value={editFormData.role}
              onChange={handleEditInputChange}
              required
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="advertiser">Advertiser</MenuItem>
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button type="submit" form="edit-user-form" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
