import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import QuestionsPage from "./pages/QuestionsPage";
import FeedbackPage from "./pages/FeedbackPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import VideoCallPage from "./pages/VideoCallPage";
import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/LandigPage";
import NotFoundPage from "./pages/NotFoundPage";
import CollegeCategory from "./components/categories/CollegeCategory";
import CategoryPage from "./pages/CategoryPage";
import YoutubeCategory from "./components/categories/YoutubeCategory";
import TeacherProfile from "./components/categories/TeacherProfile";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <QuestionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <FeedbackPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video-call"
            element={
              <ProtectedRoute>
                <VideoCallPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/category" element={<CategoryPage />}>
            <Route path="college" element={<CollegeCategory />} />
            {/* <Route path="edtech" element={<EdtechCategory />} /> */}
            <Route path="youtube" element={<YoutubeCategory />} />
          </Route>

          <Route path="/category/teacher/:id" element={<TeacherProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <h1 className="text-3xl font-bold underline">
//     Hello world!
//   </h1>
//   )
// }

// export default App
