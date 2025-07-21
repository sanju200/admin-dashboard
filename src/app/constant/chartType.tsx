import { XAXisOption, YAXisOption } from "echarts/types/dist/shared";
import type { SeriesOption } from "echarts";

export type Generic = {  [key: string]: unknown;}

export type ChartType = 
  | 'line'
  | 'bar'
  | 'scatter'
  | 'pie'
  | 'radar'
  | 'map'
  | 'tree'
  | 'treemap'
  | 'graph'
  | 'gauge'
  | 'funnel'
  | 'parallel'
  | 'sankey'
  | 'boxplot'
  | 'candlestick'
  | 'effectScatter'
  | 'lines'
  | 'heatmap'
  | 'pictorialBar'
  | 'themeRiver'
  | 'sunburst';

  export type yAxis = YAXisOption | YAXisOption[];

  export type xAxis = XAXisOption | XAXisOption[];
  export type series = SeriesOption | SeriesOption[] ;

  export type chartGrid = Generic;




