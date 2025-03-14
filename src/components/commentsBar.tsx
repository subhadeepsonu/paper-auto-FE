import { BASEURL } from "@/utils/constant"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom"
import CommentCard from "./cards/commentCard"
import { Comment } from "@/types/types"
import AddCommentForm from "./forms/addCommentForm"
import { Button } from "./ui/button"
import { useState } from "react"
import FormPopUp from "./model"

export default function CommentsBar() {
    const params = useParams()
    const paperid = params.paperid
    const [openComment, setComment] = useState(false)
    const QueryComments = useQuery({
        queryKey: ["comments", paperid],
        queryFn: async () => {
            const resp = await axios.get(`${BASEURL}/comments?paperId=${paperid}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            })
            return resp.data
        }
    })

    if (QueryComments.isLoading) return <div>Loading...</div>
    if (QueryComments.error) return <div>Error...</div>

    return (
        <div className="w-2/6 h-4/5 bg-white shadow-lg rounded-lg px-6 py-4 relative">

            <div className="h-full overflow-y-auto pr-2  space-y-3">
                {QueryComments.data.data.map((comment: Comment) => {
                    return <CommentCard
                        date={comment.createdAt}
                        name={comment.user.name}
                        role={comment.userRole}
                        text={comment.text}
                        key={comment.id}
                    />
                })}
            </div>


            <div className="absolute bottom-4 right-6">
                <Button
                    className="cursor-pointer"
                    onClick={() => setComment(true)}
                >
                    Add comment
                </Button>
            </div>

            <FormPopUp
                form={<AddCommentForm setopen={setComment} />}
                open={openComment}
                setOpen={setComment}
                title="Add Comment"
            />
        </div>
    )
}