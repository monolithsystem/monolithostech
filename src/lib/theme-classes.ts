/** Acabamentos compartilhados: vidro fumê no escuro, branco flutuante no claro. */

export const SURFACE =
  "rounded-xl border border-amber-500/10 bg-black/50 backdrop-blur-lg shadow-[0_0_15px_rgba(212,175,55,0.02)] light:border-amber-600/15 light:bg-white light:backdrop-blur-none light:shadow-md light:shadow-slate-200/60";

export const VALUE_TEXT = "text-white light:text-zinc-900";

export const TITLE_TEXT = "text-foreground";

/** Tooltip do Recharts — vidro fluido de elite, invertido no modo claro. */
export function tooltipStyles(isLight: boolean) {
  return {
    contentStyle: {
      backgroundColor: isLight ? "rgba(255, 255, 255, 0.9)" : "rgba(10, 10, 10, 0.85)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(212, 175, 55, 0.25)",
      borderRadius: "8px",
      boxShadow: isLight
        ? "0 4px 20px rgba(15, 23, 42, 0.12)"
        : "0 4px 20px rgba(0, 0, 0, 0.5)",
      padding: "6px 10px",
    },
    labelStyle: {
      color: isLight ? "#64748B" : "#94A3B8",
      fontSize: "11px",
      fontWeight: "500",
      marginBottom: "2px",
    },
    itemStyle: {
      color: isLight ? "#B45309" : "#F59E0B",
      fontSize: "12px",
      fontWeight: "700",
    },
    wrapperStyle: { zIndex: 1000 },
    allowEscapeViewBox: { x: false, y: true },
  } as const;
}

/** Agrupamento estrito dos status da planilha (coluna E). */
export function isConfirmado(status?: string | null) {
  return (status ?? "").toLowerCase().trim().includes("confirmado");
}

export function isEmTransicao(status?: string | null) {
  const s = (status ?? "").toLowerCase().trim();
  return s.includes("espera") || s.includes("aguardar") || s.includes("pendente atendente");
}

/** Fila ativa: agendados + confirmados + etapas de negociação. */
export function isFilaAtiva(status?: string | null) {
  const s = (status ?? "").toLowerCase().trim();
  return s.includes("agendado") || isConfirmado(s) || isEmTransicao(s);
}
