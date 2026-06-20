interface BudgetStatusProps {
  budget: number;
  value: number;
  opacity?: number;
}

export default function BudgetStatus({
  budget,
  value,
  opacity = 1,
}: BudgetStatusProps) {
  const difference = value - budget;
  const isOver = difference > 0;
  const isUnder = difference < 0;

  // Determine color based on budget status
  let textColor = "text-green-400";

  if (isOver) {
    textColor = "text-red-400";
  } else if (isUnder) {
    textColor = "text-yellow-400";
  }

  // Format the difference display
  const formattedDifference =
    difference >= 0
      ? `+${formatNumber(difference)}`
      : `${formatNumber(difference)}`;

  const formattedValue = formatNumber(value);
  const formattedBudget = formatNumber(budget);

  function formatNumber(value: number) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    return formatter.format(Number(value));
  }

  return (
    <div className="mt-1" style={{ opacity }}>
      <p className="text-[10px] text-slate-400">
        {formattedValue} / <strong>{formattedBudget}</strong>
      </p>
      <p className={`text-[10px] font-semibold ${textColor}`}>
        {formattedDifference}
      </p>
    </div>
  );
}
