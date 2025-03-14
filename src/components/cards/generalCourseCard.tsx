import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function GeneralCoursesCard(props: {
    courseCode: string;
    courseName: string;
    Id: string;
    no_of_papers: number;
    moderator: string;
    coordinator: string;
}) {
    const navigate = useNavigate();
    const role = localStorage.getItem("role")?.toLowerCase();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.courseName}</CardTitle>
                <CardDescription>{props.courseCode}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p><strong>{props.no_of_papers}</strong> Papers</p>
                    <p><strong>Moderator:</strong> {props.moderator}</p>
                    <p><strong>Coordinator:</strong> {props.coordinator}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => role && navigate(`/${role}/courses/${props.Id}`)}
                    className="cursor-pointer"
                >
                    View
                </Button>
            </CardFooter>
        </Card>
    );
}
