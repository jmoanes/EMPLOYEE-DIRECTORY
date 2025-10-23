import React, { useRef } from 'react';

const ImportCSV = ({ onImport }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          alert('CSV file is empty or invalid');
          return;
        }

        // Skip header row
        const dataLines = lines.slice(1);
        const employees = [];

        for (let i = 0; i < dataLines.length; i++) {
          const line = dataLines[i].trim();
          if (!line) continue;

          // Handle quoted fields
          const fields = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
          const cleanFields = fields.map(field => field.replace(/^"|"$/g, '').trim());

          if (cleanFields.length >= 4) {
            employees.push({
              name: cleanFields[0],
              email: cleanFields[1],
              role: cleanFields[2],
              department: cleanFields[3]
            });
          }
        }

        if (employees.length === 0) {
          alert('No valid employee data found in CSV');
          return;
        }

        onImport(employees);
        
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error parsing CSV:', error);
        alert('Error parsing CSV file. Please check the format.');
      }
    };

    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="import-csv">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <button onClick={handleButtonClick} className="btn btn-import">
        📤 Import CSV
      </button>
      <span className="import-hint">CSV format: Name, Email, Role, Department</span>
    </div>
  );
};

export default ImportCSV;
