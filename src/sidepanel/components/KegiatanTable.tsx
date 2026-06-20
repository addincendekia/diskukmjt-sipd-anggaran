import { SubKegiatanListItem } from "@/content/types";
import BudgetStatus from "./BudgetStatus";
import { useMemo } from "react";
import { DATA_BUDGET_MURNI } from "@/data";

export type KegiatanTableProps = {
  items?: SubKegiatanListItem[]; // Placeholder for actual item type
};

export default function KegiatanTable({ items = [] }: KegiatanTableProps) {
  const itemsFiltered = useMemo(() => {
    return items.filter(({ item_name }) => item_name);
  }, [items]);

  const itemsMapped = useMemo(() => {
    const tags: Record<string, Record<string, SubKegiatanListItem[]>> = {
      UNTAGGED: {},
    };

    itemsFiltered.forEach((item) => {
      if (!item.tag) {
        if (!tags["UNTAGGED"][item.team || "UNDEFINED"]) {
          tags["UNTAGGED"][item.team || "UNDEFINED"] = [];
        }

        tags["UNTAGGED"][item.team || "UNDEFINED"].push(item);
        return;
      }

      if (!tags[item.tag]) {
        tags[item.tag] = {};
      }

      if (!tags[item.tag][item.team || "UNDEFINED"]) {
        tags[item.tag][item.team || "UNDEFINED"] = [];
      }

      tags[item.tag][item.team || "UNDEFINED"] = [
        ...(tags[item.tag][item.team || "UNDEFINED"] || []),
        item,
      ];
    });

    return tags;
  }, [itemsFiltered]);

  console.log("itemsMapped", itemsMapped);

  return (
    <table className="w-full text-sm text-left text-slate-300">
      <thead className="bg-slate-800 text-slate-200">
        <tr>
          <th className="px-4 py-2 font-semibold">Tag</th>
          <th className="px-4 py-2 font-semibold">Tim</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700">
        {itemsFiltered.length === 0 && (
          <tr>
            <td colSpan={2} className="px-4 py-6 text-center text-slate-500">
              No data available
            </td>
          </tr>
        )}

        {Object.keys(itemsMapped).map((tag) => {
          if (["UNTAGGED"].includes(tag)) return null;

          const tagTeams = itemsMapped[tag];

          const tagBudget = Object.keys(tagTeams).reduce((sum, team) => {
            const teamBudget =
              DATA_BUDGET_MURNI.find(
                (item) => item.tag === tag && item.tim === team,
              )?.budget || 0;

            return sum + teamBudget;
          }, 0);

          const tagSubtotal = Object.keys(tagTeams).reduce((sum, team) => {
            const teamItems = tagTeams[team];
            const teamSubtotal = teamItems.reduce(
              (s, item) => s + (Number(item.item_subtotal) || 0),
              0,
            );

            return sum + teamSubtotal;
          }, 0);

          // const teamCount = Object.values(tagTeams).reduce(
          //   (s, arr) => s + (arr?.length || 0),
          //   0,
          // );

          return Object.keys(tagTeams).map((team, idx) => {
            const teamItems = tagTeams[team];

            const teamBudget =
              DATA_BUDGET_MURNI.find(
                (item) => item.tag === tag && item.tim === team,
              )?.budget || 0;

            const teamSubtotal = teamItems.reduce(
              (s, item) => s + (Number(item.item_subtotal) || 0),
              0,
            );

            if (idx === 0) {
              return (
                <>
                  <tr
                    key={`${tag}-${team}-head`}
                    className="hover:bg-slate-800/50"
                  >
                    <td
                      rowSpan={Object.keys(tagTeams).length + 1}
                      className="px-4 py-2 font-semibold text-sky-400 bg-slate-800/30 align-middle"
                    >
                      {tag}
                    </td>
                    <td className="bg-slate-800/50 px-4 py-2 font-semibold text-sky-400">
                      Subtotal
                      <BudgetStatus
                        budget={tagBudget}
                        value={Number(tagSubtotal)}
                      />
                    </td>
                  </tr>
                  <tr
                    key={`${tag}-${team}-${idx}`}
                    className="hover:bg-slate-800/50"
                  >
                    <td className="px-4 py-2">
                      <p className="line-clamp-2" title={team}>
                        {team}
                      </p>
                      <BudgetStatus
                        budget={teamBudget}
                        value={Number(teamSubtotal)}
                      />
                    </td>
                  </tr>
                </>
              );
            }

            return (
              <tr
                key={`${tag}-${team}-${idx}`}
                className="hover:bg-slate-800/50"
              >
                <td className="px-4 py-2">
                  <p className="line-clamp-2" title={team}>
                    {team}
                  </p>
                  <BudgetStatus
                    budget={teamBudget}
                    value={Number(teamSubtotal)}
                  />
                </td>
              </tr>
            );
          });
        })}
      </tbody>
    </table>
  );
}

KegiatanTable.Skeleton = ({ rows = 4 }: { rows?: number }) => {
  return (
    <table className="w-full text-sm text-left text-slate-300">
      <thead className="bg-slate-800 text-slate-200">
        <tr>
          <th className="px-4 py-2 font-semibold">Tag</th>
          <th className="px-4 py-2 font-semibold">Tim</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700">
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i} className="hover:bg-slate-800/50">
            <td className="px-4 py-2">
              <div className="h-4 w-24 bg-slate-700 rounded animate-pulse" />
            </td>
            <td className="px-4 py-2">
              <div className="h-4 w-40 bg-slate-700 rounded animate-pulse" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
