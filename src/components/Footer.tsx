export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="inline-block mb-6">
              <span className="font-mono font-bold text-2xl tracking-tight">
                <span className="text-cyan-400">&lt;</span>
                <span className="text-white">Exam</span>
                <span className="text-cyan-400">Code</span>
                <span className="text-purple-400">/&gt;</span>
              </span>
            </a>
            <p className="text-white/40 leading-relaxed max-w-sm">
              Онлайн-школа подготовки к ОГЭ и ЕГЭ с IT-подходом. Математика, информатика, физика, русский и английский.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-white font-mono">// навигация</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  Предметы
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  Подход
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  Возможности
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">
                  Записаться
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-white font-mono">// контакты</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li>
                <a href="mailto:hello@examcode.ru" className="hover:text-cyan-400 transition-colors">
                  hello@examcode.ru
                </a>
              </li>
              <li>
                <a href="tel:+74951234567" className="hover:text-cyan-400 transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Телеграм
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  ВКонтакте
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-white/30">
          <p>© 2026 ExamCode. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
