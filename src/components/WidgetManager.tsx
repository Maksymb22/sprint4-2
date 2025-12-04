import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Widget {
  id: string;
  label: string;
  description?: string;
}

interface WidgetManagerProps {
  widgets: Widget[];
  visibleWidgets: string[];
  onToggleWidget: (widgetId: string) => void;
  className?: string;
}

export const WidgetManager = ({
  widgets,
  visibleWidgets,
  onToggleWidget,
  className,
}: WidgetManagerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={className}>
          <Settings2 className="h-4 w-4 mr-2" />
          Customize
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Dashboard</DialogTitle>
          <DialogDescription>
            Select which widgets you want to display on your dashboard
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-4 py-4">
            {widgets.map((widget) => {
              const isVisible = visibleWidgets.includes(widget.id);
              return (
                <div
                  key={widget.id}
                  className="flex items-start space-x-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    id={widget.id}
                    checked={isVisible}
                    onCheckedChange={() => onToggleWidget(widget.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 space-y-1">
                    <Label
                      htmlFor={widget.id}
                      className="cursor-pointer font-medium leading-none"
                    >
                      {widget.label}
                    </Label>
                    {widget.description && (
                      <p className="text-sm text-muted-foreground">
                        {widget.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
