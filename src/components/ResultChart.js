import React, { useState, useEffect } from 'react';
import '../styles/ResultChart.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';

const ResultChart = () => {
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mca_results.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);
        const { data } = Papa.parse(csv, { header: true });

        const classCounts = {
          'First Class': 0,
          'Second Class': 0,
          'Third Class': 0,
        };

        data.forEach(student => {
          if (parseFloat(student.sgpa) >= 7.5) {
            classCounts['First Class']++;
          } else if (parseFloat(student.sgpa) >= 5.0) {
            classCounts['Second Class']++;
          } else {
            classCounts['Third Class']++;
          }
        });

        setClassData(Object.keys(classCounts).map(key => ({ name: key, count: classCounts[key] })));
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h2>Class Distribution</h2>
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart
          data={classData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultChart;
