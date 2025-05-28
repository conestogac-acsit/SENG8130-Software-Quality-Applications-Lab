//Sample to check upload Csv feature
import React from 'react';
import Papa from 'papaparse';

type Evaluation = {
    Course: string;
    Title: string;
    Type: string;
    Weight: string;
    Date: string;
    Time: string;
};

interface Props {
    onUpload: (data: Evaluation[]) => void;
}

const UploadCsv: React.FC<Props> = ({ onUpload }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse<Evaluation>(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                onUpload(results.data);
            },
        });
    };

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Evaluation CSV</label>
            <input type="file" accept=".csv" onChange={handleFileChange} className="border p-2 rounded" />
        </div>
    );
};

export default UploadCsv;
