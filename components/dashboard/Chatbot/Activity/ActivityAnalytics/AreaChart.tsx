'use client'
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically import the ApexCharts component without SSR
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const AreaChart = () => {

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
			toolbar:{
				show: false
			}
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
			width: 1
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2021-09-19T00:00:00.000Z',
        '2021-09-19T01:30:00.000Z',
        '2021-09-19T02:30:00.000Z',
        '2021-09-19T03:30:00.000Z',
        '2021-09-19T04:30:00.000Z',
        '2021-09-19T05:30:00.000Z',
        '2021-09-19T06:30:00.000Z',
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  const series = [
    {
      name: 'Series 1',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
  ];

  return (
		<>
		<h2 className=' text-2xl font-semibold '>Activity on Chatbot</h2>
		<ApexCharts options={options} series={series} type="area" height={350} width={'100%'} />
		</>
	)
};

export default AreaChart;
