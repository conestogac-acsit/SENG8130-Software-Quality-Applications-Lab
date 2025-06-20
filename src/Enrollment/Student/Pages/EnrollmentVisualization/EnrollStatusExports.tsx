import React from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

const EnrollStatusExports: React.FC = () => {
    const exportEntirePage = () => {
        const element = document.getElementById('enrollment-dashboard');
        if (element) {
            toPng(element, {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: '#ffffff'
            })
                .then(dataUrl => download(dataUrl, 'enrollment-dashboard.png'))
                .catch(err => {
                    console.error('Export failed:', err);
                    alert('Export failed. Please try again.');
                });
        } else {
            console.error('Dashboard element not found');
            alert('Dashboard not found. Please ensure the page is loaded.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Export Dashboard</h3>
            <div className="flex justify-center">
                <button
                    onClick={exportEntirePage}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-3"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Export Entire Dashboard as PNG
                </button>
            </div>
        </div>
    );
};

export default EnrollStatusExports;