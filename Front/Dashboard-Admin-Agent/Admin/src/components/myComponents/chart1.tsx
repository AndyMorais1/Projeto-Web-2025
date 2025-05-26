"use client"
<<<<<<< HEAD

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

=======
>>>>>>> main
import {
  Card,
  CardContent,
  CardDescription,
<<<<<<< HEAD
=======
  CardFooter,
>>>>>>> main
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
<<<<<<< HEAD
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function Component1() {
  const id = "pie-interactive"
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].month)

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  )
  const months = React.useMemo(() => desktopData.map((item) => item.month), [])

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Pie Chart - Interactive</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
=======
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts"
import { format } from "date-fns"
import { useHouses } from "@/contexts/HousesContext"
import { useUsers } from "@/contexts/UsersContext"
import { useMemo } from "react"
import { TrendingUp } from "lucide-react"


// Função para gerar meses entre data inicial e atual
function generateMonthsFrom(start = "2025-01") {
  const result: string[] = []
  const current = new Date()
  const date = new Date(start + "-01")

  while (date <= current) {
    result.push(format(new Date(date), "yyyy-MM"))
    date.setMonth(date.getMonth() + 1)
  }

  return result
}

// Agrupa registros por mês
function groupByMonth(items: { createdAt: string }[], start = "2025-01") {
  const months = generateMonthsFrom(start)
  const counts: Record<string, number> = {}

  for (const month of months) {
    counts[month] = 0
  }

  for (const item of items) {
    const key = format(new Date(item.createdAt), "yyyy-MM")
    if (counts[key] !== undefined) {
      counts[key] += 1
    }
  }

  return counts
}

const chartConfig: ChartConfig = {
  usuarios: {
    label: "Usuários",
    color: "hsl(var(--chart-1))",
  },
  casas: {
    label: "Casas",
    color: "hsl(var(--chart-2))",
  },
}

export function Chart1() {
  const { users } = useUsers()
  const { houses } = useHouses()

  const chartData = useMemo(() => {
    const usersCounts = groupByMonth(users)
    const housesCounts = groupByMonth(houses)

    return Object.keys(usersCounts).map((monthKey) => ({
      month: format(new Date(monthKey + "-01"), "MMMM"),
      usuarios: usersCounts[monthKey],
      casas: housesCounts[monthKey],
    }))
  }, [users, houses])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Usuários e Casas</CardTitle>
        <CardDescription>De Janeiro de 2025 até o mês atual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4 px-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ backgroundColor: "#1e3a8a" }}
            >
              &nbsp;
            </span>
            Usuários
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ backgroundColor: "#60a5fa" }}
            >
              &nbsp;
            </span>
            Casas
          </div>
        </div>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="usuarios" fill="#1e3a8a" radius={4} />
            <Bar dataKey="casas" fill="#60a5fa" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Atualizado até {format(new Date(), "MMMM")} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Dados gerados dinamicamente a partir do contexto
        </div>
      </CardFooter>
>>>>>>> main
    </Card>
  )
}
