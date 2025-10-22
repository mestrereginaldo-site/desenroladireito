import { Card } from "@/components/ui/card";

interface AdPlaceholderProps {
  format: "leaderboard" | "rectangle" | "banner" | "horizontal" | "square";
  className?: string;
}

export function AdPlaceholder({ format, className = "" }: AdPlaceholderProps) {
  const dimensions = {
    leaderboard: "h-[90px]",
    rectangle: "h-[280px]",
    banner: "h-[60px]",
    horizontal: "h-[90px]",
    square: "h-[250px] max-w-[300px]",
  };

  return (
    <Card className={`w-full ${dimensions[format]} flex items-center justify-center bg-muted/30 ${className}`} data-testid={`ad-placeholder-${format}`}>
      <p className="text-muted-foreground text-sm">
        Google AdSense
      </p>
    </Card>
  );
}
