import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export default function Graph({
  className,
  ...props
}: CardProps & { no: number }) {
  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader className="p-4 lg:p-6">
        <CardTitle className="text-sm lg:text-base">
          7-Day Water Level Graph - {props.no}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 lg:p-6 lg:pt-0"></CardContent>
    </Card>
  );
}
