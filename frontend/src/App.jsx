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
import AIChatPage from "./pages/AIChatPage";
import JoinVideoPage from './pages/JoinVideoPage';
import ZegoCallRoom from './components/VideoCall/ZegoCallRoom';
import EdtechCategory from "./components/categories/EdtechCategory";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/join" element={<JoinVideoPage />} />
        <Route path="/room/:roomID" element={<ZegoCallRoom />} />
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
          
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/category" element={<CategoryPage />}>
            <Route path="college" element={<CollegeCategory />} />
            <Route path="edtech" element={<EdtechCategory />} />
            <Route path="youtube" element={<YoutubeCategory />} />
          </Route>

          <Route path="/category/teacher/:id" element={<TeacherProfile />} />
          <Route
            path="/ai-chat"
            element={
              <ProtectedRoute>
                <AIChatPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

