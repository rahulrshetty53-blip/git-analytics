import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function BarChartComponent({ data, title }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="commits" fill="#3b82f6" name="Commits" />
          <Bar dataKey="pullRequests" fill="#8b5cf6" name="PRs" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartComponent
