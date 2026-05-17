import Logo from "@/assets/crx.svg";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  return (
    <div className="fixed right-0 bottom-0 m-5 z-50 flex items-end font-sans select-none leading-none">
      {show && (
        <div
          className={`bg-white text-slate-950 rounded-2xl shadow-lg w-max h-min px-4 py-3 mr-3 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}
        >
          <h1 className="text-base font-semibold">HELLO CRXJS</h1>
        </div>
      )}
      <button
        type="button"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-600 shadow-md transition-colors duration-200 hover:bg-sky-700 focus:outline-none"
        onClick={toggle}
      >
        <img src={Logo} alt="CRXJS logo" className="p-1" />
      </button>
      <p>test</p>
    </div>
  );
}

export default App;
