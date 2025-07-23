"use client";
import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";
import EChartComponent from "./echartcomponent";
import { ChartType } from "@/app/constant/chartType";
import { UserType } from "@/app/interface/userType";
import { getUserData } from "@/app/services/users";
import { getAverageRatingData } from "@/app/services/product";
import { AverageRatingType } from "@/app/interface/productType";
import ContinuousModel from "echarts/types/src/component/visualMap/ContinuousModel.js";

function Userdata() {
  const[averageRatingData, setAverageRatingData] = useState<AverageRatingType[]>();

  useEffect(() => {
        fetchRatingData();
        handleBarChartData();
      }, []); 

  const fetchRatingData = async () => {
    const data = getAverageRatingData();
    setAverageRatingData(data);
    console.log('Data ', averageRatingData);
  }

  const handleBarChartData = async () => {
    await averageRatingData?.map((item) => {
      return{
        name: item.title,
        value: item.averageRating
      }
    });
    console.log('averageRatingData', averageRatingData);
  }

  const [pieChartOption, setPieChartOption] = useState<EChartsOption>({
    title: {
      text: "User Status",
      subtext: "Active vs Inactive",
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
        name: "Users",
        type: "pie",
        radius: "50%",
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });

  const lineChartOption: EChartsOption = {
    xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    yAxis: { type: "value" },
    series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: "line" }],
  };

  const barChartOption: EChartsOption = {
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: [
      {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: { alignWithLabel: true },
      },
    ],
    yAxis: { type: "value" },
    series: [{ name: "Direct", type: "bar", barWidth: "60%", data: [10, 52, 200, 334, 390, 330, 220] }],
  };

  const scatterChartOption: EChartsOption = {
    xAxis: { type: "value" },
    yAxis: { type: "value" },
    series: [
      {
        symbolSize: 10,
        data: [
          [10.0, 8.04], [8.07, 6.95], [13.0, 7.58], [9.05, 8.81],
          [11.0, 8.33], [14.0, 7.66], [13.4, 6.81], [10.0, 6.33],
          [14.0, 8.96], [12.5, 6.82]
        ],
        type: "scatter",
      },
    ],
  };

  useEffect(() => {
    const formatPieChartData = async () => {
      const data = await getUserData();
      let activeUserCount = 0;
      let inactiveUserCount = 0;

      data.forEach((item: UserType) => {
        if (item.status === "active") activeUserCount++;
        else inactiveUserCount++;
      });

      const formattedData = [
        { value: activeUserCount, name: "Active Users" },
        { value: inactiveUserCount, name: "Inactive Users" },
      ];

      setPieChartOption((prev) => ({
        ...prev,
        series: [
          {
            ...prev.series?.[0],
            data: formattedData,
          },
        ],
      }));
    };

    formatPieChartData();
  }, []);

   

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
