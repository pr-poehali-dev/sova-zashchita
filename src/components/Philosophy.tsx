import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Системный подход",
    description:
      "Никакой воды — только структура. Каждая тема разложена по полочкам: от теории к практике, от простого к сложному. Как хороший код: чисто, логично, без лишнего.",
  },
  {
    title: "Практика каждый день",
    description:
      "Тренировочные задания в формате реального экзамена. Пробные ОГЭ и ЕГЭ с таймером, разбор ошибок и рост баллов — всё это видно в личном кабинете.",
  },
  {
    title: "AI объясняет ошибки",
    description:
      "Сделал ошибку — получи объяснение мгновенно. Наш AI-помощник анализирует твои ответы и даёт подсказки на языке, понятном школьнику.",
  },
  {
    title: "Прогресс как на дашборде",
    description: "Графики роста баллов, статистика по темам, напоминания о занятиях. Видишь свой прогресс — понимаешь, что делать дальше.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-cyan-400/70 text-sm tracking-[0.3em] uppercase mb-6 font-mono">// philosophy</p>
            <h2 className="text-6xl md:text-6xl font-bold leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl text-white">
              Учёба с
              <br />
              <HighlightedText>кодом</HighlightedText>
            </h2>

            <div className="relative hidden lg:block mt-8">
              {/* Code block decoration */}
              <div className="glass-panel rounded-2xl p-6 font-mono text-sm">
                <div className="text-white/30 mb-3">// твой прогресс</div>
                <div className="space-y-2">
                  <div>
                    <span className="text-purple-400">const</span>
                    <span className="text-white"> математика </span>
                    <span className="text-white/50">= </span>
                    <span className="text-cyan-400">{"{"}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-white/60">баллы</span>
                    <span className="text-white/30">: </span>
                    <span className="text-green-400">87</span>
                    <span className="text-white/30">,</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-white/60">темы</span>
                    <span className="text-white/30">: </span>
                    <span className="text-green-400">{"[✓ алгебра, ✓ геометрия]"}</span>
                  </div>
                  <div>
                    <span className="text-cyan-400">{"}"}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-white/30">{">"} </span>
                    <span className="text-green-400">Готов к экзамену!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-white/50 text-lg leading-relaxed max-w-md mb-12">
              ExamCode — это не репетитор с тетрадкой. Это платформа, где подготовка к экзаменам выглядит как работа с настоящим IT-продуктом.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-cyan-400/40 text-sm font-medium font-mono">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-white/50 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
