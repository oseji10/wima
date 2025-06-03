
import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter
} from 'recharts';

// Interface for JSON data
interface SalesData {
  Hub: string;
  Product: string;
  'Units Sold': number;
  Revenue: number;
  Cost: number;
  Profit: number;
  Month: string; // e.g., "2024-01" for January 2024
  'Profit Margin': number;
}

// Interface for month filter
interface MonthFilter {
  month: string; // e.g., "01" for January
  year: string; // e.g., "2024"
}

// Sample JSON data (replace with your actual data, aggregated by month)
const salesDataJson = [
    
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 292,
          "Revenue": 5000,
          "Cost": 584,
          "Profit": 876,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2518,
          "Revenue": 3203,
          "Cost": 5036,
          "Profit": 7554,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 1817,
          "Revenue": 3200,
          "Cost": 3634,
          "Profit": 5451,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2363,
          "Revenue": 2344,
          "Cost": 4726,
          "Profit": 7089,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 1295,
          "Revenue": 1234,
          "Cost": 2590,
          "Profit": 3885,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 1916,
          "Revenue": 32344,
          "Cost": 3832,
          "Profit": 5748,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2852,
          "Revenue": 6433,
          "Cost": 5704,
          "Profit": 8556,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2729,
          "Revenue": 2455,
          "Cost": 5458,
          "Profit": 8187,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 1774,
          "Revenue": 5000,
          "Cost": 3548,
          "Profit": 5322,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2009,
          "Revenue": 3203,
          "Cost": 4018,
          "Profit": 6027,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 4251,
          "Revenue": 3200,
          "Cost": 8502,
          "Profit": 12753,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 218,
          "Revenue": 2344,
          "Cost": 436,
          "Profit": 654,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2074,
          "Revenue": 1234,
          "Cost": 4148,
          "Profit": 6222,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2431,
          "Revenue": 32344,
          "Cost": 4862,
          "Profit": 7293,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 1702,
          "Revenue": 6433,
          "Cost": 3404,
          "Profit": 5106,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 257,
          "Revenue": 2455,
          "Cost": 514,
          "Profit": 771,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 1094,
          "Revenue": 5000,
          "Cost": 2188,
          "Profit": 3282,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 873,
          "Revenue": 3203,
          "Cost": 1746,
          "Profit": 2619,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2105,
          "Revenue": 3200,
          "Cost": 4210,
          "Profit": 6315,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 4026,
          "Revenue": 2344,
          "Cost": 8052,
          "Profit": 12078,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2394,
          "Revenue": 1234,
          "Cost": 4788,
          "Profit": 7182,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 1366,
          "Revenue": 32344,
          "Cost": 2732,
          "Profit": 4098,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2632,
          "Revenue": 6433,
          "Cost": 5264,
          "Profit": 7896,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 1583,
          "Revenue": 2455,
          "Cost": 3166,
          "Profit": 4749,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 1565,
          "Revenue": 5000,
          "Cost": 3130,
          "Profit": 4695,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 1249,
          "Revenue": 3203,
          "Cost": 2498,
          "Profit": 3747,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2428,
          "Revenue": 3200,
          "Cost": 4856,
          "Profit": 7284,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 700,
          "Revenue": 2344,
          "Cost": 1400,
          "Profit": 2100,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 1614,
          "Revenue": 1234,
          "Cost": 3228,
          "Profit": 4842,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 2559,
          "Revenue": 32344,
          "Cost": 5118,
          "Profit": 7677,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Plough",
          "Units Sold": 723,
          "Revenue": 6433,
          "Cost": 1446,
          "Profit": 2169,
          "Month": "2024-02"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 2518,
          "Revenue": 2455,
          "Cost": 503.6,
          "Profit": 2014.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 2666,
          "Revenue": 5000,
          "Cost": 533.2,
          "Profit": 2132.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 1830,
          "Revenue": 3203,
          "Cost": 366,
          "Profit": 1464,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 1967,
          "Revenue": 3200,
          "Cost": 393.4,
          "Profit": 1573.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 488,
          "Revenue": 2344,
          "Cost": 97.6,
          "Profit": 390.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 708,
          "Revenue": 1234,
          "Cost": 141.6,
          "Profit": 566.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 3803,
          "Revenue": 32344,
          "Cost": 760.6,
          "Profit": 3042.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 2321,
          "Revenue": 6433,
          "Cost": 464.2,
          "Profit": 1856.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 2734,
          "Revenue": 2455,
          "Cost": 546.8,
          "Profit": 2187.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 1249,
          "Revenue": 5000,
          "Cost": 249.8,
          "Profit": 999.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 2228,
          "Revenue": 3203,
          "Cost": 445.6,
          "Profit": 1782.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 200,
          "Revenue": 3200,
          "Cost": 40,
          "Profit": 160,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 388,
          "Revenue": 2344,
          "Cost": 77.6,
          "Profit": 310.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Harrow",
          "Units Sold": 2300,
          "Revenue": 1234,
          "Cost": 460,
          "Profit": 1840,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 1916,
          "Revenue": 32344,
          "Cost": 4215.2,
          "Profit": 5364.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 552,
          "Revenue": 6433,
          "Cost": 1214.4,
          "Profit": 1545.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 1135,
          "Revenue": 2455,
          "Cost": 2497,
          "Profit": 3178,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 1645,
          "Revenue": 5000,
          "Cost": 3619,
          "Profit": 4606,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 1118,
          "Revenue": 3203,
          "Cost": 2459.6,
          "Profit": 3130.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 708,
          "Revenue": 3200,
          "Cost": 1557.6,
          "Profit": 1982.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 1269,
          "Revenue": 2344,
          "Cost": 2791.8,
          "Profit": 3553.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 1631,
          "Revenue": 1234,
          "Cost": 3588.2,
          "Profit": 4566.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 2240,
          "Revenue": 32344,
          "Cost": 4928,
          "Profit": 6272,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 3521,
          "Revenue": 6433,
          "Cost": 7746.2,
          "Profit": 9858.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 707,
          "Revenue": 2455,
          "Cost": 1555.4,
          "Profit": 1979.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 2734,
          "Revenue": 5000,
          "Cost": 6014.8,
          "Profit": 7655.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 1659,
          "Revenue": 3203,
          "Cost": 3649.8,
          "Profit": 4645.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Tractor",
          "Units Sold": 888,
          "Revenue": 3200,
          "Cost": 1953.6,
          "Profit": 2486.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 1619,
          "Revenue": 2344,
          "Cost": 2428.5,
          "Profit": 4047.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 1445,
          "Revenue": 1234,
          "Cost": 2167.5,
          "Profit": 3612.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 743,
          "Revenue": 32344,
          "Cost": 1114.5,
          "Profit": 1857.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 1295,
          "Revenue": 6433,
          "Cost": 1942.5,
          "Profit": 3237.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 2852,
          "Revenue": 2455,
          "Cost": 4278,
          "Profit": 7130,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 831,
          "Revenue": 5000,
          "Cost": 1246.5,
          "Profit": 2077.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 2844,
          "Revenue": 3203,
          "Cost": 4266,
          "Profit": 7110,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 1884,
          "Revenue": 3200,
          "Cost": 2826,
          "Profit": 4710,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 1094,
          "Revenue": 2344,
          "Cost": 1641,
          "Profit": 2735,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 819,
          "Revenue": 1234,
          "Cost": 1228.5,
          "Profit": 2047.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 1937,
          "Revenue": 32344,
          "Cost": 2905.5,
          "Profit": 4842.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 2689,
          "Revenue": 6433,
          "Cost": 4033.5,
          "Profit": 6722.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 923,
          "Revenue": 2455,
          "Cost": 1384.5,
          "Profit": 2307.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 1496,
          "Revenue": 5000,
          "Cost": 2244,
          "Profit": 3740,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Combine Harvester",
          "Units Sold": 2300,
          "Revenue": 3203,
          "Cost": 3450,
          "Profit": 5750,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 2001,
          "Revenue": 3200,
          "Cost": 2501.25,
          "Profit": 3501.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 1817,
          "Revenue": 2344,
          "Cost": 2271.25,
          "Profit": 3179.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 1326,
          "Revenue": 1234,
          "Cost": 1657.5,
          "Profit": 2320.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 944,
          "Revenue": 32344,
          "Cost": 1180,
          "Profit": 1652,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 2729,
          "Revenue": 6433,
          "Cost": 3411.25,
          "Profit": 4775.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 1874,
          "Revenue": 2455,
          "Cost": 2342.5,
          "Profit": 3279.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 2844,
          "Revenue": 5000,
          "Cost": 3555,
          "Profit": 4977,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 1582,
          "Revenue": 3203,
          "Cost": 1977.5,
          "Profit": 2768.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 3245,
          "Revenue": 3200,
          "Cost": 4056.25,
          "Profit": 5678.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 2134,
          "Revenue": 2344,
          "Cost": 2667.5,
          "Profit": 3734.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 2529,
          "Revenue": 1234,
          "Cost": 3161.25,
          "Profit": 4425.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 2109,
          "Revenue": 32344,
          "Cost": 2636.25,
          "Profit": 3690.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 1583,
          "Revenue": 6433,
          "Cost": 1978.75,
          "Profit": 2770.25,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 1565,
          "Revenue": 2455,
          "Cost": 1956.25,
          "Profit": 2738.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 1496,
          "Revenue": 5000,
          "Cost": 1870,
          "Profit": 2618,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Sprayer",
          "Units Sold": 866,
          "Revenue": 3203,
          "Cost": 1082.5,
          "Profit": 1515.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 923,
          "Revenue": 3200,
          "Cost": 2538.25,
          "Profit": 2999.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 2009,
          "Revenue": 2344,
          "Cost": 5524.75,
          "Profit": 6529.25,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 3851,
          "Revenue": 1234,
          "Cost": 10590.25,
          "Profit": 12515.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 2431,
          "Revenue": 32344,
          "Cost": 6685.25,
          "Profit": 7900.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 952,
          "Revenue": 6433,
          "Cost": 2618,
          "Profit": 3094,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 1262,
          "Revenue": 2455,
          "Cost": 3470.5,
          "Profit": 4101.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 1135,
          "Revenue": 5000,
          "Cost": 3121.25,
          "Profit": 3688.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 1582,
          "Revenue": 3203,
          "Cost": 4350.5,
          "Profit": 5141.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 598,
          "Revenue": 3200,
          "Cost": 1644.5,
          "Profit": 1943.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 3794,
          "Revenue": 2344,
          "Cost": 10433.5,
          "Profit": 12330.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 567,
          "Revenue": 1234,
          "Cost": 1559.25,
          "Profit": 1842.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 1269,
          "Revenue": 32344,
          "Cost": 3489.75,
          "Profit": 4124.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 384,
          "Revenue": 6433,
          "Cost": 1056,
          "Profit": 1248,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 1808,
          "Revenue": 2455,
          "Cost": 4972,
          "Profit": 5876,
          "Month": "2024-01"
        },
        {
          "Hub": "Gombe",
          "Product": "Cultivator",
          "Units Sold": 2632,
          "Revenue": 5000,
          "Cost": 7238,
          "Profit": 8554,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 3945,
          "Revenue": 3203,
          "Cost": 7890,
          "Profit": 11835,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 2296,
          "Revenue": 3200,
          "Cost": 4592,
          "Profit": 6888,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1030,
          "Revenue": 2344,
          "Cost": 2060,
          "Profit": 3090,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 787,
          "Revenue": 1234,
          "Cost": 1574,
          "Profit": 2361,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 2155,
          "Revenue": 32344,
          "Cost": 4310,
          "Profit": 6465,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 918,
          "Revenue": 6433,
          "Cost": 1836,
          "Profit": 2754,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1055,
          "Revenue": 2455,
          "Cost": 2110,
          "Profit": 3165,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 2435,
          "Revenue": 5000,
          "Cost": 4870,
          "Profit": 7305,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1901,
          "Revenue": 3203,
          "Cost": 3802,
          "Profit": 5703,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1287,
          "Revenue": 3200,
          "Cost": 2574,
          "Profit": 3861,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 2988,
          "Revenue": 2344,
          "Cost": 5976,
          "Profit": 8964,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1303,
          "Revenue": 1234,
          "Cost": 2606,
          "Profit": 3909,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 2385,
          "Revenue": 32344,
          "Cost": 4770,
          "Profit": 7155,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 2620,
          "Revenue": 6433,
          "Cost": 5240,
          "Profit": 7860,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 3801,
          "Revenue": 2455,
          "Cost": 7602,
          "Profit": 11403,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1496,
          "Revenue": 5000,
          "Cost": 2992,
          "Profit": 4488,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 448,
          "Revenue": 3203,
          "Cost": 896,
          "Profit": 1344,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 2101,
          "Revenue": 3200,
          "Cost": 4202,
          "Profit": 6303,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1535,
          "Revenue": 2344,
          "Cost": 3070,
          "Profit": 4605,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1227,
          "Revenue": 1234,
          "Cost": 2454,
          "Profit": 3681,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1324,
          "Revenue": 32344,
          "Cost": 2648,
          "Profit": 3972,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1954,
          "Revenue": 6433,
          "Cost": 3908,
          "Profit": 5862,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 2532,
          "Revenue": 2455,
          "Cost": 5064,
          "Profit": 7596,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 2426,
          "Revenue": 5000,
          "Cost": 4852,
          "Profit": 7278,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 2441,
          "Revenue": 3203,
          "Cost": 4882,
          "Profit": 7323,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1594,
          "Revenue": 3200,
          "Cost": 3188,
          "Profit": 4782,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 2696,
          "Revenue": 2344,
          "Cost": 5392,
          "Profit": 8088,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1393,
          "Revenue": 1234,
          "Cost": 2786,
          "Profit": 4179,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 1731,
          "Revenue": 32344,
          "Cost": 3462,
          "Profit": 5193,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Plough",
          "Units Sold": 293,
          "Revenue": 6433,
          "Cost": 586,
          "Profit": 879,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 1899,
          "Revenue": 2455,
          "Cost": 379.8,
          "Profit": 1519.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 1376,
          "Revenue": 5000,
          "Cost": 275.2,
          "Profit": 1100.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 1901,
          "Revenue": 3203,
          "Cost": 380.2,
          "Profit": 1520.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 544,
          "Revenue": 3200,
          "Cost": 108.8,
          "Profit": 435.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 1287,
          "Revenue": 2344,
          "Cost": 257.4,
          "Profit": 1029.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 1385,
          "Revenue": 1234,
          "Cost": 277,
          "Profit": 1108,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 2342,
          "Revenue": 32344,
          "Cost": 468.4,
          "Profit": 1873.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 1976,
          "Revenue": 6433,
          "Cost": 395.2,
          "Profit": 1580.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 2181,
          "Revenue": 2455,
          "Cost": 436.2,
          "Profit": 1744.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 2501,
          "Revenue": 5000,
          "Cost": 500.2,
          "Profit": 2000.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 1562,
          "Revenue": 3203,
          "Cost": 312.4,
          "Profit": 1249.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 1666,
          "Revenue": 3200,
          "Cost": 333.2,
          "Profit": 1332.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 2072,
          "Revenue": 2344,
          "Cost": 414.4,
          "Profit": 1657.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 1773,
          "Revenue": 1234,
          "Cost": 354.6,
          "Profit": 1418.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Harrow",
          "Units Sold": 293,
          "Revenue": 32344,
          "Cost": 58.6,
          "Profit": 234.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 2750,
          "Revenue": 6433,
          "Cost": 6050,
          "Profit": 7700,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 1899,
          "Revenue": 2455,
          "Cost": 4177.8,
          "Profit": 5317.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 941,
          "Revenue": 5000,
          "Cost": 2070.2,
          "Profit": 2634.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 1988,
          "Revenue": 3203,
          "Cost": 4373.6,
          "Profit": 5566.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 2876,
          "Revenue": 3200,
          "Cost": 6327.2,
          "Profit": 8052.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 2072,
          "Revenue": 2344,
          "Cost": 4558.4,
          "Profit": 5801.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 853,
          "Revenue": 1234,
          "Cost": 1876.6,
          "Profit": 2388.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 1433,
          "Revenue": 32344,
          "Cost": 3152.6,
          "Profit": 4012.4,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 3422,
          "Revenue": 6433,
          "Cost": 7528.4,
          "Profit": 9581.6,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 1190,
          "Revenue": 2455,
          "Cost": 2618,
          "Profit": 3332,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 1393,
          "Revenue": 5000,
          "Cost": 3064.6,
          "Profit": 3900.4,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 2475,
          "Revenue": 3203,
          "Cost": 5445,
          "Profit": 6930,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 1731,
          "Revenue": 3200,
          "Cost": 3808.2,
          "Profit": 4846.8,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Tractor",
          "Units Sold": 2475,
          "Revenue": 2344,
          "Cost": 5445,
          "Profit": 6930,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 2178,
          "Revenue": 1234,
          "Cost": 3267,
          "Profit": 5445,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 2671,
          "Revenue": 32344,
          "Cost": 4006.5,
          "Profit": 6677.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 2155,
          "Revenue": 6433,
          "Cost": 3232.5,
          "Profit": 5387.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 4244,
          "Revenue": 2455,
          "Cost": 6366,
          "Profit": 10610,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 1865,
          "Revenue": 5000,
          "Cost": 2797.5,
          "Profit": 4662.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 1563,
          "Revenue": 3203,
          "Cost": 2344.5,
          "Profit": 3907.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 2487,
          "Revenue": 3200,
          "Cost": 3730.5,
          "Profit": 6217.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 448,
          "Revenue": 2344,
          "Cost": 672,
          "Profit": 1120,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 2181,
          "Revenue": 1234,
          "Cost": 3271.5,
          "Profit": 5452.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 490,
          "Revenue": 32344,
          "Cost": 735,
          "Profit": 1225,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 2441,
          "Revenue": 6433,
          "Cost": 3661.5,
          "Profit": 6102.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 2522,
          "Revenue": 2455,
          "Cost": 3783,
          "Profit": 6305,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 1790,
          "Revenue": 5000,
          "Cost": 2685,
          "Profit": 4475,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Combine Harvester",
          "Units Sold": 1174,
          "Revenue": 3203,
          "Cost": 1761,
          "Profit": 2935,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 2178,
          "Revenue": 3200,
          "Cost": 2722.5,
          "Profit": 3811.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 2151,
          "Revenue": 2344,
          "Cost": 2688.75,
          "Profit": 3764.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 787,
          "Revenue": 1234,
          "Cost": 983.75,
          "Profit": 1377.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 1744,
          "Revenue": 32344,
          "Cost": 2180,
          "Profit": 3052,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 866,
          "Revenue": 6433,
          "Cost": 1082.5,
          "Profit": 1515.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 2177,
          "Revenue": 2455,
          "Cost": 2721.25,
          "Profit": 3809.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 2487,
          "Revenue": 5000,
          "Cost": 3108.75,
          "Profit": 4352.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 1739,
          "Revenue": 3203,
          "Cost": 2173.75,
          "Profit": 3043.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 959,
          "Revenue": 3200,
          "Cost": 1198.75,
          "Profit": 1678.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 575,
          "Revenue": 2344,
          "Cost": 718.75,
          "Profit": 1006.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 381,
          "Revenue": 1234,
          "Cost": 476.25,
          "Profit": 666.75,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 1227,
          "Revenue": 32344,
          "Cost": 1533.75,
          "Profit": 2147.25,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 1734,
          "Revenue": 6433,
          "Cost": 2167.5,
          "Profit": 3034.5,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 3875,
          "Revenue": 2455,
          "Cost": 4843.75,
          "Profit": 6781.25,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 1491,
          "Revenue": 5000,
          "Cost": 1863.75,
          "Profit": 2609.25,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Sprayer",
          "Units Sold": 293,
          "Revenue": 3203,
          "Cost": 366.25,
          "Profit": 512.75,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 1804,
          "Revenue": 3200,
          "Cost": 4961,
          "Profit": 5863,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 639,
          "Revenue": 2344,
          "Cost": 1757.25,
          "Profit": 2076.75,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 3864,
          "Revenue": 1234,
          "Cost": 10626,
          "Profit": 12558,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 1055,
          "Revenue": 32344,
          "Cost": 2901.25,
          "Profit": 3428.75,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 2177,
          "Revenue": 6433,
          "Cost": 5986.75,
          "Profit": 7075.25,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 1579,
          "Revenue": 2455,
          "Cost": 4342.25,
          "Profit": 5131.75,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 1496,
          "Revenue": 5000,
          "Cost": 4114,
          "Profit": 4862,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 1659,
          "Revenue": 3203,
          "Cost": 4562.25,
          "Profit": 5391.75,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 1976,
          "Revenue": 3200,
          "Cost": 5434,
          "Profit": 6422,
          "Month": "2024-02"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 1967,
          "Revenue": 2344,
          "Cost": 5409.25,
          "Profit": 6392.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 639,
          "Revenue": 1234,
          "Cost": 1757.25,
          "Profit": 2076.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 853,
          "Revenue": 32344,
          "Cost": 2345.75,
          "Profit": 2772.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 3998,
          "Revenue": 6433,
          "Cost": 10994.5,
          "Profit": 12993.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 1190,
          "Revenue": 2455,
          "Cost": 3272.5,
          "Profit": 3867.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 2826,
          "Revenue": 5000,
          "Cost": 7771.5,
          "Profit": 9184.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kaduna",
          "Product": "Cultivator",
          "Units Sold": 663,
          "Revenue": 3203,
          "Cost": 1823.25,
          "Profit": 2154.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1006,
          "Revenue": 3200,
          "Cost": 2012,
          "Profit": 3018,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 367,
          "Revenue": 2344,
          "Cost": 734,
          "Profit": 1101,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1513,
          "Revenue": 1234,
          "Cost": 3026,
          "Profit": 4539,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 747,
          "Revenue": 32344,
          "Cost": 1494,
          "Profit": 2241,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1728,
          "Revenue": 6433,
          "Cost": 3456,
          "Profit": 5184,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 689,
          "Revenue": 2455,
          "Cost": 1378,
          "Profit": 2067,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1570,
          "Revenue": 5000,
          "Cost": 3140,
          "Profit": 4710,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1706,
          "Revenue": 3203,
          "Cost": 3412,
          "Profit": 5118,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 795,
          "Revenue": 3200,
          "Cost": 1590,
          "Profit": 2385,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1415,
          "Revenue": 2344,
          "Cost": 2830,
          "Profit": 4245,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1372,
          "Revenue": 1234,
          "Cost": 2744,
          "Profit": 4116,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1743,
          "Revenue": 32344,
          "Cost": 3486,
          "Profit": 5229,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 3513,
          "Revenue": 6433,
          "Cost": 7026,
          "Profit": 10539,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1259,
          "Revenue": 2455,
          "Cost": 2518,
          "Profit": 3777,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1095,
          "Revenue": 5000,
          "Cost": 2190,
          "Profit": 3285,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1366,
          "Revenue": 3203,
          "Cost": 2732,
          "Profit": 4098,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1598,
          "Revenue": 3200,
          "Cost": 3196,
          "Profit": 4794,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1934,
          "Revenue": 2344,
          "Cost": 3868,
          "Profit": 5802,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 360,
          "Revenue": 1234,
          "Cost": 720,
          "Profit": 1080,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 241,
          "Revenue": 32344,
          "Cost": 482,
          "Profit": 723,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1359,
          "Revenue": 6433,
          "Cost": 2718,
          "Profit": 4077,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1531,
          "Revenue": 2455,
          "Cost": 3062,
          "Profit": 4593,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 807,
          "Revenue": 5000,
          "Cost": 1614,
          "Profit": 2421,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 2708,
          "Revenue": 3203,
          "Cost": 5416,
          "Profit": 8124,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 357,
          "Revenue": 3200,
          "Cost": 714,
          "Profit": 1071,
          "Month": "2024-02"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1013,
          "Revenue": 2344,
          "Cost": 2026,
          "Profit": 3039,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 278,
          "Revenue": 1234,
          "Cost": 556,
          "Profit": 834,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1158,
          "Revenue": 32344,
          "Cost": 2316,
          "Profit": 3474,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1085,
          "Revenue": 6433,
          "Cost": 2170,
          "Profit": 3255,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Plough",
          "Units Sold": 1175,
          "Revenue": 2455,
          "Cost": 2350,
          "Profit": 3525,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 921,
          "Revenue": 5000,
          "Cost": 184.2,
          "Profit": 736.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 1545,
          "Revenue": 3203,
          "Cost": 309,
          "Profit": 1236,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 2146,
          "Revenue": 3200,
          "Cost": 429.2,
          "Profit": 1716.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 1958,
          "Revenue": 2344,
          "Cost": 391.6,
          "Profit": 1566.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 1706,
          "Revenue": 1234,
          "Cost": 341.2,
          "Profit": 1364.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 1859,
          "Revenue": 32344,
          "Cost": 371.8,
          "Profit": 1487.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 2021,
          "Revenue": 6433,
          "Cost": 404.2,
          "Profit": 1616.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 2342,
          "Revenue": 2455,
          "Cost": 468.4,
          "Profit": 1873.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 1460,
          "Revenue": 5000,
          "Cost": 292,
          "Profit": 1168,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 645,
          "Revenue": 3203,
          "Cost": 129,
          "Profit": 516,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 711,
          "Revenue": 3200,
          "Cost": 142.2,
          "Profit": 568.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 766,
          "Revenue": 2344,
          "Cost": 153.2,
          "Profit": 612.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Harrow",
          "Units Sold": 1199,
          "Revenue": 1234,
          "Cost": 239.8,
          "Profit": 959.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 4220,
          "Revenue": 32344,
          "Cost": 9284,
          "Profit": 11816,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 1686,
          "Revenue": 6433,
          "Cost": 3709.2,
          "Profit": 4720.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 259,
          "Revenue": 2455,
          "Cost": 569.8,
          "Profit": 725.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 2276,
          "Revenue": 5000,
          "Cost": 5007.2,
          "Profit": 6372.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 1907,
          "Revenue": 3203,
          "Cost": 4195.4,
          "Profit": 5339.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 1350,
          "Revenue": 3200,
          "Cost": 2970,
          "Profit": 3780,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 1250,
          "Revenue": 2344,
          "Cost": 2750,
          "Profit": 3500,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 1366,
          "Revenue": 1234,
          "Cost": 3005.2,
          "Profit": 3824.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 1520,
          "Revenue": 32344,
          "Cost": 3344,
          "Profit": 4256,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 711,
          "Revenue": 6433,
          "Cost": 1564.2,
          "Profit": 1990.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 2574,
          "Revenue": 2455,
          "Cost": 5662.8,
          "Profit": 7207.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 472,
          "Revenue": 5000,
          "Cost": 1038.4,
          "Profit": 1321.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Tractor",
          "Units Sold": 3165,
          "Revenue": 3203,
          "Cost": 6963,
          "Profit": 8862,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 1321,
          "Revenue": 3200,
          "Cost": 1981.5,
          "Profit": 3302.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 888,
          "Revenue": 2344,
          "Cost": 1332,
          "Profit": 2220,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 1513,
          "Revenue": 1234,
          "Cost": 2269.5,
          "Profit": 3782.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 2580,
          "Revenue": 32344,
          "Cost": 3870,
          "Profit": 6450,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 689,
          "Revenue": 6433,
          "Cost": 1033.5,
          "Profit": 1722.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 2021,
          "Revenue": 2455,
          "Cost": 3031.5,
          "Profit": 5052.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 1116,
          "Revenue": 5000,
          "Cost": 1674,
          "Profit": 2790,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 663,
          "Revenue": 3203,
          "Cost": 994.5,
          "Profit": 1657.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 1580,
          "Revenue": 3200,
          "Cost": 2370,
          "Profit": 3950,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 792,
          "Revenue": 2344,
          "Cost": 1188,
          "Profit": 1980,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 2811,
          "Revenue": 1234,
          "Cost": 4216.5,
          "Profit": 7027.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 280,
          "Revenue": 32344,
          "Cost": 420,
          "Profit": 700,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 1513,
          "Revenue": 6433,
          "Cost": 2269.5,
          "Profit": 3782.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 2767,
          "Revenue": 2455,
          "Cost": 4150.5,
          "Profit": 6917.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Combine Harvester",
          "Units Sold": 1085,
          "Revenue": 5000,
          "Cost": 1627.5,
          "Profit": 2712.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 2838,
          "Revenue": 3203,
          "Cost": 3547.5,
          "Profit": 4966.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 888,
          "Revenue": 3200,
          "Cost": 1110,
          "Profit": 1554,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 263,
          "Revenue": 2344,
          "Cost": 328.75,
          "Profit": 460.25,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 986,
          "Revenue": 1234,
          "Cost": 1232.5,
          "Profit": 1725.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 2877,
          "Revenue": 32344,
          "Cost": 3596.25,
          "Profit": 5034.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 1570,
          "Revenue": 6433,
          "Cost": 1962.5,
          "Profit": 2747.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 2479,
          "Revenue": 2455,
          "Cost": 3098.75,
          "Profit": 4338.25,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 2338,
          "Revenue": 5000,
          "Cost": 2922.5,
          "Profit": 4091.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 422,
          "Revenue": 3203,
          "Cost": 527.5,
          "Profit": 738.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 2659,
          "Revenue": 3200,
          "Cost": 3323.75,
          "Profit": 4653.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 880,
          "Revenue": 2344,
          "Cost": 1100,
          "Profit": 1540,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 360,
          "Revenue": 1234,
          "Cost": 450,
          "Profit": 630,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 1531,
          "Revenue": 32344,
          "Cost": 1913.75,
          "Profit": 2679.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 280,
          "Revenue": 6433,
          "Cost": 350,
          "Profit": 490,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 492,
          "Revenue": 2455,
          "Cost": 615,
          "Profit": 861,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 1175,
          "Revenue": 5000,
          "Cost": 1468.75,
          "Profit": 2056.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Sprayer",
          "Units Sold": 552,
          "Revenue": 3203,
          "Cost": 690,
          "Profit": 966,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 2161,
          "Revenue": 3200,
          "Cost": 5942.75,
          "Profit": 7023.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 1006,
          "Revenue": 2344,
          "Cost": 2766.5,
          "Profit": 3269.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 1545,
          "Revenue": 1234,
          "Cost": 4248.75,
          "Profit": 5021.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 2877,
          "Revenue": 32344,
          "Cost": 7911.75,
          "Profit": 9350.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 807,
          "Revenue": 6433,
          "Cost": 2219.25,
          "Profit": 2622.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 1250,
          "Revenue": 2455,
          "Cost": 3437.5,
          "Profit": 4062.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 1530,
          "Revenue": 5000,
          "Cost": 4207.5,
          "Profit": 4972.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 1001,
          "Revenue": 3203,
          "Cost": 2752.75,
          "Profit": 3253.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 2087,
          "Revenue": 3200,
          "Cost": 5739.25,
          "Profit": 6782.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 2338,
          "Revenue": 2344,
          "Cost": 6429.5,
          "Profit": 7598.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 1307,
          "Revenue": 1234,
          "Cost": 3594.25,
          "Profit": 4247.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 681,
          "Revenue": 32344,
          "Cost": 1872.75,
          "Profit": 2213.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 510,
          "Revenue": 6433,
          "Cost": 1402.5,
          "Profit": 1657.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 241,
          "Revenue": 2455,
          "Cost": 662.75,
          "Profit": 783.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 2665,
          "Revenue": 5000,
          "Cost": 7328.75,
          "Profit": 8661.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 472,
          "Revenue": 3203,
          "Cost": 1298,
          "Profit": 1534,
          "Month": "2024-01"
        },
        {
          "Hub": "Kano",
          "Product": "Cultivator",
          "Units Sold": 1013,
          "Revenue": 3200,
          "Cost": 2785.75,
          "Profit": 3292.25,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 974,
          "Revenue": 2344,
          "Cost": 1948,
          "Profit": 2922,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 883,
          "Revenue": 1234,
          "Cost": 1766,
          "Profit": 2649,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 2472,
          "Revenue": 32344,
          "Cost": 4944,
          "Profit": 7416,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 1823,
          "Revenue": 6433,
          "Cost": 3646,
          "Profit": 5469,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 662,
          "Revenue": 2455,
          "Cost": 1324,
          "Profit": 1986,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 1084,
          "Revenue": 5000,
          "Cost": 2168,
          "Profit": 3252,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 2031,
          "Revenue": 3203,
          "Cost": 4062,
          "Profit": 6093,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 1138,
          "Revenue": 3200,
          "Cost": 2276,
          "Profit": 3414,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 2689,
          "Revenue": 2344,
          "Cost": 5378,
          "Profit": 8067,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 1607,
          "Revenue": 1234,
          "Cost": 3214,
          "Profit": 4821,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 1114,
          "Revenue": 32344,
          "Cost": 2228,
          "Profit": 3342,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 2460,
          "Revenue": 6433,
          "Cost": 4920,
          "Profit": 7380,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 2993,
          "Revenue": 2455,
          "Cost": 5986,
          "Profit": 8979,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 1362,
          "Revenue": 5000,
          "Cost": 2724,
          "Profit": 4086,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 2565,
          "Revenue": 3203,
          "Cost": 5130,
          "Profit": 7695,
          "Month": "2024-02"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 2417,
          "Revenue": 3200,
          "Cost": 4834,
          "Profit": 7251,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 1038,
          "Revenue": 2344,
          "Cost": 2076,
          "Profit": 3114,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 591,
          "Revenue": 1234,
          "Cost": 1182,
          "Profit": 1773,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 1122,
          "Revenue": 32344,
          "Cost": 2244,
          "Profit": 3366,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 1984,
          "Revenue": 6433,
          "Cost": 3968,
          "Profit": 5952,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 886,
          "Revenue": 2455,
          "Cost": 1772,
          "Profit": 2658,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 2156,
          "Revenue": 5000,
          "Cost": 4312,
          "Profit": 6468,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 905,
          "Revenue": 3203,
          "Cost": 1810,
          "Profit": 2715,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 2150,
          "Revenue": 3200,
          "Cost": 4300,
          "Profit": 6450,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 1197,
          "Revenue": 2344,
          "Cost": 2394,
          "Profit": 3591,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 1233,
          "Revenue": 1234,
          "Cost": 2466,
          "Profit": 3699,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 571,
          "Revenue": 32344,
          "Cost": 1142,
          "Profit": 1713,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 260,
          "Revenue": 6433,
          "Cost": 520,
          "Profit": 780,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 2535,
          "Revenue": 2455,
          "Cost": 5070,
          "Profit": 7605,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Plough",
          "Units Sold": 2851,
          "Revenue": 5000,
          "Cost": 5702,
          "Profit": 8553,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 2470,
          "Revenue": 3203,
          "Cost": 494,
          "Profit": 1976,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 958,
          "Revenue": 3200,
          "Cost": 191.6,
          "Profit": 766.4,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 2214,
          "Revenue": 2344,
          "Cost": 442.8,
          "Profit": 1771.2,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 690,
          "Revenue": 1234,
          "Cost": 138,
          "Profit": 552,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 2031,
          "Revenue": 32344,
          "Cost": 406.2,
          "Profit": 1624.8,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 1138,
          "Revenue": 6433,
          "Cost": 227.6,
          "Profit": 910.4,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 980,
          "Revenue": 2455,
          "Cost": 196,
          "Profit": 784,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 2340,
          "Revenue": 5000,
          "Cost": 468,
          "Profit": 1872,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 2157,
          "Revenue": 3203,
          "Cost": 431.4,
          "Profit": 1725.6,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 2420,
          "Revenue": 3200,
          "Cost": 484,
          "Profit": 1936,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 2661,
          "Revenue": 2344,
          "Cost": 532.2,
          "Profit": 2128.8,
          "Month": "2024-03"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 604,
          "Revenue": 1234,
          "Cost": 120.8,
          "Profit": 483.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 2255,
          "Revenue": 32344,
          "Cost": 451,
          "Profit": 1804,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 546,
          "Revenue": 6433,
          "Cost": 109.2,
          "Profit": 436.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Harrow",
          "Units Sold": 1368,
          "Revenue": 2455,
          "Cost": 273.6,
          "Profit": 1094.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 1101,
          "Revenue": 5000,
          "Cost": 2422.2,
          "Profit": 3082.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 1865,
          "Revenue": 3203,
          "Cost": 4103,
          "Profit": 5222,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 1074,
          "Revenue": 3200,
          "Cost": 2362.8,
          "Profit": 3007.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 1683,
          "Revenue": 2344,
          "Cost": 3702.6,
          "Profit": 4712.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 1123,
          "Revenue": 1234,
          "Cost": 2470.6,
          "Profit": 3144.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 1679,
          "Revenue": 32344,
          "Cost": 3693.8,
          "Profit": 4701.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 2460,
          "Revenue": 6433,
          "Cost": 5412,
          "Profit": 6888,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 635,
          "Revenue": 2455,
          "Cost": 1397,
          "Profit": 1778,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 1694,
          "Revenue": 5000,
          "Cost": 3726.8,
          "Profit": 4743.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 1038,
          "Revenue": 3203,
          "Cost": 2283.6,
          "Profit": 2906.4,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 2039,
          "Revenue": 3200,
          "Cost": 4485.8,
          "Profit": 5709.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 2629,
          "Revenue": 2344,
          "Cost": 5783.8,
          "Profit": 7361.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 2157,
          "Revenue": 1234,
          "Cost": 4745.4,
          "Profit": 6039.6,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 410,
          "Revenue": 32344,
          "Cost": 902,
          "Profit": 1148,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Tractor",
          "Units Sold": 546,
          "Revenue": 6433,
          "Cost": 1201.2,
          "Profit": 1528.8,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 2470,
          "Revenue": 2455,
          "Cost": 3705,
          "Profit": 6175,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 1210,
          "Revenue": 5000,
          "Cost": 1815,
          "Profit": 3025,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 1397,
          "Revenue": 3203,
          "Cost": 2095.5,
          "Profit": 3492.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 2791,
          "Revenue": 3200,
          "Cost": 4186.5,
          "Profit": 6977.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 562,
          "Revenue": 2344,
          "Cost": 843,
          "Profit": 1405,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 727,
          "Revenue": 1234,
          "Cost": 1090.5,
          "Profit": 1817.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 1540,
          "Revenue": 32344,
          "Cost": 2310,
          "Profit": 3850,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 1362,
          "Revenue": 6433,
          "Cost": 2043,
          "Profit": 3405,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 521,
          "Revenue": 2455,
          "Cost": 781.5,
          "Profit": 1302.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 886,
          "Revenue": 5000,
          "Cost": 1329,
          "Profit": 2215,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 2156,
          "Revenue": 3203,
          "Cost": 3234,
          "Profit": 5390,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 2579,
          "Revenue": 3200,
          "Cost": 3868.5,
          "Profit": 6447.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Combine Harvester",
          "Units Sold": 801,
          "Revenue": 2344,
          "Cost": 1201.5,
          "Profit": 2002.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 1397,
          "Revenue": 1234,
          "Cost": 1746.25,
          "Profit": 2444.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 662,
          "Revenue": 32344,
          "Cost": 827.5,
          "Profit": 1158.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 1916,
          "Revenue": 6433,
          "Cost": 2395,
          "Profit": 3353,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 1642,
          "Revenue": 2455,
          "Cost": 2052.5,
          "Profit": 2873.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 2689,
          "Revenue": 5000,
          "Cost": 3361.25,
          "Profit": 4705.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 1498,
          "Revenue": 3203,
          "Cost": 1872.5,
          "Profit": 2621.5,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 2747,
          "Revenue": 3200,
          "Cost": 3433.75,
          "Profit": 4807.25,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 877,
          "Revenue": 2344,
          "Cost": 1096.25,
          "Profit": 1534.75,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 521,
          "Revenue": 1234,
          "Cost": 651.25,
          "Profit": 911.75,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 341,
          "Revenue": 32344,
          "Cost": 426.25,
          "Profit": 596.75,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 641,
          "Revenue": 6433,
          "Cost": 801.25,
          "Profit": 1121.75,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 432,
          "Revenue": 2455,
          "Cost": 540,
          "Profit": 756,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 554,
          "Revenue": 5000,
          "Cost": 692.5,
          "Profit": 969.5,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 1233,
          "Revenue": 3203,
          "Cost": 1541.25,
          "Profit": 2157.75,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Sprayer",
          "Units Sold": 2903,
          "Revenue": 3200,
          "Cost": 3628.75,
          "Profit": 5080.25,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 1493,
          "Revenue": 2344,
          "Cost": 4105.75,
          "Profit": 4852.25,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 362,
          "Revenue": 1234,
          "Cost": 995.5,
          "Profit": 1176.5,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 1084,
          "Revenue": 32344,
          "Cost": 2981,
          "Profit": 3523,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 2861,
          "Revenue": 6433,
          "Cost": 7867.75,
          "Profit": 9298.25,
          "Month": "2024-05"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 1498,
          "Revenue": 2455,
          "Cost": 4119.5,
          "Profit": 4868.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 1333,
          "Revenue": 5000,
          "Cost": 3665.75,
          "Profit": 4332.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 609,
          "Revenue": 3203,
          "Cost": 1674.75,
          "Profit": 1979.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 635,
          "Revenue": 3200,
          "Cost": 1746.25,
          "Profit": 2063.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 245,
          "Revenue": 2344,
          "Cost": 673.75,
          "Profit": 796.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 2110,
          "Revenue": 1234,
          "Cost": 5802.5,
          "Profit": 6857.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 2628,
          "Revenue": 32344,
          "Cost": 7227,
          "Profit": 8541,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 1395,
          "Revenue": 6433,
          "Cost": 3836.25,
          "Profit": 4533.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 905,
          "Revenue": 2455,
          "Cost": 2488.75,
          "Profit": 2941.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 604,
          "Revenue": 5000,
          "Cost": 1661,
          "Profit": 1963,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 410,
          "Revenue": 3203,
          "Cost": 1127.5,
          "Profit": 1332.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 1575,
          "Revenue": 3200,
          "Cost": 4331.25,
          "Profit": 5118.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Adamawa",
          "Product": "Cultivator",
          "Units Sold": 500,
          "Revenue": 2344,
          "Cost": 1375,
          "Profit": 1625,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 1143,
          "Revenue": 1234,
          "Cost": 2286,
          "Profit": 3429,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 1514,
          "Revenue": 32344,
          "Cost": 3028,
          "Profit": 4542,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 4493,
          "Revenue": 6433,
          "Cost": 8986,
          "Profit": 13479,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 727,
          "Revenue": 2455,
          "Cost": 1454,
          "Profit": 2181,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 2905,
          "Revenue": 5000,
          "Cost": 5810,
          "Profit": 8715,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 1142,
          "Revenue": 3203,
          "Cost": 2284,
          "Profit": 3426,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 1370,
          "Revenue": 3200,
          "Cost": 2740,
          "Profit": 4110,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 2918,
          "Revenue": 2344,
          "Cost": 5836,
          "Profit": 8754,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 3450,
          "Revenue": 1234,
          "Cost": 6900,
          "Profit": 10350,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 1056,
          "Revenue": 32344,
          "Cost": 2112,
          "Profit": 3168,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 274,
          "Revenue": 6433,
          "Cost": 548,
          "Profit": 822,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 2992,
          "Revenue": 2455,
          "Cost": 5984,
          "Profit": 8976,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 2327,
          "Revenue": 5000,
          "Cost": 4654,
          "Profit": 6981,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 991,
          "Revenue": 3203,
          "Cost": 1982,
          "Profit": 2973,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 602,
          "Revenue": 3200,
          "Cost": 1204,
          "Profit": 1806,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 861,
          "Revenue": 2344,
          "Cost": 1722,
          "Profit": 2583,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 2663,
          "Revenue": 1234,
          "Cost": 5326,
          "Profit": 7989,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 2198,
          "Revenue": 32344,
          "Cost": 4396,
          "Profit": 6594,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 1153,
          "Revenue": 6433,
          "Cost": 2306,
          "Profit": 3459,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 678,
          "Revenue": 2455,
          "Cost": 1356,
          "Profit": 2034,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 3675,
          "Revenue": 5000,
          "Cost": 7350,
          "Profit": 11025,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 2797,
          "Revenue": 3203,
          "Cost": 5594,
          "Profit": 8391,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 973,
          "Revenue": 3200,
          "Cost": 1946,
          "Profit": 2919,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 3495,
          "Revenue": 2344,
          "Cost": 6990,
          "Profit": 10485,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 1439,
          "Revenue": 1234,
          "Cost": 2878,
          "Profit": 4317,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 2641,
          "Revenue": 32344,
          "Cost": 5282,
          "Profit": 7923,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 1767,
          "Revenue": 6433,
          "Cost": 3534,
          "Profit": 5301,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 2914,
          "Revenue": 2455,
          "Cost": 5828,
          "Profit": 8742,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 1177,
          "Revenue": 5000,
          "Cost": 2354,
          "Profit": 3531,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Plough",
          "Units Sold": 914,
          "Revenue": 3203,
          "Cost": 1828,
          "Profit": 2742,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 615,
          "Revenue": 3200,
          "Cost": 123,
          "Profit": 492,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 2301,
          "Revenue": 2344,
          "Cost": 460.2,
          "Profit": 1840.8,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 1142,
          "Revenue": 1234,
          "Cost": 228.4,
          "Profit": 913.6,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 1566,
          "Revenue": 32344,
          "Cost": 313.2,
          "Profit": 1252.8,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 3627,
          "Revenue": 6433,
          "Cost": 725.4,
          "Profit": 2901.6,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 2723,
          "Revenue": 2455,
          "Cost": 544.6,
          "Profit": 2178.4,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 1282,
          "Revenue": 5000,
          "Cost": 256.4,
          "Profit": 1025.6,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 2797,
          "Revenue": 3203,
          "Cost": 559.4,
          "Profit": 2237.6,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 2328,
          "Revenue": 3200,
          "Cost": 465.6,
          "Profit": 1862.4,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 2313,
          "Revenue": 2344,
          "Cost": 462.6,
          "Profit": 1850.4,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 677,
          "Revenue": 1234,
          "Cost": 135.4,
          "Profit": 541.6,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 983,
          "Revenue": 32344,
          "Cost": 196.6,
          "Profit": 786.4,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Harrow",
          "Units Sold": 1298,
          "Revenue": 6433,
          "Cost": 259.6,
          "Profit": 1038.4,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 1953,
          "Revenue": 2455,
          "Cost": 4296.6,
          "Profit": 5468.4,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 2141,
          "Revenue": 5000,
          "Cost": 4710.2,
          "Profit": 5994.8,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 1143,
          "Revenue": 3203,
          "Cost": 2514.6,
          "Profit": 3200.4,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 615,
          "Revenue": 3200,
          "Cost": 1353,
          "Profit": 1722,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 1236,
          "Revenue": 2344,
          "Cost": 2719.2,
          "Profit": 3460.8,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 1372,
          "Revenue": 1234,
          "Cost": 3018.4,
          "Profit": 3841.6,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 1282,
          "Revenue": 32344,
          "Cost": 2820.4,
          "Profit": 3589.6,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 2907,
          "Revenue": 6433,
          "Cost": 6395.4,
          "Profit": 8139.6,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 2071,
          "Revenue": 2455,
          "Cost": 4556.2,
          "Profit": 5798.8,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 579,
          "Revenue": 5000,
          "Cost": 1273.8,
          "Profit": 1621.2,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 2993,
          "Revenue": 3203,
          "Cost": 6584.6,
          "Profit": 8380.4,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 3200,
          "Revenue": 3200,
          "Cost": 7040,
          "Profit": 8960,
          "Month": "2024-02"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 270,
          "Revenue": 2344,
          "Cost": 594,
          "Profit": 756,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 2844,
          "Revenue": 1234,
          "Cost": 6256.8,
          "Profit": 7963.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Tractor",
          "Units Sold": 2914,
          "Revenue": 32344,
          "Cost": 6410.8,
          "Profit": 8159.2,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 1858,
          "Revenue": 6433,
          "Cost": 2787,
          "Profit": 4645,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 2529,
          "Revenue": 2455,
          "Cost": 3793.5,
          "Profit": 6322.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 1947,
          "Revenue": 5000,
          "Cost": 2920.5,
          "Profit": 4867.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 274,
          "Revenue": 3203,
          "Cost": 411,
          "Profit": 685,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 991,
          "Revenue": 3200,
          "Cost": 1486.5,
          "Profit": 2477.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 570,
          "Revenue": 2344,
          "Cost": 855,
          "Profit": 1425,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 1118,
          "Revenue": 1234,
          "Cost": 1677,
          "Profit": 2795,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 2030,
          "Revenue": 32344,
          "Cost": 3045,
          "Profit": 5075,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 1761,
          "Revenue": 6433,
          "Cost": 2641.5,
          "Profit": 4402.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 3446,
          "Revenue": 2455,
          "Cost": 5169,
          "Profit": 8615,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 2567,
          "Revenue": 5000,
          "Cost": 3850.5,
          "Profit": 6417.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 1743,
          "Revenue": 3203,
          "Cost": 2614.5,
          "Profit": 4357.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Combine Harvester",
          "Units Sold": 1010,
          "Revenue": 3200,
          "Cost": 1515,
          "Profit": 2525,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 727,
          "Revenue": 2344,
          "Cost": 908.75,
          "Profit": 1272.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 2844,
          "Revenue": 1234,
          "Cost": 3555,
          "Profit": 4977,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 2663,
          "Revenue": 32344,
          "Cost": 3328.75,
          "Profit": 4660.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 570,
          "Revenue": 6433,
          "Cost": 712.5,
          "Profit": 997.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 1153,
          "Revenue": 2455,
          "Cost": 1441.25,
          "Profit": 2017.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 437,
          "Revenue": 5000,
          "Cost": 546.25,
          "Profit": 764.75,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 1956,
          "Revenue": 3203,
          "Cost": 2445,
          "Profit": 3423,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 1352,
          "Revenue": 3200,
          "Cost": 1690,
          "Profit": 2366,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 1867,
          "Revenue": 2344,
          "Cost": 2333.75,
          "Profit": 3267.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 2807,
          "Revenue": 1234,
          "Cost": 3508.75,
          "Profit": 4912.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 1579,
          "Revenue": 32344,
          "Cost": 1973.75,
          "Profit": 2763.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 986,
          "Revenue": 6433,
          "Cost": 1232.5,
          "Profit": 1725.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 2387,
          "Revenue": 2455,
          "Cost": 2983.75,
          "Profit": 4177.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 2567,
          "Revenue": 5000,
          "Cost": 3208.75,
          "Profit": 4492.25,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 2541,
          "Revenue": 3203,
          "Cost": 3176.25,
          "Profit": 4446.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 1010,
          "Revenue": 3200,
          "Cost": 1262.5,
          "Profit": 1767.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Sprayer",
          "Units Sold": 1806,
          "Revenue": 2344,
          "Cost": 2257.5,
          "Profit": 3160.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 2821,
          "Revenue": 1234,
          "Cost": 7757.75,
          "Profit": 9168.25,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 1566,
          "Revenue": 32344,
          "Cost": 4306.5,
          "Profit": 5089.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 1465,
          "Revenue": 6433,
          "Cost": 4028.75,
          "Profit": 4761.25,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 555,
          "Revenue": 2455,
          "Cost": 1526.25,
          "Profit": 1803.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 602,
          "Revenue": 5000,
          "Cost": 1655.5,
          "Profit": 1956.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 2832,
          "Revenue": 3203,
          "Cost": 7788,
          "Profit": 9204,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 861,
          "Revenue": 3200,
          "Cost": 2367.75,
          "Profit": 2798.25,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 2755,
          "Revenue": 2344,
          "Cost": 7576.25,
          "Profit": 8953.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 547,
          "Revenue": 1234,
          "Cost": 1504.25,
          "Profit": 1777.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 1372,
          "Revenue": 32344,
          "Cost": 3773,
          "Profit": 4459,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 2907,
          "Revenue": 6433,
          "Cost": 7994.25,
          "Profit": 9447.75,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 790,
          "Revenue": 2455,
          "Cost": 2172.5,
          "Profit": 2567.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 1596,
          "Revenue": 5000,
          "Cost": 4389,
          "Profit": 5187,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 986,
          "Revenue": 3203,
          "Cost": 2711.5,
          "Profit": 3204.5,
          "Month": "2024-03"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 606,
          "Revenue": 3200,
          "Cost": 1666.5,
          "Profit": 1969.5,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 2460,
          "Revenue": 2344,
          "Cost": 6765,
          "Profit": 7995,
          "Month": "2024-01"
        },
        {
          "Hub": "Niger",
          "Product": "Cultivator",
          "Units Sold": 914,
          "Revenue": 1234,
          "Cost": 2513.5,
          "Profit": 2970.5,
          "Month": "2024-01"
        }
      ];

