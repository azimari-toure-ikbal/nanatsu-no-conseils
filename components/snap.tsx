"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const sections = [
  {
    id: 1,
    title: "Reposes toi",
    content:
      "Venant d'un bourreau de travail comme moi ça peut sembler faux MAIS reposes toi ! L'esprit dicte le corps. Tu dois prendre le temps de bien te reposer pour reprendre des forces mais surtout pour pouvoir alléger ton esprit.",
    color: "bg-red-500",
  },
  {
    id: 2,
    title: "Prends ton temps",
    content:
      "La vie est un marathon pas une course (ouais c'est cliché et alors?). Evite de te précipiter dans ce que tu entreprends. Observe, Jauge, Expérimente, Apprends. Tu serais étonné aujourd'hui à repenser à tout ce que tu as eu à rater comme opportunité ou tout choix qui aurait pu être mieux cerné si tu avais pris le temps qu'il fallait avant de poser une décision.",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Garde ton sang froid",
    content:
      "Comme ça les vampires ne voudront pas te faire de mal. Bah ouais qui aimerai boire du sang froid ? Brother Eeww. Mais plus sérieusement, avec le point précédent c'est vraiment ce qui te permettra de t'en sortir un maximum face à l'inconnu. Cela te permettre d'avoir une hauteur face aux situations et t'évitera, surtout dans les contextes dans lesquels les émotions sont impliquées, de te retrouver dans une situation pire que celle initiale.",
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Profite des petits bonheurs",
    content:
      "Simple et Clair. Les petites victoires, les petits bonheurs il faut s'avoir en profiter et surtout les graver dans ta mémoire. Pourquoi ? Car ce sont eux qui te permettre de tenir au quotidien. Et pense à en profiter. S'il faut sourire toute la journée grâce à ça alors montre tes dents on s'en fout profite, savoure, mange ton bonheur !",
    color: "bg-yellow-500",
  },
  {
    id: 5,
    title: "Ne te mets pas trop de pression",
    content:
      "Peu importe le moment dans ta vie, peu importe la situation, peu importe le contexte, peu importe les conséquences, ne te mets pas de pression. Surtout ne te mets pas TROP de pression. La pression tue la logique et la raison. Tu dois te concentrer sur ce qui te semble le plus important et sur ce qui te permet de vivre une vie heureuse.",
    color: "bg-fuchsia-500",
  },
  {
    id: 6,
    title: "Apprends à t'aimer",
    content:
      "It's Self Love o'clock. Prends toujours le temps de te féliciter, de te cheer, de te rappeler à toi même que tu fais de ton mieux au quotidien. Certes la vie n'est pas facile mais elle l'est encore moins quand on est son propre ennemie... Et si d'autres sont en mesure de t'aimer (Faby, Aminata, Antonio, Moi, ...) alors c'est que tu en es capable.",
    color: "bg-indigo-500",
  },
  {
    id: 7,
    title: "Autorise toi des erreurs",
    content:
      "Des fois tu vas tomber, tu vas te tromper, tu vas peut être faire perdre du temps et de l'argent à toi ou ton entreprise ou whatever... MAIS le plus important c'est qu'est ce que tu vas faire de tout ça ? Il s'agit d'une expérience et toute expérience est bonne à prendre. Nous nous construisons plus sur la base de nos erreurs que de nos réussites car elles nous en apprennent plus. Donc ne te flagèle pas, ne déprime pas, apprends, apprends à surmonter tes peurs et te lancer même si cela doit échouer parce qu'à la fin tu auras acquis une précieuse expérience de plus.",
    color: "bg-cyan-500",
  },
];

export default function SnapScroll() {
  const [activeSection, setActiveSection] = useState(1);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = sections.map((section, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id);
            }
          });
        },
        { threshold: 0.5 }
      );

      if (observerRefs.current[index]) {
        observer.observe(observerRefs.current[index]!);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => {
            observerRefs.current[index] = el;
          }}
          className={`h-screen w-full flex flex-col gap-12 items-center justify-center snap-start ${section.color}`}
        >
          <h2 className="text-center text-5xl font-bold text-white">
            {section.title}
          </h2>
          <p className="max-w-xl text-white text-lg font-medium text-center">
            {section.content}
          </p>
        </div>
      ))}

      <div
        className={cn(
          "fixed top-4 font-bold right-4 bg-white rounded-full px-4 py-2 shadow-md",
          activeSection === 1 && "text-red-500",
          activeSection === 2 && "text-blue-500",
          activeSection === 3 && "text-green-500",
          activeSection === 4 && "text-yellow-500",
          activeSection === 5 && "text-brown-500",
          activeSection === 6 && "text-indigo-500",
          activeSection === 7 && "text-cyan-500"
        )}
      >
        Nanatsu no Conseils
      </div>
    </div>
  );
}
