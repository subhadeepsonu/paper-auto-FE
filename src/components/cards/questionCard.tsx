export default function QuestionData(props: {
    questions: {
        CoordinatorApproval: string,
        ModeratorApproval: string,
        questions: {
            text: string,
            marks: string
        }[]
    }
}) {

    return (
        <div className="w-3/5 p-6 bg-white shadow-lg rounded-lg  h-4/5 overflow-y-auto">
            <div className="flex  justify-between items-center">
                <div className="w-fit">
                    Coordinator Approval: {props.questions.CoordinatorApproval}
                </div>
                <div className="  w-fit">
                    Moderator Approval: {props.questions.ModeratorApproval}
                </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                Questions and Weightage Marks
            </h2>
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="border border-black px-4 py-2 text-left">Q.No</th>
                        <th className="border border-black px-4 py-2 text-left">Questions</th>
                        <th className="border border-black px-4 py-2 text-center">Question Weightage</th>
                    </tr>
                </thead>
                <tbody>
                    {props.questions.questions.map((q, index: number) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="border border-black px-4 py-2">{index + 1}</td>
                            <td className="border border-black px-4 py-2">{q.text}</td>
                            <td className="border border-black px-4 py-2 text-center font-bold">{q.marks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

