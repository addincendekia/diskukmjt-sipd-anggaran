import "../styles/tailwind.css";
import { useEffect } from "react";
import { useAppRoute } from "./AppContext";
import Breadcrumb from "./components/Breadcrumb";
import PageHome from "./pages/PageHome";
import PageSubKegiatan from "./pages/PageSubKegiatan";
import PagePaguAnggaran from "./pages/PagePaguAnggaran/PagePaguAnggaran";
import useSubKegiatan from "./components/SubKegiatan.hook";

export default function App() {
  const { currentPage, setCurrentPage } = useAppRoute();
  const { subKegiatanInfo } = useSubKegiatan();

  const isPageHome =
    !["sub-kegiatan", "form-pagu-anggaran"].includes(currentPage) ||
    currentPage === "home";

  // TODO: need to handle case when content route changes, sidepanel notified / refetch subKegiatanInfo
  useEffect(() => {
    if (subKegiatanInfo) {
      setCurrentPage("sub-kegiatan");
    }
  }, [subKegiatanInfo, setCurrentPage]);

  return (
    <div className="min-h-screen min-w-sm bg-slate-950 text-white p-6 pb-0">
      <div className="mx-auto w-full max-w-3xl flex flex-col gap-6">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
            SIPD Anggaran Extension
          </p>

          <Breadcrumb />
        </div>

        {isPageHome && <PageHome />}
        {currentPage === "sub-kegiatan" && <PageSubKegiatan />}
        {currentPage === "form-pagu-anggaran" && <PagePaguAnggaran />}
      </div>
    </div>
  );
}
