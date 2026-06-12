/**
 * DOM Parser for extracting Sub Kegiatan information from SIPD page
 */

import type { SubKegiatanInfo } from "../types";

/**
 * Finds the app-renja-sub-kegiatan element and extracts data
 */
export function getSubKegiatanInfo(): SubKegiatanInfo | null {
  try {
    // Find the app-renja-sub-kegiatan element
    const container = document.querySelector("app-renja-sub-kegiatan");
    if (!container) {
      console.warn("[SIPD Parser] app-renja-sub-kegiatan element not found");
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
              return { kode, nama };
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
