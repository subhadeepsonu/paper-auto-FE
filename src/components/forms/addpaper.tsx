import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASEURL } from "../../utils/constant";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function QuestionUpload() {
    const [questions, setQuestions] = useState([{ text: "" }]);
    const params = useParams();
    const courseid = params.courseid;
    const navigate = useNavigate();
    const handleChange = (index: number, field: keyof typeof questions[0], value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const MutatePaper = useMutation({
        mutationFn: async () => {
            const resp = await axios.post(`${BASEURL}/paper`, {
                courseId: courseid,
                questions,
                name: "Test Paper"
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            return resp.data;
        },
        onSuccess: () => {
            toast.success("Questions uploaded successfully.");
            navigate(`/faculty/courses/${courseid}`);
        },
        onError: () => {
            toast.error("Failed to upload questions.");
        }
    });

    const handleAddQuestion = () => {
        setQuestions([...questions, { text: "" }]);
    };

    const handleRemoveQuestion = (index: number) => {
        if (questions.length > 1) {
            setQuestions(questions.filter((_, i) => i !== index));
        } else {
            toast.error("At least one question is required.");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (questions.some(q => q.text.trim() === "")) {
            toast.error("Please enter all questions before submitting.");
            return;
        }
        MutatePaper.mutate();
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 py-20">
            <div className="w-3/4 flex flex-col items-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Upload Questions</h2>
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    {questions.map((question, index) => (
                        <div key={index} className="p-5 bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-700">Question {index + 1}</h3>
                                {questions.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveQuestion(index)}
                                        className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            <textarea
                                className="p-3 mt-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={question.text}
                                onChange={(e) => handleChange(index, "text", e.target.value)}
                                placeholder={`Enter Question ${index + 1}`}
                                rows={3}
                            />
                        </div>
                    ))}
                    <div className="flex gap-4">
                        <Button type="button" onClick={handleAddQuestion} className="bg-green-500 text-white hover:bg-green-600">
                            + Add Question
                        </Button>
                        <Button type="submit" disabled={MutatePaper.isPending} className="bg-blue-500 text-white hover:bg-blue-600">
                            {MutatePaper.isPending ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
