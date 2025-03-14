import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
import { useState } from "react";
import FormPopUp from "../../components/model";
import GeneralCoursesCard from "../../components/cards/generalCourseCard"
import { Course } from "@/types/types";
import { Button } from "@/components/ui/button";
export default function AdminCourses() {
    const [open, Setopen] = useState(false)
    const QueryCourse = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const resp = await axios.get(`${BASEURL}/course`, {
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
        <div className="min-h-screen bg-gray-100 w-full flex justify-center items-start pt-20 ">
            <FormPopUp open={open} setOpen={Setopen} form={<div className="h-96 w-80 rounded-md"></div>} title={"Add course"} />
            <Button onClick={() => {
                console.log("clicked")
                Setopen(true)
            }} className="fixed bottom-5 right-5 cursor-pointer" >Add course</Button>
            <div className="grid grid-cols-4 w-full gap-4 px-4">
                {QueryCourse.data.map((course: Course) => {
                    return <GeneralCoursesCard no_of_papers={course._count.papers} coordinator={course.coordinator.name} moderator={course.moderator.name} key={course.id} Id={course.id} courseCode={course.code} courseName={course.name} />
                })}
            </div>
        </div>
    );
}