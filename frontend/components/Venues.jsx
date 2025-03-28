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
} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
      // Add new venue
      const qrValue = newVenue.google_maps_pin; // Use the Google Maps Pin as the QR value

      const res = await fetch(`${URL}/api/venues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newVenue, qr: qrValue }), // Include the QR field
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-700">Venues</h2>
        <div className="flex items-center space-x-4">
          <TextField
            label="Search Venues"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={() => openAddEditDialog()}>
            Add Venue
          </Button>
        </div>
      </div>

      {/* Venues Table */}
      <TableContainer component={Paper} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
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
                  <IconButton color="secondary" onClick={() => openAddEditDialog(venue)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteVenue(venue._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Venue Dialog */}
      <Dialog open={isViewDialogOpen} onClose={closeViewDialog}>
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
              <div className="flex justify-center mt-4">
                <QRCodeCanvas value={selectedVenue.qr || ''} size={128} />
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
      <Dialog open={isAddEditDialogOpen} onClose={closeAddEditDialog}>
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
