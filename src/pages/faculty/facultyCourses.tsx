import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
import GeneralCoursesCard from "../../components/cards/generalCourseCard"
import { Course } from "@/types/types";
export default function FacultyCourses() {
    const QueryCourse = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const resp = await axios.get(`${BASEURL}/course/my`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            return resp.data
        }
    })
    if (QueryCourse.isLoading) {
        return <div className="h-full fleex justify-center items-center w-full ">Loading...</div>
    }
    if (QueryCourse.isError) {
        return <div className="h-full fleex justify-center items-center w-full ">Error...</div>
    }
    return (
        <div className="min-h-screen w-full flex justify-center bg-gray-100 items-start pt-20 ">
            <div className="grid grid-cols-4 w-full gap-4 px-4">
                {QueryCourse.data.map((course: Course) => {
                    return <GeneralCoursesCard key={course.id} coordinator={course.coordinator.name} moderator={course.moderator.name} no_of_papers={course._count.papers} Id={course.id} courseCode={course.code} courseName={course.name} />
                })}
            </div>
        </div>
    );
}