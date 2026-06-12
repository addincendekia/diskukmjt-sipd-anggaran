/**
 * Types for SIPD data extracted from the content script
 */

export type SubKegiatanInfo = {
  kode: string;
  nama: string;
};

export type MessageRequest = {
  type: "GET_SUB_KEGIATAN_INFO";
};

export type MessageResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
