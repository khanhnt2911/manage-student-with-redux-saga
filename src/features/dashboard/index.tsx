import { PeopleAlt } from "@mui/icons-material"
import { Box, Grid, LinearProgress, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "app/hooks"
import * as React from "react"
import { Outlet } from "react-router-dom"
import StatisticItem from "./components/StatisticItem"
import StudentRankingList from "./components/StudentRankingList"
import Widget from "./components/Widget"
import {
  dashboardActions,
  selectHighestStudentList,
  selectLoading,
  selectLowestStudentList,
  selectRankingByCityList,
  selectStatistics,
} from "./dashboardSlice"

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(selectLoading)
  const statistics = useAppSelector(selectStatistics)
  const highestStudent = useAppSelector(selectHighestStudentList)
  const lowestStudent = useAppSelector(selectLowestStudentList)
  const rankingByCityList = useAppSelector(selectRankingByCityList)

  React.useEffect(() => {
    dispatch(dashboardActions.fetchData())
  }, [dispatch])

  return (
    <Box className="relative">
      {/* loading */}
      {loading && <LinearProgress className="absolute -top-7 w-full" />}

      {/* Statistic section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            label="male"
            value={statistics.maleCount}
            icon={<PeopleAlt fontSize="large" color="primary" />}
          ></StatisticItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            label="female"
            value={statistics.femaleCount}
            icon={<PeopleAlt fontSize="large" color="primary" />}
          ></StatisticItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            label="mark >= 8"
            value={statistics.hightMarkCount}
            icon={<PeopleAlt fontSize="large" color="primary" />}
          ></StatisticItem>
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            label="mark <=5"
            value={statistics.lowMarkCount}
            icon={<PeopleAlt fontSize="large" color="primary" />}
          ></StatisticItem>
        </Grid>
      </Grid>

      {/* All student ranking */}
      <Box className="mt-3 ">
        <Typography variant="h4">All Student</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Student with highest mark">
              <StudentRankingList studentList={highestStudent} />
            </Widget>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Student with lowest mark">
              <StudentRankingList studentList={lowestStudent} />
            </Widget>
          </Grid>
        </Grid>
      </Box>

      {/* Ranking by city */}

      <Box className="mt-3 ">
        <Typography variant="h4">Ranking by city</Typography>
        <Grid container spacing={4}>
          {rankingByCityList.map((ranking) => {
            return (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}
