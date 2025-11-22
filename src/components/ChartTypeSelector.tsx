import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, AreaChart as AreaChartIcon, PieChart } from "lucide-react";

export type ChartType = "bar" | "line" | "area" | "pie";

interface ChartTypeSelectorProps {
  currentType: ChartType;
  onTypeChange: (type: ChartType) => void;
  availableTypes?: ChartType[];
}

export const ChartTypeSelector = ({ 
  currentType, 
  onTypeChange,
  availableTypes = ["bar", "line", "area"]
}: ChartTypeSelectorProps) => {
  const iconMap = {
    bar: BarChart3,
    line: LineChart,
    area: AreaChartIcon,
    pie: PieChart
  };

  return (
    <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
      {availableTypes.map((type) => {
        const Icon = iconMap[type];
        return (
          <Button
            key={type}
            variant={currentType === type ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onTypeChange(type)}
            className="h-8 w-8 p-0"
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
};
