import { useCallback, useEffect, useState } from "react";
import type { SubKegiatanInfo, MessageResponse } from "@/content/types";

export default function useSubKegiatan() {
  const [subKegiatanInfo, setSubKegiatanInfo] =
    useState<SubKegiatanInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubKegiatanInfo = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab?.id) {
        setError("No active tab found");
        setLoading(false);
        return;
      }

      if (!tab.url?.includes("sipd-ri.kemendagri.go.id")) {
        setError("Please open the SIPD RI website");
        setLoading(false);
        return;
      }

      try {
        const response = await chrome.tabs.sendMessage(tab.id, {
          type: "GET_SUB_KEGIATAN_INFO",
        });

        const typedResponse = response as MessageResponse<SubKegiatanInfo>;

        if (typedResponse.success && typedResponse.data) {
          setSubKegiatanInfo(typedResponse.data);
        } else {
          setError(
            typedResponse.error || "Failed to extract Sub Kegiatan information",
          );
        }
      } catch (err) {
        setError(
          `Content script error: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      }
    } catch (err) {
      setError(
        `Error fetching tab: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSubKegiatanInfo();
  }, [fetchSubKegiatanInfo]);

  return { subKegiatanInfo, loading, error, fetchSubKegiatanInfo } as const;
}
