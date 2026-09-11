import { useState, useMemo } from "react";
import {
  RefreshCw,
  Users,
  CalendarClock,
  CheckCircle2,
  MessageCircle,
  Stethoscope,
  Search,
  X,
  Repeat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStatusStyle } from "@/lib/status-styles";
import { useAppointments } from "@/hooks/use-appointments";

const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const DIAS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function formatarDataPremium(data: Date): string {
  return `${DIAS[data.getDay()]}, ${data.getDate()} de ${MESES[data.getMonth()]} de ${data.getFullYear()}`;
}

function safe(value: string | undefined | null): string {
  const v = (value ?? "").trim();
  return v || "-";
}

export function ReceptionView() {
  // Busca silenciosa em segundo plano a cada 10s (sem estados de carregamento).
  const { appointments, lastUpdate, fetchData } = useAppointments();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return appointments;
    return appointments.filter((a) =>
      [a.nome, a.telefone, a.medico, a.dataHora, a.procedimento, a.status]
        .map((v) => (v ?? "").toLowerCase())
        .some((v) => v.includes(q)),
    );
  }, [appointments, search]);

  const total = appointments.length;

  const agendados = useMemo(
    () => appointments.filter((a) => (a.status ?? "").trim().toLowerCase() === "agendado").length,
    [appointments],
  );

  const confirmados = useMemo(
    () => appointments.filter((a) => (a.status ?? "").trim().toLowerCase() === "confirmado").length,
    [appointments],
  );

  // Regra estrita da planilha: coluna K (Tentativas_Reativacao) — só conta se > 0.
  const emReativacao = useMemo(
    () => appointments.filter((a) => Number(a.tentativasReativacao ?? 0) > 0).length,
    [appointments],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Recepção
          </h1>
          <p className="mt-1.5 text-sm font-light tracking-wide text-muted-foreground">
            {formatarDataPremium(new Date())}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            Atualizado às {lastUpdate.toLocaleTimeString("pt-BR")}
          </span>
          <button
            onClick={() => void fetchData()}
            className="group flex items-center gap-2 rounded-full border border-gold/10 bg-black/50 px-4 py-2.5 text-sm font-medium text-foreground backdrop-blur-lg transition-all duration-300 hover:border-gold/25"
          >
            <RefreshCw
              className="h-4 w-4 text-gold transition-transform duration-500 group-hover:rotate-180"
              strokeWidth={1.5}
            />
            Atualizar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard
          icon={<Users className="h-5 w-5" strokeWidth={1.5} />}
          label="Total de Pacientes"
          value={total}
          accent="border-l-4 border-l-amber-500"
          iconColor="text-amber-400"
        />
        <StatCard
          icon={<CalendarClock className="h-5 w-5" strokeWidth={1.5} />}
          label="Com Horário Marcado"
          value={agendados}
          accent="border-l-4 border-l-slate-400/40"
          iconColor="text-slate-300"
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" strokeWidth={1.5} />}
          label="Confirmados"
          value={confirmados}
          accent="border-l-4 border-l-emerald-600/40"
          iconColor="text-emerald-400"
        />
        <StatCard
          icon={<Repeat className="h-5 w-5" strokeWidth={1.5} />}
          label="Pacientes em Reativação"
          value={emReativacao}
          accent="border-l-4 border-l-rose-700/40"
          iconColor="text-rose-400"
        />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="relative max-w-md flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, telefone, médico, data ou procedimento..."
            className="h-10 w-full rounded-full border border-gold/10 bg-black/50 pl-10 pr-10 text-sm text-foreground backdrop-blur-lg transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold/20"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          )}
        </div>
        {search && (
          <span className="whitespace-nowrap text-xs text-muted-foreground">
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gold/10 bg-black/50 shadow-[0_0_15px_rgba(212,175,55,0.03)] backdrop-blur-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <Th>Nº</Th>
                <Th>Paciente</Th>
                <Th>Status</Th>
                <Th>Data e Hora</Th>
                <Th>Médico Responsável</Th>
                <Th>Procedimento</Th>
                <Th>Reativação</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center">
                    <p className="text-sm text-muted-foreground">
                      {search
                        ? "Nenhum paciente encontrado para esta busca"
                        : "Nenhum paciente encontrado"}
                    </p>
                  </td>
                </tr>
              )}

              {filtered.map((apt, idx) => {
                const style = getStatusStyle(apt.status);
                const telefone = safe(apt.telefone);
                const medico = safe(apt.medico);
                return (
                  <tr
                    key={`${apt.telefone}-${apt.nome}-${idx}`}
                    className="group border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]"
                  >
                    <td className="p-4 text-xs font-medium text-muted-foreground">{idx + 1}</td>
                    <td className="p-4">
                      <div className="font-medium text-foreground">{safe(apt.nome)}</div>
                      {telefone !== "-" && (
                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageCircle className="h-3 w-3 text-emerald-400/70" strokeWidth={1.5} />
                          <span>{telefone}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
                          style.className,
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            style.dot,
                            style.pulse && "animate-pulse",
                          )}
                        />
                        {style.label}
                      </span>
                    </td>
                    <td className="whitespace-nowrap p-4 text-muted-foreground">
                      {safe(apt.dataHora)}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {medico !== "-" ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Stethoscope className="h-3.5 w-3.5 text-gold/60" strokeWidth={1.5} />
                          {medico}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">{medico}</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap p-4 text-muted-foreground">
                      {safe(apt.procedimento)}
                    </td>
                    <td className="whitespace-nowrap p-4 text-muted-foreground">
                      {Math.max(0, apt.tentativasReativacao ?? 0)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="whitespace-nowrap px-4 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </th>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
  iconColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  accent: string;
  iconColor: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-amber-500/10 bg-black/50 p-5 shadow-[0_0_15px_rgba(212,175,55,0.03)] backdrop-blur-lg transition-all duration-500 hover:border-amber-500/20 animate-fade-in",
        accent,
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 font-serif text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className={cn("shrink-0", iconColor)}>{icon}</div>
      </div>
    </div>
  );
}
