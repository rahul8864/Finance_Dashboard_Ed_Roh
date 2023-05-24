import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import BoxHeader from '@/components/BoxHeader';
import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import FlexBetween from '@/components/FlexBetween';
import { Box, Typography } from '@mui/material';

const pieData = [
    { name: 'Group A', value: 600 },
    { name: 'Group B', value: 400 },
]

const Row2 = () => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[300]];
    const { data: operationalData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const operationalExpenses = useMemo(() => {
        return operationalData && operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
            return {
                name: month.substring(0, 3).toUpperCase(),
                "Operational Expenses": operationalExpenses,
                "Non Operational Expenses": nonOperationalExpenses
            }
        })
    },[operationalData])
    return (
        <>
            <DashboardBox bgcolor="#fff" gridArea="d">
            <BoxHeader
                    title="Operational vs Non-Operational Expenses"
                    sideText='+4%'
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={operationalExpenses} margin={{
                        top: 20,
                        right: 0,
                        left: -10,
                        bottom: 55,
                    }}>
                        <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                            <YAxis yAxisId="left" tickLine={false}  orientation='left' style={{ fontSize: "10px" }} axisLine={false} />
                            <YAxis yAxisId="right" tickLine={false} orientation='right' style={{ fontSize: "10px" }} axisLine={false} />
                            <Tooltip />
                            <Line yAxisId="left" type="monotone" dataKey="Non Operational Expenses" stroke={palette.tertiary[500]} />
                            <Line yAxisId="right" type="monotone" dataKey="Operational Expenses" stroke={palette.primary.main} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox bgcolor="#fff" gridArea="e">
                <BoxHeader title="Campaigns and Targets" sideText='+4%' />
                <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
                    <PieChart width={110} height={100} margin={{
                            top: 0,
                            right: 10,
                            left: -10,
                            bottom: 0,
                        }}>
                        <Pie data={pieData} dataKey='value' innerRadius={18} outerRadius={38} paddingAngle={2} stroke='none'>
                            {pieData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                    <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
                        <Typography variant='h5'>Target Sales</Typography>
                        <Typography m="0.3rem 0" variant='h3' color={palette.primary[300]}>83</Typography>
                        <Typography variant='h6'>Finance goals of the Campaign that is desired</Typography>
                    </Box>
                    <Box flexBasis="40%">
                        <Typography variant='h5'>Losses in Revenue</Typography>
                        <Typography variant='h6'>Losses are down 26%</Typography>
                        <Typography mt="0.4rem" variant='h5'>Profit Margins</Typography>
                        <Typography variant='h6'>Margins are eup by 30% from last month.</Typography>
                    </Box>
                </FlexBetween>
            </DashboardBox>
            <DashboardBox bgcolor="#fff" gridArea="f"></DashboardBox>
        </>
    )
}

export default Row2
