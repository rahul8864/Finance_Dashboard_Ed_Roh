import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import FlexBetween from '@/components/FlexBetween';
import { PixSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { palette } = useTheme();
    const [selected, setSelected] = useState("dashboard");
    return (
        <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
            {/* LEFT SIDE */}
            <FlexBetween gap="0.75REM">
                <PixSharp sx={{ fontSize: "28px" }} />
                <Typography variant='h4' fontSize="16px">
                    Finanseer
                </Typography>
            </FlexBetween>
            {/* RIGHT SIDE */}
            <FlexBetween gap="2rem">
                <Box sx={{ "&:hover": {color: palette.primary[100]}}}>
                    <Link to="/" onClick={() => setSelected("dashboard")} style={{ color: selected === "dashboard" ? "inherit" : palette.grey[700], textDecoration: "inherit" }} >Dashboard</Link>
                </Box>
                <Box sx={{ "&:hover": {color: palette.primary[100]}}}>
                    <Link to="/predications" onClick={() => setSelected("predications")} style={{ color: selected === "predications" ? "inherit" : palette.grey[700], textDecoration: "inherit" }} >Predications</Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    )
}

export default Navbar
