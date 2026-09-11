export type StatusStyle = {
  label: string;
  className: string;
  dot: string;
  hex: string;
  pulse: boolean;
};

const AMBER = "bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/20";
const ROSE = "bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/20";
const EMERALD = "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20";
const SLATE = "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/20";
const VIOLET = "bg-violet-500/10 text-violet-300 ring-1 ring-violet-500/20";

export function getStatusStyle(status: string): StatusStyle {
  const s = (status ?? "").toLowerCase().trim();

  if (s === "agendado") {
    return { label: "Agendado", className: AMBER, dot: "bg-amber-400", hex: "#F59E0B", pulse: false };
  }
  if (
    s === "a espera confirmacao" ||
    s === "a espera confirmaçao" ||
    s === "a espera de confirmacao" ||
    s === "à espera confirmação" ||
    s === "à espera confirmacao"
  ) {
    return {
      label: "À Espera Confirmação",
      className: AMBER,
      dot: "bg-amber-400",
      hex: "#D4AF37",
      pulse: false,
    };
  }
  if (s === "pendente atendente") {
    return {
      label: "Pendente Atendente",
      className: ROSE,
      dot: "bg-rose-400",
      hex: "#BE123C",
      pulse: true,
    };
  }
  if (s === "falar com atendente" || s === "falar atendente") {
    return {
      label: "Falar com Atendente",
      className: ROSE,
      dot: "bg-rose-400",
      hex: "#E11D48",
      pulse: true,
    };
  }
  if (s === "a espera reagendamento" || s === "à espera reagendamento") {
    return {
      label: "À Espera Reagendamento",
      className: ROSE,
      dot: "bg-rose-400",
      hex: "#9F1239",
      pulse: false,
    };
  }
  if (s === "confirmado") {
    return { label: "Confirmado", className: EMERALD, dot: "bg-emerald-400", hex: "#10B981", pulse: false };
  }
  if (s === "realizado") {
    return { label: "Realizado", className: EMERALD, dot: "bg-emerald-400", hex: "#059669", pulse: false };
  }
  if (s === "avaliaçao google" || s === "avaliacao google" || s === "avaliação google") {
    return {
      label: "Avaliação Google",
      className: VIOLET,
      dot: "bg-violet-400",
      hex: "#8B5CF6",
      pulse: false,
    };
  }
  if (s === "cancelado") {
    return { label: "Cancelado", className: SLATE, dot: "bg-slate-400", hex: "#64748B", pulse: false };
  }

  return { label: "Pendente", className: SLATE, dot: "bg-slate-400", hex: "#334155", pulse: false };
}
