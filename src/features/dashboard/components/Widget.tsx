import { Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import * as React from "react"

export interface WidgetProps {
  title: string
  children: any
}

export default function Widget(props: WidgetProps) {
  const { title, children } = props
  return (
    <Paper>
      <Typography variant="button" className="pt-3 pl-3">
        {title}
      </Typography>

      <Box className="mt-3">{children}</Box>
    </Paper>
  )
}
