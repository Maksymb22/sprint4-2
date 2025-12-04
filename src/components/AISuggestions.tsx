import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Suggestion {
  type: "insight" | "warning" | "opportunity";
  title: string;
  description: string;
}

interface AISuggestionsProps {
  suggestions: Suggestion[];
  title?: string;
}

export const AISuggestions = ({ suggestions, title = "AI Strategic Insights" }: AISuggestionsProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "insight":
        return <Lightbulb className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "opportunity":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getBadgeVariant = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case "insight":
        return "default";
      case "warning":
        return "destructive";
      case "opportunity":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex gap-3 p-3 rounded-lg bg-card border border-border transition-colors">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(suggestion.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm text-foreground">{suggestion.title}</h4>
                  <Badge variant={getBadgeVariant(suggestion.type)} className="text-xs">
                    {suggestion.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
