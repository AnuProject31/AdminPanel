import React from 'react'
import { Box } from '@mui/material'
import Header from 'components/Header'
import FlexBetween from 'components/FlexBetween'

const Dashboard = () =>{
    // const theme = useTheme()
    return(
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
            </FlexBetween>
            </Box>
      
    )
}

export default Dashboard