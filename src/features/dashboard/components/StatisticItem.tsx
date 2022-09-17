import { Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import * as React from "react"

export interface StatisticItemProps {
  icon: React.ReactElement
  label: string
  value: string | number
}

export default function StatisticItem(props: StatisticItemProps) {
  const { icon, label, value } = props
  return (
    <div>
      <Paper className="flex justify-between p-3 items-center">
        <Box>{icon}</Box>

        <Box className="flex flex-col items-center">
          <Typography variant="h5">{value}</Typography>
          <Typography variant="h5">{label}</Typography>
        </Box>
      </Paper>
    </div>
  )
}
