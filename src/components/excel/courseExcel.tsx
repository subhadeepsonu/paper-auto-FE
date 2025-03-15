import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { BASEURL } from "@/utils/constant";

async function uploadData(data: any) {
    const response = await axios.post(`${BASEURL}/course/excel`, data, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
    return response.data
}

export default function CourseUploadForms() {
    const [file, setFile] = useState<File | null>(null);

    const userMutation = useMutation({
        mutationFn: (data) => uploadData(data),
        onSuccess: () => {
            toast.success("users created")
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, mutation: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFile(file);

        const reader = new FileReader();
        reader.onload = async (event) => {
            const data = new Uint8Array(event.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            console.log(jsonData);
            mutation.mutate(jsonData);
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="grid gap-4 p-6">
            {[{ label: "Upload Users", mutation: userMutation }].map(({ label, mutation }) => (
                <Card key={label}>
                    <CardHeader>
                        <CardTitle>{label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Label>Select Excel File for  Course:</Label>
                        <Input type="file" accept=".xlsx, .xls" onChange={(e) => handleFileUpload(e, mutation)} />
                        <Button className="mt-2" onClick={() => file && handleFileUpload({ target: { files: [file] } } as any, mutation)} disabled={mutation.isPending}>
                            {mutation.isPending ? "Uploading..." : "Upload"}
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
