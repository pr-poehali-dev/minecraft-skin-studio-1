import { useState } from "react";
import Icon from "@/components/ui/icon";

const SKIN_IMAGE = "https://cdn.poehali.dev/projects/1da4cb67-a45c-4b1f-8651-59c1343cbc06/files/5b30d099-fa53-4d4d-8902-be9915638ecc.jpg";

const SKINS = [
  { id: 1, name: "Неоновый Воин", category: "Воин", style: "Нео", price: 490, tag: "ХИТ", image: SKIN_IMAGE },
  { id: 2, name: "Теневой Маг", category: "Маг", style: "Тёмный", price: 790, tag: "НОВИНКА", image: SKIN_IMAGE },
  { id: 3, name: "Кубо Рейнджер", category: "Рейнджер", style: "Кубо", price: 350, tag: null, image: SKIN_IMAGE },
  { id: 4, name: "Призрак Бездны", category: "Ассасин", style: "Тёмный", price: 990, tag: "ПРЕМ", image: SKIN_IMAGE },
  { id: 5, name: "Кристальный Лорд", category: "Воин", style: "Кубо", price: 650, tag: null, image: SKIN_IMAGE },
  { id: 6, name: "Байт Хакер", category: "Маг", style: "Нео", price: 890, tag: "НОВИНКА", image: SKIN_IMAGE },
];

const SERVICES = [
  { icon: "Paintbrush", title: "Кастомный скин", desc: "Уникальный скин по вашему эскизу или описанию. Работаем до результата.", price: "от 2 990 ₽", color: "var(--neon-green)" },
  { icon: "Layers", title: "Пакет текстур", desc: "Полный набор текстур для персонажа: тело, доспехи, оружие, эффекты.", price: "от 7 990 ₽", color: "var(--neon-purple)" },
  { icon: "Zap", title: "Анимация скина", desc: "Добавляем свечение, частицы и анимированные элементы к готовому скину.", price: "от 4 500 ₽", color: "var(--neon-yellow)" },
  { icon: "Shield", title: "Ребрендинг", desc: "Переработка существующего скина в новом стиле с сохранением характера.", price: "от 3 500 ₽", color: "var(--neon-cyan)" },
];

const BLOG_POSTS = [
  { date: "15 апр 2026", tag: "ГАЙД", title: "Как создать скин за 1 час: пошаговый разбор", reads: "1.2K" },
  { date: "08 апр 2026", tag: "ТРЕНДЫ", title: "Кубический стиль захватывает игровую индустрию", reads: "876" },
  { date: "01 апр 2026", tag: "КЕЙС", title: "История скина «Призрак Бездны»: от эскиза до релиза", reads: "2.4K" },
];

