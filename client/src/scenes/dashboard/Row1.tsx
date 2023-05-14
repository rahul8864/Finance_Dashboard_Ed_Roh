import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { kpis } from './data';
import { useMemo } from 'react';

const Row1 = (props: Props) => {
    const { data } = useGetKpisQuery();
    console.log(kpis);
    const revenueExpenses = useMemo(() => {
        return kpis && kpis[0].monthlyData.map(({ month, revenue, expenses }) => {
            return {
                name: month.substring(0, 3),
                revenue: revenue,
                expenses: expenses
            }
        })
    },[kpis])
    return (
        <>
            <DashboardBox bgcolor="#fff" gridArea="a">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart width={500} height={400} data={[{
                        name: 'Page G',
                        uv: 3490,
                        pv: 4300,
                        amt: 2100
                    }]} margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}>
                        <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8"/>
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>
            <DashboardBox bgcolor="#fff" gridArea="b"></DashboardBox>
            <DashboardBox bgcolor="#fff" gridArea="c"></DashboardBox>
        </>
    )
}

export default Row1
