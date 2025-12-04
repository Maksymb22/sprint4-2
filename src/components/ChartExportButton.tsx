import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";
import html2canvas from "html2canvas";
import { useRef, RefObject } from "react";

interface ChartExportButtonProps {
  chartRef: RefObject<HTMLDivElement>;
  filename?: string;
  className?: string;
}

export const ChartExportButton = ({ chartRef, filename = "chart", className }: ChartExportButtonProps) => {
  const handleExport = async () => {
    if (!chartRef.current) return;

    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: "#ffffff",
        scale: 2, // Higher quality
        logging: false,
      });

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${filename}-${new Date().toISOString().split('T')[0]}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error("Error exporting chart:", error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className={className}
    >
      <ImageIcon className="h-4 w-4 mr-2" />
      Export Image
    </Button>
  );
};
