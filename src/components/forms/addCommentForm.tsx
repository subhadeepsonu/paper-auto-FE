import { BASEURL } from "@/utils/constant"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
export default function AddCommentForm(props: {
    setopen: any
}) {
    const CommentSchema = z.object({
        text: z.string(),
    })
    const params = useParams()
    const paperId = params.paperid
    const form = useForm({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            text: ""
        }
    })
    const queryClient = useQueryClient()
    const MutateComment = useMutation<z.infer<typeof CommentSchema>>({
        mutationFn: async () => {
            const resp = await axios.post(`${BASEURL}/comments`, {
                ...form.getValues(),
                paperId: paperId
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            })
            return resp.data
        }, onSuccess: () => {
            form.reset()
            toast.success("Comment added successfully.")
            queryClient.invalidateQueries({
                queryKey: ["comments"]
            })
            props.setopen(false)
        }, onError: () => {
            toast.error("Failed to add comment.")
        }
    })
    return <div className="h-32 w-full flex justify-center items-center ">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => {
                MutateComment.mutate()
            })} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Comment</FormLabel>
                            <FormControl>
                                <Input placeholder="Comment..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={MutateComment.isPending} className="cursor-pointer" type="submit">{(MutateComment.isPending) ?
                    (
                        <>
                            <svg
                                className="mr-2 h-4 w-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Signing in...
                        </>
                    ) : "Add Comment"
                }</Button>
            </form>
        </Form>
    </div>
}