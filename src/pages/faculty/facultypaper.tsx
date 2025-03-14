import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
import { useQuery } from "@tanstack/react-query";
import QuestionData from "../../components/cards/questionCard"
import CommentsBar from "@/components/commentsBar";
import { Button } from "@/components/ui/button";
export default function FacultyPaper() {
    const params = useParams()
    const paperid = params.paperid
    const navigate = useNavigate()
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
        <div className="h-screen bg-gray-100 flex justify-around items-center pt-16">
            <Button onClick={() => {
                navigate(`/faculty/courses/${params.courseid}/${paperid}/edit`)
            }} className="fixed bottom-2 right-3 cursor-pointer">
                Edit
            </Button>
            <QuestionData questions={QueryPaper.data} />
            <CommentsBar />
        </div>
    );

}