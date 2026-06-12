/**
 * Content Script - Executes in the SIPD page context
 * Responsibilities:
 * - Parse DOM data
 * - Handle messages from side panel
 * - No UI rendering
 */

import type { MessageRequest, MessageResponse, SubKegiatanInfo } from "./types";
import { getSubKegiatanInfo } from "./parser/subKegiatanParser";

// Listen for messages from the side panel
chrome.runtime.onMessage.addListener(
  (
    message: MessageRequest,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: MessageResponse<SubKegiatanInfo | null>) => void,
  ) => {
    if (message.type === "GET_SUB_KEGIATAN_INFO") {
      try {
        const data = getSubKegiatanInfo();
        sendResponse({
          success: data !== null,
          data: data || undefined,
          error:
            data === null ? "Sub Kegiatan information not found" : undefined,
        });
      } catch (error) {
        sendResponse({
          success: false,
          error: `Error extracting Sub Kegiatan: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }
  },
);

console.log("[SIPD Extension] Content script loaded");
