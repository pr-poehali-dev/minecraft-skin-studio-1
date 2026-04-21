import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SKIN_IMAGE = "https://cdn.poehali.dev/projects/1da4cb67-a45c-4b1f-8651-59c1343cbc06/files/5b30d099-fa53-4d4d-8902-be9915638ecc.jpg";

const SKINS = [
  { id: 1, name: "Неоновый Воин", category: "Воин", style: "Нео", price: 100, tag: "ХИТ", image: SKIN_IMAGE, type: "custom" },
  { id: 2, name: "Теневой Маг", category: "Маг", style: "Тёмный", price: 50, tag: "ПРОСТОЙ", image: SKIN_IMAGE, type: "simple" },
  { id: 3, name: "Кубо Рейнджер", category: "Рейнджер", style: "Кубо", price: 50, tag: "ПРОСТОЙ", image: SKIN_IMAGE, type: "simple" },
  { id: 4, name: "Призрак Бездны", category: "Ассасин", style: "Тёмный", price: 100, tag: "ХИТ", image: SKIN_IMAGE, type: "custom" },
  { id: 5, name: "Комплект «Орден»", category: "Комплект", style: "Кубо", price: 150, tag: "3 СКИНА", image: SKIN_IMAGE, type: "pack" },
  { id: 6, name: "Байт Хакер", category: "Маг", style: "Нео", price: 100, tag: "НОВИНКА", image: SKIN_IMAGE, type: "custom" },
];

const SERVICES = [
  { icon: "Paintbrush", title: "Кастомный скин", desc: "Уникальный скин по твоему эскизу или описанию. Проработка деталей, стиль — до результата.", price: "100 ₽", color: "var(--neon-green)" },
  { icon: "Square", title: "Простой скин", desc: "Базовый скин по описанию, быстро и без сложной детализации. Отлично для старта.", price: "50 ₽", color: "var(--neon-cyan)" },
  { icon: "Shield", title: "Ребрендинг", desc: "Переработка существующего скина в новом стиле с сохранением характера.", price: "60 ₽", color: "var(--neon-yellow)" },
  { icon: "Layers", title: "Комплект скинов", desc: "Набор из 3 и более скинов в едином стиле: для команды, клана или коллекции.", price: "от 150 ₽", color: "var(--neon-purple)" },
];

const REVIEWS = [
  { name: "Артём К.", rating: 5, text: "Виктор сделал скин точно по задумке, даже лучше чем я представлял! Советую всем.", date: "10 апр 2026" },
  { name: "Лиза М.", rating: 5, text: "Заказывала комплект для клана из 4 скинов — получилось стильно и в едином стиле. Спасибо!", date: "05 апр 2026" },
  { name: "Дэн_1337", rating: 5, text: "Ребрендинг старого скина — супер! Не ожидал, что получится так круто за 60 рублей.", date: "28 мар 2026" },
  { name: "Vortex", rating: 4, text: "Простой скин сделали за пару часов. Цена отличная, всё чётко.", date: "20 мар 2026" },
];

const BLOG_POSTS = [
  { date: "15 апр 2026", tag: "ГАЙД", title: "Как создать скин за 1 час: пошаговый разбор", reads: "1.2K" },
  { date: "08 апр 2026", tag: "ТРЕНДЫ", title: "Кубический стиль захватывает игровую индустрию", reads: "876" },
  { date: "01 апр 2026", tag: "КЕЙС", title: "История скина «Призрак Бездны»: от эскиза до релиза", reads: "2.4K" },
];

type Section = "home" | "catalog" | "services" | "about" | "blog" | "reviews" | "contacts" | "order" | "admin-login" | "admin" | "chat";

type Order = {
  id: number;
  nick: string;
  product: string;
  description: string;
  deadline: string;
  tg: string;
  ds: string;
  vk: string;
  status: "Новая" | "В работе" | "Готово";
  createdAt: string;
};

type Worker = { nick: string; password: string; role: string };