// Colors for charts, incorporating WIMA green
const COLORS = ['#00a651', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

// Month names for display
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const SalesDashboard: React.FC = () => {
  const [data, setData] = useState<SalesData[]>([]);
  const [filteredData, setFilteredData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hubFilter, setHubFilter] = useState<string>('All');
  const [productFilter, setProductFilter] = useState<string>('All');
  const [monthFilter, setMonthFilter] = useState<MonthFilter>({ month: '', year: '' });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  // Process embedded JSON data
  useEffect(() => {
    try {
      const cleanedData: SalesData[] = salesDataJson.map((row: any) => {
        return {
          Hub: row.Hub || '',
          Product: row.Product || '',
          'Units Sold': parseFloat(row['Units Sold']) || 0,
          Revenue: parseFloat(row.Revenue) || 0,
          Cost: parseFloat(row.Cost) || (parseFloat(row.Revenue) - parseFloat(row.Profit)) || 0,
          Profit: parseFloat(row.Profit) || 0,
          Month: row.Month || 'Unknown',
          'Profit Margin': parseFloat(row.Revenue) ? ((parseFloat(row.Profit) / parseFloat(row.Revenue)) * 100).toFixed(2) : 0
        };
      });
      setData(cleanedData);
      setFilteredData(cleanedData);
      setLoading(false);
    } catch (err) {
      console.error('Error processing JSON data:', err);
      setLoading(false);
    }
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...data];
    if (hubFilter !== 'All') {
      filtered = filtered.filter(row => row.Hub === hubFilter);
    }
    if (productFilter !== 'All') {
      filtered = filtered.filter(row => row.Product === productFilter);
    }
    if (monthFilter.month && monthFilter.year) {
      const filterMonth = `${monthFilter.year}-${monthFilter.month}`;
      filtered = filtered.filter(row => row.Month === filterMonth);
    }
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [hubFilter, productFilter, monthFilter, data]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Aggregate data for charts
  const aggregateByProduct = () => {
    const productMap: { [key: string]: { units: number; revenue: number } } = {};
    filteredData.forEach(row => {
      if (!productMap[row.Product]) {
        productMap[row.Product] = { units: 0, revenue: 0 };
      }
      productMap[row.Product].units += row['Units Sold'];
      productMap[row.Product].revenue += row.Revenue;
    });
    return Object.keys(productMap).map(product => ({
      product,
      units: productMap[product].units,
      revenue: productMap[product].revenue
    }));
  };

  const aggregateByMonth = () => {
    const monthMap: { [key: string]: { revenue: number; profitMargin: number; count: number; units: number } } = {};
    filteredData.forEach(row => {
      if (!monthMap[row.Month]) {
        monthMap[row.Month] = { revenue: 0, profitMargin: 0, count: 0, units: 0 };
      }
      monthMap[row.Month].revenue += row.Revenue;
      monthMap[row.Month].profitMargin += parseFloat(row['Profit Margin']);
      monthMap[row.Month].count += 1;
      monthMap[row.Month].units += row['Units Sold'];
    });
    return Object.keys(monthMap).map(month => ({
      month: `${MONTH_NAMES[parseInt(month.split('-')[1]) - 1]}-${month.split('-')[0]}`,
      rawMonth: month,
      revenue: monthMap[month].revenue,
      profitMargin: (monthMap[month].profitMargin / monthMap[month].count).toFixed(2),
      units: monthMap[month].units
    })).sort((a, b) => a.rawMonth.localeCompare(b.rawMonth));
  };

  const aggregateByProductAndHub = () => {
    const productHubMap: { [key: string]: { [key: string]: number } } = {};
    filteredData.forEach(row => {
      if (!productHubMap[row.Product]) {
        productHubMap[row.Product] = {};
      }
      productHubMap[row.Product][row.Hub] = (productHubMap[row.Product][row.Hub] || 0) + row['Units Sold'];
    });
    return Object.keys(productHubMap).map(product => ({
      product,
      ...productHubMap[product]
    }));
  };

  const aggregateForBubble = () => {
    const productMap: { [key: string]: { units: number; profit: number; revenue: number } } = {};
    filteredData.forEach(row => {
      if (!productMap[row.Product]) {
        productMap[row.Product] = { units: 0, profit: 0, revenue: 0 };
      }
      productMap[row.Product].units += row['Units Sold'];
      productMap[row.Product].profit += row.Profit;
      productMap[row.Product].revenue += row.Revenue;
    });
    return Object.keys(productMap).map(product => ({
      product,
      units: productMap[product].units,
      profit: productMap[product].profit,
      revenue: productMap[product].revenue
    }));
  };

  const aggregateForDonut = () => {
    const hubMap: { [key: string]: number } = {};
    filteredData.forEach(row => {
      hubMap[row.Hub] = (hubMap[row.Hub] || 0) + row['Units Sold'];
    });
    return Object.keys(hubMap).map(hub => ({
      hub,
      units: hubMap[hub]
    }));
  };

  const calculateRevenueTrend = () => {
    const months = aggregateByMonth();
    if (months.length < 2) return { trend: 'stable', change: 0, explanation: 'Not enough data to determine trend.' };
    const latest = months[months.length - 1].revenue;
    const previous = months[months.length - 2].revenue;
    const change = ((latest - previous) / previous * 100).toFixed(1);
    const trend = latest > previous ? 'up' : latest < previous ? 'down' : 'stable';
    const explanation = trend === 'stable'
      ? `Revenue remained stable in ${months[months.length - 1].month} compared to ${months[months.length - 2].month}.`
      : `Revenue ${trend === 'up' ? 'increased' : 'decreased'} by ${Math.abs(parseFloat(change))}% in ${months[months.length - 1].month} compared to ${months[months.length - 2].month}.`;
    return { trend, change: Math.abs(parseFloat(change)), explanation, sparklineData: months.slice(-6) };
  };

  // Interesting fact: Top product by profit margin and outlier months
  const topProductByProfitMarginAndOutliers = () => {
    const hubProductMap: { [key: string]: { profit: number; revenue: number } } = {};
    const monthRevenueMap: { [key: string]: number } = {};
    filteredData.forEach(row => {
      const hpKey = `${row.Hub}_${row.Product}`;
      if (!hubProductMap[hpKey]) {
        hubProductMap[hpKey] = { profit: 0, revenue: 0 };
      }
      hubProductMap[hpKey].profit += row.Profit;
      hubProductMap[hpKey].revenue += row.Revenue;
      monthRevenueMap[row.Month] = (monthRevenueMap[row.Month] || 0) + row.Revenue;
    });

    // Top products by profit margin
    const topProducts = Object.keys(hubProductMap).map(key => {
      const [hub, product] = key.split('_');
      const margin = hubProductMap[key].revenue
        ? (hubProductMap[key].profit / hubProductMap[key].revenue * 100).toFixed(2)
        : 0;
      return { hub, product, margin };
    }).reduce((acc: { [key: string]: { product: string; margin: string } }, curr) => {
      if (!acc[curr.hub] || parseFloat(acc[curr.hub].margin) < parseFloat(curr.margin)) {
        acc[curr.hub] = curr;
      }
      return acc;
    }, {});

    // Outlier months (revenue > 2 standard deviations above mean)
    const revenues = Object.values(monthRevenueMap);
    const mean = revenues.reduce((sum, val) => sum + val, 0) / revenues.length;
    const variance = revenues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / revenues.length;
    const stdDev = Math.sqrt(variance);
    const threshold = mean + 2 * stdDev;
    const outliers = Object.keys(monthRevenueMap)
      .filter(month => monthRevenueMap[month] > threshold)
      .map(month => `${MONTH_NAMES[parseInt(month.split('-')[1]) - 1]}-${month.split('-')[0]}`);

    return { topProducts, outliers };
  };

  // Reset filters
  const resetFilters = () => {
    setHubFilter('All');
    setProductFilter('All');
    setMonthFilter({ month: '', year: '' });
  };

  // Get unique filter options
  const hubs = ['All', ...new Set(data.map(row => row.Hub))];
  const products = ['All', ...new Set(data.map(row => row.Product))];
  const years = ['All', ...new Set(data.map(row => row.Month.split('-')[0]))];
  const months = [
    { value: '', label: 'All' },
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  // Format numbers for display
  const formatNumber = (num: number): string => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toFixed(0);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-600">Loading...</p>
      </div>
    );
  }

  const { topProducts, outliers } = topProductByProfitMarginAndOutliers();
  const revenueTrend = calculateRevenueTrend();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#00a651]">WIMA Sales Analytics Dashboard</h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700">Hub</label>
          <select
            value={hubFilter}
            onChange={(e) => setHubFilter(e.target.value)}
            className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-[#00a651] focus:ring focus:ring-[#00a651] focus:ring-opacity-50"
          >
            {hubs.map(hub => (
              <option key={hub} value={hub}>{hub}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product</label>
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-[#00a651] focus:ring focus:ring-[#00a651] focus:ring-opacity-50"
          >
            {products.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Month</label>
          <select
            value={monthFilter.month}
            onChange={(e) => setMonthFilter({ ...monthFilter, month: e.target.value })}
            className="mt-1 block w-36 rounded-md border-gray-300 shadow-sm focus:border-[#00a651] focus:ring focus:ring-[#00a651] focus:ring-opacity-50"
          >
            {months.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <select
            value={monthFilter.year}
            onChange={(e) => setMonthFilter({ ...monthFilter, year: e.target.value })}
            className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-[#00a651] focus:ring focus:ring-[#00a651] focus:ring-opacity-50"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-[#00a651] text-white rounded-md hover:bg-[#008c45]"
        >
          Reset Filters
        </button>
      </div>

      {/* Interesting Insights */}
      <div className="mb-6 p-4 bg-[#00a651]/10 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-[#00a651]">Important Insights</h2>
        <p className="text-gray-700">
          Best Products by Profit: {Object.entries(topProducts).map(([hub, { product, margin }]) => (
            `${hub}: ${product} (${margin}%)`
          )).join(' | ')}
          <br />
          High Sales Months: {outliers.length > 0 ? outliers.join(', ') : 'None'}
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart: Units Sold by Product */}
        {/* Simple Bar Chart: Units Sold by Product */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-[#00a651]">Units Sold by Product</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aggregateByProduct()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" fontSize={12} />
              <YAxis tickFormatter={formatNumber} fontSize={12} />
              <Tooltip formatter={(value: number) => formatNumber(value)} />
              <Legend />
              <Bar dataKey="units" fill="#00a651" />
            </BarChart>
          </ResponsiveContainer>
        </div>


        {/* Line Chart: Revenue Over Time */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-[#00a651]">Revenue Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aggregateByMonth()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis tickFormatter={formatNumber} fontSize={12} />
              <Tooltip formatter={(value: number) => formatNumber(value)} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#00a651" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Revenue by Product */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-[#00a651]">Revenue Share by Product</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={aggregateByProduct()}
                dataKey="revenue"
                nameKey="product"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#00a651"
                label
              >
                {aggregateByProduct().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatNumber(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart: Profit Margin Over Time */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-[#00a651]">Profit Margin Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={aggregateByMonth()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis unit="%" fontSize={12} />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
              <Area type="monotone" dataKey="profitMargin" stroke="#00a651" fill="#00a651" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Grouped Bar Chart: Units Sold by Product per Hub */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-[#00a651]">Units Sold by Product per Hub</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aggregateByProductAndHub()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" fontSize={12} />
              <YAxis tickFormatter={formatNumber} fontSize={12} />
              <Tooltip formatter={(value: number) => formatNumber(value)} />
              <Legend />
              {hubs.filter(h => h !== 'All').map((hub, index) => (
                <Bar
                  key={hub}
                  dataKey={hub}
                  fill={COLORS[index % COLORS.length]}
                  name={hub}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bubble Chart: Profit vs Units Sold */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-[#00a651]">Profit vs Units Sold by Product</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="units" name="Units Sold" tickFormatter={formatNumber} fontSize={12} />
              <YAxis dataKey="profit" name="Profit" tickFormatter={formatNumber} fontSize={12} />
              <Tooltip
                formatter={(value: number, name: string, props: any) => [
                  formatNumber(value),
                  name === 'revenue' ? 'Revenue' : name
                ]}
              />
              <Legend />
              {aggregateForBubble().map((entry, index) => (
                <Scatter
                  key={entry.product}
                  name={entry.product}
                  data={[{
                    units: entry.units,
                    profit: entry.profit,
                    revenue: entry.revenue
                  }]}
                  fill={COLORS[index % COLORS.length]}
                  shape="circle"
                  r={Math.min(20, Math.max(5, entry.revenue / 1000))} // Size based on revenue
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart: Units Sold by Hub */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-[#00a651]">Units Sold by Hub</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={aggregateForDonut()}
                dataKey="units"
                nameKey="hub"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#00a651"
                label
              >
                {aggregateForDonut().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatNumber(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Indicator: Revenue Trend */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-[#00a651]">Revenue Trend</h2>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl">
                {revenueTrend.trend === 'up' && '↑'}
                {revenueTrend.trend === 'down' && '↓'}
                {revenueTrend.trend === 'stable' && '→'}
              </span>
              <p className="text-xl text-gray-700">
                {revenueTrend.trend === 'stable' ? 'No Change' : `${revenueTrend.change}% ${revenueTrend.trend}`}
              </p>
            </div>
            <p className="text-sm text-gray-600 text-center">{revenueTrend.explanation}</p>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={revenueTrend.sparklineData}>
                <Line type="monotone" dataKey="revenue" stroke="#00a651" dot={false} />
                <XAxis dataKey="month" hide />
                <YAxis hide />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table with Pagination */}
      <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-[#00a651]">Sales Data</h2>
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hub</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Units Sold</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profit Margin (%)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Hub}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(row['Units Sold'])}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(row.Revenue)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(row.Cost)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatNumber(row.Profit)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row['Profit Margin']}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {`${MONTH_NAMES[parseInt(row.Month.split('-')[1]) - 1]}-${row.Month.split('-')[0]}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} records
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#00a651] text-white rounded-md hover:bg-[#008c45] disabled:bg-gray-300"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-[#00a651] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#00a651] text-white rounded-md hover:bg-[#008c45] disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;