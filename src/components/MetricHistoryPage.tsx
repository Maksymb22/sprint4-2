import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MetricHistoryPageProps {
  title: string;
  description: string;
  metricName: string;
  data: Array<{ date: string; value: number }>;
  currentValue: string;
  change: number;
}

export const MetricHistoryPage = ({
  title,
  description,
  metricName,
  data,
  currentValue,
  change,
}: MetricHistoryPageProps) => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{currentValue}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Change</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
                {change > 0 ? '+' : ''}{change}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Data Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{data.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historical Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name={metricName}
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Value</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Change from Previous</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    const previousValue = index > 0 ? data[index - 1].value : item.value;
                    const changeFromPrevious = previousValue !== 0
                      ? ((item.value - previousValue) / previousValue * 100).toFixed(1)
                      : '0.0';

                    return (
                      <tr key={index} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                        <td className="py-3 px-4 text-sm">{item.date}</td>
                        <td className="text-right py-3 px-4 text-sm font-medium">{item.value.toLocaleString()}</td>
                        <td className="text-right py-3 px-4 text-sm">
                          <span className={`${
                            parseFloat(changeFromPrevious) > 0 ? 'text-success' :
                            parseFloat(changeFromPrevious) < 0 ? 'text-destructive' :
                            'text-muted-foreground'
                          }`}>
                            {parseFloat(changeFromPrevious) > 0 ? '+' : ''}{changeFromPrevious}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};
