import { AdPlaceholder } from "../AdPlaceholder";

export default function AdPlaceholderExample() {
  return (
    <div className="p-8 space-y-4">
      <AdPlaceholder format="leaderboard" />
      <AdPlaceholder format="rectangle" />
      <AdPlaceholder format="banner" />
    </div>
  );
}
