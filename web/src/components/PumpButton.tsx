import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog } from "lucide-react";

type CardProps = React.ComponentProps<typeof Card>;

export default function CurrentLevel({
  className,
  on,
  ...props
}: CardProps & {
  no: number;
  on: boolean;
}) {
  return (
    <Card
      className={cn(
        "text-left flex flex-col justify-between",
        { "bg-gray-100 border-gray-300": on },
        className
      )}
      {...props}
    >
      <CardHeader className="p-4 lg:p-6">
        <CardTitle className="text-sm lg:text-base">
          <Cog size={64} color="#030712" strokeWidth={1.5} />
          <p className="pt-2">Water Pump - {props.no}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
        <p className="lg:text-lg">{on ? "ON" : "OFF"}</p>
      </CardContent>
    </Card>
  );
}
