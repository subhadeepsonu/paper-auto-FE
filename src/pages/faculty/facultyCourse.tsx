import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
import PaperCard from "../../components/cards/paperCard";
import { useNavigate } from "react-router-dom";
import { Paper } from "@/types/types";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/loadingScreen";
export default function FacultyCourse() {
    const params = useParams()
    const courseid = params.courseid
    const navigate = useNavigate()
    const QueryPapers = useQuery({
        queryKey: ["papers", courseid],
        queryFn: async () => {
            const resp = await axios.get(`${BASEURL}/paper/bycourse?courseId=${courseid}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            return resp.data
        }
    })
    if (QueryPapers.isLoading) return <LoadingScreen />
    if (QueryPapers.isError) return <div>Error...</div>
    return (
        <div className="h-screen flex bg-gray-100 justify-center items-start pt-20">
            <Button onClick={() => {
                navigate(`/faculty/courses/${courseid}/addpaper`)
            }} className="fixed bottom-5 right-5  hover:cursor-pointer">Add paper</Button>
            <div className="w-full grid grid-cols-4 gap-4 px-4 ">
                {QueryPapers.data.map((paper: Paper) => (
                    <PaperCard coordStatus={paper.CoordinatorApproval} modStatus={paper.CoordinatorApproval} submittedOn={paper.createdAt} id={paper.id} key={paper.id} professor={paper.faculty.name} />
                ))}
            </div>

        </div>
    );
}