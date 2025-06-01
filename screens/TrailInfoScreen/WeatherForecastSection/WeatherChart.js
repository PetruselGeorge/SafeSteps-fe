import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { LineChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import * as scale from "d3-scale";
import { Circle, G, Defs, LinearGradient, Stop } from "react-native-svg";
import styles from "./styles";

const WeatherChart = ({ data, maxPoints = 5, onPress }) => {
  const trimmed = data.slice(0, maxPoints);
  const temperatures = trimmed.map((item) => item.temperature);
  const times = trimmed.map((item) => item.time.slice(11, 16));

  const Decorator = ({ x, y }) => (
    <G>
      {temperatures.map((value, index) => (
        <React.Fragment key={index}>
          <Circle
            cx={x(index)}
            cy={y(value)}
            r={4}
            stroke="#FFFFFF"
            fill="#50A8FF"
          />
        </React.Fragment>
      ))}
    </G>
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <View style={styles.chartContainer}>
        <YAxis
          data={temperatures}
          contentInset={styles.chartContentInset}
          svg={styles.axisText}
          numberOfTicks={6}
          formatLabel={(value) => `${value}°C`}
        />
        <View style={styles.lineChartWrapper}>
          <LineChart
            style={styles.lineChart}
            data={temperatures}
            svg={{ stroke: "url(#gradient)", strokeWidth: 2.5 }}
            contentInset={styles.chartContentInset}
          >
            <Defs>
              <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#50A8FF" stopOpacity="1" />
                <Stop offset="100%" stopColor="#32658A" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Grid svg={styles.gridLine} />
            <Decorator />
          </LineChart>
          <XAxis
            style={styles.xAxis}
            data={temperatures}
            formatLabel={(value, index) => times[index]}
            contentInset={styles.xAxisInset}
            svg={styles.axisText}
            scale={scale.scaleBand}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WeatherChart;
