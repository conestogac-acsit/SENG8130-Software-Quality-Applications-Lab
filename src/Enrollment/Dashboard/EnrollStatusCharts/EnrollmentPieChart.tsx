import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#00C49F', '#FF8042', '#8884d8'];

export interface ChartData {
  name: string;
  value: number;
}

interface PieChartCardProps {
  title: string;
  data: ChartData[];
  chartId: string;
}

const PieChartCard: React.FC<PieChartCardProps> = ({ title, data, chartId }) => (
  <div id={chartId} className="text-center">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <PieChart width={250} height={250}>
      <Pie 
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        label={({ name, value, percent }) => 
          `${name}: ${value} (${percent ? (percent * 100).toFixed(1) : '0.0'}%)`
        }
      >
        {data.map((entry, index) => (
          <Cell key={`${chartId}-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => [value, 'Students']} />
    </PieChart>
     
    <div className="mt-4 space-y-1" data-testid={`${chartId}-summary`}>
      {data.map((entry) => (
        <p key={entry.name}>{entry.name}: {entry.value}</p>
      ))}
    </div>
  </div>
);

export default PieChartCard;