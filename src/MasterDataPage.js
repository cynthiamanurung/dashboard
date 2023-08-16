
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';

const MasterDataPage = () => {
  const [ruasData, setRuasData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedRuas, setSelectedRuas] = useState(null);
  const [ruasName, setRuasName] = useState('');

  const fetchRuasData = async () => {
    try {
      const response = await fetch('http://34.101.145.49:8004/api/ruas');
      if (response.ok) {
        const data = await response.json();
        setRuasData(data);
      }
    } catch (error) {
      console.error('Error fetching ruas data:', error);
    }
  };

  useEffect(() => {
    fetchRuasData();
  }, []);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setRuasName('');
  };

  const handleAddRuas = async () => {
    try {
      const response = await fetch('http://34.101.145.49:8004/api/ruas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruas_name: ruasName }),
      });
      if (response.ok) {
        fetchRuasData();
        handleCloseAddDialog();
      }
    } catch (error) {
      console.error('Error adding ruas:', error);
    }
  };

  const handleOpenEditDialog = (ruas) => {
    setSelectedRuas(ruas);
    setRuasName(ruas.ruas_name);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedRuas(null);
    setRuasName('');
  };

  const handleEditRuas = async () => {
    if (!selectedRuas) return;

    try {
      const response = await fetch(`http://34.101.145.49:8004/api/ruas/${selectedRuas.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruas_name: ruasName }),
      });
      if (response.ok) {
        fetchRuasData();
        handleCloseEditDialog();
      }
    } catch (error) {
      console.error('Error editing ruas:', error);
    }
  };

  const handleDeleteRuas = async (ruasId) => {
    try {
      const response = await fetch(`http://34.101.145.49:8004/api/ruas/${ruasId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchRuasData();
      }
    } catch (error) {
      console.error('Error deleting ruas:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenAddDialog}>
        Add Ruas
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Ruas Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ruasData.map((ruas) => (
              <TableRow key={ruas.id}>
                <TableCell>{ruas.id}</TableCell>
                <TableCell>{ruas.ruas_name}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleOpenEditDialog(ruas)}>Edit</Button>
                  <Button variant="outlined" onClick={() => handleDeleteRuas(ruas.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Ruas</DialogTitle>
        <DialogContent>
          <TextField
            label="Ruas Name"
            value={ruasName}
            onChange={(e) => setRuasName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddRuas} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Ruas</DialogTitle>
        <DialogContent>
          <TextField
            label="Ruas Name"
            value={ruasName}
            onChange={(e) => setRuasName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleEditRuas} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MasterDataPage;
