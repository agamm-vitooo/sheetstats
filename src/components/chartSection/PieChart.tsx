'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface Props {
  data: (string | number | null)[];
}

export default function PieChart({ data }: Props) {
  const countMap = data.reduce((acc: Record<string, number>, value) => {
    const key = value ?? 'Empty';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(countMap).map(([name, y]) => ({ name, y }));

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Distribusi Data',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Jumlah',
        data: chartData,
        colorByPoint: true,
      } as any, // 👈 untuk menghindari error TS strict
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