const INITIAL_ORDERS: Order[] = [
  { id: 1001, nick: "Артём_228", product: "Кастомный скин", description: "Воин в красных доспехах с мечом", deadline: "3 дня", tg: "@artem", ds: "artem#1234", vk: "vk.com/artem", status: "В работе", createdAt: "18 апр 2026" },
  { id: 1002, nick: "Mira", product: "Комплект скинов", description: "Комплект для клана, 4 скина в тёмном стиле", deadline: "7 дней", tg: "@mira_k", ds: "mira#0001", vk: "", status: "Новая", createdAt: "19 апр 2026" },
  { id: 999, nick: "Дэн_1337", product: "Ребрендинг", description: "Переделать старый скин в тёмном стиле", deadline: "2 дня", tg: "@den1337", ds: "", vk: "", status: "Готово", createdAt: "28 мар 2026" },
  { id: 998, nick: "Vortex", product: "Простой скин", description: "Базовый скин мага", deadline: "1 день", tg: "@vortex", ds: "vortex#5555", vk: "", status: "Готово", createdAt: "20 мар 2026" },
];

const INITIAL_WORKERS: Worker[] = [
  { nick: "xezze228", password: "ab030403042012", role: "Владелец" },
  { nick: "Виктор", password: "victor2025", role: "Глав-Скинодел" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterStyle, setFilterStyle] = useState("Все");
  const [filterCat, setFilterCat] = useState("Все");
  const [filterPrice, setFilterPrice] = useState("Все");

  // Order form
  const [orderForm, setOrderForm] = useState({ nick: "", product: "", description: "", deadline: "", tg: "", ds: "", vk: "" });
  const [orderSent, setOrderSent] = useState(false);

  // Admin
  const [adminLogin, setAdminLogin] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);
  const [clientsCount, setClientsCount] = useState(100);

  const [newWorkerNick, setNewWorkerNick] = useState("");
  const [newWorkerPass, setNewWorkerPass] = useState("");
  const [adminTab, setAdminTab] = useState<"orders" | "archive" | "workers">("orders");

  // Chat
  const [chatMessages, setChatMessages] = useState<{ from: "client" | "master"; text: string; time: string }[]>([
    { from: "master", text: "Привет! Это Виктор, Глав-Скинодел. Чем помочь?", time: "10:00" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatRole, setChatRole] = useState<"client" | "master">("client");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const navItems: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "services", label: "Услуги" },
    { id: "reviews", label: "Отзывы" },
    { id: "about", label: "О студии" },
  ];

  const styles = ["Все", "Нео", "Тёмный", "Кубо"];
  const categories = ["Все", "Воин", "Маг", "Рейнджер", "Ассасин", "Комплект"];
  const prices = ["Все", "до 80 ₽", "80–140 ₽", "от 140 ₽"];

  const filteredSkins = SKINS.filter((s) => {
    const styleOk = filterStyle === "Все" || s.style === filterStyle;
    const catOk = filterCat === "Все" || s.category === filterCat;
    const priceOk =
      filterPrice === "Все" ||
      (filterPrice === "до 80 ₽" && s.price < 80) ||
      (filterPrice === "80–140 ₽" && s.price >= 80 && s.price <= 140) ||
      (filterPrice === "от 140 ₽" && s.price > 140);
    return styleOk && catOk && priceOk;
  });

  const scrollTo = (id: Section) => {
    setActiveSection(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderSubmit = () => {
    if (!orderForm.nick || !orderForm.product) return;
    const newOrder: Order = {
      id: Date.now(),
      ...orderForm,
      status: "Новая",
      createdAt: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" }),
    };
    setOrders([newOrder, ...orders]);
    setClientsCount((c) => c + 1);
    setOrderSent(true);
    setTimeout(() => {
      setOrderSent(false);
      setOrderForm({ nick: "", product: "", description: "", deadline: "", tg: "", ds: "", vk: "" });
      scrollTo("home");
    }, 2500);
  };

  const handleLogin = () => {
    const w = workers.find((x) => x.nick === adminLogin && x.password === adminPass);
    if (w) {
      setIsLogged(true);
      setCurrentUser(w.nick);
      setIsOwner(w.nick === "xezze228");
      setLoginError("");
      setAdminLogin("");
      setAdminPass("");
      setActiveSection("admin");
    } else {
      setLoginError("Неверный ник или пароль");
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    setIsOwner(false);
    setCurrentUser("");
    scrollTo("home");
  };

  const addWorker = () => {
    if (!newWorkerNick || !newWorkerPass) return;
    setWorkers([...workers, { nick: newWorkerNick, password: newWorkerPass, role: "Скинодел" }]);
    setNewWorkerNick("");
    setNewWorkerPass("");
  };

  const changeOrderStatus = (id: number, status: Order["status"]) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([
      ...chatMessages,
      { from: chatRole, text: chatInput, time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-rubik overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neon-green flex items-center justify-center" style={{ clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)" }}>
              <span className="text-background font-russo text-xs">КБ</span>
            </div>
            <span className="font-russo text-lg tracking-wider neon-text">КУБОБРО</span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                  activeSection === item.id ? "text-neon-green border-b-2 border-neon-green" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => scrollTo("admin-login")} className="text-xs uppercase tracking-wider text-muted-foreground hover:text-neon-green transition-colors border border-border px-3 py-2">
              Панель
            </button>
            <button onClick={() => scrollTo("order")} className="cube-btn bg-neon-green text-background px-5 py-2 text-sm">
              Заказать скин
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-neon-green">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-1 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left py-2 px-3 text-sm font-medium uppercase tracking-wider border-l-2 transition-all ${
                  activeSection === item.id ? "border-neon-green text-neon-green" : "border-transparent text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button onClick={() => scrollTo("order")} className="mt-2 cube-btn bg-neon-green text-background py-3 text-sm">
              Заказать скин
            </button>
            <button onClick={() => scrollTo("admin-login")} className="text-xs uppercase tracking-wider text-muted-foreground border border-border py-2 mt-1">
              Панель
            </button>
          </div>
        )}
      </nav>

      <main className="pt-16">

        {/* HOME */}
        {activeSection === "home" && (
          <div>
            <section className="min-h-[92vh] flex items-center relative overflow-hidden px-4 md:px-8">
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

              <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
                  <div className="inline-flex items-center gap-2 border border-neon-green/30 px-3 py-1 mb-6 text-xs text-neon-green uppercase tracking-widest">
                    <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                    Работаем с 2026 года
                  </div>
                  <h1 className="font-russo text-5xl md:text-7xl xl:text-8xl uppercase leading-none mb-6">
                    СКИНЫ<br />
                    <span className="neon-text">ОТ 50 ₽</span><br />
                    КАК ТЫ ХОЧЕШЬ
                  </h1>
                  <p className="text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed">
                    Студия КУБОБРО — делаем кастомные и простые скины, комплекты и ребрендинг. Быстро, качественно, по приятным ценам.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <button onClick={() => scrollTo("order")} className="cube-btn bg-neon-green text-background px-8 py-4 text-sm">
                      Заказать скин
                    </button>
                    <button
                      onClick={() => scrollTo("catalog")}
                      className="cube-btn border-2 border-neon-green text-neon-green px-8 py-4 text-sm bg-transparent"
                      style={{ boxShadow: "4px 4px 0px rgba(0,255,136,0.3)" }}
                    >
                      Смотреть каталог
                    </button>
                  </div>
                  <div className="flex gap-8 mt-10 pt-8 border-t border-border flex-wrap">
                    {[["100+", "Работ сделано"], [`${clientsCount}`, "Клиентов"], ["с 2026", "На рынке"]].map(([val, label]) => (
                      <div key={label}>
                        <div className="font-russo text-2xl neon-text">{val}</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative flex justify-center items-center animate-fade-in-up delay-300 opacity-0" style={{ animationFillMode: "forwards" }}>
                  <div className="relative w-72 h-72 md:w-96 md:h-96">
                    <div className="absolute inset-0 border-2 border-neon-green/20 rotate-45 animate-float" style={{ animationDuration: "6s" }} />
                    <div className="absolute inset-4 border border-neon-purple/20 rotate-12 animate-float" style={{ animationDuration: "8s", animationDelay: "1s" }} />
                    <div className="relative z-10 w-full h-full p-4">
                      <img src={SKIN_IMAGE} alt="Скин" className="w-full h-full object-cover border-2 border-neon-green/40" style={{ clipPath: "polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)" }} />
                      <div className="absolute bottom-8 left-8 right-8 bg-background/90 border border-neon-green/30 p-3">
                        <div className="font-russo text-sm neon-text">КАСТОМНЫЙ СКИН</div>
                        <div className="text-xs text-muted-foreground mt-1">Уникальный дизайн • 100 ₽</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-20 px-4 md:px-8 border-t border-border">
              <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: "Cpu", title: "Пиксельная точность", desc: "Каждый пиксель — осмысленный выбор" },
                    { icon: "Gem", title: "Уникальность", desc: "Только эксклюзивные работы" },
                    { icon: "Timer", title: "Быстро", desc: "Сдаём вовремя, без задержек" },
                    { icon: "MessageCircle", title: "Чат с мастером", desc: "На связи через встроенный чат" },
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

            <section className="py-16 px-4 md:px-8">
              <div className="max-w-[1600px] mx-auto">
                <div className="relative border-2 border-neon-green/30 p-10 md:p-16 overflow-hidden text-center" style={{ boxShadow: "8px 8px 0px rgba(0,255,136,0.15)" }}>
                  <div className="absolute top-0 left-0 w-32 h-32 bg-neon-green/5 blur-2xl" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-neon-purple/5 blur-2xl" />
                  <div className="relative z-10">
                    <div className="font-russo text-3xl md:text-5xl uppercase mb-4">
                      ГОТОВ СОЗДАТЬ <span className="neon-text">СВОЙ</span> СКИН?
                    </div>
                    <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Оставь заявку — обсудим идею, сроки и стоимость. Первая консультация бесплатно.</p>
                    <button onClick={() => scrollTo("order")} className="cube-btn bg-neon-green text-background px-10 py-4 text-base">
                      Заказать скин
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SERVICES */}
        {activeSection === "services" && (
          <section className="py-12 px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto">
              <div className="mb-10">
                <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Что мы делаем</div>
                <h2 className="section-title">НАШИ <span className="neon-text">УСЛУГИ</span></h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {SERVICES.map((s, i) => (
                  <div key={s.title} className="cube-card bg-card p-8 group animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}>
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 border-2 flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 duration-300" style={{ borderColor: s.color }}>
                        <Icon name={s.icon} size={24} style={{ color: s.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-russo text-lg uppercase tracking-wide mb-2">{s.title}</div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{s.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-russo text-xl" style={{ color: s.color }}>{s.price}</span>
                          <button onClick={() => scrollTo("order")} className="text-xs uppercase tracking-widest border px-4 py-2 transition-all hover:bg-foreground hover:text-background" style={{ borderColor: s.color }}>
                            Заказать
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

        {/* REVIEWS */}
        {activeSection === "reviews" && (
          <section className="py-12 px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto">
              <div className="mb-10">
                <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Что говорят клиенты</div>
                <h2 className="section-title">ОТЗЫВЫ И <span className="neon-text">РЕЙТИНГ</span></h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-10">
                <div className="cube-card bg-card p-6 text-center">
                  <div className="font-russo text-5xl neon-text mb-2">4.9</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1,2,3,4,5].map((i) => <Icon key={i} name="Star" size={16} className="text-neon-yellow" />)}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Общий рейтинг</div>
                </div>
                <div className="cube-card bg-card p-6 text-center">
                  <div className="font-russo text-5xl" style={{ color: "var(--neon-purple)" }}>{REVIEWS.length}+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-3">Отзывов</div>
                </div>
                <div className="cube-card bg-card p-6 text-center">
                  <div className="font-russo text-5xl" style={{ color: "var(--neon-yellow)" }}>98%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-3">Рекомендуют</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {REVIEWS.map((r, i) => (
                  <div key={r.name} className="cube-card bg-card p-6 animate-fade-in-up opacity-0" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border border-neon-green/30 flex items-center justify-center bg-muted font-russo neon-text">
                          {r.name[0]}
                        </div>
                        <div>
                          <div className="font-russo text-sm uppercase">{r.name}</div>
                          <div className="text-xs text-muted-foreground">{r.date}</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((i) => (
                          <Icon key={i} name="Star" size={12} className={i <= r.rating ? "text-neon-yellow" : "text-muted"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <section className="py-12 px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto">
              <div className="mb-10">
                <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Наша история</div>
                <h2 className="section-title">О <span className="neon-text">СТУДИИ</span></h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    КУБОБРО — молодая студия игровых скинов. <span className="neon-text">Мы работаем с 2026 года</span> и уже успели сделать сотню работ для игроков со всего СНГ.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Делаем скины с душой: кастомные, простые, комплекты и ребрендинг. Любим кубический стиль, яркие цвета и запоминающиеся образы. Каждый клиент получает скин, который реально отличается от остальных.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Наш принцип — честная цена, быстрая работа и открытая коммуникация. Пишите в чат — и мы обсудим вашу идею уже сегодня.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-200 opacity-0" style={{ animationFillMode: "forwards" }}>
                  {[
                    { val: "100+", label: "Работ сделано", color: "var(--neon-green)" },
                    { val: "с 2026", label: "На рынке", color: "var(--neon-purple)" },
                    { val: "4.9", label: "Рейтинг", color: "var(--neon-yellow)" },
                    { val: `${clientsCount}`, label: "Клиентов", color: "var(--neon-cyan)" },
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
                <div className="max-w-md">
                  <div className="cube-card bg-card p-8 text-center animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards" }}>
                    <div className="w-20 h-20 mx-auto mb-4 border-2 border-neon-green/30 flex items-center justify-center bg-muted" style={{ clipPath: "polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)" }}>
                      <span className="font-russo text-2xl neon-text">В</span>
                    </div>
                    <div className="font-russo text-xl uppercase mb-1">Виктор</div>
                    <div className="text-xs text-neon-green uppercase tracking-wider mb-3">Глав-Скинодел</div>
                    <div className="flex justify-center gap-6 pt-4 border-t border-border">
                      <div>
                        <div className="font-russo text-2xl neon-text">100</div>
                        <div className="text-xs text-muted-foreground uppercase">работ</div>
                      </div>
                      <div>
                        <div className="font-russo text-2xl" style={{ color: "var(--neon-purple)" }}>1 год</div>
                        <div className="text-xs text-muted-foreground uppercase">делает скины</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ORDER FORM */}
        {activeSection === "order" && (
          <section className="py-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-10">
                <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Заявка на скин</div>
                <h2 className="section-title">ЗАКАЗАТЬ <span className="neon-text">СКИН</span></h2>
                <p className="text-muted-foreground mt-3">Заполни поля — Виктор свяжется и начнёт работу.</p>
              </div>

              {orderSent ? (
                <div className="cube-card bg-card p-10 text-center animate-fade-in-up">
                  <Icon name="CheckCircle2" size={64} className="mx-auto text-neon-green mb-4" />
                  <div className="font-russo text-2xl uppercase neon-text mb-2">Заявка отправлена!</div>
                  <p className="text-muted-foreground">Мы свяжемся с тобой в течение часа.</p>
                </div>
              ) : (
                <div className="cube-card bg-card p-6 md:p-10 space-y-5">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Ник / Имя *</label>
                    <input value={orderForm.nick} onChange={(e) => setOrderForm({ ...orderForm, nick: e.target.value })} type="text" placeholder="Как к тебе обращаться" className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-green transition-colors placeholder:text-muted-foreground/50" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Выбор товара *</label>
                    <select value={orderForm.product} onChange={(e) => setOrderForm({ ...orderForm, product: e.target.value })} className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-green text-foreground">
                      <option value="">— выбери услугу —</option>
                      <option>Кастомный скин — 100 ₽</option>
                      <option>Простой скин — 50 ₽</option>
                      <option>Ребрендинг — 60 ₽</option>
                      <option>Комплект скинов — от 150 ₽</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Описание</label>
                    <textarea value={orderForm.description} onChange={(e) => setOrderForm({ ...orderForm, description: e.target.value })} rows={4} placeholder="Опиши идею, стиль, цвета, референсы..." className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-green placeholder:text-muted-foreground/50 resize-none" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Сроки</label>
                    <input value={orderForm.deadline} onChange={(e) => setOrderForm({ ...orderForm, deadline: e.target.value })} type="text" placeholder="Например: 3 дня, к 25 апреля..." className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-green placeholder:text-muted-foreground/50" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Telegram</label>
                      <input value={orderForm.tg} onChange={(e) => setOrderForm({ ...orderForm, tg: e.target.value })} type="text" placeholder="@username" className="w-full bg-background border border-border px-3 py-3 text-sm focus:outline-none focus:border-neon-green placeholder:text-muted-foreground/50" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Discord</label>
                      <input value={orderForm.ds} onChange={(e) => setOrderForm({ ...orderForm, ds: e.target.value })} type="text" placeholder="user#0001" className="w-full bg-background border border-border px-3 py-3 text-sm focus:outline-none focus:border-neon-green placeholder:text-muted-foreground/50" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">ВКонтакте</label>
                      <input value={orderForm.vk} onChange={(e) => setOrderForm({ ...orderForm, vk: e.target.value })} type="text" placeholder="vk.com/you" className="w-full bg-background border border-border px-3 py-3 text-sm focus:outline-none focus:border-neon-green placeholder:text-muted-foreground/50" />
                    </div>
                  </div>
                  <button onClick={handleOrderSubmit} disabled={!orderForm.nick || !orderForm.product} className="w-full cube-btn bg-neon-green text-background py-4 text-sm disabled:opacity-40 disabled:cursor-not-allowed">
                    Отправить заявку
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* CHAT */}
        {activeSection === "chat" && (
          <section className="py-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Прямой чат</div>
                <h2 className="section-title">ЧАТ С <span className="neon-text">МАСТЕРОМ</span></h2>
              </div>

              <div className="flex gap-2 mb-4">
                <button onClick={() => setChatRole("client")} className={`px-4 py-2 text-xs uppercase tracking-wider border ${chatRole === "client" ? "bg-neon-green text-background border-neon-green" : "border-border text-muted-foreground"}`}>
                  Я заказчик
                </button>
                <button onClick={() => setChatRole("master")} className={`px-4 py-2 text-xs uppercase tracking-wider border ${chatRole === "master" ? "bg-neon-purple text-white border-neon-purple" : "border-border text-muted-foreground"}`}>
                  Я скинодел
                </button>
              </div>

              <div className="cube-card bg-card flex flex-col h-[500px]">
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <div className="w-10 h-10 border border-neon-green/30 flex items-center justify-center font-russo neon-text">В</div>
                  <div>
                    <div className="font-russo text-sm uppercase">Виктор</div>
                    <div className="text-xs text-neon-green flex items-center gap-1"><span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" /> Онлайн</div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((m, i) => (
                    <div key={i} className={`flex ${m.from === "client" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] px-4 py-2 ${m.from === "client" ? "bg-neon-green text-background" : "bg-muted text-foreground border border-border"}`}>
                        <div className="text-sm">{m.text}</div>
                        <div className={`text-xs mt-1 ${m.from === "client" ? "text-background/70" : "text-muted-foreground"}`}>{m.time}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-3 border-t border-border flex gap-2">
                  <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChatMessage()} type="text" placeholder="Написать сообщение..." className="flex-1 bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-neon-green placeholder:text-muted-foreground/50" />
                  <button onClick={sendChatMessage} className="cube-btn bg-neon-green text-background px-4 py-2 text-sm">
                    <Icon name="Send" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ADMIN LOGIN */}
        {activeSection === "admin-login" && !isLogged && (
          <section className="py-12 px-4 md:px-8 min-h-[80vh] flex items-center">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8 text-center">
                <Icon name="Lock" size={40} className="mx-auto text-neon-green mb-4" />
                <h2 className="font-russo text-3xl uppercase">ВХОД В <span className="neon-text">ПАНЕЛЬ</span></h2>
              </div>
              <div className="cube-card bg-card p-8 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Ник</label>
                  <input value={adminLogin} onChange={(e) => setAdminLogin(e.target.value)} type="text" placeholder="xezze228" className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-green placeholder:text-muted-foreground/50" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-1 block">Пароль</label>
                  <input value={adminPass} onChange={(e) => setAdminPass(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} type="password" placeholder="••••••••" className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-neon-green placeholder:text-muted-foreground/50" />
                </div>
                {loginError && <div className="text-xs text-destructive">{loginError}</div>}
                <button onClick={handleLogin} className="w-full cube-btn bg-neon-green text-background py-3 text-sm">Войти</button>
              </div>
            </div>
          </section>
        )}

        {/* ADMIN PANEL */}
        {activeSection === "admin" && isLogged && (
          <section className="py-12 px-4 md:px-8">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                  <div className="text-xs text-neon-green uppercase tracking-widest mb-2">// Внутренняя панель</div>
                  <h2 className="section-title">ПАНЕЛЬ <span className="neon-text">УПРАВЛЕНИЯ</span></h2>
                  <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">
                    Вошёл: <span className="neon-text">{currentUser}</span> {isOwner && <span className="text-neon-yellow">• Владелец</span>}
                  </div>
                </div>
                <button onClick={handleLogout} className="text-xs uppercase tracking-wider border border-border px-4 py-2 hover:border-destructive hover:text-destructive transition-colors">
                  Выйти
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="cube-card bg-card p-5 text-center">
                  <div className="font-russo text-3xl neon-text">{orders.length}</div>
                  <div className="text-xs text-muted-foreground uppercase mt-1">Заказов</div>
                </div>
                <div className="cube-card bg-card p-5 text-center">
                  <div className="font-russo text-3xl" style={{ color: "var(--neon-purple)" }}>{clientsCount}</div>
                  <div className="text-xs text-muted-foreground uppercase mt-1">Клиентов</div>
                </div>
                <div className="cube-card bg-card p-5 text-center">
                  <div className="font-russo text-3xl" style={{ color: "var(--neon-yellow)" }}>{workers.length}</div>
                  <div className="text-xs text-muted-foreground uppercase mt-1">Работников</div>
                </div>
              </div>

              <div className="flex gap-2 mb-6 border-b border-border flex-wrap">
                <button onClick={() => setAdminTab("orders")} className={`px-4 py-3 text-xs uppercase tracking-wider border-b-2 ${adminTab === "orders" ? "border-neon-green text-neon-green" : "border-transparent text-muted-foreground"}`}>
                  Заказы ({orders.filter((o) => o.status !== "Готово").length})
                </button>
                <button onClick={() => setAdminTab("archive")} className={`px-4 py-3 text-xs uppercase tracking-wider border-b-2 ${adminTab === "archive" ? "border-neon-green text-neon-green" : "border-transparent text-muted-foreground"}`}>
                  Архив ({orders.filter((o) => o.status === "Готово").length})
                </button>
                <button onClick={() => setAdminTab("workers")} className={`px-4 py-3 text-xs uppercase tracking-wider border-b-2 ${adminTab === "workers" ? "border-neon-green text-neon-green" : "border-transparent text-muted-foreground"}`}>
                  Работники
                </button>
              </div>

              {adminTab === "orders" && (
                <div className="space-y-3">
                  {orders.filter((o) => o.status !== "Готово").length === 0 && <div className="text-center py-10 text-muted-foreground">Активных заказов нет</div>}
                  {orders.filter((o) => o.status !== "Готово").map((o) => (
                    <div key={o.id} className="cube-card bg-card p-5">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <div className="font-russo text-sm uppercase">#{o.id}</div>
                            <div className="font-russo text-sm neon-text">{o.nick}</div>
                            <span className={`text-xs px-2 py-1 uppercase tracking-wider ${
                              o.status === "Новая" ? "bg-neon-yellow text-background" :
                              o.status === "В работе" ? "bg-neon-purple text-white" :
                              "bg-neon-green text-background"
                            }`}>{o.status}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">{o.createdAt}</div>
                          <div className="text-sm font-medium mb-2">{o.product}</div>
                          {o.description && <div className="text-xs text-muted-foreground mb-2">{o.description}</div>}
                          {o.deadline && <div className="text-xs text-muted-foreground">Срок: {o.deadline}</div>}
                          <div className="flex flex-wrap gap-3 mt-3 text-xs">
                            {o.tg && <span className="text-neon-green">TG: {o.tg}</span>}
                            {o.ds && <span className="text-neon-purple">DS: {o.ds}</span>}
                            {o.vk && <span className="text-neon-cyan">VK: {o.vk}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <select value={o.status} onChange={(e) => changeOrderStatus(o.id, e.target.value as Order["status"])} className="bg-background border border-border px-3 py-2 text-xs uppercase">
                            <option>Новая</option>
                            <option>В работе</option>
                            <option>Готово</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {adminTab === "archive" && (
                <div className="space-y-3">
                  <div className="border border-neon-green/20 bg-neon-green/5 p-4 mb-4 text-xs text-muted-foreground flex items-center gap-2">
                    <Icon name="Archive" size={16} className="text-neon-green" />
                    Здесь все выполненные заказы. Переписка чата скрыта.
                  </div>
                  {orders.filter((o) => o.status === "Готово").length === 0 && <div className="text-center py-10 text-muted-foreground">В архиве пусто — выполненных заказов пока нет</div>}
                  {orders.filter((o) => o.status === "Готово").map((o) => (
                    <div key={o.id} className="cube-card bg-card p-5 opacity-90">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <div className="font-russo text-sm uppercase">#{o.id}</div>
                            <div className="font-russo text-sm neon-text">{o.nick}</div>
                            <span className="text-xs px-2 py-1 uppercase tracking-wider bg-neon-green text-background">Готово</span>
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">{o.createdAt}</div>
                          <div className="text-sm font-medium mb-2">{o.product}</div>
                          {o.description && <div className="text-xs text-muted-foreground mb-2">{o.description}</div>}
                          {o.deadline && <div className="text-xs text-muted-foreground">Срок: {o.deadline}</div>}
                          <div className="flex flex-wrap gap-3 mt-3 text-xs">
                            {o.tg && <span className="text-neon-green">TG: {o.tg}</span>}
                            {o.ds && <span className="text-neon-purple">DS: {o.ds}</span>}
                            {o.vk && <span className="text-neon-cyan">VK: {o.vk}</span>}
                          </div>
                        </div>
                        <button onClick={() => changeOrderStatus(o.id, "В работе")} className="text-xs uppercase tracking-wider border border-border px-3 py-2 hover:border-neon-yellow hover:text-neon-yellow transition-colors">
                          Вернуть в работу
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {adminTab === "workers" && (
                <div>
                  <div className="space-y-3 mb-8">
                    {workers.map((w) => (
                      <div key={w.nick} className="cube-card bg-card p-5 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 border border-neon-green/30 flex items-center justify-center font-russo neon-text">{w.nick[0].toUpperCase()}</div>
                          <div>
                            <div className="font-russo text-sm uppercase">{w.nick}</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">{w.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {isOwner ? (
                    <div className="cube-card bg-card p-6">
                      <div className="font-russo text-sm uppercase neon-text mb-4">// Добавить работника</div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <input value={newWorkerNick} onChange={(e) => setNewWorkerNick(e.target.value)} type="text" placeholder="Ник" className="bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-neon-green placeholder:text-muted-foreground/50" />
                        <input value={newWorkerPass} onChange={(e) => setNewWorkerPass(e.target.value)} type="text" placeholder="Пароль" className="bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-neon-green placeholder:text-muted-foreground/50" />
                        <button onClick={addWorker} className="cube-btn bg-neon-green text-background py-2 text-xs">Добавить</button>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                      Добавлять работников может только <b>xezze228</b>.
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-border py-10 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-neon-green flex items-center justify-center" style={{ clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)" }}>
                <span className="text-background font-russo text-xs">КБ</span>
              </div>
              <span className="font-russo text-lg neon-text">КУБОБРО</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Студия игровых скинов. Работаем с 2026 года. Честные цены, быстрые сроки.</p>
          </div>

          <div>
            <div className="text-xs text-neon-green uppercase tracking-widest mb-3">// Связь</div>
            <div className="space-y-2">
              <a href="https://t.me/Xezze228" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-green transition-colors">
                <Icon name="Send" size={14} /> Telegram: <span className="neon-text">@Xezze228</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="MessageSquare" size={14} /> Discord: <span className="neon-text">@xezze228</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-neon-green uppercase tracking-widest mb-3">// Навигация</div>
            <div className="grid grid-cols-2 gap-1">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-xs text-muted-foreground hover:text-neon-green transition-colors uppercase tracking-wider py-1">
                  {item.label}
                </button>
              ))}
              <button onClick={() => scrollTo("chat")} className="text-left text-xs text-muted-foreground hover:text-neon-green transition-colors uppercase tracking-wider py-1">
                Чат
              </button>
              <button onClick={() => scrollTo("admin-login")} className="text-left text-xs text-muted-foreground hover:text-neon-green transition-colors uppercase tracking-wider py-1">
                Панель
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-8 pt-6 border-t border-border text-xs text-muted-foreground text-center uppercase tracking-wider">
          © 2026 КУБОБРО — студия игровых скинов
        </div>
      </footer>

    </div>
  );
};

export default Index;