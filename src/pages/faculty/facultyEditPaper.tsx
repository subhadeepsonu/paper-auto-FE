import EditPaper from "@/components/forms/editPaper";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
export default function FacultyEditPaper() {
    const params = useParams()
    const paperid = params.paperid
    const QueryPaper = useQuery({
        queryKey: ["paper", paperid],
        queryFn: async () => {
            const resp = await axios.get(`${BASEURL}/paper/${paperid}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            })
            return resp.data
        }
    })
    if (QueryPaper.isLoading) return <div>Loading...</div>
    if (QueryPaper.isError) return <div>Error...</div>
    return (
        <div className="h-screen w-full flex justify-center bg-gray-100 items-center">
            <EditPaper questions={QueryPaper.data.questions} />
        </div>
    );
}