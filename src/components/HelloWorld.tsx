import { useState } from "react";

export default function HelloWorld(props: { msg: string }) {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-white/10 p-8 text-left shadow-2xl shadow-black/10 backdrop-blur-md">
      <h1 className="text-4xl font-semibold text-white mb-6">{props.msg}</h1>

      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setCount(count + 1)}
          className="inline-flex items-center rounded-2xl bg-sky-600 px-5 py-3 text-base font-medium text-white transition hover:bg-sky-500 focus:outline-none"
        >
          count is {count}
        </button>
        <p className="text-slate-200">
          Edit{" "}
          <code className="rounded bg-slate-900 px-1 py-0.5 text-sm text-slate-100">
            src/components/HelloWorld.tsx
          </code>{" "}
          to test HMR
        </p>
      </div>

      <p className="mt-8 text-slate-300">
        Check out{" "}
        <a
          href="https://github.com/crxjs/create-crxjs"
          target="_blank"
          rel="noreferrer"
          className="text-sky-300 hover:text-sky-200"
        >
          create-crxjs
        </a>
        , the official starter
      </p>

      <p className="mt-2 text-slate-400">
        Click on the Vite, React and CRXJS logos to learn more
      </p>
    </div>
  );
}
