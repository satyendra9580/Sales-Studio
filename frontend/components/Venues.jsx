// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Autocomplete,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import { QRCodeCanvas } from 'qrcode.react';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import VisibilityIcon from '@mui/icons-material/Visibility';

// const Venues = () => {
//   const [venues, setVenues] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [newVenue, setNewVenue] = useState({
//     name: '',
//     type: '',
//     address: '',
//     pincode: '',
//     google_maps_pin: '',
//   });
//   const [selectedVenue, setSelectedVenue] = useState(null);
//   const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
//   const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   // States for dropdown menu
//   const [menuAnchorEl, setMenuAnchorEl] = useState(null);
//   const [menuVenue, setMenuVenue] = useState(null);

//   const URL = import.meta.env.VITE_URL;

//   // Hardcoded venue types for suggestions
//   const venueTypes = ['Store', 'School', 'Office', 'Mall', 'Apartment', 'Restaurant'];

//   // Fetch venues data
//   useEffect(() => {
//     fetch(`${URL}/api/venues`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('Fetched Venues:', data);
//         setVenues(data);
//       })
//       .catch((err) => console.error('Error fetching venues:', err));
//   }, [URL]);

//   // Filter venues based on search query
//   const filteredVenues = venues.filter((venue) =>
//     venue.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Handle Add/Edit Venue form input for non-Autocomplete fields
//   const handleInputChange = (e) => {
//     setNewVenue({
//       ...newVenue,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Function to ensure a valid URL is used for the QR code
//   const getValidURL = (url) => {
//     if (!url) return '';
//     return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
//   };

//   // Handle Add/Edit Venue submit
//   const handleAddEditVenue = async () => {
//     if (isEditing) {
//       // Update venue
//       const res = await fetch(`${URL}/api/venues/${newVenue._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newVenue),
//       });

//       if (res.ok) {
//         const updatedVenue = await res.json();
//         setVenues((prev) =>
//           prev.map((venue) => (venue._id === updatedVenue._id ? updatedVenue : venue))
//         );
//         setIsAddEditDialogOpen(false);
//       } else {
//         console.error('Failed to update venue');
//       }
//     } else {
//       // When adding a new venue, ensure the QR value is a valid URL
//       const qrValue = getValidURL(newVenue.google_maps_pin);

//       const res = await fetch(`${URL}/api/venues`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...newVenue, qr: qrValue }),
//       });

//       if (res.ok) {
//         const addedVenue = await res.json();
//         setVenues((prev) => [...prev, addedVenue]);
//         setIsAddEditDialogOpen(false);
//       } else {
//         console.error('Failed to add venue');
//       }
//     }
//   };

//   // Handle Delete Venue
//   const handleDeleteVenue = async (id) => {
//     const res = await fetch(`${URL}/api/venues/${id}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       setVenues((prev) => prev.filter((venue) => venue._id !== id));
//     } else {
//       console.error('Failed to delete venue');
//     }
//   };

//   // Open View Dialog
//   const openViewDialog = (venue) => {
//     console.log('Selected Venue:', venue);
//     setSelectedVenue(venue);
//     setIsViewDialogOpen(true);
//   };

//   // Close View Dialog
//   const closeViewDialog = () => {
//     setIsViewDialogOpen(false);
//     setSelectedVenue(null);
//   };

//   // Open Add/Edit Dialog
//   const openAddEditDialog = (venue = null) => {
//     if (venue) {
//       setNewVenue(venue);
//       setIsEditing(true);
//     } else {
//       setNewVenue({
//         name: '',
//         type: '',
//         address: '',
//         pincode: '',
//         google_maps_pin: '',
//       });
//       setIsEditing(false);
//     }
//     setIsAddEditDialogOpen(true);
//   };

//   // Close Add/Edit Dialog
//   const closeAddEditDialog = () => {
//     setIsAddEditDialogOpen(false);
//     setNewVenue({
//       name: '',
//       type: '',
//       address: '',
//       pincode: '',
//       google_maps_pin: '',
//     });
//   };

