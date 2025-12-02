import { MetricHistoryPage } from "@/components/MetricHistoryPage";

const generateHistoricalData = () => {
  const baseValue = 3.2;
  const data = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < 12; i++) {
    data.push({
      date: `${months[i]} 2024`,
      value: parseFloat((baseValue + (i * 0.08) + (Math.random() * 0.1)).toFixed(2)),
    });
  }

  return data;
};

const SEOCTRHistory = () => {
  const data = generateHistoricalData();

  return (
    <MetricHistoryPage
      title="Click-Through Rate History"
      description="Analyze your CTR performance and identify optimization opportunities"
      metricName="CTR (%)"
      data={data}
      currentValue="4.2%"
      change={12.1}
    />
  );
};

export default SEOCTRHistory;
