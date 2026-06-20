/**
 * Types for SIPD data extracted from the content script
 */

export type SubKegiatanInfo = {
  kode: string;
  nama: string;
};

export type SubKegiatanListItem = {
  tag: string | null;
  team: string | null;
  description: string | null;
  account_number: string | null;
  account_name: string | null;
  item_name: string | null;
  item_description: string | null;
  item_coef: string | null;
  item_price: string | null;
  item_subtotal: string | null;
};

export type MessageRequest =
  | { type: "GET_SUB_KEGIATAN_INFO" }
  | { type: "GET_SUB_KEGIATAN_LIST" };

export type MessageResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
