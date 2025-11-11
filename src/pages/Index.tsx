import { MotivationalMessage } from "@/components/MotivationalMessage";
import { SavingsCalendar } from "@/components/SavingsCalendar";
import { SavingsGoal } from "@/components/SavingsGoal";
import { PiggyBank } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 shadow-lg">
            <PiggyBank className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mi Calendario de Ahorro
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforma tu futuro financiero, un día a la vez
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Motivational Message */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <MotivationalMessage />
          </div>

          {/* Calendar */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <SavingsCalendar />
          </div>

          {/* Goals */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <SavingsGoal />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>💚 Cada pequeño ahorro cuenta para tu gran futuro</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
