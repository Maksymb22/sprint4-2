import { MetricHistoryPage } from "@/components/MetricHistoryPage";

const generateHistoricalData = () => {
  const baseValue = 45;
  const data = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < 12; i++) {
    data.push({
      date: `${months[i]} 2024`,
      value: Math.round(baseValue + (i * 2.8) + (Math.random() * 3)),
    });
  }

  return data;
};

const SEOKeywordRankingsHistory = () => {
  const data = generateHistoricalData();

  return (
    <MetricHistoryPage
      title="Keyword Rankings History"
      description="Track your keyword rankings performance over time"
      metricName="Keywords in Top 10"
      data={data}
      currentValue="78"
      change={15.3}
    />
  );
};

export default SEOKeywordRankingsHistory;