//   // Handle Download QR code
//   const handleDownloadQR = () => {
//     const canvas = document.getElementById('qr-code-canvas');
//     if (canvas) {
//       const imageURL = canvas.toDataURL('image/png');
//       const a = document.createElement('a');
//       a.href = imageURL;
//       a.download = `QR_${selectedVenue?._id || selectedVenue?.name || 'venue'}.png`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     } else {
//       console.error('QR Code canvas not found');
//     }
//   };

//   // Handlers for dropdown menu
//   const handleMenuOpen = (event, venue) => {
//     setMenuAnchorEl(event.currentTarget);
//     setMenuVenue(venue);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchorEl(null);
//     setMenuVenue(null);
//   };

//   const handleEditFromMenu = () => {
//     openAddEditDialog(menuVenue);
//     handleMenuClose();
//   };

//   const handleDeleteFromMenu = () => {
//     handleDeleteVenue(menuVenue._id);
//     handleMenuClose();
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-semibold text-gray-700">Venues</h2>
//         <div className="flex items-center space-x-4">
//           <TextField
//             label="Search Venues"
//             variant="outlined"
//             size="small"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <Button variant="contained" color="primary" onClick={() => openAddEditDialog()}>
//             Add Venue
//           </Button>
//         </div>
//       </div>

//       {/* Venues Table */}
//       <TableContainer component={Paper} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>Venue Name</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>QR</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredVenues.map((venue) => (
//               <TableRow key={venue._id} hover>
//                 <TableCell>{venue.name}</TableCell>
//                 <TableCell>{venue.type}</TableCell>
//                 <TableCell>{venue.address}</TableCell>
//                 <TableCell>
//                   <QRCodeCanvas value={venue.qr || ''} size={50} />
//                 </TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => openViewDialog(venue)}>
//                     <VisibilityIcon />
//                   </IconButton>
//                   <IconButton onClick={(e) => handleMenuOpen(e, venue)}>
//                     <MoreVertIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Dropdown Menu for Edit and Delete */}
//       <Menu
//         anchorEl={menuAnchorEl}
//         open={Boolean(menuAnchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem onClick={handleEditFromMenu}>Edit</MenuItem>
//         <MenuItem onClick={handleDeleteFromMenu}>Delete</MenuItem>
//       </Menu>

//       {/* View Venue Dialog */}
//       <Dialog open={isViewDialogOpen} onClose={closeViewDialog}>
//         <DialogTitle>Venue Details</DialogTitle>
//         <DialogContent>
//           {selectedVenue && (
//             <>
//               <p>
//                 <strong>Name:</strong> {selectedVenue.name}
//               </p>
//               <p>
//                 <strong>Type:</strong> {selectedVenue.type}
//               </p>
//               <p>
//                 <strong>Address:</strong> {selectedVenue.address}
//               </p>
//               <p>
//                 <strong>Pincode:</strong> {selectedVenue.pincode}
//               </p>
//               <p>
//                 <strong>Google Maps Pin:</strong>{' '}
//                 <a
//                   href={selectedVenue.google_maps_pin}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {selectedVenue.google_maps_pin}
//                 </a>
//               </p>
//               <div className="flex flex-col items-center mt-4">
//                 <QRCodeCanvas
//                   id="qr-code-canvas"
//                   value={selectedVenue.qr || ''}
//                   size={128}
//                 />
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   onClick={handleDownloadQR}
//                   style={{ marginTop: '16px' }}
//                 >
//                   Download QR
//                 </Button>
//               </div>
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeViewDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add/Edit Venue Dialog */}
//       <Dialog open={isAddEditDialogOpen} onClose={closeAddEditDialog}>
//         <DialogTitle>{isEditing ? 'Edit Venue' : 'Add Venue'}</DialogTitle>
//         <DialogContent>
//           {/* Autocomplete for Venue Name with suggestions from stored venues */}
//           <Autocomplete
//             freeSolo
//             options={venues.map((v) => v.name)}
//             value={newVenue.name}
//             onChange={(event, newValue) =>
//               setNewVenue({ ...newVenue, name: newValue || '' })
//             }
//             onInputChange={(event, newInputValue) =>
//               setNewVenue({ ...newVenue, name: newInputValue })
//             }
//             renderInput={(params) => (
//               <TextField {...params} label="Venue Name" margin="normal" fullWidth />
//             )}
//           />
//           {/* Autocomplete for Venue Type with fixed options */}
//           <Autocomplete
//             options={venueTypes}
//             value={newVenue.type}
//             onChange={(event, newValue) =>
//               setNewVenue({ ...newVenue, type: newValue || '' })
//             }
//             renderInput={(params) => (
//               <TextField {...params} label="Type" margin="normal" fullWidth />
//             )}
//           />
//           <TextField
//             label="Address"
//             name="address"
//             value={newVenue.address}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Pincode"
//             name="pincode"
//             value={newVenue.pincode}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Google Maps Pin"
//             name="google_maps_pin"
//             value={newVenue.google_maps_pin}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeAddEditDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddEditVenue} color="primary">
//             {isEditing ? 'Save Changes' : 'Add Venue'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Venues;




