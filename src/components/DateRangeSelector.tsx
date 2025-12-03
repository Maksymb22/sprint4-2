import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { format, subDays, subMonths, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { DateRange } from "react-day-picker";

interface DateRangeSelectorProps {
  onRangeChange?: (range: DateRange | undefined) => void;
  className?: string;
}

const presetRanges = [
  { label: "Today", getValue: () => ({ from: new Date(), to: new Date() }) },
  { label: "Last 7 days", getValue: () => ({ from: subDays(new Date(), 7), to: new Date() }) },
  { label: "Last 30 days", getValue: () => ({ from: subDays(new Date(), 30), to: new Date() }) },
  { label: "Last 90 days", getValue: () => ({ from: subDays(new Date(), 90), to: new Date() }) },
  { label: "This Month", getValue: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
  { label: "Last Month", getValue: () => ({ from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) }) },
  { label: "This Year", getValue: () => ({ from: startOfYear(new Date()), to: endOfYear(new Date()) }) },
  { label: "Last Year", getValue: () => ({ from: startOfYear(subMonths(new Date(), 12)), to: endOfYear(subMonths(new Date(), 12)) }) },
];

export const DateRangeSelector = ({ onRangeChange, className }: DateRangeSelectorProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [compareMode, setCompareMode] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onRangeChange?.(newDate);
  };

  const handlePresetSelect = (preset: typeof presetRanges[0]) => {
    const range = preset.getValue();
    handleDateChange(range);
    // Close popover after preset selection
    setOpen(false);
  };

  const handleApply = () => {
    setOpen(false);
  };

  const formatDateRange = () => {
    if (!date?.from) return "Select date range";
    if (!date.to) return format(date.from, "PP");
    return `${format(date.from, "PP")} - ${format(date.to, "PP")}`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left font-normal min-w-[280px]">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="flex-1 text-xs sm:text-sm">{formatDateRange()}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            {/* Preset Ranges Sidebar */}
            <div className="border-r p-3 space-y-1 bg-muted/30">
              <p className="text-sm font-medium mb-2">Quick Select</p>
              {presetRanges.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm"
                  onClick={() => handlePresetSelect(preset)}
                >
                  {preset.label}
                </Button>
              ))}
              <div className="pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm"
                  onClick={() => setCompareMode(!compareMode)}
                >
                  {compareMode ? "✓ " : ""}Compare to Previous
                </Button>
              </div>
            </div>

            {/* Calendar */}
            <div className="p-3">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleDateChange}
                numberOfMonths={2}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-3 flex items-center justify-between bg-muted/30">
            <p className="text-sm text-muted-foreground">
              {date?.from && date?.to
                ? `${Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))} days selected`
                : "Select a date range"}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleDateChange(undefined);
                  setOpen(false);
                }}
              >
                Clear
              </Button>
              <Button size="sm" onClick={handleApply}>Apply</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {compareMode && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>vs</span>
          <Button variant="outline" size="sm">
            Previous Period
          </Button>
        </div>
      )}
    </div>
  );
};
