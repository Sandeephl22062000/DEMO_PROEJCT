import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState } from "react";

import Food from "./Food";
import ResultPage from "./ResultPage";
import { useParams } from "react-router-dom";

const CalorieDetail = () => {
  const [showTrackPage, setShowTrackPage] = useState(false);
  const [Goal, setGoal] = useState("");
  const [Target, setTarget] = useState("");
  const [RequireCalories, setRequireCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const params = useParams();
  const maintainceCalory = params.calories;
  useEffect(() => {
    showdetail();
  }, []);
  const showdetail = () => {
    if (Goal === "Gain") {
      const calculatedCalories = (Target * 7700) / 7 + maintainceCalory;
      const calculatedCarbs = (maintainceCalory * 0.65) / 4;
      const calculatedProtein = (maintainceCalory * 0.2) / 4;
      setRequireCalories(calculatedCalories);
      setCarbs(calculatedCarbs);
      setProtein(calculatedProtein);
    } else if (Goal === "Loss") {
      const calculatedCalories =
        (maintainceCalory - Target * 7700) / 7 + maintainceCalory;
      const calculatedCarbs = (maintainceCalory * 0.45) / 4;
      const calculatedProtein = (maintainceCalory * 0.15) / 4;

      setRequireCalories(calculatedCalories);
      setCarbs(calculatedCarbs);
      setProtein(calculatedProtein);
    } else {
      setRequireCalories(maintainceCalory);

      const calculatedCarbs = (maintainceCalory * 0.55) / 4;
      const calculatedProtein = (maintainceCalory * 0.17) / 4;
      setCarbs(calculatedCarbs);
      setProtein(calculatedProtein);
    }
    return;
  };

  const clickHandler = () => {
    setShowTrackPage(true);
  };
  return (
    <>
      {!showTrackPage ? (
        <>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <h2 style={{ margin: "50px" }}>
              According to the Details provided your Maintaince Calory is
              {maintainceCalory}
            </h2>
            <FormControl sx={{ m: 1, width: "40%" }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Goal
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={Goal}
                onChange={(e) => {
                  setGoal(e.target.value);
                }}
                autoWidth
                label="Goal"
              >
                <MenuItem value="Gain">Gain Weight</MenuItem>
                <MenuItem value="Loss">Loss Weight</MenuItem>
                <MenuItem value="Maintain">Maintain Weight</MenuItem>
              </Select>
            </FormControl>
            {
              <Box>
                <h3>How much Weight do you want to gain</h3>
                <FormControl sx={{ m: 1, width: "40%" }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Target /week
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={Target}
                    onChange={(e) => {
                      setTarget(e.target.value);
                    }}
                    autoWidth
                    label="kg per week"
                  >
                    <MenuItem value="0.25">0.25</MenuItem>
                    <MenuItem value="0.50">0.50</MenuItem>
                    <MenuItem value="0.75">0.75</MenuItem>
                    <MenuItem value="1.0">1.0</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            }

            {Target && (
              <TableContainer
                component={Paper}
                sx={{
                  width: "40%", // Adjust the width as needed
                  marginTop: "1rem", // Add margin for spacing
                }}
              >
                <Table
                  sx={{ tableLayout: "fixed" }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Calories Requirement:
                      </TableCell>
                      <TableCell align="right">{RequireCalories}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Protein Requirement:
                      </TableCell>
                      <TableCell align="right">{protein}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Carbohydrates Requirement:
                      </TableCell>
                      <TableCell align="right">{carbs}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <Button onClick={clickHandler}>Track Calories</Button>
          </Container>
        </>
      ) : (
        <Food />
      )}
    </>
  );
};
export default CalorieDetail;
