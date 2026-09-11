export interface Appointment {
  telefone: string;
  nome: string;
  email: string;
  statusPorteiro: string;
  status: string;
  dataHora: string;
  medico: string;
  procedimento: string;
  /** Coluna K — Tentativas_Reativacao */
  tentativasReativacao: number;
  /** Coluna I — contador auxiliar de campanha */
  campanhaReativacao: number;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function toInt(value: string | undefined): number {
  const n = parseInt((value ?? "0").trim(), 10);
  return Number.isFinite(n) ? n : 0;
}

export function parseCSV(csvText: string): Appointment[] {
  const lines = csvText
    .trim()
    .split(/\r?\n/)
    .filter((l) => l.trim());
  if (lines.length < 2) return [];

  const appointments: Appointment[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i] ?? "");

    const telefone = (cols[0] ?? "").trim();
    const nome = (cols[1] ?? "").trim();
    const email = (cols[2] ?? "").trim();
    const statusPorteiro = (cols[3] ?? "").trim();
    const status = (cols[4] ?? "").trim();
    const dataHora = (cols[5] ?? "").trim();
    const medico = (cols[6] ?? "").trim();
    const procedimento = (cols[7] ?? "").trim();
    // Coluna I (index 8) e Coluna K (index 10)
    const campanhaReativacao = toInt(cols[8]);
    const tentativasReativacao = toInt(cols[10]);

    if (!nome && !status && !telefone) continue;

    appointments.push({
      telefone,
      nome,
      email,
      statusPorteiro,
      status,
      dataHora,
      medico,
      procedimento,
      tentativasReativacao,
      campanhaReativacao,
    });
  }

  return appointments;
}

export const mockAppointments: Appointment[] = [
  {
    telefone: "+55 11 98765-4321",
    nome: "Julio",
    email: "julio@email.com",
    statusPorteiro: "",
    status: "Confirmado",
    dataHora: "31/08/2026 09:00",
    medico: "Dr. André Marques",
    procedimento: "Consulta Cardiológica",
    tentativasReativacao: 0,
    campanhaReativacao: 0,
  },
  {
    telefone: "+55 11 99876-5432",
    nome: "David",
    email: "david@email.com",
    statusPorteiro: "",
    status: "Agendado",
    dataHora: "31/08/2026 10:30",
    medico: "Dra. Helena Costa",
    procedimento: "Exame de Sangue",
    tentativasReativacao: 2,
    campanhaReativacao: 2,
  },
  {
    telefone: "+55 11 97654-3210",
    nome: "Marina",
    email: "marina@email.com",
    statusPorteiro: "",
    status: "Pendente Atendente",
    dataHora: "01/09/2026 14:00",
    medico: "Dr. Carlos Souza",
    procedimento: "Consulta Cardiológica",
    tentativasReativacao: 1,
    campanhaReativacao: 1,
  },
  {
    telefone: "+55 11 96543-2109",
    nome: "Ricardo",
    email: "ricardo@email.com",
    statusPorteiro: "",
    status: "Realizado",
    dataHora: "02/09/2026 08:00",
    medico: "Dra. Helena Costa",
    procedimento: "Ecocardiograma",
    tentativasReativacao: 0,
    campanhaReativacao: 0,
  },
  {
    telefone: "+55 11 95432-1098",
    nome: "Beatriz",
    email: "beatriz@email.com",
    statusPorteiro: "",
    status: "A espera confirmacao",
    dataHora: "03/09/2026 11:00",
    medico: "Dr. André Marques",
    procedimento: "Exame de Sangue",
    tentativasReativacao: 3,
    campanhaReativacao: 3,
  },
];
