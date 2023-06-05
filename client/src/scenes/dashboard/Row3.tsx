import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetTransactionsQuery, useGetProductsQuery } from '@/state/api';
import { Box, useTheme, Typography } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const Row3 = () => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[500]]
    const { data: kpisData } = useGetKpisQuery();
    const { data: productsData } = useGetProductsQuery();
    const { data: transactionsData } = useGetTransactionsQuery();

    const productsColumns = [
        { field: "_id", headerName: "id", flex: 1},
        { field: "expense", headerName: "Expense", renderCell: (params: GridCellParams) => `$${params.value}`, flex: 0.5},
        { field: "price", headerName: "Price", renderCell: (params: GridCellParams) => `$${params.value}`, flex: 0.5},
    ]
    const transactionsColumns = [
        { field: "_id", headerName: "id", flex: 1},
        { field: "buyer", headerName: "Buyer", flex: 0.67},
        { field: "amount", headerName: "Amount", renderCell: (params: GridCellParams) => `$${params.value}`, flex: 0.35},
        { field: "productIds", headerName: "Count", renderCell: (params: GridCellParams) => (params.value as Array<string>)?.length, flex: 0.1},
    ]

    const pieChartData = useMemo(() => {
        if(kpisData) {
            const totalExpenses = kpisData[0].totalExpenses;
            return Object.entries(kpisData[0].expensesByCategory).map(
                ([key, value]) => {
                    return [
                        {name: key, value: value},
                        {name: `${key} of Total`, value: totalExpenses - value},
                    ]
                }
            )
        }
    }, [kpisData]);
    
    return (
        <>
            <DashboardBox gridArea="g">
                <BoxHeader title='List of Products' sideText={`${productsData?.length} Products`}/>
                <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={{ 
                    "& .MuiDataGrid-root": {
                        color: palette.grey[300],
                        border: "none"
                        },
                    "& .MuiDataGrid-cell": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                    "& .MuiDataGrid-columnHeaders": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                    "& .MuiDataGrid-columnSeparator": {
                        visibility: "hidden",
                        },
                    }}>
                    <DataGrid columnHeaderHeight={25} rowHeight={35} hideFooter={true} rows={productsData || []} columns={productsColumns || []} />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="h">
            <BoxHeader title='Recent Orders' sideText={`${transactionsData?.length} latest transactions`}/>
                <Box mt="1rem" p="0 0.5rem" height="80%" sx={{ 
                    "& .MuiDataGrid-root": {
                        color: palette.grey[300],
                        border: "none"
                        },
                    "& .MuiDataGrid-cell": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                    "& .MuiDataGrid-columnHeaders": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                    "& .MuiDataGrid-columnSeparator": {
                        visibility: "hidden",
                        },
                    }}>
                    <DataGrid columnHeaderHeight={25} rowHeight={35} hideFooter={true} rows={transactionsData || []} columns={transactionsColumns || []} />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="i">
                <BoxHeader title="Expense Breakdown By Category" sideText='+4%' />
                <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
                    {pieChartData?.map((data, i) => (
                        <Box key={`${data[0].name}-${i}`}>
                            <PieChart width={110} height={100}>
                                <Pie data={data} dataKey='value' innerRadius={18} outerRadius={35} paddingAngle={2} stroke='none'>
                                    {data?.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <Typography variant='h5' marginTop="-10px">{data[0].name}</Typography>
                        </Box>
                    ))}
                </FlexBetween>
            </DashboardBox>
            <DashboardBox gridArea="j">
                <BoxHeader title='Overall Summary Explanation Data' sideText='+15%' />
                <Box height="15px" margin="1.25rem 1rem 0.4rem 1rem" bgcolor={palette.primary[800]} borderRadius="1rem">
                    <Box height="15px" bgcolor={palette.primary[500]} borderRadius="1rem" width="40%" />
                </Box>
                <Typography margin="0 1rem" variant='h6'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae cupiditate similique quidem qui magnam a dolorem cum ex quae esse blanditiis consequatur voluptates, doloremque quasi unde, itaque vitae iste, illum earum porro. Consequatur iure rem ratione reiciendis. Nesciunt, recusandae quisquam ducimus ipsa error, ipsum deleniti veniam ad earum, iure officia.
                </Typography>
            </DashboardBox>
        </>
    )
}

export default Row3
