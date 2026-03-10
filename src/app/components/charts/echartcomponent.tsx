    'use client'; // This directive marks the component as a Client Component

    import React from 'react';
    import ReactECharts from 'echarts-for-react';
    import type { EChartsOption } from 'echarts';

    interface EChartComponentProps {
      option: EChartsOption;
      style?: React.CSSProperties;
    }

    export default function EChartComponent({ option, style }: EChartComponentProps) {
      return (
        <ReactECharts option={option} style={style} />
      );
    }