interface BudgetProgressProps {
  budget: number;
  value: number;
  opacity?: number;
}

export default function BudgetProgress({
  budget,
  value,
  opacity = 1,
}: BudgetProgressProps) {
  const difference = value - budget;
  const percentage = (value / budget) * 100;
  const isOver = difference > 0;
  const isUnder = difference < 0;

  // Determine color based on budget status
  let barColor = "bg-green-500";
  let textColor = "text-green-400";

  if (isOver) {
    barColor = "bg-red-500";
    textColor = "text-red-400";
  } else if (isUnder) {
    barColor = "bg-yellow-500";
    textColor = "text-yellow-400";
  }

  // Format the difference display
  const formattedDifference =
    difference >= 0
      ? `+${(difference / 1000000).toFixed(1)}M`
      : `${(difference / 1000000).toFixed(1)}M`;
  const formattedValue = (value / 1000000).toFixed(1);
  const formattedBudget = (budget / 1000000).toFixed(1);

  // Cap percentage at 100% for display, but allow it to go over 100% for visual representation
  // const displayPercentage = Math.min(percentage, 100);
  const barWidth = Math.min(percentage, 110); // Cap at 110% for visual overflow

  return (
    <div className="mt-1" style={{ opacity }}>
      <div className="flex justify-between">
        <p className="text-[10px] text-slate-400">
          {formattedValue}M / <strong>{formattedBudget}M</strong>
        </p>
        <p className={`text-[10px] font-semibold ${textColor}`}>
          {formattedDifference}
        </p>
      </div>
      <div className="mb-1 w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className={`${barColor} h-full rounded-full transition-all`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}
