import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Food } from "./components/Food/Food";
import TrainerCards from "./components/Trainer-Info/TrainerCards";
import TrainerProfile from "./components/Trainer-Info/TrainerProfile";
import Exercises from "./components/Exercises/Exercises";
import ExerciseVideos from "./components/Exercises/ExerciseVideo";
import Signup from "./components/Auth/signup";
import UserInput from "./components/Food/userInput";
import Login from "./components/Auth/login";
import CalorieDetail from "./components/Food/pageEdited";
import Trainerlogin from "./components/Auth/trainerLogin";
import TrainerSigup from "./components/Auth/trainerSignup";
import Inbox from "./components/Chat/chat.jsx";
import ClientsExperince from "./ClientsExperince";
import ShowPost from "./components/ShowPost";
import ChatInterface from "./components/Chat/chat.jsx";
import ExeprmientFoodApi from "./components/Food/ExeprmientFoodApi";
import Profile from "./components/ProfileIndividuals.jsx";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trainersignup" element={<TrainerSigup />} />
          <Route path="/trainerlogin" element={<Trainerlogin />} />

          <Route path="/food" element={<UserInput />} />
          <Route path="/food/calculateCalories" element={<CalorieDetail />} />
          <Route path="/calculatediet" element={<ExeprmientFoodApi />} />

          <Route path="/trainer" element={<TrainerCards />} />
          <Route path="/trainer/:id" element={<TrainerProfile />} />

          <Route path="/exercise" element={<Exercises />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/clientexperiences" element={<ClientsExperince />} />

          <Route path="/profile" element={<Profile />} />

          <Route
            path="/execiseVideos/:muscle/:exercise"
            element={<ExerciseVideos />}
          />
          <Route path="/activities" element={<ShowPost />} />
          {/* <Route path="/inbox" element={<Inbox />} /> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
