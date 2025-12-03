interface FunnelChartProps {
  data: Array<{
    stage: string;
    count: number;
    rate: number;
  }>;
}

export const FunnelChart = ({ data }: FunnelChartProps) => {
  const maxCount = Math.max(...data.map(d => d.count));

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <div className="w-full space-y-6 py-4">
      {data.map((item, index) => {
        const widthPercentage = (item.count / maxCount) * 100;
        const prevCount = index > 0 ? data[index - 1].count : item.count;
        const dropoffRate = index > 0 ? ((prevCount - item.count) / prevCount * 100).toFixed(1) : null;

        return (
          <div key={item.stage} className="space-y-2">
            {/* Funnel Stage */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative h-20">
                  {/* Trapezoid shape using clip-path */}
                  <div
                    className="h-full mx-auto relative group cursor-pointer transition-all hover:opacity-90"
                    style={{
                      width: `${widthPercentage}%`,
                      minWidth: "50%",
                      background: colors[index % colors.length],
                      clipPath: index < data.length - 1
                        ? "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)"
                        : "polygon(15% 0%, 85% 0%, 85% 100%, 15% 100%)",
                    }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <p className="text-sm font-semibold">{item.stage}</p>
                      <p className="text-2xl font-bold">{item.count.toLocaleString()}</p>
                      <p className="text-xs opacity-90">{item.rate}% of total</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Sidebar */}
              <div className="w-32 text-right">
                <p className="text-sm font-medium">{item.count.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{item.rate}%</p>
              </div>
            </div>

            {/* Drop-off indicator */}
            {dropoffRate !== null && index < data.length - 1 && (
              <div className="flex items-center justify-center py-2">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-medium">{dropoffRate}% drop-off</span>
                  <span className="text-muted-foreground">
                    ({(prevCount - item.count).toLocaleString()} users)
                  </span>
                </div>
              </div>
            )}

            {/* Conversion rate to next stage */}
            {index < data.length - 1 && (
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-xs">
                  <span className="font-medium">
                    {((data[index + 1].count / item.count) * 100).toFixed(1)}% convert to next stage
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Overall Conversion Summary */}
      <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Visitors</p>
            <p className="text-2xl font-bold">{data[0].count.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Customers</p>
            <p className="text-2xl font-bold">{data[data.length - 1].count.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Overall Conversion</p>
            <p className="text-2xl font-bold text-primary">
              {((data[data.length - 1].count / data[0].count) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
