import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function PaperCard(props: {
    id: string;
    professor: string;
    submittedOn: string;
    modStatus: "PENDING" | "APPROVED" | "REJECTED";
    coordStatus: "PENDING" | "APPROVED" | "REJECTED";
}) {
    const navigate = useNavigate();
    const role = localStorage.getItem("role")?.toLowerCase();
    const { courseid } = useParams();

    const handleClick = () => {
        navigate(`/${role}/courses/${courseid}/${props.id}`);
    };
    const date = new Date(props.submittedOn);
    const formattedDate = date.toLocaleDateString("en-GB");
    const [coordStatus, setCoordStatus] = useState("")
    const [modStatus, setModStatus] = useState("")
    useEffect(() => {
        if (props.modStatus === "PENDING") {
            setModStatus("text-yellow-600")
        } else if (props.modStatus === "APPROVED") {
            setModStatus("text-green-600")
        } else {
            setModStatus("text-red-600")
        }
        if (props.coordStatus === "PENDING") {
            setCoordStatus("text-yellow-600")
        } else if (props.coordStatus === "APPROVED") {
            setCoordStatus("text-green-600")
        } else {
            setCoordStatus("text-red-600")
        }
    }, [props.modStatus, props.coordStatus])

    return (
        <Card >
            <CardHeader>
                <CardTitle>📄 Question Paper</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p>👨‍🏫 <strong>Submitted By:</strong> {props.professor}</p>
                <p>📅 <strong>Submitted On:</strong> {formattedDate}</p>
                <p className={`${modStatus}`}>📝 <strong className="text-black">Moderator Status:</strong> {props.modStatus}</p>
                <p className={`${coordStatus}`}>🔍 <strong className="text-black">Coordinator Status:</strong> {props.coordStatus}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={handleClick} className="cursor-pointer">
                    View Paper
                </Button>
            </CardFooter>
        </Card>
    );
}
