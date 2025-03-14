import { useParams } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../../utils/constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QuestionData from "../../components/cards/questionCard"
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CommentsBar from "@/components/commentsBar";
export default function ModeratorPaper() {
    const params = useParams()
    const paperid = params.paperid
    const queryClient = useQueryClient()
    const MutatePermission = useMutation({
        mutationFn: async (data: {
            status: string
        }) => {
            const resp = await axios.put(`${BASEURL}/paper/moderator/${paperid}`, {
                status: data.status
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            })
            return resp.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["paper"]
            })
            toast.success("Permission Updated")
        }
        ,
        onError: (error: any) => {
            toast.error(error.response.data.message)
        }
    })
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
            <Button onClick={() => MutatePermission.mutate({
                status: "APPROVED"
            })} disabled={MutatePermission.isPending} className="fixed bottom-5 right-5    hover:cursor-pointer">{(MutatePermission.isPending) ? "..." : ` approve`}</Button>
            <Button onClick={() => MutatePermission.mutate({
                status: "REJECTED"
            })} disabled={MutatePermission.isPending} className="fixed bottom-5 right-30 rounded-md px-4 hover:cursor-pointer">{(MutatePermission.isPending) ? "..." : ` Reject`}</Button>
            <QuestionData questions={QueryPaper.data} />
            <CommentsBar />
        </div>
    );
}