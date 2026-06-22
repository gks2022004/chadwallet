"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  ColorType,
  type IChartApi,
  type UTCTimestamp,
} from "lightweight-charts";

type Candle = { time: number; open: number; high: number; low: number; close: number; volume: number };

export default function PriceChart({ mint }: { mint: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let chart: IChartApi | null = null;
    let disposed = false;

    const chartObj = createChart(el, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#888fa3",
        fontFamily: "var(--font-geist-mono), monospace",
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: "rgba(35,40,56,0.4)" },
        horzLines: { color: "rgba(35,40,56,0.4)" },
      },
      rightPriceScale: { borderColor: "#232838" },
      timeScale: { borderColor: "#232838", timeVisible: true, secondsVisible: false },
      crosshair: { mode: 1 },
      autoSize: true,
    });
    chart = chartObj;

    const candleSeries = chartObj.addSeries(CandlestickSeries, {
      upColor: "#34d399",
      downColor: "#f6515f",
      borderVisible: false,
      wickUpColor: "#34d399",
      wickDownColor: "#f6515f",
      priceFormat: { type: "price", precision: 6, minMove: 0.000001 },
    });
    const volSeries = chartObj.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "vol",
    });
    chartObj.priceScale("vol").applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });

    (async () => {
      try {
        const res = await fetch(`/api/tokens/${mint}/chart`);
        const data = await res.json();
        if (disposed) return;
        const candles: Candle[] = data.candles ?? [];
        setSource(data.source ?? "");
        candleSeries.setData(
          candles.map((c) => ({
            time: c.time as UTCTimestamp,
            open: c.open,
            high: c.high,
            low: c.low,
            close: c.close,
          })),
        );
        volSeries.setData(
          candles.map((c) => ({
            time: c.time as UTCTimestamp,
            value: c.volume,
            color: c.close >= c.open ? "rgba(52,211,153,0.4)" : "rgba(246,81,95,0.4)",
          })),
        );
        chartObj.timeScale().fitContent();
      } catch {
        /* ignore */
      }
    })();

    return () => {
      disposed = true;
      chart?.remove();
    };
  }, [mint]);

  return (
    <div className="relative h-full w-full">
      <div ref={ref} className="h-full w-full" />
      {source === "synthetic" && (
        <span className="absolute top-2 right-3 z-10 text-[10px] text-muted-2 font-mono">
          demo chart · add BIRDEYE_API_KEY for live OHLCV
        </span>
      )}
    </div>
  );
}
