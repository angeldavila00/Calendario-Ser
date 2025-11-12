import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Goal {
  name: string;
  target: number;
  current: number;
  type: "short" | "long";
  deadline: string;
}

export const SavingsGoal = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      name: "Fondo de Emergencia",
      target: 5000,
      current: 1200,
      type: "short",
      deadline: "2025-06-30",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    type: "short" as "short" | "long",
    deadline: "",
  });

  const addGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setGoals([
      ...goals,
      {
        ...newGoal,
        target: parseFloat(newGoal.target),
        current: 0,
      },
    ]);

    setNewGoal({ name: "", target: "", type: "short", deadline: "" });
    setIsAdding(false);
    toast.success("¡Meta agregada exitosamente!");
  };

  const [customAmounts, setCustomAmounts] = useState<{ [key: number]: string }>({});

  const addToGoal = (index: number, amount: number) => {
    const updatedGoals = [...goals];
    updatedGoals[index].current = Math.min(
      updatedGoals[index].current + amount,
      updatedGoals[index].target
    );
    setGoals(updatedGoals);
    toast.success(`¡Agregaste $${amount} a tu meta!`);
  };

  const addCustomAmount = (index: number) => {
    const amount = parseFloat(customAmounts[index] || "0");
    if (amount <= 0 || isNaN(amount)) {
      toast.error("Por favor ingresa un monto válido");
      return;
    }
    addToGoal(index, amount);
    setCustomAmounts({ ...customAmounts, [index]: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Tus Metas de Ahorro
        </h2>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          {isAdding ? "Cancelar" : "+ Nueva Meta"}
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6 border-primary/20 animate-fade-in">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre de la meta</Label>
              <Input
                id="name"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                placeholder="Ej: Vacaciones, Auto nuevo..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="target">Monto objetivo</Label>
                <Input
                  id="target"
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  placeholder="5000"
                />
              </div>
              <div>
                <Label htmlFor="deadline">Fecha límite</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Tipo de meta</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant={newGoal.type === "short" ? "default" : "outline"}
                  onClick={() => setNewGoal({ ...newGoal, type: "short" })}
                  className="flex-1"
                >
                  Corto Plazo
                </Button>
                <Button
                  type="button"
                  variant={newGoal.type === "long" ? "default" : "outline"}
                  onClick={() => setNewGoal({ ...newGoal, type: "long" })}
                  className="flex-1"
                >
                  Largo Plazo
                </Button>
              </div>
            </div>
            <Button onClick={addGoal} className="w-full bg-primary hover:bg-primary/90">
              Crear Meta
            </Button>
          </div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;
          const isCompleted = goal.current >= goal.target;
          return (
            <Card
              key={index}
              className="p-6 border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{goal.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(goal.deadline).toLocaleDateString("es-ES")}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      goal.type === "short"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-accent/20 text-accent"
                    }`}
                  >
                    {goal.type === "short" ? "Corto" : "Largo"} Plazo
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progreso</span>
                    <span className="font-semibold text-foreground">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3" />
                    {progress.toFixed(0)}% completado
                  </div>
                </div>

                {isCompleted ? (
                  <div className="text-center py-4 space-y-2">
                    <p className="text-lg font-semibold text-primary">
                      🎉 ¡Meta Alcanzada!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Has completado esta meta de ahorro exitosamente
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => addToGoal(index, 100)}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        +$100
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => addToGoal(index, 500)}
                        className="flex-1 bg-secondary hover:bg-secondary/90"
                      >
                        +$500
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => addToGoal(index, 1000)}
                        className="flex-1 bg-accent hover:bg-accent/90"
                      >
                        +$1000
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Otro monto..."
                        value={customAmounts[index] || ""}
                        onChange={(e) =>
                          setCustomAmounts({ ...customAmounts, [index]: e.target.value })
                        }
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        onClick={() => addCustomAmount(index)}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
