import type { IHistoryResponse } from "@/shared/api/currency/currency.types";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatChartData = (apiResponse: IHistoryResponse) => {
  if (!apiResponse || !apiResponse.rates) return [];

  return Object.entries(apiResponse.rates).map(([date, ratesObj]) => {
    const rateValue = Object.values(ratesObj as Record<string, number>)[0];
    return { date, rate: rateValue };
  });
};

interface ChartProps {
  apiData: IHistoryResponse;
}

export const Chart = ({ apiData }: ChartProps) => {
  const data = useMemo(() => formatChartData(apiData), [apiData]);

  if (!data.length) return null;

  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <AreaChart data={data}>
        <CartesianGrid strokeWidth={0.1} />
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip
          contentStyle={{
            background: "var(--color-background)",
            border: "1px solid var(--color-border)",
          }}
        />
        <Area
          type="monotone"
          dataKey="rate"
          stroke="var(--color-text)"
          fill="var(--color-text)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
