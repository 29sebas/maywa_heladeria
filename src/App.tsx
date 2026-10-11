import { CSSProperties, FormEvent, ReactNode, useMemo, useState } from "react";

const WA = "https://wa.me/573155781030";

type IconName =
  | "arrow"
  | "bag"
  | "calendar"
  | "chat"
  | "clock"
  | "close"
  | "icecream"
  | "instagram"
  | "map"
  | "menu"
  | "phone"
  | "search"
  | "sparkle"
  | "truck"
  | "whatsapp";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4m8-4v4M3 10h18" /></>,
    chat: <><path d="M20 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A8 8 0 1 1 20 15Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    icecream: <><path d="m8 11 4 10 4-10" /><path d="M7 8a5 5 0 0 1 10 0c0 2-2 3-5 3S7 10 7 8Z" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    map: <><path d="M12 22s7-5.5 7-13a7 7 0 1 0-14 0c0 7.5 7 13 7 13Z" /><circle cx="12" cy="9" r="2.5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    phone: <><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-4-1.5-6.5-4-8-8l2-2-2-4Z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    sparkle: <><path d="M12 2c.5 5.5 2.5 7.5 8 8-5.5.5-7.5 2.5-8 8-.5-5.5-2.5-7.5-8-8 5.5-.5 7.5-2.5 8-8Z" /></>,
    truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.8 7L3 20l1.5-5A8 8 0 1 1 20 11.5Z" /><path d="M8 8c.5 3 2 4.5 5 5l1.5-1 2 1.5c-.5 2-2 2.5-4 2-3.5-1-6-3.5-6.5-6C5.7 8 6.5 7 8 8Z" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const products = [
  { name: "Arroz con leche", category: "Tradicionales", price: "$8.000", image: "/maywa/products/arroz-con-leche.jpg", desc: "Un clásico cremoso para disfrutar frío o caliente." },
  { name: "Vaso de helado", category: "Vasos y conos", price: "", image: "/maywa/products/vaso-helado.jpg", desc: "Tu sabor favorito en una presentación sencilla y deliciosa." },
  { name: "Queso + chantilly", category: "Vasos y conos", price: "", image: "/maywa/products/queso-chantilly.jpg", desc: "Helado con una combinación cremosa de queso y chantilly." },
  { name: "Litro de helado", category: "Litros", price: "$24.000", image: "/maywa/products/litro-helado.jpg", desc: "Un litro para compartir con tus sabores preferidos." },
  { name: "Granizado de café", category: "Copas premium", price: "", image: "/maywa/products/granizado-cafe.jpg", desc: "Granizado refrescante con el sabor intenso del café." },
  { name: "Biscolata", category: "Copas premium", price: "$22.000", image: "/maywa/products/biscolata.jpg", desc: "Dos bolas de helado con cobertura y complementos." },
  { name: "Frutas con crema", category: "Frutas con crema", price: "", image: "/maywa/products/frutas-crema.jpg", desc: "Frutas variadas con una crema suave y toppings." },
  { name: "Salpicón", category: "Tradicionales", price: "", image: "/maywa/products/salpicon.jpg", desc: "Una mezcla fresca y colorida de frutas." },
];

const flavors = ["Chocolate", "Maracuyá", "Brownie", "Arequipe", "Vainilla", "Fresa", "Macadamia", "Napolitano", "Mandarina", "Ron con pasas", "Yogur de frutos rojos", "Chicle", "Coco arequipe", "Frutos rojos", "Lulo", "Tres leches"];
const flavorColors = ["#6D4535", "#F7C64A", "#80422F", "#D59B52", "#F4E3AD", "#F28BAD", "#C9A87B", "#E8A1B8", "#F29A53", "#B78B66", "#B54673", "#65D2D0", "#EEE2C7", "#A13966", "#80B86E", "#D9B994"];
const coneFlavors = flavors.map((name, index) => ({ name, color: flavorColors[index] }));

type CartItem = {
  id: number;
  name: string;
  detail: string;
  price: string;
  quantity: number;
  image?: string;
  colors?: string[];
};

function Button({ children, href, onClick, variant = "primary", type = "button", className = "" }: { children: ReactNode; href?: string; onClick?: () => void; variant?: "primary" | "secondary" | "dark" | "ghost"; type?: "button" | "submit"; className?: string }) {
  const classes = `btn btn-${variant} ${className}`;
  return href ? <a className={classes} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{children}</a> : <button className={classes} onClick={onClick} type={type}>{children}</button>;
}

