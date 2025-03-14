import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";

export default function CommentCard(props: {
    name: string;
    role: "ADMIN" | "COORDINATOR" | "MODERATOR" | "FACULTY";
    text: string;
    date: string;
}) {
    return (
        <Card className="border w-full border-gray-200 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    {props.name}
                    <Badge>{props.role}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-700">{props.text}</p>
                <p className="text-xs text-gray-500 mt-2">{new Date(props.date).toDateString()}</p>
            </CardContent>
        </Card>
    );
}
