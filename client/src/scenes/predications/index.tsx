import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery } from '@/state/api';
import { useTheme, Typography, Box, Button } from '@mui/material';
import { useState, useMemo } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip, Label } from 'recharts';
import regression, { DataPoint } from 'regression';
const Predications = () => {
    const { palette } = useTheme();
    const [isPredictions, setIsPredications] = useState(false);
    const { data: kpisData } = useGetKpisQuery();

    const fromattedData = useMemo(() => {
        if(!kpisData) return [];
        const monthData = kpisData[0].monthlyData;
        const formatted: Array<DataPoint> = monthData.map(
            ({ revenue }, i: number) => {
                return [i, revenue];
            }
        )
        const regressionLine = regression.linear(formatted);
        return monthData.map(({ month, revenue }, i: number) => {
            return {
                name: month,
                "Actual Revenue": revenue,
                "Regression Line": regressionLine.points[i][1],
                "Predicted Revenue": regressionLine.predict(i + 12)[1]
            }
        })
    }, [kpisData])

    return (
        <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
            <FlexBetween m="1rem 2.5rem" gap="0.3rem">
                <Box>
                    <Typography variant="h3">Revenue and Predications</Typography>
                    <Typography variant="h6">charted revenue and predicted revenue based on a simple linear regression model</Typography>
                </Box>
                <Button onClick={() => setIsPredications(!isPredictions)} sx={{
                    color: palette.grey[900],
                    bgcolor: palette.grey[700],
                    boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)"
                }}>Show Predicted Revenue for Next Year</Button>
            </FlexBetween>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fromattedData} margin={{
                    top: 20,
                    right: 75,
                    left: 20,
                    bottom: 80,
                }}>
                    <CartesianGrid stroke={palette.grey[800]} strokeDasharray="3 3" />
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
                            <Label value="Month" offset={-5} position="insideBottom" />
                        </XAxis>
                        <YAxis style={{ fontSize: "10px" }} axisLine={{ strokeWidth: "0" }} domain={[12000, 26000]} tickFormatter={(v) => `$${v}`}>
                            <Label value="Revenue in USD" angle={-90} offset={-5} position="insideLeft" />
                        </YAxis>
                        <Tooltip />
                        <Legend verticalAlign='top' />
                        <Line type="monotone" dataKey="Actual Revenue" stroke={palette.primary.main} strokeWidth={0} dot={{ strokeWidth: 5 }} />
                        <Line type="monotone" dataKey="Regression Line" stroke="#8884d8" dot={false} />
                        {isPredictions && (
                            <Line strokeDasharray="5 5" dataKey="Predicted Revenue" stroke={palette.secondary[500]} />
                        )}
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
    )
}

export default Predications
