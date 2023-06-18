import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import "./Food.css";
import axios from "axios";
import { Box, Button, Container, Input } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ExeprmientFoodApi = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [rows, setRows] = useState([]);
  const [sumCalorie, setSumCalorie] = useState(0);
  const [sumFat, setSumFat] = useState(0);

  const [sumCarbs, setSumCarbs] = useState(0);
  const [sumProtein, setSumProtein] = useState(0);

  const clickHandler = async () => {
    const data = await axios.get(
      `https://api.api-ninjas.com/v1/nutrition?query=${search}`,
      {
        headers: {
          "X-Api-Key": "PDs20MlEeQdZ6Ov8+dDUrg==eWlZU3bVZSFxWEHw",
        },
      }
    );
    console.log(data.data);
    setResult(data.data);
  };

  const removeItem = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const AddToTable = (index) => {
    const selectedRow = result[index];
    const newRow = createData(
      selectedRow.name,
      selectedRow.calories,
      selectedRow.fat_total_g,
      selectedRow.carbohydrates_total_g,
      selectedRow.protein_g
    );
    setRows([...rows, newRow]);
    setSumCalorie(sumCalorie + selectedRow.calories);
    setSumFat(sumFat + selectedRow.fat_total_g);
    setSumCarbs(sumCarbs + selectedRow.carbohydrates_total_g);
    setSumProtein(sumProtein + selectedRow.protein_g)
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  return (
    <Container>
      <h1 id="food_title">Track Your Daily Calories</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "100px",
        }}
      >
        <Input
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ margin: "0 10px", width: "40%", height: "60px" }}
        />
        <Button
          onClick={clickHandler}
          style={{ backgroundColor: "red", color: "white", width: "17%" }}
        >
          Search
        </Button>
      </div>
      {result.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TableBody>
            {result.map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>Calories : </b>
                  {row.calories}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>Fat : </b>
                  {row.fat_total_g}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>Carbs : </b>
                  {row.carbohydrates_total_g}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>Protein : </b>
                  {row.protein_g}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button onClick={() => AddToTable(index)}>Add</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Box>
      )}
      <div>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: "60%", marginBottom: "50px" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Food Items (100g serving)</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">
                  Protein&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => removeItem(index)}>Remove</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              <TableRow>
                <StyledTableCell>
                  <b>Total</b>
                </StyledTableCell>
                <StyledTableCell align="right">{sumCalorie.toFixed(2)}</StyledTableCell>
                <StyledTableCell align="right">
                  {sumFat.toFixed(2)}&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell align="right">
                  {sumCarbs.toFixed(2)}&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell align="right">
                  {sumProtein.toFixed(2)}&nbsp;(g)
                </StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default ExeprmientFoodApi;
