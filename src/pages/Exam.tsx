import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

const questions = [
  {
    id: 1,
    text: "Найдите значение выражения: 3² + 4² = ?",
    options: ["20", "24", "25", "49"],
    correct: 2,
    subject: "Математика",
  },
  {
    id: 2,
    text: "Какое из чисел является простым?",
    options: ["15", "21", "17", "27"],
    correct: 2,
    subject: "Математика",
  },
  {
    id: 3,
    text: "Чему равен sin(90°)?",
    options: ["0", "0.5", "√2/2", "1"],
    correct: 3,
    subject: "Математика",
  },
  {
    id: 4,
    text: "Переведите 1010₂ из двоичной в десятичную:",
    options: ["8", "10", "12", "16"],
    correct: 1,
    subject: "Информатика",
  },
  {
    id: 5,
    text: "Сколько бит в одном байте?",
    options: ["4", "6", "8", "16"],
    correct: 2,
    subject: "Информатика",
  },
]

const EXAM_DURATION = 25 * 60 // 25 минут в секундах

type Phase = "intro" | "exam" | "result"

export default function Exam() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>("intro")
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION)
  const [finished, setFinished] = useState(false)

  const finish = useCallback(() => {
    setFinished(true)
    setPhase("result")
  }, [])

  useEffect(() => {
    if (phase !== "exam" || finished) return
    if (timeLeft <= 0) {
      finish()
      return
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [phase, timeLeft, finished, finish])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  const handleAnswer = (idx: number) => {
    const updated = [...answers]
    updated[current] = idx
    setAnswers(updated)
  }

  const score = answers.filter((a, i) => a === questions[i].correct).length
  const percent = Math.round((score / questions.length) * 100)

  if (phase === "intro") {
    return (
      <div className="min-h-screen grid-bg flex items-center justify-center p-6">
        <div className="glass-panel rounded-2xl p-10 max-w-lg w-full text-center">
          <div className="text-5xl mb-6">🎯</div>
          <p className="text-cyan-400/70 text-sm font-mono mb-2">// пробный экзамен</p>
          <h1 className="text-3xl font-bold text-white mb-4">Пробный ЕГЭ</h1>
          <p className="text-white/50 mb-8">
            {questions.length} вопросов · 25 минут · Математика + Информатика
          </p>
          <div className="glass-panel rounded-xl p-4 mb-8 text-left space-y-2">
            {[
              "Отвечай на каждый вопрос, кликая по варианту",
              "Таймер идёт с момента старта",
              "По истечении времени экзамен завершится автоматически",
              "После финиша увидишь подробный разбор",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-white/60">
                <span className="text-cyan-400 font-mono">0{i + 1}.</span>
                {tip}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 py-3 glass-panel rounded-lg text-white/60 hover:text-white text-sm transition-all"
            >
              Назад
            </button>
            <button
              onClick={() => setPhase("exam")}
              className="flex-1 py-3 bg-cyan-400 text-gray-900 font-bold rounded-lg hover:bg-cyan-300 transition-all text-sm"
            >
              Начать экзамен
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === "result") {
    return (
      <div className="min-h-screen grid-bg flex items-center justify-center p-6">
        <div className="glass-panel rounded-2xl p-10 max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{percent >= 70 ? "🎉" : percent >= 50 ? "📈" : "💪"}</div>
            <p className="text-cyan-400/70 text-sm font-mono mb-2">// результаты</p>
            <h1 className="text-3xl font-bold text-white mb-2">
              {score} из {questions.length} правильно
            </h1>
            <div className={`text-5xl font-bold font-mono my-4 ${percent >= 70 ? "text-cyan-400" : percent >= 50 ? "text-yellow-400" : "text-red-400"}`}>
              {percent}%
            </div>
            <div className="h-2 bg-white/5 rounded-full mb-6">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${percent >= 70 ? "bg-cyan-400" : percent >= 50 ? "bg-yellow-400" : "bg-red-400"}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {questions.map((q, i) => (
              <div key={q.id} className={`flex items-start gap-3 p-3 rounded-lg ${answers[i] === q.correct ? "bg-cyan-400/5 border border-cyan-400/20" : "bg-red-400/5 border border-red-400/20"}`}>
                <span className={answers[i] === q.correct ? "text-cyan-400" : "text-red-400"}>
                  {answers[i] === q.correct ? "✓" : "✗"}
                </span>
                <div>
                  <p className="text-white/80 text-sm">{q.text}</p>
                  {answers[i] !== q.correct && (
                    <p className="text-cyan-400 text-xs mt-1">Правильно: {q.options[q.correct]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setAnswers(Array(questions.length).fill(null))
                setCurrent(0)
                setTimeLeft(EXAM_DURATION)
                setFinished(false)
                setPhase("intro")
              }}
              className="flex-1 py-3 glass-panel rounded-lg text-white/60 hover:text-white text-sm transition-all"
            >
              Пройти снова
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 py-3 bg-cyan-400 text-gray-900 font-bold rounded-lg hover:bg-cyan-300 transition-all text-sm"
            >
              В кабинет
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const isLow = timeLeft <= 60

  return (
    <div className="min-h-screen grid-bg flex flex-col">
      {/* Exam header */}
      <header className="glass-panel border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => navigate("/")} className="font-mono font-bold text-lg">
          <span className="text-cyan-400">&lt;</span>
          <span className="text-white">Exam</span>
          <span className="text-cyan-400">Code</span>
          <span className="text-purple-400">/&gt;</span>
        </button>

        {/* Timer */}
        <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg border transition-all ${isLow ? "bg-red-400/10 border-red-400/30 text-red-400 animate-pulse" : "glass-panel text-cyan-400"}`}>
          <Icon name="Timer" size={18} fallback="Clock" />
          {formatTime(timeLeft)}
        </div>

        <div className="text-white/40 text-sm font-mono">
          {current + 1}/{questions.length}
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-white/5">
        <div
          className="h-full bg-cyan-400 transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          {/* Question */}
          <div className="glass-panel rounded-2xl p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-cyan-400/60 font-mono text-sm">// вопрос {current + 1}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/10">{q.subject}</span>
            </div>
            <h2 className="text-white text-xl font-medium leading-relaxed">{q.text}</h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`p-4 rounded-xl text-left transition-all duration-200 border font-medium ${
                  answers[current] === idx
                    ? "bg-cyan-400/15 border-cyan-400/50 text-cyan-400"
                    : "glass-panel text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                <span className="font-mono text-xs mr-2 opacity-50">{["A", "B", "C", "D"][idx]}.</span>
                {opt}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="flex items-center gap-2 px-4 py-2.5 glass-panel rounded-lg text-white/50 hover:text-white disabled:opacity-30 transition-all text-sm"
            >
              <Icon name="ChevronLeft" size={16} fallback="ArrowLeft" />
              Назад
            </button>

            {/* Question dots */}
            <div className="flex-1 flex justify-center gap-2 flex-wrap">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-7 h-7 rounded-full text-xs font-mono transition-all ${
                    i === current
                      ? "bg-cyan-400 text-gray-900 font-bold"
                      : answers[i] !== null
                      ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/30"
                      : "bg-white/5 text-white/30 border border-white/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {current < questions.length - 1 ? (
              <button
                onClick={() => setCurrent((c) => c + 1)}
                className="flex items-center gap-2 px-4 py-2.5 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded-lg hover:bg-cyan-400/20 transition-all text-sm"
              >
                Далее
                <Icon name="ChevronRight" size={16} fallback="ArrowRight" />
              </button>
            ) : (
              <button
                onClick={finish}
                className="flex items-center gap-2 px-4 py-2.5 bg-cyan-400 text-gray-900 font-bold rounded-lg hover:bg-cyan-300 transition-all text-sm"
              >
                Завершить
                <Icon name="CheckCircle" size={16} fallback="Check" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
