'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import type { SeriesPieOptions } from 'highcharts';

interface Props {
  data: (string | number | null)[] | { label: string; value: number }[];
  isCounted?: boolean;
}

export default function PieChart({ data, isCounted }: Props) {
  const chartData = useMemo(() => {
    if (isCounted) {
      return (data as { label: string; value: number }[]).map(({ label, value }) => ({
        name: label,
        y: value,
      }));
    } else {
      const countMap = (data as (string | number | null)[]).reduce((acc: Record<string, number>, value) => {
        const key = value ?? 'Empty';
        acc[String(key)] = (acc[String(key)] || 0) + 1;
        return acc;
      }, {});
      return Object.entries(countMap).map(([name, y]) => ({ name, y }));
    }
  }, [data, isCounted]);

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      height: 500,
    },
    title: {
      text: 'Distribusi Data',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        colorByPoint: true, // tetap dipakai
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      } as Highcharts.PlotPieOptions, 
    },
    series: [
      {
        type: 'pie',
        name: 'Jumlah',
        data: chartData,
      } as SeriesPieOptions,
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