type Section = "home" | "catalog" | "services" | "about" | "blog" | "contacts";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterStyle, setFilterStyle] = useState("Все");
  const [filterCat, setFilterCat] = useState("Все");
  const [filterPrice, setFilterPrice] = useState("Все");

  const navItems: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "catalog", label: "Каталог" },
    { id: "services", label: "Услуги" },
    { id: "about", label: "О студии" },
    { id: "blog", label: "Блог" },
    { id: "contacts", label: "Контакты" },
  ];

  const styles = ["Все", "Нео", "Тёмный", "Кубо"];
  const categories = ["Все", "Воин", "Маг", "Рейнджер", "Ассасин"];
  const prices = ["Все", "до 500 ₽", "500–800 ₽", "от 800 ₽"];

  const filteredSkins = SKINS.filter((s) => {
    const styleOk = filterStyle === "Все" || s.style === filterStyle;
    const catOk = filterCat === "Все" || s.category === filterCat;
    const priceOk =
      filterPrice === "Все" ||
      (filterPrice === "до 500 ₽" && s.price < 500) ||
      (filterPrice === "500–800 ₽" && s.price >= 500 && s.price <= 800) ||
      (filterPrice === "от 800 ₽" && s.price > 800);
    return styleOk && catOk && priceOk;
  });

  const scrollTo = (id: Section) => {
    setActiveSection(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-rubik">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-green flex items-center justify-center" style={{ clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)" }}>
              <span className="text-background font-russo text-xs">SC</span>
            </div>
            <span className="font-russo text-lg tracking-wider neon-text">SKINCRAFT</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-neon-green border-b-2 border-neon-green"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contacts")}
            className="hidden md:flex cube-btn bg-neon-green text-background px-5 py-2 text-sm"
          >
            Заказать
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-neon-green">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-2 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left py-2 px-3 text-sm font-medium uppercase tracking-wider border-l-2 transition-all ${
                  activeSection === item.id
                    ? "border-neon-green text-neon-green"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-16">

        {/* HOME */}
        {activeSection === "home" && (
          <div>
            <section className="min-h-[92vh] flex items-center relative overflow-hidden px-4">
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute border border-neon-green/10 rotate-45 animate-float"
                    style={{
                      width: `${60 + i * 40}px`,
                      height: `${60 + i * 40}px`,
                      left: `${10 + i * 14}%`,
                      top: `${15 + (i % 3) * 25}%`,
                      animationDelay: `${i * 0.7}s`,
                      opacity: 0.3 - i * 0.03,
                    }}
                  />
                ))}
                <div className="absolute top-1/4 right-[5%] w-64 h-64 rounded-full bg-neon-purple/5 blur-3xl" />
                <div className="absolute bottom-1/4 left-[10%] w-80 h-80 rounded-full bg-neon-green/5 blur-3xl" />
              </div>

              <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
                  <div className="inline-flex items-center gap-2 border border-neon-green/30 px-3 py-1 mb-6 text-xs text-neon-green uppercase tracking-widest">
                    <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                    Студия игровых скинов
                  </div>
                  <h1 className="font-russo text-5xl md:text-7xl uppercase leading-none mb-6">
                    СОЗДАЁМ<br />
                    <span className="neon-text">СКИНЫ</span><br />
                    НА ЗАКАЗ
                  </h1>
                  <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
                    Уникальные игровые скины с кубическим дизайном. От идеи до готового файла — быстро, красиво, профессионально.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <button onClick={() => scrollTo("catalog")} className="cube-btn bg-neon-green text-background px-8 py-3 text-sm">
                      Смотреть каталог
                    </button>
                    <button
                      onClick={() => scrollTo("services")}
                      className="cube-btn border-2 border-neon-green text-neon-green px-8 py-3 text-sm bg-transparent"
                      style={{ boxShadow: "4px 4px 0px rgba(0,255,136,0.3)" }}
                    >
                      Наши услуги
                    </button>
                  </div>
                  <div className="flex gap-8 mt-10 pt-8 border-t border-border">
                    {[["150+", "Скинов создано"], ["98%", "Довольных клиентов"], ["3 дня", "Срок исполнения"]].map(([val, label]) => (
                      <div key={label}>
                        <div className="font-russo text-2xl neon-text">{val}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative flex justify-center items-center animate-fade-in-up delay-300 opacity-0" style={{ animationFillMode: "forwards" }}>
                  <div className="relative w-80 h-80">
                    <div className="absolute inset-0 border-2 border-neon-green/20 rotate-45 animate-float" style={{ animationDuration: "6s" }} />
                    <div className="absolute inset-4 border border-neon-purple/20 rotate-12 animate-float" style={{ animationDuration: "8s", animationDelay: "1s" }} />
                    <div className="relative z-10 w-full h-full p-4">
                      <img src={SKIN_IMAGE} alt="Скин" className="w-full h-full object-cover border-2 border-neon-green/40" style={{ clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)" }} />
                      <div className="absolute bottom-8 left-8 right-8 bg-background/90 border border-neon-green/30 p-3">
                        <div className="font-russo text-sm neon-text">НЕОНОВЫЙ ВОИН</div>
                        <div className="text-xs text-muted-foreground mt-1">Кубо-стиль • Воин • 490 ₽</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-20 px-4 border-t border-border">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: "Cpu", title: "Пиксельная точность", desc: "Каждый пиксель — осмысленный выбор" },
                    { icon: "Gem", title: "Уникальность", desc: "Только эксклюзивные работы" },
                    { icon: "Timer", title: "Быстро", desc: "Сдаём вовремя, без задержек" },
                    { icon: "MessageCircle", title: "Поддержка", desc: "На связи 7 дней в неделю" },
                  ].map((f, i) => (
                    <div key={f.title} className="cube-card bg-card p-6 animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}>
                      <Icon name={f.icon} size={28} className="text-neon-green mb-3" />
                      <div className="font-russo text-sm uppercase tracking-wide mb-2">{f.title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="relative border-2 border-neon-green/30 p-10 md:p-16 overflow-hidden text-center" style={{ boxShadow: "8px 8px 0px rgba(0,255,136,0.15)" }}>
                  <div className="absolute top-0 left-0 w-32 h-32 bg-neon-green/5 blur-2xl" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-neon-purple/5 blur-2xl" />
                  <div className="relative z-10">
                    <div className="font-russo text-3xl md:text-5xl uppercase mb-4">
                      ГОТОВ СОЗДАТЬ <span className="neon-text">СВОЙ</span> СКИН?
                    </div>
                    <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Оставь заявку — обсудим идею, сроки и стоимость. Первая консультация бесплатно.</p>
                    <button onClick={() => scrollTo("contacts")} className="cube-btn bg-neon-green text-background px-10 py-4 text-base">
                      Оставить заявку
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CATALOG */}
        {activeSection === "catalog" && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10">
                <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Коллекция</div>
                <h2 className="section-title">КАТАЛОГ <span className="neon-text">СКИНОВ</span></h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-10 p-5 border border-border bg-card">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Стиль</div>
                  <div className="flex flex-wrap gap-2">
                    {styles.map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilterStyle(s)}
                        className={`px-3 py-1 text-xs uppercase tracking-wider border transition-all ${
                          filterStyle === s ? "bg-neon-green text-background border-neon-green" : "border-border text-muted-foreground hover:border-neon-green/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Категория</div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setFilterCat(c)}
                        className={`px-3 py-1 text-xs uppercase tracking-wider border transition-all ${
                          filterCat === c ? "bg-neon-purple text-white border-neon-purple" : "border-border text-muted-foreground hover:border-neon-purple/50"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Цена</div>
                  <div className="flex flex-wrap gap-2">
                    {prices.map((p) => (
                      <button
                        key={p}
                        onClick={() => setFilterPrice(p)}
                        className={`px-3 py-1 text-xs uppercase tracking-wider border transition-all ${
                          filterPrice === p ? "bg-neon-yellow text-background border-neon-yellow" : "border-border text-muted-foreground hover:border-neon-yellow/50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {filteredSkins.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <Icon name="SearchX" size={40} className="mx-auto mb-4 opacity-30" />
                  <div className="font-russo text-lg uppercase">Ничего не найдено</div>
                  <div className="text-sm mt-2">Попробуй другие фильтры</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSkins.map((skin, i) => (
                    <div
                      key={skin.id}
                      className="cube-card bg-card overflow-hidden group animate-fade-in-up opacity-0"
                      style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
                    >
                      <div className="relative overflow-hidden aspect-square">
                        <img src={skin.image} alt={skin.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        {skin.tag && (
                          <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-russo uppercase tracking-wider ${
                            skin.tag === "ХИТ" ? "bg-neon-yellow text-background" :
                            skin.tag === "НОВИНКА" ? "bg-neon-green text-background" :
                            "bg-neon-purple text-white"
                          }`}>
                            {skin.tag}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button onClick={() => scrollTo("contacts")} className="cube-btn bg-neon-green text-background px-6 py-2 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            Заказать
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-russo text-sm uppercase tracking-wide">{skin.name}</div>
                          <div className="font-russo text-lg neon-text">{skin.price} ₽</div>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-xs text-muted-foreground border border-border px-2 py-0.5">{skin.category}</span>
                          <span className="text-xs text-muted-foreground border border-border px-2 py-0.5">{skin.style}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* SERVICES */}
        {activeSection === "services" && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10">
                <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Что мы делаем</div>
                <h2 className="section-title">НАШИ <span className="neon-text">УСЛУГИ</span></h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {SERVICES.map((s, i) => (
                  <div
                    key={s.title}
                    className="cube-card bg-card p-8 group animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 border-2 flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 duration-300" style={{ borderColor: s.color }}>
                        <Icon name={s.icon} size={24} style={{ color: s.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-russo text-lg uppercase tracking-wide mb-2">{s.title}</div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-russo text-xl" style={{ color: s.color }}>{s.price}</span>
                          <button className="text-xs uppercase tracking-widest border px-4 py-2 transition-all hover:bg-foreground hover:text-background" style={{ borderColor: s.color }}>
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-12">
                <div className="text-center mb-10">
                  <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Как это работает</div>
                  <h3 className="font-russo text-3xl uppercase">КАК МЫ <span className="neon-text">РАБОТАЕМ</span></h3>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { n: "01", title: "Заявка", desc: "Описываешь идею или прикладываешь референс" },
                    { n: "02", title: "Бриф", desc: "Уточняем детали, стиль, дедлайн и стоимость" },
                    { n: "03", title: "Работа", desc: "Создаём скин и показываем промежуточные варианты" },
                    { n: "04", title: "Готово", desc: "Финальный файл, доработки по необходимости" },
                  ].map((step, i) => (
                    <div key={step.n} className="relative p-5 border border-border bg-card animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}>
                      <div className="font-russo text-5xl neon-text opacity-20 absolute top-3 right-4">{step.n}</div>
                      <div className="font-russo text-xl neon-text mb-1">{step.n}</div>
                      <div className="font-russo text-sm uppercase mb-2">{step.title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10">
                <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Наша история</div>
                <h2 className="section-title">О <span className="neon-text">СТУДИИ</span></h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    SKINCRAFT — это команда художников и геймеров, влюблённых в кубический дизайн. Мы создаём скины, которые выделяются в любой толпе.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    С 2022 года мы помогаем игрокам выражать себя через уникальные визуальные образы. Наш стиль — геометрическая точность, неоновые акценты и игровая атмосфера.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Каждый скин — это маленькое произведение искусства, созданное с душой и профессиональным подходом.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-200 opacity-0" style={{ animationFillMode: "forwards" }}>
                  {[
                    { val: "150+", label: "Скинов создано", color: "var(--neon-green)" },
                    { val: "3 года", label: "На рынке", color: "var(--neon-purple)" },
                    { val: "98%", label: "Довольных", color: "var(--neon-yellow)" },
                    { val: "7", label: "Художников", color: "var(--neon-cyan)" },
                  ].map((stat) => (
                    <div key={stat.label} className="cube-card bg-card p-6 text-center">
                      <div className="font-russo text-3xl mb-1" style={{ color: stat.color }}>{stat.val}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-neon-green uppercase tracking-widest mb-6">// Команда</div>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { name: "Алекс", role: "Ведущий художник", spec: "3D-моделирование, пиксель-арт" },
                    { name: "Марина", role: "Концепт-артист", spec: "Концепты, текстуры, UI" },
                    { name: "Дима", role: "Арт-директор", spec: "Стиль, коммуникация с клиентами" },
                  ].map((member, i) => (
                    <div
                      key={member.name}
                      className="cube-card bg-card p-6 text-center animate-fade-in-up opacity-0"
                      style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 border-2 border-neon-green/30 flex items-center justify-center bg-muted" style={{ clipPath: "polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)" }}>
                        <span className="font-russo text-xl neon-text">{member.name[0]}</span>
                      </div>
                      <div className="font-russo text-lg uppercase mb-1">{member.name}</div>
                      <div className="text-xs text-neon-green uppercase tracking-wider mb-2">{member.role}</div>
                      <div className="text-xs text-muted-foreground">{member.spec}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BLOG */}
        {activeSection === "blog" && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10">
                <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Наши материалы</div>
                <h2 className="section-title">БЛОГ <span className="neon-text">СТУДИИ</span></h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {BLOG_POSTS.map((post, i) => (
                  <div
                    key={post.title}
                    className="cube-card bg-card overflow-hidden group cursor-pointer animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
                  >
                    <div className="h-40 bg-muted relative overflow-hidden">
                      <img src={SKIN_IMAGE} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity group-hover:scale-105 duration-500" />
                      <div className="absolute top-3 left-3 bg-neon-green text-background text-xs font-russo px-2 py-1 uppercase">
                        {post.tag}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <Icon name="Eye" size={12} />
                        <span>{post.reads}</span>
                      </div>
                      <h3 className="font-russo text-sm uppercase leading-snug group-hover:text-neon-green transition-colors">
                        {post.title}
                      </h3>
                      <div className="mt-4 flex items-center gap-1 text-xs text-neon-green uppercase tracking-wider">
                        Читать <Icon name="ArrowRight" size={12} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <button className="cube-btn border-2 border-neon-green text-neon-green px-8 py-3 text-sm bg-transparent" style={{ boxShadow: "4px 4px 0px rgba(0,255,136,0.3)" }}>
                  Все статьи
                </button>
              </div>
            </div>
          </section>
        )}

        {/* CONTACTS */}
        {activeSection === "contacts" && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="mb-10">
                <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Напиши нам</div>
                <h2 className="section-title">КОН<span className="neon-text">ТАКТЫ</span></h2>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="cube-card bg-card p-8 animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
                  <div className="font-russo text-sm uppercase tracking-widest text-neon-green mb-6">// Оставь заявку</div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Имя</label>
                      <input
                        type="text"
                        placeholder="Как тебя зовут?"
                        className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-green transition-colors placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Контакт</label>
                      <input
                        type="text"
                        placeholder="Telegram / Email / ВКонтакте"
                        className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-green transition-colors placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Услуга</label>
                      <select className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-green transition-colors text-foreground">
                        <option value="">Выбери услугу</option>
                        <option>Кастомный скин</option>
                        <option>Пакет текстур</option>
                        <option>Анимация скина</option>
                        <option>Ребрендинг</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Описание</label>
                      <textarea
                        rows={4}
                        placeholder="Расскажи об идее или прикрепи референс..."
                        className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-green transition-colors placeholder:text-muted-foreground/50 resize-none"
                      />
                    </div>
                    <button className="w-full cube-btn bg-neon-green text-background py-4 text-sm">
                      Отправить заявку
                    </button>
                  </div>
                </div>

                <div className="space-y-6 animate-fade-in-up delay-200 opacity-0" style={{ animationFillMode: "forwards" }}>
                  <div>
                    <div className="font-russo text-sm uppercase tracking-widest text-neon-green mb-5">// Найди нас</div>
                    <div className="space-y-4">
                      {[
                        { icon: "MessageCircle", label: "Telegram", val: "@skincraft_studio" },
                        { icon: "Mail", label: "Email", val: "hello@skincraft.ru" },
                        { icon: "Clock", label: "Режим работы", val: "Пн–Пт 10:00 – 20:00" },
                      ].map((c) => (
                        <div key={c.label} className="flex items-center gap-4 p-4 border border-border bg-card">
                          <div className="w-10 h-10 border border-neon-green/30 flex items-center justify-center flex-shrink-0">
                            <Icon name={c.icon} size={18} className="text-neon-green" />
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</div>
                            <div className="text-sm font-medium mt-0.5">{c.val}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-neon-green/20 p-6 bg-neon-green/5">
                    <div className="font-russo text-sm uppercase neon-text mb-2">Первая консультация бесплатно</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Расскажи идею — оценим сложность и стоимость без обязательств. Просто напиши.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      <footer className="mt-20 border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-neon-green flex items-center justify-center" style={{ clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)" }}>
              <span className="text-background font-russo text-[8px]">SC</span>
            </div>
            <span className="font-russo text-sm neon-text">SKINCRAFT</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-xs text-muted-foreground hover:text-neon-green transition-colors uppercase tracking-wider"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">© 2026 SKINCRAFT</div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
