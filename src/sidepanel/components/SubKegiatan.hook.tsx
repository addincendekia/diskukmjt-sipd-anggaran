import { useCallback, useEffect, useState } from "react";
import type {
  SubKegiatanInfo,
  MessageResponse,
  SubKegiatanListItem,
} from "@/content/types";

export default function useSubKegiatan() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [subKegiatanInfo, setSubKegiatanInfo] = useState<
    (SubKegiatanInfo & { parseable: boolean }) | null
  >(null);

  const [subKegiatanList, setSubKegiatanList] = useState<SubKegiatanListItem[]>(
    [],
  );

  const fetchSubKegiatanInfo = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab?.id) {
        throw new Error("Error fetching tab: No active tab found");
      }

      if (!tab.url?.includes("sipd-ri.kemendagri.go.id")) {
        throw new Error("Error fetching tab: Please open the SIPD RI website");
      }

      const response = (await chrome.tabs.sendMessage(tab.id, {
        type: "GET_SUB_KEGIATAN_INFO",
      })) as MessageResponse<SubKegiatanInfo & { parseable: boolean }>;

      if (!response?.success || !response.data) {
        throw new Error(
          "Error fetching content: " + response.error ||
            "Failed to extract Sub Kegiatan information",
        );
      }

      setSubKegiatanInfo(response.data);
    } catch (err) {
      setError(`${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSubKegiatanList = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab?.id) {
        throw new Error("Error fetching tab: No active tab found");
      }

      if (!tab.url?.includes("sipd-ri.kemendagri.go.id")) {
        throw new Error("Error fetching tab: Please open the SIPD RI website");
      }

      const response = (await chrome.tabs.sendMessage(tab.id, {
        type: "GET_SUB_KEGIATAN_LIST",
      })) as MessageResponse<SubKegiatanListItem[]>;

      if (!response?.success || !response.data) {
        throw new Error(
          "Error fetching content: " +
            (response?.error ?? "Failed to extract Sub Kegiatan list"),
        );
      }

      setSubKegiatanList(response.data);
    } catch (err) {
      setError(`${err instanceof Error ? err.message : "Unknown error"}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSubKegiatanInfo();
  }, [fetchSubKegiatanInfo]);

  return {
    subKegiatanInfo,
    subKegiatanList,
    loading,
    error,
    fetchSubKegiatanInfo,
    fetchSubKegiatanList,
  } as const;
}
