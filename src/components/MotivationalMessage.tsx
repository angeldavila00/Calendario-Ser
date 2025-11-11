import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const messages = [
  "¡Cada peso ahorrado es un paso hacia tu libertad financiera!",
  "El ahorro de hoy es la tranquilidad de mañana 💪",
  "Pequeños ahorros, grandes sueños realizados ✨",
  "Tu futuro yo te agradecerá cada decisión de ahorro",
  "¡Estás construyendo tu mejor versión financiera!",
  "La constancia en el ahorro es el secreto del éxito 🌟",
  "Cada día sin gastar innecesariamente es una victoria",
  "Tu meta está más cerca de lo que piensas 🎯",
];

export const MotivationalMessage = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 bg-primary/20 p-2 rounded-full">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">Mensaje Motivacional</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {messages[currentMessage]}
          </p>
        </div>
      </div>
    </Card>
  );
};
