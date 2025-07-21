"use client";
import React from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import EChartComponent from "./echartcomponent";
import { ChartType } from "@/app/constant/chartType";

function Userdata() {
  const lineChartOption: EChartsOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ] as EChartsOption["series"],
  };

  const pieChartOption: EChartsOption = {
    title: {
      text: "Referer of a Website",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const barChartOption: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "60%",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };

  const scatterChartOption: EChartsOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        symbolSize: 10,
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68],
        ],
        type: "scatter",
      },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4">
          <EChartComponent
            option={lineChartOption}
            style={{ height: "300px", width: "100%" }}
          />
        </div>
        <div className="border p-4">
          <EChartComponent
            option={pieChartOption}
            style={{ height: "300px", width: "100%" }}
          />
        </div>
        <div className="border p-4">
          <EChartComponent
            option={barChartOption}
            style={{ height: "300px", width: "100%" }}
          />
        </div>
        <div className="border p-4">
          <EChartComponent
            option={scatterChartOption}
            style={{ height: "300px", width: "100%" }}
          />
        </div>
      </div>
    </>
  );
}

export default Userdata;
