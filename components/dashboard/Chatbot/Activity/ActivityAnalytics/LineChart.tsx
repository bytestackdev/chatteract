'use client'
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const LineChart = () => {
	const options: ApexOptions = {
		chart: {
			height: 350,
			type: 'line',
			toolbar: {
				show: false
			}
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
		},
	};

	const series = [
		{
			name: 'Users',
			data: [10, 20, 30, 40, 50, 60, 70],
		},
	];

	return (
		<div className='mt-5'>
			<h2 className=' text-2xl font-semibold '>Monthly User Growth</h2>
			<ApexCharts options={options} series={series} type="line" height={350} />
		</div>
	)
};

export default LineChart;
