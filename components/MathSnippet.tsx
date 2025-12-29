import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export function MathSnippet({ latex }: { latex: string }) {
  const rendered = useMemo(() => {
    try {
      return katex.renderToString(latex, { throwOnError: false });
    } catch {
      return latex;
    }
  }, [latex]);

  return (
    <div className="latex-badge" aria-label="KaTeX preview">
      LaTeX demo:
      <span dangerouslySetInnerHTML={{ __html: rendered }} />
    </div>
  );
}
