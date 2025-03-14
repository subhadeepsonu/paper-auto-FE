import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { Toaster } from 'sonner'
import Navbar from "./components/navbar";
import FacultyDashboard from "./pages/faculty/facultyDashboard";
import CoordinatorDashboard from "./pages/coordinator/coordinatorDashboard";
import ModeratorDashboard from "./pages/moderator/moderatorDashboard";
import FacultyCourses from "./pages/faculty/facultyCourses";
import FacultyCourse from "./pages/faculty/facultyCourse";
import FacultyPaper from "./pages/faculty/facultypaper";
import FacultyAddPaper from "./pages/faculty/facultyAddpaper";
import Login from "./pages/login";
import AdminApproval from "./pages/admin/adminApprovals";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminCourses from "./pages/admin/adminCourses";
import AdminCourse from "./pages/admin/adminCourse";
import AdminPaper from "./pages/admin/adminPaper";
import AdminUsers from "./pages/admin/adminUsers";
import CoordinatorCourse from "./pages/coordinator/coordinatorCourse";
import CoordinatorCourses from "./pages/coordinator/coordinatorCourses";
import CoordinatorPaper from "./pages/coordinator/coordinatorpaper";
import ModeratorCourses from "./pages/moderator/moderatorCourses";
import ModeratorCourse from "./pages/moderator/moderatorCourse";
import ModeratorPaper from "./pages/moderator/moderatorpaper";
import ProtectedRoute from "./components/protectRoute";
import FacultyEditPaper from "./pages/faculty/facultyEditPaper";



const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Login />} />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/admin/courses" element={<ProtectedRoute element={<AdminCourses />} />} />
          <Route path="/admin/courses/:courseid" element={<ProtectedRoute element={<AdminCourse />} />} />
          <Route path="/admin/courses/:courseid/:paperid" element={<ProtectedRoute element={<AdminPaper />} />} />
          <Route path="/admin/users" element={<ProtectedRoute element={<AdminUsers />} />} />
          <Route path="/admin/approvals" element={<ProtectedRoute element={<AdminApproval />} />} />

          <Route path="/faculty/dashboard" element={<ProtectedRoute element={<FacultyDashboard />} />} />
          <Route path="/faculty/courses" element={<ProtectedRoute element={<FacultyCourses />} />} />
          <Route path="/faculty/courses/:courseid" element={<ProtectedRoute element={<FacultyCourse />} />} />
          <Route path="/faculty/courses/:courseid/addpaper" element={<ProtectedRoute element={<FacultyAddPaper />} />} />
          <Route path="/faculty/courses/:courseid/:paperid" element={<ProtectedRoute element={<FacultyPaper />} />} />
          <Route path="/faculty/courses/:courseid/:paperid/edit" element={<ProtectedRoute element={<FacultyEditPaper />} />} />

          <Route path="/coordinator/dashboard" element={<ProtectedRoute element={<CoordinatorDashboard />} />} />
          <Route path="/coordinator/courses" element={<ProtectedRoute element={<CoordinatorCourses />} />} />
          <Route path="/coordinator/courses/:courseid" element={<ProtectedRoute element={<CoordinatorCourse />} />} />
          <Route path="/coordinator/courses/:courseid/:paperid" element={<ProtectedRoute element={<CoordinatorPaper />} />} />

          <Route path="/moderator/dashboard" element={<ProtectedRoute element={<ModeratorDashboard />} />} />
          <Route path="/moderator/courses" element={<ProtectedRoute element={<ModeratorCourses />} />} />
          <Route path="/moderator/courses/:courseid" element={<ProtectedRoute element={<ModeratorCourse />} />} />
          <Route path="/moderator/courses/:courseid/:paperid" element={<ProtectedRoute element={<ModeratorPaper />} />} />

        </Routes>

      </Router>
    </QueryClientProvider>
  );
};

export default App;
