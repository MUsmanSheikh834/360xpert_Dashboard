"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology } from "topojson-specification";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

let _featuresCache: GeoJSON.Feature[] | null = null;

async function getFeatures(): Promise<GeoJSON.Feature[]> {
  if (_featuresCache) return _featuresCache;
  const world = (await d3.json(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
  )) as unknown as Topology;
  _featuresCache = (topojson.feature(world, world.objects.countries) as GeoJSON.FeatureCollection)
    .features;
  return _featuresCache;
}

getFeatures();

interface WorldMapProps {
  className?: string;
}

export default function WorldMap({ className }: WorldMapProps) {
  const {
    data: countries,
    total,
    badge,
  } = useSelector((state: RootState) => state.dashboard.countries);
  const isLoading = useSelector((state: RootState) => state.dashboard.loading.countries);

  const trendLabel =
    badge !== undefined && badge !== null
      ? `${badge >= 0 ? "+" : ""}${badge}% vs. Previous month`
      : "+0% vs. Previous month";

  // Stable dep string — D3 only re-runs when IDs or colors actually change
  const countriesKey = countries.map((c) => `${c.id}:${c.color}`).join(",");

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || countries.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 760;
    const height = 480;
    const landFill = "#C8DFF0";
    const landBorder = "#A8C8E0";

    const projection = d3
      .geoNaturalEarth1()
      .scale(160)
      .translate([width / 2, height / 2 + 20]);
    const path = d3.geoPath(projection);

    svg.selectAll("*").remove();

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("rx", 10)
      .attr("fill", "#ffffff");

    getFeatures().then((features) => {
      svg
        .selectAll("path.country")
        .data(features)
        .join("path")
        .attr("class", "country")
        .attr("d", path as any)
        .attr("fill", (d: any) => {
          const featureId = String(d.id).padStart(3, "0");
          const match = countries.find((c) => c.id === featureId);
          return match ? match.color : landFill;
        })
        .attr("stroke", (d: any) => {
          const featureId = String(d.id).padStart(3, "0");
          const match = countries.find((c) => c.id === featureId);
          return match ? match.color : landBorder;
        })
        .attr("stroke-width", (d: any) => {
          const featureId = String(d.id).padStart(3, "0");
          return countries.find((c) => c.id === featureId) ? 1.2 : 0.35;
        })
        .attr("opacity", (d: any) => {
          const featureId = String(d.id).padStart(3, "0");
          return countries.find((c) => c.id === featureId) ? 1 : 0.75;
        });

      // Pulse dots
      countries.forEach(({ id, color }) => {
        if (!id) return;
        const feature = features.find((f: any) => String(f.id).padStart(3, "0") === id);
        if (!feature) return;
        const centroid = path.centroid(feature as any);
        if (!centroid || isNaN(centroid[0])) return;

        const g = svg.append("g");

        function pulse(circle: d3.Selection<SVGCircleElement, unknown, null, undefined>) {
          circle
            .transition()
            .duration(1600)
            .ease(d3.easeLinear)
            .attrTween("r", () => d3.interpolate(5, 16) as any)
            .attrTween("opacity", () => d3.interpolate(0.55, 0) as any)
            .on("end", () => {
              circle.attr("r", 5).attr("opacity", 0.55);
              pulse(circle);
            });
        }

        const ring = g
          .append("circle")
          .attr("cx", centroid[0])
          .attr("cy", centroid[1])
          .attr("r", 5)
          .attr("fill", "none")
          .attr("stroke", color)
          .attr("stroke-width", 1.5)
          .attr("opacity", 0.55);
        pulse(ring);

        g.append("circle")
          .attr("cx", centroid[0])
          .attr("cy", centroid[1])
          .attr("r", 3.5)
          .attr("fill", color)
          .attr("stroke", "#fff")
          .attr("stroke-width", 1);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesKey]);

  return (
    <div
      className={className}
      style={{
        background: "var(--color-background-primary, #fff)",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        borderRadius: "14px",
        padding: "24px",
        fontFamily: "inherit",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          flexShrink: 0,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--color-text-primary, #111)",
          }}
        >
          Most Popular Location
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "12px",
            color: "var(--color-text-secondary, #666)",
            border: "0.5px solid var(--color-border-secondary, #ccc)",
            borderRadius: "20px",
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          Top {countries.length} Countries
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", alignItems: "stretch", flex: 1, minHeight: 0 }}>
        {/* Left panel */}
        <div
          style={{
            minWidth: "160px",
            display: "flex",
            flexDirection: "column",
            paddingRight: "16px",
            flexShrink: 0,
          }}
        >
          {/* Total + trend */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "30px",
                fontWeight: 500,
                color: "var(--color-text-primary, #111)",
                lineHeight: 1,
              }}
            >
              {isLoading ? "—" : total.toLocaleString()}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "11px",
                color: "#1D9E75",
                marginTop: "4px",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1D9E75"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <span>{trendLabel}</span>
            </div>
          </div>

          {/* Country rows */}
          {isLoading ? (
            <div style={{ fontSize: "13px", color: "var(--color-text-secondary, #888)" }}>
              Loading...
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {countries.map((c) => (
                <div key={c.id || c.code}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>{c.flag}</span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--color-text-primary, #111)",
                        flex: 1,
                      }}
                    >
                      {c.code}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--color-text-primary, #111)",
                      }}
                    >
                      {String(c.percentage).padStart(2, "0")}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "2.5px",
                      background: "var(--color-border-tertiary, #e5e7eb)",
                      borderRadius: "2px",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${c.percentage}%`,
                        background: c.color,
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Map */}
        <div style={{ flex: 1, minWidth: 0, minHeight: 0 }}>
          <svg
            ref={svgRef}
            viewBox="0 0 760 480"
            style={{ width: "100%", height: "100%", borderRadius: "10px", display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}
