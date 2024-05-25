import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export default function CurrentLevel({
  className,
  ...props
}: CardProps & {
  no: number;
  value: number;
}) {
  return (
    <Card
      className={cn("flex flex-col justify-between flex-1", className)}
      {...props}
    >
      <CardHeader className="p-4 lg:p-6">
        <CardTitle className="text-sm lg:text-base">
          Current Water Level - {props.no}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0">
        <p className="lg:text-xl">
          <span className="text-5xl font-medium lg:text-6xl">
            {props.value}
          </span>{" "}
          %
        </p>
      </CardContent>
    </Card>
  );
}
