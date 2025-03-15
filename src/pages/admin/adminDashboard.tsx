import CourseUploadForms from "@/components/excel/courseExcel";
import FacultyUploadForms from "@/components/excel/facultyExcel";
import UserUploadForms from "@/components/excel/userExcel";

export default function AdminDashboard() {
    return (
        <div className="flex justify-between items-center h-screen w-full">
            <UserUploadForms />
            <FacultyUploadForms />
            <CourseUploadForms />
        </div>
    );
}