import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type CardProps = React.ComponentProps<typeof Card>;

export default function Graph({
  className,
  ...props
}: CardProps & { no: number; data: any; color: string }) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader className="p-4 lg:p-6">
        <CardTitle className="text-sm lg:text-base">
          7-Day Water Level Graph - {props.no}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
        <div className="w-full h-56 lg:h-72">
          <ResponsiveContainer>
            <AreaChart width={500} height={400} data={props.data}   margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id={`colorGradient${props.color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={props.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={props.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="level"
                stroke={props.color}
                fillOpacity={1} 
                fill={`url(#colorGradient${props.color})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
