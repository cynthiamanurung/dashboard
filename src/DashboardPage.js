import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link

const DashboardPage = () => {
  const [ruasData, setRuasData] = useState([]);
  const [chartData, setChartData] = useState({});

  // Fetch Ruas Data from API
  const fetchRuasData = async () => {
    try {
      const response = await fetch('http://34.101.145.49:8004/api/ruas');
      if (response.ok) {
        const data = await response.json();
        setRuasData(data);

        // Process data for chart visualization
        const ruasNames = data.map((ruas) => ruas.ruas_name);
        const ruasLengths = data.map((ruas) => ruas.long);
        setChartData({
          labels: ruasNames,
          datasets: [
            {
              label: 'Ruas Length',
              data: ruasLengths,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching ruas data:', error);
    }
  };

  useEffect(() => {
    fetchRuasData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>

      <Button variant="contained" component={Link} to="/login" style={{ marginBottom: '10px' }}>
        Logout
      </Button>

      <div style={{ marginTop: '20px' }}>
        <h2>Data Ruas Visualization</h2>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Summary Data Ruas</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Ruas Name</TableCell>
                <TableCell>Length</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ruasData.map((ruas) => (
                <TableRow key={ruas.id}>
                  <TableCell>{ruas.id}</TableCell>
                  <TableCell>{ruas.ruas_name}</TableCell>
                  <TableCell>{ruas.long}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
