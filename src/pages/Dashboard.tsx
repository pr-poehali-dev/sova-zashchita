import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

const subjects = [
  { name: "Математика", icon: "∑", progress: 72, score: 68, topics: 18, done: 13, color: "cyan" },
  { name: "Информатика", icon: "</>", progress: 88, score: 85, topics: 14, done: 12, color: "purple" },
  { name: "Физика", icon: "⚡", progress: 45, score: 52, topics: 20, done: 9, color: "cyan" },
  { name: "Русский язык", icon: "А", progress: 60, score: 61, topics: 16, done: 10, color: "purple" },
  { name: "Английский язык", icon: "EN", progress: 55, score: 58, topics: 12, done: 7, color: "cyan" },
]

const recentExams = [
  { subject: "Математика", date: "20 апр", score: 68, max: 100 },
  { subject: "Информатика", date: "18 апр", score: 85, max: 100 },
  { subject: "Физика", date: "15 апр", score: 52, max: 100 },
]

const schedule = [
  { subject: "Математика", time: "11:00", day: "Сегодня", type: "Теория" },
  { subject: "Информатика", time: "14:00", day: "Сегодня", type: "Задачи" },
  { subject: "Русский язык", time: "10:00", day: "Завтра", type: "Сочинение" },
]

type Tab = "overview" | "subjects" | "exams" | "schedule"

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>("overview")
  const navigate = useNavigate()

  return (
    <div className="min-h-screen grid-bg">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between glass-panel sticky top-0 z-50">
        <button onClick={() => navigate("/")} className="font-mono font-bold text-xl tracking-tight">
          <span className="text-cyan-400">&lt;</span>
          <span className="text-white">Exam</span>
          <span className="text-cyan-400">Code</span>
          <span className="text-purple-400">/&gt;</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-sm font-mono">
            А
          </div>
          <span className="text-white/70 text-sm hidden sm:block">Алексей Иванов</span>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 min-h-screen border-r border-white/10 p-4 hidden md:block">
          <nav className="space-y-1">
            {([
              { id: "overview", label: "Главная", icon: "LayoutDashboard" },
              { id: "subjects", label: "Предметы", icon: "BookOpen" },
              { id: "exams", label: "Экзамены", icon: "Timer" },
              { id: "schedule", label: "Расписание", icon: "Calendar" },
            ] as { id: Tab; label: string; icon: string }[]).map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  tab === item.id
                    ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon} size={16} fallback="Circle" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10">
            <button
              onClick={() => navigate("/exam")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all"
            >
              <Icon name="Zap" size={16} fallback="Circle" />
              Пробный экзамен
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Mobile tabs */}
          <div className="flex gap-2 mb-6 md:hidden overflow-x-auto pb-1">
            {([
              { id: "overview", label: "Главная" },
              { id: "subjects", label: "Предметы" },
              { id: "exams", label: "Экзамены" },
              { id: "schedule", label: "Расписание" },
            ] as { id: Tab; label: string }[]).map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  tab === item.id
                    ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                    : "text-white/50 border border-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div className="space-y-6">
              <div>
                <p className="text-white/40 text-sm font-mono">// добро пожаловать</p>
                <h1 className="text-2xl font-bold text-white mt-1">Привет, Алексей! 👋</h1>
                <p className="text-white/40 text-sm mt-1">До ЕГЭ осталось 38 дней</p>
              </div>

              {/* Score cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Средний балл", value: "68.8", icon: "TrendingUp", color: "cyan" },
                  { label: "Занятий пройдено", value: "51", icon: "BookOpen", color: "purple" },
                  { label: "Пробных экзаменов", value: "7", icon: "Timer", color: "cyan" },
                  { label: "Дней подряд", value: "12", icon: "Flame", color: "purple" },
                ].map((card) => (
                  <div key={card.label} className="glass-panel rounded-xl p-4">
                    <Icon
                      name={card.icon}
                      size={18}
                      className={card.color === "cyan" ? "text-cyan-400 mb-3" : "text-purple-400 mb-3"}
                      fallback="Circle"
                    />
                    <div className={`text-2xl font-bold font-mono ${card.color === "cyan" ? "text-cyan-400" : "text-purple-400"}`}>
                      {card.value}
                    </div>
                    <div className="text-white/40 text-xs mt-1">{card.label}</div>
                  </div>
                ))}
              </div>

              {/* Progress by subject */}
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="text-white font-bold mb-4 font-mono text-sm">// прогресс по предметам</h2>
                <div className="space-y-4">
                  {subjects.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white/80 text-sm">{s.name}</span>
                        <span className={`text-sm font-mono font-bold ${s.color === "cyan" ? "text-cyan-400" : "text-purple-400"}`}>
                          {s.score} б.
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${s.color === "cyan" ? "bg-cyan-400" : "bg-purple-400"}`}
                          style={{ width: `${s.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent exams + schedule */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-panel rounded-2xl p-6">
                  <h2 className="text-white font-bold mb-4 font-mono text-sm">// последние экзамены</h2>
                  <div className="space-y-3">
                    {recentExams.map((ex) => (
                      <div key={ex.subject} className="flex items-center justify-between">
                        <div>
                          <div className="text-white/80 text-sm">{ex.subject}</div>
                          <div className="text-white/30 text-xs">{ex.date}</div>
                        </div>
                        <div className="text-cyan-400 font-mono font-bold">{ex.score}<span className="text-white/30 font-normal">/{ex.max}</span></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-6">
                  <h2 className="text-white font-bold mb-4 font-mono text-sm">// расписание</h2>
                  <div className="space-y-3">
                    {schedule.map((s, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <div className="text-white/80 text-sm">{s.subject}</div>
                          <div className="text-white/30 text-xs">{s.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-cyan-400 font-mono text-sm">{s.time}</div>
                          <div className="text-white/30 text-xs">{s.day}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/exam")}
                className="w-full glass-panel-purple rounded-xl p-5 flex items-center justify-between hover:border-purple-400/40 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Icon name="Zap" size={24} fallback="Circle" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold">Пройти пробный экзамен</div>
                    <div className="text-white/40 text-sm">Математика · 3 часа 55 минут</div>
                  </div>
                </div>
                <Icon name="ArrowRight" size={20} className="text-white/30 group-hover:text-purple-400 transition-colors" fallback="ChevronRight" />
              </button>
            </div>
          )}

          {tab === "subjects" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-white mb-6">Мои предметы</h1>
              {subjects.map((s) => (
                <div key={s.name} className="glass-panel rounded-2xl p-6 flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold font-mono flex-shrink-0 ${s.color === "cyan" ? "bg-cyan-400/10 text-cyan-400" : "bg-purple-500/10 text-purple-400"}`}>
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold">{s.name}</h3>
                      <span className={`font-mono font-bold ${s.color === "cyan" ? "text-cyan-400" : "text-purple-400"}`}>{s.score} б.</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full mb-2">
                      <div className={`h-full rounded-full ${s.color === "cyan" ? "bg-cyan-400" : "bg-purple-400"}`} style={{ width: `${s.progress}%` }} />
                    </div>
                    <div className="text-white/30 text-xs">{s.done} из {s.topics} тем пройдено</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "exams" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Пробные экзамены</h1>
                <button
                  onClick={() => navigate("/exam")}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 rounded-lg text-sm hover:bg-cyan-400/20 transition-all"
                >
                  <Icon name="Plus" size={16} fallback="Circle" />
                  Новый экзамен
                </button>
              </div>
              {recentExams.map((ex, i) => (
                <div key={i} className="glass-panel rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold">{ex.subject}</h3>
                    <div className="text-white/30 text-sm">{ex.date} · Пробный ЕГЭ</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold font-mono ${ex.score >= 70 ? "text-cyan-400" : ex.score >= 50 ? "text-yellow-400" : "text-red-400"}`}>
                      {ex.score}
                    </div>
                    <div className="text-white/30 text-xs">из {ex.max}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "schedule" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-white mb-6">Расписание занятий</h1>
              {schedule.map((s, i) => (
                <div key={i} className="glass-panel rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center">
                      <Icon name="Calendar" size={20} className="text-cyan-400" fallback="Circle" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{s.subject}</h3>
                      <div className="text-white/30 text-sm">{s.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-400 font-mono font-bold">{s.time}</div>
                    <div className="text-white/30 text-xs">{s.day}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
