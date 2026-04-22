import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Для кого подходит ExamCode?",
    answer:
      "Для учеников 9 и 11 классов, которые готовятся к ОГЭ или ЕГЭ. Платформа подходит как для тех, кто только начинает подготовку, так и для тех, кто хочет подтянуть конкретные темы перед экзаменом.",
  },
  {
    question: "Как проходит обучение?",
    answer:
      "Ты выбираешь предмет, проходишь теоретические блоки, решаешь задачи и регулярно тренируешься на пробных вариантах с таймером — точь-в-точь как на реальном экзамене. AI-помощник разбирает ошибки сразу после выполнения задания.",
  },
  {
    question: "Что такое AI-помощник?",
    answer:
      "Это встроенный чат-бот, который объясняет ошибки и непонятные темы простым языком. Он доступен 24/7 — в любое время можно написать вопрос и получить развёрнутый ответ с разбором.",
  },
  {
    question: "Можно ли попробовать бесплатно?",
    answer:
      "Да! Доступен бесплатный пробный период: несколько уроков по каждому предмету и один пробный экзамен. Этого достаточно, чтобы понять, подходит ли тебе платформа.",
  },
  {
    question: "Как выглядит личный кабинет?",
    answer:
      "В личном кабинете ты видишь свой прогресс по каждой теме, графики роста баллов, расписание занятий и историю пробных экзаменов. Всё в одном месте — как настоящий дашборд.",
  },
  {
    question: "Как начать заниматься?",
    answer:
      "Нажми кнопку «Начать бесплатно», зарегистрируйся и выбери предмет. Уже через несколько минут сможешь пройти первый урок и решить пробные задания.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-cyan-400/70 text-sm tracking-[0.3em] uppercase mb-6 font-mono">// FAQ</p>
          <h2 className="text-6xl font-bold leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl text-white">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/10">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-white transition-colors group-hover:text-cyan-400">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-white/50 leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
