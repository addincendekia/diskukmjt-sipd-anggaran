import crxLogo from "@/assets/crx.svg";
import reactLogo from "@/assets/react.svg";
import viteLogo from "@/assets/vite.svg";
import HelloWorld from "@/components/HelloWorld";

export default function App() {
  return (
    <div className="min-h-screen min-w-lg bg-slate-950 text-white flex flex-col items-center justify-center gap-8 p-6">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <a
          href="https://vite.dev"
          target="_blank"
          rel="noreferrer"
          className="transition duration-300 hover:-translate-y-1 hover:scale-105"
        >
          <img
            src={viteLogo}
            className="h-24 p-6 filter transition-all duration-300 hover:drop-shadow-[0_0_2em_rgba(100,108,255,0.67)]"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://reactjs.org/"
          target="_blank"
          rel="noreferrer"
          className="transition duration-300 hover:-translate-y-1 hover:scale-105"
        >
          <img
            src={reactLogo}
            className="h-24 p-6 filter transition-all duration-300 hover:drop-shadow-[0_0_2em_rgba(97,218,251,0.67)]"
            alt="React logo"
          />
        </a>
        <a
          href="https://crxjs.dev/vite-plugin"
          target="_blank"
          rel="noreferrer"
          className="transition duration-300 hover:-translate-y-1 hover:scale-105"
        >
          <img
            src={crxLogo}
            className="h-24 p-6 filter transition-all duration-300 hover:drop-shadow-[0_0_2em_rgba(242,186,228,0.67)]"
            alt="crx logo"
          />
        </a>
      </div>
      <HelloWorld msg="Vite + React + CRXJS" />
    </div>
  );
}
