import { MetricHistoryPage } from "@/components/MetricHistoryPage";

const generateHistoricalData = () => {
  const baseValue = 65;
  const data = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < 12; i++) {
    data.push({
      date: `${months[i]} 2024`,
      value: Math.round(baseValue + (i * 1.7) + (Math.random() * 2)),
    });
  }

  return data;
};

const SEOVisibilityHistory = () => {
  const data = generateHistoricalData();

  return (
    <MetricHistoryPage
      title="Search Visibility History"
      description="Track your domain's visibility in search results over time"
      metricName="Visibility Score (%)"
      data={data}
      currentValue="85%"
      change={8.2}
    />
  );
};

export default SEOVisibilityHistory;
