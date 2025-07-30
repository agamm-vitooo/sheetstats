'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface CountedData {
  label: string;
  value: number;
}

interface Props {
  data: (string | number | null)[] | CountedData[];
  isCounted?: boolean;
}

export default function LineChart({ data, isCounted }: Props) {
  const counted = isCounted
    ? (data as CountedData[])
    : countFrequencies(data as (string | number | null)[]);

  const categories = counted.map(item => item.label);
  const seriesData = counted.map(item => item.value);

  function countFrequencies(values: (string | number | null)[]) {
    const countMap = values.reduce((acc: Record<string, number>, value) => {
      const key = value ?? 'Empty';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(countMap).map(([label, value]) => ({ label, value }));
  }

  const options: Highcharts.Options = {
    chart: {
      type: 'line',
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
      title: {
        text: 'Jumlah',
      },
    },
    tooltip: {
      shared: true,
      valueSuffix: ' item',
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: true,
      },
    },
    series: [
      {
        name: 'Jumlah',
        data: seriesData,
        type: 'line',
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