import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Autocomplete,
  Menu,
  MenuItem,
} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newVenue, setNewVenue] = useState({
    name: '',
    type: '',
    address: '',
    pincode: '',
    google_maps_pin: '',
  });
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // States for dropdown menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuVenue, setMenuVenue] = useState(null);

  const URL = import.meta.env.VITE_URL;

  // Hardcoded venue types for suggestions
  const venueTypes = ['Store', 'School', 'Office', 'Mall', 'Apartment', 'Restaurant'];

  // Fetch venues data
  useEffect(() => {
    fetch(`${URL}/api/venues`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched Venues:', data);
        setVenues(data);
      })
      .catch((err) => console.error('Error fetching venues:', err));
  }, [URL]);

  // Filter venues based on search query
  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Add/Edit Venue form input for non-Autocomplete fields
  const handleInputChange = (e) => {
    setNewVenue({
      ...newVenue,
      [e.target.name]: e.target.value,
    });
  };

  // Function to ensure a valid URL is used for the QR code
  const getValidURL = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  // Handle Add/Edit Venue submit
  const handleAddEditVenue = async () => {
    if (isEditing) {
      // Update venue
      const res = await fetch(`${URL}/api/venues/${newVenue._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVenue),
      });

      if (res.ok) {
        const updatedVenue = await res.json();
        setVenues((prev) =>
          prev.map((venue) => (venue._id === updatedVenue._id ? updatedVenue : venue))
        );
        setIsAddEditDialogOpen(false);
      } else {
        console.error('Failed to update venue');
      }
    } else {
      // When adding a new venue, ensure the QR value is a valid URL
      const qrValue = getValidURL(newVenue.google_maps_pin);

      const res = await fetch(`${URL}/api/venues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newVenue, qr: qrValue }),
      });

      if (res.ok) {
        const addedVenue = await res.json();
        setVenues((prev) => [...prev, addedVenue]);
        setIsAddEditDialogOpen(false);
      } else {
        console.error('Failed to add venue');
      }
    }
  };

  // Handle Delete Venue
  const handleDeleteVenue = async (id) => {
    const res = await fetch(`${URL}/api/venues/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setVenues((prev) => prev.filter((venue) => venue._id !== id));
    } else {
      console.error('Failed to delete venue');
    }
  };

  // Open View Dialog
  const openViewDialog = (venue) => {
    console.log('Selected Venue:', venue);
    setSelectedVenue(venue);
    setIsViewDialogOpen(true);
  };

  // Close View Dialog
  const closeViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedVenue(null);
  };

  // Open Add/Edit Dialog
  const openAddEditDialog = (venue = null) => {
    if (venue) {
      setNewVenue(venue);
      setIsEditing(true);
    } else {
      setNewVenue({
        name: '',
        type: '',
        address: '',
        pincode: '',
        google_maps_pin: '',
      });
      setIsEditing(false);
    }
    setIsAddEditDialogOpen(true);
  };

  // Close Add/Edit Dialog
  const closeAddEditDialog = () => {
    setIsAddEditDialogOpen(false);
    setNewVenue({
      name: '',
      type: '',
      address: '',
      pincode: '',
      google_maps_pin: '',
    });
  };

  // Handle Download QR code
  const handleDownloadQR = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const imageURL = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = imageURL;
      a.download = `QR_${selectedVenue?._id || selectedVenue?.name || 'venue'}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      console.error('QR Code canvas not found');
    }
  };

  // Handlers for dropdown menu
  const handleMenuOpen = (event, venue) => {
    setMenuAnchorEl(event.currentTarget);
    setMenuVenue(venue);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setMenuVenue(null);
  };

  const handleEditFromMenu = () => {
    openAddEditDialog(menuVenue);
    handleMenuClose();
  };

  const handleDeleteFromMenu = () => {
    handleDeleteVenue(menuVenue._id);
    handleMenuClose();
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Venues</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
          <TextField
            label="Search Venues"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button variant="contained" color="primary" onClick={() => openAddEditDialog()}>
            Add Venue
          </Button>
        </div>
      </div>

      {/* Venues Table */}
      <TableContainer component={Paper} className="overflow-auto" style={{ maxHeight: '70vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Venue Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>QR</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVenues.map((venue) => (
              <TableRow key={venue._id} hover>
                <TableCell>{venue.name}</TableCell>
                <TableCell>{venue.type}</TableCell>
                <TableCell>{venue.address}</TableCell>
                <TableCell>
                  <QRCodeCanvas value={venue.qr || ''} size={50} />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => openViewDialog(venue)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={(e) => handleMenuOpen(e, venue)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dropdown Menu for Edit and Delete */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditFromMenu}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteFromMenu}>Delete</MenuItem>
      </Menu>

      {/* View Venue Dialog */}
      <Dialog open={isViewDialogOpen} onClose={closeViewDialog} fullWidth>
        <DialogTitle>Venue Details</DialogTitle>
        <DialogContent>
          {selectedVenue && (
            <>
              <p>
                <strong>Name:</strong> {selectedVenue.name}
              </p>
              <p>
                <strong>Type:</strong> {selectedVenue.type}
              </p>
              <p>
                <strong>Address:</strong> {selectedVenue.address}
              </p>
              <p>
                <strong>Pincode:</strong> {selectedVenue.pincode}
              </p>
              <p>
                <strong>Google Maps Pin:</strong>{' '}
                <a
                  href={selectedVenue.google_maps_pin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedVenue.google_maps_pin}
                </a>
              </p>
              <div className="flex flex-col items-center mt-4">
                <QRCodeCanvas id="qr-code-canvas" value={selectedVenue.qr || ''} size={128} />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleDownloadQR}
                  className="mt-4"
                >
                  Download QR
                </Button>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeViewDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Venue Dialog */}
      <Dialog open={isAddEditDialogOpen} onClose={closeAddEditDialog} fullWidth>
        <DialogTitle>{isEditing ? 'Edit Venue' : 'Add Venue'}</DialogTitle>
        <DialogContent>
          {/* Autocomplete for Venue Name with suggestions from stored venues */}
          <Autocomplete
            freeSolo
            options={venues.map((v) => v.name)}
            value={newVenue.name}
            onChange={(event, newValue) =>
              setNewVenue({ ...newVenue, name: newValue || '' })
            }
            onInputChange={(event, newInputValue) =>
              setNewVenue({ ...newVenue, name: newInputValue })
            }
            renderInput={(params) => (
              <TextField {...params} label="Venue Name" margin="normal" fullWidth />
            )}
          />
          {/* Autocomplete for Venue Type with fixed options */}
          <Autocomplete
            options={venueTypes}
            value={newVenue.type}
            onChange={(event, newValue) =>
              setNewVenue({ ...newVenue, type: newValue || '' })
            }
            renderInput={(params) => (
              <TextField {...params} label="Type" margin="normal" fullWidth />
            )}
          />
          <TextField
            label="Address"
            name="address"
            value={newVenue.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Pincode"
            name="pincode"
            value={newVenue.pincode}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Google Maps Pin"
            name="google_maps_pin"
            value={newVenue.google_maps_pin}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEditVenue} color="primary">
            {isEditing ? 'Save Changes' : 'Add Venue'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Venues;
