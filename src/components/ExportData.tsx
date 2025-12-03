import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileJson, FileText, FileText as FilePdf } from "lucide-react";
import { PDFExportDialog } from "./PDFExportDialog";
import { useState } from "react";

interface ExportDataProps {
  data: any[];
  filename: string;
  className?: string;
}

export const ExportData = ({ data, filename, className }: ExportDataProps) => {
  const [showPDFDialog, setShowPDFDialog] = useState(false);

  const exportToCSV = () => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas
        return typeof value === 'string' && value.includes(',')
          ? `"${value}"`
          : value;
      }).join(','))
    ].join('\n');

    downloadFile(csvContent, `${filename}.csv`, 'text/csv');
  };

  const exportToJSON = () => {
    if (!data || data.length === 0) return;

    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, `${filename}.json`, 'application/json');
  };

  const exportToTXT = () => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const txtContent = [
      headers.join('\t'),
      ...data.map(row => headers.map(header => row[header]).join('\t'))
    ].join('\n');

    downloadFile(txtContent, `${filename}.txt`, 'text/plain');
  };

  const exportToExcel = () => {
    // For a real implementation, you'd use a library like xlsx
    // For now, we'll just export as CSV which can be opened in Excel
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',')
          ? `"${value}"`
          : value;
      }).join(','))
    ].join('\n');

    downloadFile(csvContent, `${filename}.xlsx.csv`, 'text/csv');
  };

  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Choose Format</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setShowPDFDialog(true)}>
          <FilePdf className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON}>
          <FileJson className="h-4 w-4 mr-2" />
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToTXT}>
          <FileText className="h-4 w-4 mr-2" />
          Export as TXT
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <PDFExportDialog
      open={showPDFDialog}
      onOpenChange={setShowPDFDialog}
      dashboardName={filename.split('-')[0]}
    />
  );
};
