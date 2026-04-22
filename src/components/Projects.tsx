import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const subjects = [
  {
    id: 1,
    title: "Математика",
    category: "ОГЭ / ЕГЭ",
    description: "Алгебра, геометрия, теория вероятностей",
    year: "9 / 11 кл.",
    color: "cyan",
    icon: "∑",
  },
  {
    id: 2,
    title: "Информатика",
    category: "ОГЭ / ЕГЭ",
    description: "Алгоритмы, Python, базы данных, теория",
    year: "9 / 11 кл.",
    color: "purple",
    icon: "</>",
  },
  {
    id: 3,
    title: "Физика",
    category: "ОГЭ / ЕГЭ",
    description: "Механика, электричество, оптика, ядерная физика",
    year: "9 / 11 кл.",
    color: "cyan",
    icon: "⚡",
  },
  {
    id: 4,
    title: "Русский язык",
    category: "ОГЭ / ЕГЭ",
    description: "Грамматика, орфография, сочинение, изложение",
    year: "9 / 11 кл.",
    color: "purple",
    icon: "А",
  },
  {
    id: 5,
    title: "Английский язык",
    category: "ОГЭ / ЕГЭ",
    description: "Грамматика, говорение, чтение, письмо",
    year: "9 / 11 кл.",
    color: "cyan",
    icon: "EN",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedItems((prev) => new Set(prev).add(subjects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-cyan-400/70 text-sm tracking-[0.3em] uppercase mb-6 font-mono">// subjects</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">Наши предметы</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-cyan-400 transition-colors group"
          >
            Записаться на курс
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
          {subjects.map((subject, index) => (
            <article
              key={subject.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`group cursor-pointer glass-panel rounded-2xl p-8 transition-all duration-500 ${
                revealedItems.has(subject.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${hoveredId === subject.id ? "border-cyan-400/40 bg-white/[0.06]" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(subject.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center text-2xl font-bold font-mono transition-all duration-300 ${
                  subject.color === "cyan"
                    ? "bg-cyan-400/10 text-cyan-400 group-hover:bg-cyan-400/20"
                    : "bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20"
                }`}
              >
                {subject.icon}
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {subject.title}
                  </h3>
                  <p className="text-white/40 text-sm mb-3">{subject.description}</p>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
                    {subject.category}
                  </span>
                </div>
                <span className="text-white/30 text-xs font-mono whitespace-nowrap">{subject.year}</span>
              </div>
            </article>
          ))}

          {/* CTA card */}
          <article className="glass-panel-purple rounded-2xl p-8 flex flex-col justify-center items-center text-center cursor-pointer hover:border-purple-400/40 transition-all duration-300 group min-h-[200px]">
            <div className="w-16 h-16 rounded-xl mb-4 flex items-center justify-center bg-purple-500/10 text-purple-400 text-2xl group-hover:bg-purple-500/20 transition-all duration-300">
              🤖
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI-помощник</h3>
            <p className="text-white/40 text-sm">Объяснит любую ошибку 24/7</p>
          </article>
        </div>
      </div>
    </section>
  )
}
