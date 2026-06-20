/**
 * DOM Parser for extracting Sub Kegiatan information from SIPD page
 */

import type { SubKegiatanInfo, SubKegiatanListItem } from "../types";

/**
 * Finds the app-renja-sub-kegiatan element and extracts data
 */
export function getSubKegiatanInfo():
  | (SubKegiatanInfo & { parseable: boolean })
  | null {
  try {
    // Find the app-renja-sub-kegiatan element
    const container = document.querySelector("app-renja-sub-kegiatan");
    if (!container) {
      throw Error("[SIPD Parser] app-renja-sub-kegiatan element not found");
      return null;
    }

    // Find the table within the container
    const table = container.querySelector("table");
    if (!table) {
      console.warn(
        "[SIPD Parser] table element not found in app-renja-sub-kegiatan",
      );
      return null;
    }

    // Extract rows from the table
    const rows = table.querySelectorAll("tr");
    if (rows.length === 0) {
      console.warn("[SIPD Parser] no table rows found");
      return null;
    }

    const rowsPaginLabel =
      document
        .querySelector(".mat-paginator-range-label")
        ?.textContent?.trim() ?? "";

    // Loop through rows to find "Sub Kegiatan" row
    for (const row of rows) {
      const cells = row.querySelectorAll("td");

      for (let i = 0; i < cells.length; i++) {
        const cellText = cells[i].textContent?.trim() || "";

        // Check if this cell contains "Sub Kegiatan"
        if (cellText.includes("Sub Kegiatan")) {
          // The value should be in the next cell or within the same cell
          const valueCell = cells[i + 2];
          console.log("[SIPD Parser] cells value:", valueCell);
          if (valueCell) {
            const valueText = valueCell.textContent?.trim() || "";
            const { kode, nama } = parseSubKegiatanValue(valueText);

            if (kode && nama) {
              return {
                kode,
                nama,
                parseable: verifyRowsShowAll(rowsPaginLabel),
              };
            }
          }
        }
      }
    }

    console.warn("[SIPD Parser] Sub Kegiatan row not found in table");
    return null;
  } catch (error) {
    console.error("[SIPD Parser] Error parsing Sub Kegiatan:", error);
    return null;
  }
}

/**
 * Parses rows from app-renja-rincian-belanja-list into structured list items
 */
export function getSubKegiatanList(): SubKegiatanListItem[] | null {
  try {
    const container = document.querySelector("app-renja-rincian-belanja-list");
    if (!container) {
      throw new Error(
        "[getSubKegiatanList] app-renja-rincian-belanja-list element not found",
      );
    }

    const table = container.querySelector("table");
    if (!table) {
      throw new Error(
        "[getSubKegiatanList] table element not found in app-renja-rincian-belanja-list",
      );
    }

    const rows = table.querySelectorAll("tr");
    if (rows.length === 0) {
      throw new Error("[getSubKegiatanList] no table rows found");
    }

    const paginationLabel =
      document
        .querySelector(".mat-paginator-range-label")
        ?.textContent?.trim() ?? "";

    if (!verifyRowsShowAll(paginationLabel)) {
      throw new Error(
        "[getSubKegiatanList] table rows are paginated, cannot parse all items",
      );
    }

    const subKegiatanList: SubKegiatanListItem[] = [];
    let currentTag: string | null = null;
    let currentTeam: string | null = null;
    let currentDescription: string | null = null;
    let currentAccountNumber: string | null = null;
    let currentAccountName: string | null = null;

    for (const row of rows) {
      let itemName: string | null = null;
      let itemDescription: string | null = null;

      const cells = row.querySelectorAll("td");
      if (cells.length < 2) {
        continue;
      }

      const textRaw = cells[1].textContent?.trim() || "";
      const textNormalized = textRaw.replace(/\u00a0/g, " ").trim();

      // get tag and description
      if (textNormalized.startsWith("[ # ]")) {
        const text = textNormalized.slice(5).trim();
        const hasMatch = text.match(/^#(\S+)\s*(.*)$/);

        // currentDescription = text || null;
        if (hasMatch) {
          currentTag = hasMatch[1] || null;
          currentDescription = hasMatch[2] || null;
        }
      } else if (textNormalized.startsWith("[ - ]")) {
        // get team
        currentTeam = textNormalized.slice(5).trim() || null;
        // if (currentTeam?.includes(''))
      } else {
        // get account number and name
        const accountMatch = textNormalized.match(/^(\d+(?:\.\d+)+)\s+(.+)$/);
        if (accountMatch) {
          currentAccountNumber = accountMatch[1];
          currentAccountName = accountMatch[2].trim() || null;

          subKegiatanList.push({
            tag: currentTag,
            team: currentTeam,
            description: currentDescription,
            account_number: currentAccountNumber,
            account_name: currentAccountName,
            item_name: itemName,
            item_description: itemDescription,
            item_coef: null,
            item_price: null,
            item_subtotal: null,
          });
          continue;
        }

        const itemCell = cells[1];
        itemName =
          itemCell.querySelector("b")?.textContent?.trim() ||
          itemCell.textContent?.trim();

        const hasDescription = itemCell.innerHTML.split(/<br\b[^>]*>/i);
        if (hasDescription.length > 1) {
          itemDescription = hasDescription
            .slice(1)
            .join(" ")
            .replace(/<[^>]+>/g, "")
            .trim();
        }
      }

      let itemPrice = cells[3]?.textContent?.trim() || null;
      if (itemPrice) {
        itemPrice = itemPrice.replace(/\.00$/, "").replace(/[^\d]/g, "");
      }

      let itemSubtotal = cells[4]?.textContent?.trim() || null;
      if (itemSubtotal) {
        itemSubtotal = itemSubtotal.replace(/\.00$/, "").replace(/[^\d]/g, "");
      }

      subKegiatanList.push({
        tag: currentTag,
        team: currentTeam,
        description: currentDescription,
        account_number: currentAccountNumber,
        account_name: currentAccountName,
        item_name: itemName,
        item_description: itemDescription,
        item_coef: cells[2]?.textContent?.trim() || null,
        item_price: itemPrice,
        item_subtotal: itemSubtotal,
      });
    }

    return subKegiatanList;
  } catch (error) {
    console.error(
      "[getSubKegiatanList] Error parsing Sub Kegiatan list:",
      error,
    );
    return null;
  }
}

/**
 * Parses Sub Kegiatan value string in format: "2.02.01.01.001 Pengadaan Sarana"
 */
function parseSubKegiatanValue(valueText: string): SubKegiatanInfo {
  // Match pattern: "code name"
  const match = valueText.match(/^([\d.]+)\s*(.+)$/);

  if (match) {
    return {
      kode: match[1].trim(),
      nama: match[2].trim(),
    };
  }

  // Fallback: if no dash separator, treat entire text as value
  return {
    kode: valueText.substring(0, 20), // First 20 chars as code
    nama: valueText,
  };
}

function verifyRowsShowAll(valueText: string): boolean {
  const re = /(\d+)\s*(?:[–—-]|to)\s*(\d+)\s*of\s*([\d,]+)/i;
  const text = valueText.match(re);

  if (!text) return false;

  const rowPerPage = Number(text[2].replace(/,/g, ""));
  const rowTotal = Number(text[3].replace(/,/g, ""));

  return rowPerPage === rowTotal;
}
