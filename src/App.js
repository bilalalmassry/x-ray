import './App.css';
import ResponsiveAppBar from "./components/AppBar";
import {
    Badge,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function App() {
    let navigate = useNavigate();
    const [requests , setRequests] = useState([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:3000/logs").then(data => setRequests(data.data));
    }, [])
  return (
    <div className="App">
      <header className="App-header">

          <Box sx={{display: "flex", width: 1, marginY: "2%", gap: "1%"}}>
              <Box sx={{flexBasis: "30%", color: "#000", backgroundColor: "#edf1f3"}}>Requests</Box>
              <Box sx={{flexBasis: "70%", color: "#000", backgroundColor: "#fff", marginRight: "2%"}}>
                  <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                              <TableRow>
                                  <TableCell align="center">Method</TableCell>
                                  <TableCell align="center">Code</TableCell>
                                  <TableCell align="center">Url</TableCell>
                                  <TableCell align="center">Time(ms)</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {requests.map((row) => (
                                  <TableRow
                                      key={row.id}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } , cursor: "pointer"}}
                                      onClick={() => navigate(`/Requests/${row.id}`)}
                                      hover={true}
                                  >
                                      <TableCell sx={{color: row.method === 'GET' ? "#009688" : "#039be5"}} omponent="th" scope="row" align="center">
                                          {row.method === "GET" ? <Badge badgeContent={row.method} color={"success"}/> : null}
                                          {row.method === "POST" ? <Badge badgeContent={row.method} color={"primary"}/> : null}
                                          {row.method === "DELETE" ? <Badge badgeContent={row.method} color={"error"}/> : null}
                                          {row.method === "PUT" || row.method === "PATCH"? <Badge badgeContent={row.method} color={"secondary"}/> : null}
                                      </TableCell>
                                      <TableCell align="center">
                                          {row.responseCode >= 500 ? <Badge badgeContent={row.responseCode} color={"error"}  max={999}/> : null}
                                          {row.responseCode >= 200 && row.responseCode < 300 ? <Badge badgeContent={row.responseCode} color={"success"}  max={999}/> : null}
                                          {row.responseCode >= 300 && row.responseCode < 400 ? <Badge badgeContent={row.responseCode} color={"info"}  max={999}/> : null}
                                          {row.responseCode >= 400 && row.responseCode < 500 ? <Badge badgeContent={row.responseCode} color={"warning"}  max={999}/> : null}
                                      </TableCell>
                                      <TableCell align="center">{row.url}</TableCell>
                                      <TableCell align="center">
                                          {row.time >= 1000 ? <Badge badgeContent={row.time} color={"error"}  max={9999999}/> : null}
                                          {row.time < 1000 ? row.time + "ms": null}
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </Box>
          </Box>
      </header>
    </div>
  );
}

export default App;
