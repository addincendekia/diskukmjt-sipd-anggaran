import { useAppRoute } from "../AppContext";

export default function Breadcrumb() {
  const { currentPage, setCurrentPage } = useAppRoute();

  const getBreadcrumbLabel = () => {
    switch (currentPage) {
      case "home":
        return "Home";
      case "sub-kegiatan":
        return "Sub Kegiatan";
      case "form-pagu-anggaran":
        return "Form Pagu Anggaran";
      default:
        return "Home";
    }
  };

  if (currentPage === "home") {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm mb-4">
      <button
        onClick={() => setCurrentPage("home")}
        className="text-sky-400 hover:text-sky-300 hover:underline transition cursor-pointer"
      >
        Home
      </button>
      <span className="text-slate-500">/</span>
      <span className="text-slate-300">{getBreadcrumbLabel()}</span>
    </div>
  );
}
