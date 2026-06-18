import BudgetProgress from "./BudgetProgress";

export type KegiatanTableProps = {
  items?: {
    tag: string;
    tim: string;
    subtotal: number;
  }[]; // Placeholder for actual item type
};

export default function KegiatanTable({ items = [] }: KegiatanTableProps) {
  return (
    <table className="w-full text-sm text-left text-slate-300">
      <thead className="bg-slate-800 text-slate-200">
        <tr>
          <th className="px-4 py-2 font-semibold">Tag</th>
          <th className="px-4 py-2 font-semibold">Tim</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700">
        {items.length === 0 && (
          <tr>
            <td colSpan={2} className="px-4 py-6 text-center text-slate-500">
              No data available
            </td>
          </tr>
        )}

        {items.map((item, index) => {
          if (index === 0) {
            return (
              <tr className="hover:bg-slate-800/50">
                <td
                  rowSpan={items.length + 1}
                  className="px-4 py-2 font-semibold text-sky-400 bg-slate-800/30 align-middle"
                >
                  {item.tag}
                </td>
                <td className="bg-slate-800/50 px-4 py-2 font-semibold text-sky-400">
                  Subtotal
                  <BudgetProgress budget={425000000} value={item.subtotal} />
                </td>
              </tr>
            );
          }

          return (
            <tr className="hover:bg-slate-800/50">
              <td className="px-4 py-2">
                {item.tag}
                <BudgetProgress budget={150000000} value={item.subtotal} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
