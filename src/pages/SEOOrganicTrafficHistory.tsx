import { MetricHistoryPage } from "@/components/MetricHistoryPage";

const generateHistoricalData = () => {
  const baseValue = 1200;
  const data = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < 12; i++) {
    data.push({
      date: `${months[i]} 2024`,
      value: Math.round(baseValue + (i * 120) + (Math.random() * 100)),
    });
  }

  return data;
};

const SEOOrganicTrafficHistory = () => {
  const data = generateHistoricalData();

  return (
    <MetricHistoryPage
      title="Organic Traffic History"
      description="Monitor your organic traffic trends and growth patterns"
      metricName="Monthly Visitors"
      data={data}
      currentValue="2,680"
      change={22.5}
    />
  );
};

export default SEOOrganicTrafficHistory;
