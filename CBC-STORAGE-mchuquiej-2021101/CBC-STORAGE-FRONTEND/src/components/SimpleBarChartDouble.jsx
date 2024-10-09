import React, { useEffect, useState } from "react";
import { BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar } from "recharts";
import axios from 'axios';
import './SimpleBarCharts.css';

const SimpleBarChartDouble = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:2880/herramientasConDatos'); 
                console.log("Response:", response.data);

                const chartData = response.data.chartData;

                console.log("ChartData:", JSON.stringify(chartData, null, 2));
                setData(chartData);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="chart-container">
            {data.length > 0 ? (
                <ResponsiveContainer width="150%" aspect={2}>
                    <BarChart 
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray={"4 1 2"} />
                        <XAxis dataKey="nombre" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="prestado" fill="#8884d8" name="Prestado" />
                        <Bar dataKey="disponible" fill="#82ca9d" name="Disponible" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p>No hay datos para mostrar.</p>
            )}
        </div>
    );
};

export default SimpleBarChartDouble;
