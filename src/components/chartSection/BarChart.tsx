'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface Props {
  data: any[];
}

export default function BarChart({ data }: Props) {
  // Hitung jumlah kemunculan setiap item
  const countMap = data.reduce((acc: Record<string, number>, value) => {
    const key = value || 'Empty'; // Handle nilai kosong
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Format untuk X dan Y axis
  const categories = Object.keys(countMap);
  const seriesData = Object.values(countMap);

  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Distribusi Data',
    },
    xAxis: {
      categories,
      title: {
        text: 'Kategori',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Jumlah',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valueSuffix: ' item',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: 'Jumlah',
        data: seriesData,
        type: 'bar',
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
