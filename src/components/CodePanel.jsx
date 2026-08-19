import { useEffect, useMemo, useRef, useState } from "react";
import { getCodeForLanguage, LANGUAGES } from "../utils/languageCode.js";

export default function CodePanel({
  code,
  activeLine,
  step,
}) {
  const [language, setLanguage] = useState("C++");
  const codeScrollRef = useRef(null);
  const activeLineRef = useRef(null);

  const array = step?.array || [];
  const target = step?.target;
  const variables = step?.variables || {};

  const {
    left,
    right,
    mid,
    i,
    j,
    comparing = [],
    swapping = [],
    sortedFrom,
  } = variables;

  const currentValue =
    mid !== null &&
    mid !== undefined &&
    array[mid] !== undefined
      ? array[mid]
      : null;

  const languageCode = useMemo(
    () => getCodeForLanguage(code, language),
    [code, language]
  );

  useEffect(() => {
    setLanguage("C++");
  }, [code]);

  useEffect(() => {
    if (!activeLineRef.current || !codeScrollRef.current) return;

    activeLineRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [activeLine, language]);

  const selectLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#09090b]">
      <div className="shrink-0 border-b border-white/10 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-violet-400">
              Implementation
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              {language}
            </h2>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.025] p-1">
            {LANGUAGES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => selectLanguage(item)}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all duration-200 ${
                  language === item
                    ? "bg-violet-500/20 text-violet-200 shadow-[0_0_16px_rgba(139,92,246,0.12)]"
                    : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={codeScrollRef}
        className="min-h-0 flex-1 overflow-auto p-4"
      >
        <div className="font-mono text-xs">
          {languageCode.map((line, index) => {
            const isActive = index === activeLine;

            return (
              <div
                key={`${language}-${index}`}
                ref={isActive ? activeLineRef : null}
                className={`group flex min-h-7 items-center rounded-md transition-all duration-300 ${
                  isActive
                    ? "bg-violet-500/15 text-violet-100"
                    : "text-gray-500"
                }`}
              >
                <span
                  className={`w-9 shrink-0 select-none pr-3 text-right text-[10px] ${
                    isActive ? "text-violet-400" : "text-gray-700"
                  }`}
                >
                  {index + 1}
                </span>

                <span
                  className={`mr-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                    isActive
                      ? "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                      : "bg-transparent"
                  }`}
                />

                <code className="whitespace-pre">
                  {line || "\u00A0"}
                </code>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 border-t border-white/10 p-4">
        <p className="mb-3 text-[10px] uppercase tracking-widest text-gray-600">
          Live Execution
        </p>

        {target !== null && target !== undefined && (
          <div className="grid grid-cols-2 gap-2">
            <ExecutionValue label="left" value={left} />
            <ExecutionValue label="right" value={right} />
            <ExecutionValue label="mid" value={mid} />
            <ExecutionValue label="arr[mid]" value={currentValue} />
          </div>
        )}

        {(target === null || target === undefined) && (
          <div className="grid grid-cols-2 gap-2">
            <ExecutionValue label="pass (i)" value={i} />
            <ExecutionValue label="comparison (j)" value={j} />
            <ExecutionValue
              label="comparing"
              value={comparing.length ? comparing.join(" ↔ ") : "-"}
            />
            <ExecutionValue
              label="swapping"
              value={swapping.length ? swapping.join(" ↔ ") : "-"}
            />
          </div>
        )}

        {target !== null && target !== undefined && (
          <div className="mt-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-600">target</span>
              <span className="font-mono text-xs text-violet-300">
                {target}
              </span>
            </div>
          </div>
        )}

        {sortedFrom !== undefined && (
          <div className="mt-2 rounded-xl border border-green-500/10 bg-green-500/[0.03] px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-600">sorted from</span>
              <span className="font-mono text-xs text-green-400">
                index {sortedFrom}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExecutionValue({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2">
      <p className="text-[9px] uppercase tracking-wider text-gray-600">
        {label}
      </p>
      <p className="mt-1 font-mono text-sm text-white">
        {value ?? "-"}
      </p>
    </div>
  );
}
