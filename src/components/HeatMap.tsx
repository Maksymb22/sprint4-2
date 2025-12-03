import { useState } from "react";

interface HeatMapProps {
  title: string;
  data: number[][];
  xLabels: string[];
  yLabels: string[];
}

interface HoverInfo {
  value: number;
  day: string;
  time: string;
  x: number;
  y: number;
}

export const HeatMap = ({ title, data, xLabels, yLabels }: HeatMapProps) => {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const maxValue = Math.max(...data.flat());
  const minValue = Math.min(...data.flat());

  const getColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);

    if (normalized > 0.75) return "bg-green-500";
    if (normalized > 0.5) return "bg-green-400";
    if (normalized > 0.25) return "bg-yellow-400";
    return "bg-gray-300";
  };

  const getTextColor = (value: number) => {
    const normalized = (value - minValue) / (maxValue - minValue);
    return normalized > 0.5 ? "text-white" : "text-gray-700";
  };

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div className="flex justify-center">
        <div className="relative">
          <div className="flex">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-around pr-4">
              <div className="h-8" /> {/* Spacer for x-axis labels */}
              {yLabels.map((label, index) => (
                <div
                  key={index}
                  className="h-12 flex items-center justify-end text-sm text-muted-foreground"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Heat map grid */}
            <div>
              {/* X-axis labels */}
              <div className="flex mb-2">
                {xLabels.map((label, index) => (
                  <div
                    key={index}
                    className="w-16 h-8 flex items-center justify-center text-sm text-muted-foreground"
                  >
                    {label}
                  </div>
                ))}
              </div>

              {/* Data grid */}
              {data.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((value, colIndex) => (
                    <div
                      key={colIndex}
                      className={`relative w-16 h-12 flex items-center justify-center text-xs font-medium border border-border ${getColor(value)} ${getTextColor(value)} cursor-pointer hover:opacity-90 hover:scale-105 transition-all`}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoverInfo({
                          value,
                          day: yLabels[rowIndex],
                          time: xLabels[colIndex],
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setHoverInfo(null)}
                    >
                      {value}%
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">Low</span>
            <div className="flex gap-1">
              <div className="w-12 h-6 bg-gray-300 border border-border" />
              <div className="w-12 h-6 bg-yellow-400 border border-border" />
              <div className="w-12 h-6 bg-green-400 border border-border" />
              <div className="w-12 h-6 bg-green-500 border border-border" />
            </div>
            <span className="text-sm text-muted-foreground">High</span>
          </div>

          {/* Hover Tooltip */}
          {hoverInfo && (
            <div
              className="fixed z-50 pointer-events-none"
              style={{
                left: `${hoverInfo.x}px`,
                top: `${hoverInfo.y - 80}px`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="bg-card border border-border rounded-lg shadow-lg p-3 animate-in fade-in duration-200">
                <div className="text-sm space-y-1">
                  <div className="font-semibold text-foreground">{hoverInfo.day} at {hoverInfo.time}</div>
                  <div className="text-primary font-bold text-lg">{hoverInfo.value}% Engagement</div>
                  <div className="text-xs text-muted-foreground">
                    {hoverInfo.value >= maxValue * 0.75 ? "Peak engagement time" :
                     hoverInfo.value >= maxValue * 0.5 ? "Good engagement time" :
                     hoverInfo.value >= maxValue * 0.25 ? "Moderate engagement" :
                     "Low engagement"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
