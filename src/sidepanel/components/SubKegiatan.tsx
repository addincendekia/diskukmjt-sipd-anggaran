import useSubKegiatan from "./SubKegiatan.hook";

export default function SubKegiatan() {
  const { subKegiatanInfo, loading, error } = useSubKegiatan();

  return (
    <div>
      {loading && (
        <div className="space-y-2">
          <div className="h-6 w-48 bg-slate-700/60 rounded-md animate-pulse" />
          <div className="h-4 w-36 bg-slate-700/60 rounded-md animate-pulse" />
        </div>
      )}

      {!loading && subKegiatanInfo && (
        <>
          <h1 className="text-xl font-semibold text-white">
            Sub Kegiatan{" "}
            <span className="text-sky-300">{subKegiatanInfo.kode}</span>
          </h1>
          <p className="text-md text-slate-100">{subKegiatanInfo.nama}</p>
        </>
      )}

      {!loading && error && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h1 className="text-2xl font-semibold text-white">Sub Kegiatan</h1>
          <span className="text-sm rounded-full bg-red-600/80 px-3 py-1 text-white">
            Error
          </span>
          <p className="text-red-300 ml-0 sm:ml-2 text-sm truncate">{error}</p>
        </div>
      )}
    </div>
  );
}
