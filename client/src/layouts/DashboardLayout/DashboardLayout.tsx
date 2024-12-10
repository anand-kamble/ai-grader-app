import React, { ReactNode } from 'react'
import { Header, Sidebar } from '../../components'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Header />
            <div style={{
                display: 'grid',
                gridTemplateColumns: '22rem 1fr',

            }}>
                <div>
                    <Sidebar />
                </div>
                {children}
            </div>
        </>
    )
}

export default DashboardLayout
