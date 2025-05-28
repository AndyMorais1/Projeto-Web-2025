"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useHouses } from "@/contexts/HousesContext";
import { useMemo } from "react";
import { format } from "date-fns";
import { TrendingUp } from "lucide-react";

// Função para gerar meses entre data inicial e atual
function generateMonthsFrom(start = "2025-01") {
  const result: string[] = [];
  const current = new Date();
  const date = new Date(start + "-01");

  while (date <= current) {
    result.push(format(new Date(date), "yyyy-MM"));
    date.setMonth(date.getMonth() + 1);
  }

  return result;
}

// Agrupa por mês
function groupByMonth(items: { createdAt: string }[], start = "2025-01") {
  const months = generateMonthsFrom(start);
  const counts: Record<string, number> = {};

  for (const month of months) {
    counts[month] = 0;
  }

  for (const item of items) {
    const key = format(new Date(item.createdAt), "yyyy-MM");
    if (counts[key] !== undefined) {
      counts[key] += 1;
    }
  }

  return counts;
}

export function Chart1() {
  const { houses } = useHouses();

  const chartData = useMemo(() => {
    const housesCounts = groupByMonth(houses);
    return Object.keys(housesCounts).map((monthKey) => ({
      month: format(new Date(monthKey + "-01"), "MMM"),
      casas: housesCounts[monthKey],
    }));
  }, [houses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Casas</CardTitle>
        <CardDescription>
          De Janeiro de 2025 até o mês atual
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4 px-2">
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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar
              dataKey="casas"
              fill="#60a5fa"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Atualizado até {format(new Date(), "MMMM")} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Dados gerados dinamicamente a partir do contexto
        </div>
      </CardFooter>
    </Card>
  );
}