function SectionTitle({ eyebrow, title, text, centered = false }: { eyebrow: string; title: string; text?: string; centered?: boolean }) {
  return <div className={`section-title ${centered ? "centered" : ""}`}><span>{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState<(typeof products)[0] | null>(null);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [builderStep, setBuilderStep] = useState(0);
  const [build, setBuild] = useState({ base: "", flavor: "", sauce: "", topping: "" });
  const [eventOpen, setEventOpen] = useState(false);
  const [eventSent, setEventSent] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatTopic, setChatTopic] = useState("");
  const [coneCount, setConeCount] = useState<1 | 2>(1);
  const [coneSelections, setConeSelections] = useState<(typeof coneFlavors)[0][]>([]);
  const [activeScoop, setActiveScoop] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartNotice, setCartNotice] = useState("");

  const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.category)))];
  const visibleProducts = useMemo(() => products.filter((p) => (filter === "Todos" || p.category === filter) && p.name.toLowerCase().includes(query.toLowerCase())), [filter, query]);

  const encodedBuild = encodeURIComponent(`Hola MAYWA, quiero consultar este antojo:\nProducto: ${build.base}\nSabor: ${build.flavor}\nSalsa: ${build.sauce}\nTopping: ${build.topping}\nPrecio por confirmar.`);
  const quickChat = [
    ["Catálogo", "catalogo"], ["Sabores", "sabores"], ["Arma tu cono", "cono"], ["Personalizar", "personalizar"],
    ["Domicilios", "domicilios"], ["Sedes y horarios", "sedes"], ["Eventos", "eventos"], ["Hablar con una persona", "humano"],
  ];
  const chatResponses: Record<string, ReactNode> = {
    catalogo: <>Tenemos vasos y conos, copas premium, frutas con crema, tradicionales y litros. <a href="#catalogo" onClick={() => setChatOpen(false)}>Abrir catálogo</a></>,
    sabores: <>La disponibilidad cambia según la sede. Puedes <a href="#sabores" onClick={() => setChatOpen(false)}>explorar los sabores</a> o confirmarlos por WhatsApp.</>,
    cono: <>Elige una o dos bolas y mira cómo se construye tu helado. <a href="#arma-tu-cono" onClick={() => setChatOpen(false)}>Abrir Arma tu cono</a>.</>,
    personalizar: <>Elige una base, sabor, salsa y topping en <button onClick={() => { setChatOpen(false); setBuilderOpen(true); }}>Arma tu antojo</button>.</>,
    domicilios: <>Domicilios de 1:00 p. m. a 7:20 p. m. en el sur de la ciudad, Itagüí, La Estrella y San Antonio de Prado. Confirma tu dirección antes de pedir.</>,
    sedes: <>San Antonio de Prado: Calle 41C Sur #62-08. San Francisco: Calle 27, Cra. 69-24. Ambas abren de 11:00 a. m. a 7:45 p. m.</>,
    eventos: <>Cuéntanos el tipo de celebración, la fecha y cuántas personas asistirán. <button onClick={() => { setChatOpen(false); setEventOpen(true); }}>Iniciar consulta</button>.</>,
    humano: <>Puedes continuar directamente con el equipo de MAYWA al 315 578 1030. <a href={WA} target="_blank" rel="noreferrer">Abrir WhatsApp</a></>,
  };

  const builderOptions = [
    { key: "base", title: "Elige tu producto", options: ["Vaso de helado", "Copa premium", "Frutas con crema"] },
    { key: "flavor", title: "Elige un sabor", options: ["Chocolate", "Fresa", "Arequipe", "Maracuyá", "Brownie"] },
    { key: "sauce", title: "Añade una salsa", options: ["Mora artesanal", "Frutos rojos", "Chocolate", "Arequipe"] },
    { key: "topping", title: "Termina con un topping", options: ["Gomitas", "Masmelos", "Galleta triturada", "Chocodisk"] },
  ] as const;

  function jump(id: string) {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function selectConeCount(count: 1 | 2) {
    setConeCount(count);
    setConeSelections((current) => current.slice(0, count));
    setActiveScoop(count === 1 ? 0 : Math.min(activeScoop, 1));
  }

  function chooseConeFlavor(flavor: (typeof coneFlavors)[0]) {
    const next = [...coneSelections];
    next[activeScoop] = flavor;
    setConeSelections(next.slice(0, coneCount));
    if (coneCount === 2 && activeScoop === 0) setActiveScoop(1);
  }

  function addToCart(item: Omit<CartItem, "id" | "quantity">) {
    setCart((current) => [...current, { ...item, id: Date.now(), quantity: 1 }]);
    setCartNotice(`${item.name} se agregó al pedido`);
    window.setTimeout(() => setCartNotice(""), 2600);
  }

  function addConeToCart() {
    if (coneSelections.length !== coneCount) return;
    addToCart({
      name: `Cono de ${coneCount} ${coneCount === 1 ? "bola" : "bolas"}`,
      detail: coneSelections.map((item) => item.name).join(" + "),
      price: "Precio por confirmar",
      colors: coneSelections.map((item) => item.color),
    });
  }

  return (
    <div className="site-shell">
      <header className="header">
        <a href="#inicio" className="brand" aria-label="MAYWA Heladería">
          <span className="brand-word"><i>M</i><i>A</i><i>Y</i><i>W</i><i>A</i></span>
          <small>HELADERÍA</small>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navegación principal">
          {[
            ["Inicio", "#inicio"], ["Catálogo", "#catalogo"], ["Sabores", "#sabores"], ["Arma tu cono", "#arma-tu-cono"],
            ["Personaliza", "#personaliza"], ["Eventos", "#experiencias"], ["Sedes", "#sedes"], ["Domicilios", "#domicilios"],
          ].map(([label, href]) => <button key={href} onClick={() => jump(href)}>{label}</button>)}
        </nav>
        <div className="header-actions">
          <button onClick={() => jump("#catalogo")} aria-label="Buscar en el catálogo"><Icon name="search" /></button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Abrir pedido, ${cart.length} productos`}><Icon name="bag" /><span>{cart.length}</span></button>
          <a className="header-whatsapp" href={WA} target="_blank" rel="noreferrer" aria-label="Pedir por WhatsApp"><Icon name="whatsapp" size={19} /><span>WhatsApp</span></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú"><Icon name={menuOpen ? "close" : "menu"} size={25} /></button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><Icon name="sparkle" size={16} /> Sabor que alegra tus días</div>
            <h1>Tu próximo <em>antojo favorito</em> está aquí.</h1>
            <p>Helados, sabores y combinaciones para disfrutar cada momento a tu manera.</p>
            <div className="hero-actions">
              <Button onClick={() => jump("#catalogo")}>Explorar el catálogo <Icon name="arrow" /></Button>
              <Button href={WA} variant="secondary"><Icon name="whatsapp" /> Pedir por WhatsApp</Button>
            </div>
            <div className="hero-links">
              <button onClick={() => jump("#sabores")}><span>01</span> Descubre los sabores</button>
              <button onClick={() => jump("#sedes")}><span>02</span> Encuentra tu sede</button>
              <button onClick={() => jump("#catalogo")}><span>03</span> Conoce nuestros productos</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-blob"></div>
            <div className="hero-mascot-art"><img src="/maywa/mascot-art.jpg" alt="Ilustración original de la mascota MAYWA disfrutando una copa de helado" /></div>
            <div className="hero-product-float"><img src="/maywa/products/biscolata.jpg" alt="Producto Biscolata según el catálogo original de MAYWA" /><span>Descubre las<br /><b>copas premium</b></span></div>
            <div className="hero-note"><Icon name="icecream" /><span>Combínalo<br /><b>a tu manera</b></span></div>
          </div>
        </section>

        <section className="story section" id="historia">
          <div className="story-gallery">
            <div className="story-main"><img src="/maywa/mascot-art.jpg" alt="Ilustración original de la mascota MAYWA" /></div>
            <div className="story-accent"><span>Momentos que saben</span><strong>mejor juntos</strong></div>
          </div>
          <div className="story-copy">
            <SectionTitle eyebrow="Nuestra esencia" title="Una marca hecha para compartir lo bueno" />
            <p>En MAYWA creemos que un helado puede convertir cualquier momento en algo especial. Somos una marca cercana, alegre y llena de combinaciones para descubrir en familia o con amigos.</p>
            <p className="muted">Este espacio está preparado para contar la historia real del negocio, su origen y las personas que hacen posible cada antojo.</p>
            <div className="mascot-message"><Icon name="chat" /><span><b>¡Qué bueno tenerte aquí!</b> Descubre tu combinación favorita.</span></div>
          </div>
        </section>

        <section className="catalog section" id="catalogo">
          <div className="section-heading-row">
            <SectionTitle eyebrow="Catálogo digital" title="Un antojo para cada momento" text="Explora una selección del catálogo. La disponibilidad puede variar según la sede." />
            <div className="search"><Icon name="search" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar producto" aria-label="Buscar producto" /></div>
          </div>
          <div className="filters" role="group" aria-label="Filtrar productos">
            {categories.map((cat) => <button className={filter === cat ? "active" : ""} onClick={() => setFilter(cat)} key={cat}>{cat}</button>)}
          </div>
          <div className="product-grid">
            {visibleProducts.map((item) => <article className="product-card" key={item.name}>
              <div className="product-image"><img src={item.image} alt={`Imagen de catálogo de MAYWA para ${item.name}`} /></div>
              <div className="product-info">
                <div><span className="product-category">{item.category}</span><h3>{item.name}</h3><p>{item.desc}</p></div>
                <div className="product-price">{item.price || "Precio por confirmar"}</div>
                <div className="product-actions"><button onClick={() => setProduct(item)}>Ver detalles</button><button className="add-product" onClick={() => addToCart({ name: item.name, detail: item.category, price: item.price || "Precio por confirmar", image: item.image })} aria-label={`Agregar ${item.name} al pedido`}><Icon name="bag" /></button></div>
              </div>
            </article>)}
          </div>
          {visibleProducts.length === 0 && <p className="empty">No encontramos productos con esa búsqueda.</p>}
        </section>

        <section className="cone-builder section" id="arma-tu-cono">
          <div className="cone-visual">
            <div className="cone-stage" aria-label={`Vista previa de cono de ${coneCount} bolas`}>
              <div className="cone-scoops">
                {Array.from({ length: coneCount }).map((_, index) => {
                  const scoop = coneSelections[index];
                  return <button className={`cone-scoop scoop-slot-${index} ${scoop ? "filled" : "empty"}`} style={scoop ? { "--scoop-color": scoop.color } as CSSProperties : undefined} onClick={() => setActiveScoop(index)} key={index} aria-label={scoop ? `Cambiar ${scoop.name}` : `Elegir sabor para bola ${index + 1}`}>
                    {scoop ? <span>{scoop.name}</span> : <span>{index + 1}</span>}
                  </button>;
                })}
              </div>
              <div className="waffle-cone"><i></i><b>MAYWA</b></div>
            </div>
            <div className="cone-summary">
              <span>Tu cono personalizado</span>
              <h3>{coneCount} {coneCount === 1 ? "bola" : "bolas"}</h3>
              <p>{coneSelections.length ? coneSelections.map((item) => item.name).join(" + ") : "Elige tus sabores para comenzar"}</p>
              <strong>Precio por confirmar</strong>
            </div>
          </div>
          <div className="cone-controls">
            <span className="mini-label">Experiencia interactiva</span>
            <h2>¡Crea tu combinación favorita!</h2>
            <p>Selecciona tus sabores y mira cómo se arma tu helado en tiempo real.</p>
            <div className="scoop-count">
              <b>¿Cuántas bolas quieres?</b>
              <div><button className={coneCount === 1 ? "active" : ""} onClick={() => selectConeCount(1)}>1 bola</button><button className={coneCount === 2 ? "active" : ""} onClick={() => selectConeCount(2)}>2 bolas</button></div>
            </div>
            <div className="scoop-tabs">
              {Array.from({ length: coneCount }).map((_, index) => <button className={activeScoop === index ? "active" : ""} onClick={() => setActiveScoop(index)} key={index}><span>{coneSelections[index] ? "Listo" : index + 1}</span>Bola {index + 1}{coneSelections[index] && <small>{coneSelections[index].name}</small>}</button>)}
            </div>
            <div className="cone-flavors" aria-label="Sabores para el cono">
              {coneFlavors.map((flavor) => {
                const selectedHere = coneSelections[activeScoop]?.name === flavor.name;
                return <button className={selectedHere ? "selected" : ""} onClick={() => chooseConeFlavor(flavor)} key={flavor.name}><i style={{ backgroundColor: flavor.color }}></i><span>{flavor.name}</span>{selectedHere && <b>✓</b>}</button>;
              })}
            </div>
            <p className="availability-note">La disponibilidad de sabores puede variar según la sede.</p>
            <div className="cone-actions">
              <Button variant="ghost" onClick={() => { setConeSelections([]); setActiveScoop(0); }}>Cambiar sabores</Button>
              <Button onClick={addConeToCart} className={coneSelections.length !== coneCount ? "disabled" : ""}><Icon name="bag" /> Agregar al pedido</Button>
              <Button href={`${WA}?text=${encodeURIComponent(`Hola, MAYWA. Quisiera consultar por un cono de ${coneCount} ${coneCount === 1 ? "bola" : "bolas"}${coneSelections.length ? ` con sabores de ${coneSelections.map((item) => item.name).join(" y ")}` : ""}.`)}`} variant="secondary"><Icon name="whatsapp" /> Consultar</Button>
            </div>
          </div>
        </section>

        <section className="flavors section" id="sabores">
          <div className="flavor-intro">
            <SectionTitle eyebrow="Sabores de helado" title="¿Cuál vas a probar hoy?" text="Clásicos, frutales y combinaciones MAYWA. Consulta la disponibilidad del día en tu sede." />
            <Button href={`${WA}?text=${encodeURIComponent("Hola MAYWA, quisiera consultar los sabores disponibles hoy.")}`} variant="secondary">Consultar disponibilidad <Icon name="arrow" /></Button>
          </div>
          <div className="flavor-board">
            {flavors.map((flavor, index) => <button key={flavor} onClick={() => setBuild((b) => ({ ...b, flavor }))}><i style={{ backgroundColor: flavorColors[index] }}></i><span>{flavor}</span></button>)}
          </div>
        </section>

        <section className="builder-banner section" id="personaliza">
          <div className="builder-copy">
            <span className="mini-label">Una experiencia diferente</span>
            <h2>Arma tu antojo, <br /><em>paso a paso</em></h2>
            <p>Elige una base, combínala con tu sabor favorito y dale el toque final con salsas y toppings.</p>
            <Button onClick={() => { setBuilderOpen(true); setBuilderStep(0); }}>Comenzar mi combinación <Icon name="arrow" /></Button>
          </div>
          <div className="builder-preview">
            <div className="builder-preview-poster"><img src="/maywa/flavors-poster.jpg" alt="Afiche original de sabores de helado MAYWA" /></div>
            <div className="builder-preview-product"><img src="/maywa/products/frutas-crema.jpg" alt="Presentación de frutas con crema del catálogo MAYWA" /></div>
            <span className="orbit orbit-one">Sabor</span><span className="orbit orbit-two">Salsa</span><span className="orbit orbit-three">Topping</span>
          </div>
        </section>

        <section className="extras section">
          <SectionTitle eyebrow="Hazlo aún más tuyo" title="Salsas, toppings y adiciones" text="Combina texturas, sabores y colores. Valores y disponibilidad sujetos a confirmación." centered />
          <div className="extras-grid">
            {[
              { title: "Toppings", image: "/maywa/toppings-poster.jpg", pos: "50% 50%", items: "Galletas · Chocolates · Gomitas · Masmelos" },
              { title: "Salsas", image: "/maywa/sauces-poster.jpg", pos: "50% 50%", items: "Mora · Frutos rojos · Chocolate · Arequipe" },
              { title: "Adiciones", image: "/maywa/additions-poster.jpg", pos: "50% 50%", items: "Chantilly · Queso · Crema de avellana · Frutas" },
            ].map((extra) => <article key={extra.title}><div><img src={extra.image} style={{ objectPosition: extra.pos }} alt={`Referencia original de ${extra.title} MAYWA`} /></div><h3>{extra.title}</h3><p>{extra.items}</p></article>)}
          </div>
          <Button onClick={() => setBuilderOpen(true)} variant="dark">Probar el configurador <Icon name="arrow" /></Button>
        </section>

        <section className="events section" id="experiencias">
          <div className="events-copy">
            <SectionTitle eyebrow="Experiencias MAYWA" title="Haz que ese momento sepa todavía mejor" text="Cuéntanos tu idea y consulta opciones para compartir MAYWA en una ocasión especial." />
            <Button onClick={() => { setEventOpen(true); setEventSent(false); }}>Consultar mi evento <Icon name="calendar" /></Button>
            <small>La consulta no confirma paquetes, precios ni disponibilidad.</small>
          </div>
          <div className="event-cards">
            <article className="event-card event-large"><span>01</span><div><h3>Cumpleaños y celebraciones</h3><p>Una idea dulce para reunir a tus personas favoritas.</p></div></article>
            <article className="event-card"><span>02</span><div><h3>Encuentros</h3><p>Para compartir entre amigos y familia.</p></div></article>
            <article className="event-card"><span>03</span><div><h3>Fechas especiales</h3><p>Consulta alternativas de temporada.</p></div></article>
          </div>
        </section>

        <section className="locations section" id="sedes">
          <SectionTitle eyebrow="Visítanos" title="Tu MAYWA más cercana" text="Dos puntos para disfrutar tu antojo. Horario de lunes a domingo." centered />
          <div className="location-grid">
            {[
              { name: "San Antonio de Prado", address: "Calle 41C Sur #62-08", image: "/maywa/store-prado-poster.jpg" },
              { name: "San Francisco", address: "Calle 27, Cra. 69-24", image: "/maywa/store-francisco-poster.jpg" },
            ].map((place) => <article className="location-card" key={place.name}>
              <div className="map-preview"><img src={place.image} alt={`Pieza original de la sede ${place.name}`} /><span><Icon name="map" /> MAYWA</span></div>
              <div className="location-info"><span>Sede</span><h3>{place.name}</h3><p><Icon name="map" /> {place.address}</p><p><Icon name="clock" /> 11:00 a. m. — 7:45 p. m.</p>
                <div><Button href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`} variant="dark">Cómo llegar</Button><Button href={`${WA}?text=${encodeURIComponent(`Hola MAYWA, quisiera consultar la sede ${place.name}.`)}`} variant="ghost">Consultar sede</Button></div>
              </div>
            </article>)}
          </div>
        </section>

        <section className="delivery section" id="domicilios">
          <div className="delivery-art"><div className="delivery-circle"><Icon name="truck" size={62} /><i></i><i></i><i></i></div></div>
          <div className="delivery-copy">
            <SectionTitle eyebrow="Domicilios" title="Tu antojo también llega a casa" text="Confirma primero la cobertura de tu dirección con nuestro equipo." />
            <div className="delivery-facts">
              <div><Icon name="clock" /><span><small>Horario</small><b>1:00 p. m. — 7:20 p. m.</b></span></div>
              <div><Icon name="map" /><span><small>Cobertura indicada</small><b>Sur de la ciudad, Itagüí, La Estrella y San Antonio de Prado</b></span></div>
              <div><Icon name="phone" /><span><small>Contacto</small><b>315 578 1030</b></span></div>
            </div>
            <div className="delivery-form"><input id="delivery-zone" placeholder="¿En qué zona estás?" aria-label="Zona de entrega" /><input id="delivery-product" placeholder="¿Qué producto te interesa?" aria-label="Producto de interés" /><Button onClick={() => {
              const zone = (document.getElementById("delivery-zone") as HTMLInputElement).value;
              const interest = (document.getElementById("delivery-product") as HTMLInputElement).value;
              window.open(`${WA}?text=${encodeURIComponent(`Hola MAYWA, quisiera consultar cobertura de domicilio.\nZona: ${zone || "Por definir"}\nProducto: ${interest || "Por definir"}`)}`, "_blank");
            }}>Verificar por WhatsApp <Icon name="whatsapp" /></Button></div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><a href="#inicio" className="brand light"><span className="brand-word"><i>M</i><i>A</i><i>Y</i><i>W</i><i>A</i></span><small>HELADERÍA</small></a><p>Helados, sabores y combinaciones para disfrutar a tu manera.</p><div className="socials"><a href={WA} aria-label="WhatsApp"><Icon name="whatsapp" /></a><button aria-label="Instagram pendiente de confirmar"><Icon name="instagram" /></button></div></div>
        <div><h4>Explora</h4><a href="#catalogo">Catálogo</a><a href="#sabores">Sabores</a><a href="#experiencias">Experiencias</a><a href="#domicilios">Domicilios</a></div>
        <div><h4>Visítanos</h4><p>San Antonio de Prado<br />Calle 41C Sur #62-08</p><p>San Francisco<br />Calle 27, Cra. 69-24</p></div>
        <div><h4>Hablemos</h4><p>Lunes a domingo<br />11:00 a. m. — 7:45 p. m.</p><a href={WA}>315 578 1030</a><small>Privacidad · Condiciones<br />Pendientes de validación</small></div>
        <div className="footer-bottom"><span>Propuesta digital para MAYWA Heladería</span><span>Desarrollada por NEBBA Agency</span></div>
      </footer>

      {cartNotice && <div className="cart-notice"><Icon name="bag" /> {cartNotice}</div>}

      {cartOpen && <div className="drawer-backdrop" onMouseDown={() => setCartOpen(false)}>
        <aside className="cart-drawer" onMouseDown={(event) => event.stopPropagation()} aria-label="Tu pedido">
          <div className="cart-head"><div><span>Tu pedido</span><h2>{cart.length} {cart.length === 1 ? "producto" : "productos"}</h2></div><button onClick={() => setCartOpen(false)} aria-label="Cerrar pedido"><Icon name="close" /></button></div>
          <div className="cart-items">
            {cart.length === 0 ? <div className="empty-cart"><Icon name="bag" size={40} /><h3>Tu pedido está vacío</h3><p>Explora el catálogo o crea un cono para comenzar.</p><Button onClick={() => { setCartOpen(false); jump("#catalogo"); }}>Ver catálogo</Button></div> : cart.map((item) => <article className="cart-item" key={item.id}>
              <div className="cart-thumb">
                {item.image ? <img src={item.image} alt="" /> : <div className="mini-cone">{item.colors?.map((color, index) => <i key={`${color}-${index}`} style={{ backgroundColor: color }}></i>)}</div>}
              </div>
              <div className="cart-item-copy"><h3>{item.name}</h3><p>{item.detail}</p><strong>{item.price}</strong>
                <div className="quantity"><button onClick={() => setCart((current) => current.map((entry) => entry.id === item.id ? { ...entry, quantity: Math.max(1, entry.quantity - 1) } : entry))}>−</button><span>{item.quantity}</span><button onClick={() => setCart((current) => current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry))}>+</button><button className="remove" onClick={() => setCart((current) => current.filter((entry) => entry.id !== item.id))}>Eliminar</button></div>
              </div>
            </article>)}
          </div>
          {cart.length > 0 && <div className="cart-footer"><div><span>Valores del pedido</span><strong>Por confirmar con MAYWA</strong></div><small>El carrito no confirma compra, inventario ni disponibilidad.</small><Button href={`${WA}?text=${encodeURIComponent(`Hola MAYWA, quisiera consultar este pedido:\n${cart.map((item) => `• ${item.quantity} × ${item.name} — ${item.detail} — ${item.price}`).join("\n")}`)}`}><Icon name="whatsapp" /> Consultar pedido por WhatsApp</Button></div>}
        </aside>
      </div>}

      {product && <div className="modal-backdrop" onMouseDown={() => setProduct(null)}><div className="product-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setProduct(null)}><Icon name="close" /></button>
        <div className="modal-image"><img src={product.image} alt={`Presentación original de ${product.name}`} /></div>
        <div className="modal-content"><span>{product.category}</span><h2>{product.name}</h2><p>{product.desc}</p><strong>{product.price || "Precio por confirmar"}</strong><small>Disponibilidad sujeta a confirmación en la sede.</small><Button onClick={() => { addToCart({ name: product.name, detail: product.category, price: product.price || "Precio por confirmar", image: product.image }); setProduct(null); }}><Icon name="bag" /> Agregar al pedido</Button><Button href={`${WA}?text=${encodeURIComponent(`Hola MAYWA, quiero consultar por ${product.name}.`)}`} variant="ghost"><Icon name="whatsapp" /> Consultar por WhatsApp</Button></div>
      </div></div>}

      {builderOpen && <div className="modal-backdrop" onMouseDown={() => setBuilderOpen(false)}><div className="builder-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setBuilderOpen(false)}><Icon name="close" /></button>
        <div className="builder-modal-head"><span>Arma tu antojo</span><small>Paso {builderStep + 1} de 5</small></div>
        <div className="progress">{[0, 1, 2, 3, 4].map((n) => <i className={n <= builderStep ? "active" : ""} key={n}></i>)}</div>
        {builderStep < 4 ? <div className="builder-stage">
          <span className="step-number">0{builderStep + 1}</span><h2>{builderOptions[builderStep].title}</h2>
          <div className="option-grid">{builderOptions[builderStep].options.map((opt) => {
            const key = builderOptions[builderStep].key;
            return <button className={build[key] === opt ? "selected" : ""} key={opt} onClick={() => setBuild({ ...build, [key]: opt })}><i></i><span>{opt}</span></button>;
          })}</div>
        </div> : <div className="builder-summary"><div className="summary-cup"><div></div><b>MAYWA</b></div><div><span>Tu combinación</span><h2>¡Así queda tu antojo!</h2>{Object.entries(build).map(([key, value]) => <p key={key}><small>{{ base: "Producto", flavor: "Sabor", sauce: "Salsa", topping: "Topping" }[key as keyof typeof build]}</small><b>{value || "Sin elegir"}</b></p>)}<strong>Precio por confirmar</strong></div></div>}
        <div className="builder-nav"><Button variant="ghost" onClick={() => setBuilderStep(Math.max(0, builderStep - 1))}>{builderStep === 0 ? "Cancelar" : "Anterior"}</Button>{builderStep < 4 ? <Button onClick={() => setBuilderStep(builderStep + 1)}>Continuar <Icon name="arrow" /></Button> : <Button href={`${WA}?text=${encodedBuild}`}><Icon name="whatsapp" /> Enviar selección</Button>}</div>
      </div></div>}

      {eventOpen && <div className="modal-backdrop" onMouseDown={() => setEventOpen(false)}><div className="event-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setEventOpen(false)}><Icon name="close" /></button>
        {!eventSent ? <><span className="mini-label">Consulta de experiencia</span><h2>Cuéntanos sobre tu evento</h2><p>Déjanos algunos datos para preparar una conversación útil con MAYWA.</p><form onSubmit={(e: FormEvent) => { e.preventDefault(); setEventSent(true); }}>
          <label>Tipo de evento<select required><option value="">Selecciona una opción</option><option>Cumpleaños</option><option>Reunión familiar</option><option>Encuentro con amigos</option><option>Otro</option></select></label>
          <div><label>Fecha aproximada<input type="date" required /></label><label>Número estimado de personas<input type="number" min="1" placeholder="Ej. 20" required /></label></div>
          <label>Datos de contacto (opcional)<input placeholder="Nombre o teléfono" /></label><Button type="submit">Revisar solicitud <Icon name="arrow" /></Button>
        </form></> : <div className="event-success"><Icon name="calendar" size={44} /><span>Resumen listo</span><h2>Tu consulta está preparada</h2><p>La solicitud no confirma disponibilidad, precios ni condiciones. Continúa por WhatsApp para conversar con el equipo.</p><Button href={`${WA}?text=${encodeURIComponent("Hola MAYWA, quiero consultar opciones para un evento. Tengo fecha y número aproximado de personas.")}`}><Icon name="whatsapp" /> Continuar por WhatsApp</Button></div>}
      </div></div>}

      <div className={`chat-widget ${chatOpen ? "open" : ""}`}>
        {chatOpen && <div className="chat-panel">
          <div className="chat-head"><div className="chat-avatar"><Icon name="icecream" /></div><div><b>Maywa te ayuda</b><small>Asistente de demostración</small></div><button onClick={() => setChatOpen(false)}><Icon name="close" /></button></div>
          <div className="chat-body"><div className="bot-message">¡Hola! Bienvenido a MAYWA. ¿Qué se te antoja hoy? Estoy aquí para ayudarte.</div>{chatTopic && <div className="bot-message response">{chatResponses[chatTopic]}</div>}<div className="quick-replies">{quickChat.map(([label, key]) => <button onClick={() => setChatTopic(key)} key={key}>{label}</button>)}</div><small>Conversación simulada · La integración de IA requiere desarrollo adicional.</small></div>
        </div>}
        <button className="chat-trigger" onClick={() => setChatOpen(!chatOpen)} aria-label="Abrir asistente Maywa"><Icon name={chatOpen ? "close" : "chat"} size={25} /><span>Maywa te ayuda</span></button>
      </div>
    </div>
  );
}
