import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, CheckCircle2, Circle } from "lucide-react";
import { toast } from "sonner";

interface DayData {
  date: string;
  saved: boolean;
  amount: number;
}

export const SavingsCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [savedDays, setSavedDays] = useState<DayData[]>([]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

  const toggleDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const existing = savedDays.find((d) => d.date === dateStr);

    if (existing) {
      setSavedDays(savedDays.filter((d) => d.date !== dateStr));
      toast.info("Día desmarcado");
    } else {
      setSavedDays([...savedDays, { date: dateStr, saved: true, amount: 50 }]);
      toast.success("¡Día de ahorro marcado! 🎉");
    }
  };

  const isDaySaved = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return savedDays.some((d) => d.date === dateStr);
  };

  const changeMonth = (direction: number) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1)
    );
  };

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const totalSaved = savedDays.reduce((sum, day) => sum + day.amount, 0);
  const daysThisMonth = savedDays.filter((d) =>
    d.date.startsWith(
      `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`
    )
  ).length;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Calendario de Ahorro</h2>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Ahorrado</div>
            <div className="text-2xl font-bold text-primary">${totalSaved}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => changeMonth(-1)}
            className="border-primary/50 hover:bg-primary/10"
          >
            ← Anterior
          </Button>
          <h3 className="text-xl font-semibold text-foreground">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <Button
            variant="outline"
            onClick={() => changeMonth(1)}
            className="border-primary/50 hover:bg-primary/10"
          >
            Siguiente →
          </Button>
        </div>

        <div className="bg-success-light rounded-lg p-4 text-center">
          <div className="text-sm text-muted-foreground">Días ahorrados este mes</div>
          <div className="text-3xl font-bold text-primary mt-1">{daysThisMonth}</div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-muted-foreground p-2">
              {day}
            </div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const saved = isDaySaved(day);
            const today = new Date();
            const isToday =
              today.getDate() === day &&
              today.getMonth() === currentMonth.getMonth() &&
              today.getFullYear() === currentMonth.getFullYear();

            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`
                  relative aspect-square rounded-lg p-2 text-sm font-medium transition-all duration-200
                  hover:scale-105 hover:shadow-md
                  ${
                    saved
                      ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg"
                      : "bg-card hover:bg-muted border border-border"
                  }
                  ${isToday && !saved ? "ring-2 ring-primary" : ""}
                `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  {saved ? (
                    <CheckCircle2 className="w-4 h-4 mb-1" />
                  ) : (
                    <Circle className="w-4 h-4 mb-1 opacity-30" />
                  )}
                  <span>{day}</span>
                </div>
                {isToday && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Haz clic en los días para marcarlos como días de ahorro
        </div>
      </div>
    </Card>
  );
};
