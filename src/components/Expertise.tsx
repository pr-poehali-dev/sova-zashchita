import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const courses = [
  {
    title: "Личный кабинет",
    description: "Твой прогресс, баллы, расписание и история пробных экзаменов — всё в одном месте. Как настоящий дашборд разработчика.",
    icon: "LayoutDashboard",
  },
  {
    title: "Пробные экзамены",
    description: "Реальные варианты ОГЭ и ЕГЭ с таймером и автоматической проверкой. Тренируйся в боевых условиях.",
    icon: "Timer",
  },
  {
    title: "График прогресса",
    description: "Видишь, как растут твои баллы по каждой теме. Аналитика помогает понять, что проработать перед экзаменом.",
    icon: "TrendingUp",
  },
  {
    title: "AI-помощник",
    description: "Допустил ошибку — AI объяснит почему и разберёт тему заново. Доступен 24/7, никогда не устаёт.",
    icon: "Bot",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-cyan-400/70 text-sm tracking-[0.3em] uppercase mb-6 font-mono">// features</p>
          <h2 className="text-6xl font-bold leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl text-white">
            <HighlightedText>Инструменты</HighlightedText>, которые
            <br />
            работают
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Всё необходимое для подготовки к экзамену в одной платформе. Никаких лишних вкладок — только то, что нужно.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {courses.map((course, index) => (
            <div
              key={course.title}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-index={index}
              className={`relative pl-8 border-l border-cyan-400/20 transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-4">
                <Icon name={course.icon} className="w-10 h-10 text-cyan-400" strokeWidth={1.25} fallback="Star" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{course.title}</h3>
              <p className="text-white/50 leading-relaxed">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
