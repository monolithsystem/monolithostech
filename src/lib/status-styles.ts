export type StatusStyle = {
  label: string;
  className: string;
  dot: string;
  hex: string;
  pulse: boolean;
};

/** Paleta estrita de alta costura — pílula translúcida + micro ponto brilhante. */
const EMERALD = "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20";
const GOLD = "bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/20";
const ORANGE = "bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/25";
const VIOLET = "bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/25";
const CYAN = "bg-sky-500/10 text-cyan-300 ring-1 ring-cyan-500/25";
const PLATINUM = "bg-slate-500/10 text-slate-300 ring-1 ring-slate-400/20";

function titleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getStatusStyle(status: string): StatusStyle {
  const s = (status ?? "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // 3. Espera + confirmação → laranja neon suave
  if (s.includes("espera") && s.includes("confirma")) {
    return {
      label: "À Espera Confirmação",
      className: ORANGE,
      dot: "bg-orange-400",
      hex: "#FB923C",
      pulse: true,
    };
  }

  // 4. Espera + reagendamento → roxo elétrico
  if (s.includes("espera") && s.includes("reagenda")) {
    return {
      label: "À Espera Reagendamento",
      className: VIOLET,
      dot: "bg-violet-400",
      hex: "#8B5CF6",
      pulse: false,
    };
  }

  // 1. Confirmado → verde esmeralda
  if (s.includes("confirmado")) {
    return {
      label: "Confirmado",
      className: EMERALD,
      dot: "bg-emerald-400",
      hex: "#10B981",
      pulse: false,
    };
  }

  // 2. Agendado → amarelo ouro
  if (s.includes("agendado")) {
    return { label: "Agendado", className: GOLD, dot: "bg-amber-400", hex: "#F59E0B", pulse: false };
  }

  // 5. Avaliação / Google → azul royal / ciano
  if (s.includes("avaliacao") || s.includes("google")) {
    return {
      label: "Avaliação Google",
      className: CYAN,
      dot: "bg-cyan-400",
      hex: "#22D3EE",
      pulse: false,
    };
  }

  // 6. Realizado → cinza platina / titânio fosco
  if (s.includes("realizado")) {
    return {
      label: "Realizado",
      className: PLATINUM,
      dot: "bg-slate-400",
      hex: "#94A3B8",
      pulse: false,
    };
  }

  if (s.includes("pendente") || s.includes("atendente")) {
    return {
      label: "Pendente Atendente",
      className: ORANGE,
      dot: "bg-orange-400",
      hex: "#F97316",
      pulse: true,
    };
  }

  if (s.includes("cancelado")) {
    return {
      label: "Cancelado",
      className: PLATINUM,
      dot: "bg-slate-400",
      hex: "#64748B",
      pulse: false,
    };
  }

  return {
    label: s ? titleCase(s) : "Pendente",
    className: PLATINUM,
    dot: "bg-slate-400",
    hex: "#334155",
    pulse: false,
  };
}
