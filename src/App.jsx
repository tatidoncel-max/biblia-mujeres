import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// DATOS MOCK
// ─────────────────────────────────────────────
const VERSES = [
  {
    id: 1,
    ref: "Filipenses 4:13",
    text: "Todo lo puedo en Cristo que me fortalece.",
    theme: "Fortaleza",
  },
  {
    id: 2,
    ref: "Jeremías 29:11",
    text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice el SEÑOR, pensamientos de paz y no de mal, para daros el futuro que esperáis.",
    theme: "Esperanza",
  },
  {
    id: 3,
    ref: "Isaías 41:10",
    text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.",
    theme: "Confianza",
  },
  {
    id: 4,
    ref: "Salmos 23:1",
    text: "El SEÑOR es mi pastor; nada me faltará.",
    theme: "Paz",
  },
  {
    id: 5,
    ref: "Romanos 8:28",
    text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.",
    theme: "Fe",
  },
  {
    id: 6,
    ref: "Proverbios 31:25",
    text: "Fuerza y honor son su vestidura; y se ríe de lo por venir.",
    theme: "Mujer",
  },
  {
    id: 7,
    ref: "Gálatas 5:22",
    text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe.",
    theme: "Amor",
  },
];

const DEVOTIONALS = [
  {
    id: 1,
    title: "La mujer de fe inquebrantable",
    date: "Hoy",
    verse: "Hebreos 11:1",
    verseText: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.",
    body: "La fe no es ausencia de dudas, sino la decisión de confiar en Dios aún en medio de ellas. Como mujeres de Dios, somos llamadas a caminar con valentía, sabiendo que Él dirige nuestros pasos. Cada mañana es una nueva oportunidad para renovar nuestra confianza en Sus promesas eternas.",
    duration: "3 min",
    tag: "Mañana",
  },
  {
    id: 2,
    title: "Descanso en Sus brazos",
    date: "Ayer",
    verse: "Mateo 11:28",
    verseText: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
    body: "Al caer la noche, Cristo nos invita a depositar en Él todo peso del día. No hay preocupación demasiado grande ni dolor demasiado profundo para Su gracia. Permite que esta noche tu corazón encuentre paz genuina en Su presencia.",
    duration: "4 min",
    tag: "Noche",
  },
  {
    id: 3,
    title: "Gratitud que transforma",
    date: "Lunes",
    verse: "1 Tesalonicenses 5:18",
    verseText: "Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.",
    body: "La gratitud no depende de las circunstancias sino de nuestra perspectiva. Cuando elegimos dar gracias incluso en lo difícil, abrimos nuestra alma a ver la mano de Dios en cada detalle de la vida.",
    duration: "5 min",
    tag: "Reflexión",
  },
];

const READING_PLANS = [
  {
    id: 1,
    title: "Mujer de Dios — 30 días",
    description: "Versículos seleccionados para fortalecer tu identidad en Cristo.",
    progress: 40,
    days: 30,
    completed: 12,
    icon: "🌸",
  },
  {
    id: 2,
    title: "Salmos — Paz Interior",
    description: "Recorre los Salmos más reconfortantes en 21 días.",
    progress: 70,
    days: 21,
    completed: 15,
    icon: "🕊️",
  },
  {
    id: 3,
    title: "Proverbios — Sabiduría Diaria",
    description: "Un capítulo de Proverbios por día durante un mes.",
    progress: 10,
    days: 31,
    completed: 3,
    icon: "✨",
  },
  {
    id: 4,
    title: "Nuevo Testamento — KJV",
    description: "Lee el Nuevo Testamento completo en 90 días.",
    progress: 5,
    days: 90,
    completed: 4,
    icon: "📖",
  },
];

const QUIZ_QUESTIONS = [
  {
    q: "¿Quién fue el primer rey de Israel?",
    options: ["David", "Saúl", "Salomón", "Samuel"],
    answer: 1,
  },
  {
    q: "¿En qué libro se encuentra el Salmo 23?",
    options: ["Proverbios", "Isaías", "Salmos", "Job"],
    answer: 2,
  },
  {
    q: "¿Cuántos discípulos tuvo Jesús?",
    options: ["7", "10", "12", "14"],
    answer: 2,
  },
  {
    q: '¿Quién dijo "Yo soy el camino, la verdad y la vida"?',
    options: ["Pablo", "Jesús", "Pedro", "Juan"],
    answer: 1,
  },
  {
    q: "¿Cuántos libros tiene la Biblia?",
    options: ["60", "66", "72", "80"],
    answer: 1,
  },
];

const BOOKS_OF_BIBLE = [
  { name: "Génesis", chapters: 50, testament: "AT" },
  { name: "Éxodo", chapters: 40, testament: "AT" },
  { name: "Levítico", chapters: 27, testament: "AT" },
  { name: "Números", chapters: 36, testament: "AT" },
  { name: "Deuteronomio", chapters: 34, testament: "AT" },
  { name: "Josué", chapters: 24, testament: "AT" },
  { name: "Jueces", chapters: 21, testament: "AT" },
  { name: "Rut", chapters: 4, testament: "AT" },
  { name: "1 Samuel", chapters: 31, testament: "AT" },
  { name: "2 Samuel", chapters: 24, testament: "AT" },
  { name: "Salmos", chapters: 150, testament: "AT" },
  { name: "Proverbios", chapters: 31, testament: "AT" },
  { name: "Isaías", chapters: 66, testament: "AT" },
  { name: "Mateo", chapters: 28, testament: "NT" },
  { name: "Marcos", chapters: 16, testament: "NT" },
  { name: "Lucas", chapters: 24, testament: "NT" },
  { name: "Juan", chapters: 21, testament: "NT" },
  { name: "Hechos", chapters: 28, testament: "NT" },
  { name: "Romanos", chapters: 16, testament: "NT" },
  { name: "1 Corintios", chapters: 16, testament: "NT" },
  { name: "Gálatas", chapters: 6, testament: "NT" },
  { name: "Efesios", chapters: 6, testament: "NT" },
  { name: "Filipenses", chapters: 4, testament: "NT" },
  { name: "Apocalipsis", chapters: 22, testament: "NT" },
];

// ─────────────────────────────────────────────
// COLORES / TEMA
// ─────────────────────────────────────────────
const C = {
  bg: "#FFF8F5",
  card: "#FFFFFF",
  primary: "#8B4B8C",
  primaryLight: "#C17FC2",
  primaryDark: "#5E2D7A",
  accent: "#E8A0B8",
  accentLight: "#FCE8F0",
  gold: "#C9883A",
  goldLight: "#FFF3E0",
  text: "#2D1B3D",
  textMid: "#6B4F7A",
  textLight: "#9B8AAA",
  border: "#F0E4F5",
  success: "#4CAF50",
  white: "#FFFFFF",
  nightBg: "#1A0D2E",
  nightCard: "#2D1B3D",
  nightText: "#F3E8FF",
};

// ─────────────────────────────────────────────
// COMPONENTES AUXILIARES
// ─────────────────────────────────────────────

function AmenButton({ onAmen }) {
  const [pressed, setPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handlePress = () => {
    if (pressed) return;
    setPressed(true);
    setCountdown(5);
    // TODO: add haptic feedback on mobile
    onAmen && onAmen();
  };

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => {
      setCountdown((c) => {
        if (c <= 1) { setPressed(false); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  return (
    <button
      onClick={handlePress}
      style={{
        background: pressed
          ? "linear-gradient(135deg, #C9883A, #E8A0B8)"
          : "linear-gradient(135deg, #8B4B8C, #C17FC2)",
        color: C.white,
        border: "none",
        borderRadius: 30,
        padding: pressed ? "14px 36px" : "12px 32px",
        fontSize: pressed ? 18 : 16,
        fontWeight: 700,
        cursor: pressed ? "default" : "pointer",
        letterSpacing: 2,
        transition: "all 0.4s ease",
        boxShadow: pressed
          ? "0 4px 20px rgba(201,136,58,0.4)"
          : "0 4px 15px rgba(139,75,140,0.35)",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      {pressed ? (
        <>
          🙏 Amén... <span style={{ fontSize: 13, opacity: 0.85 }}>({countdown}s)</span>
        </>
      ) : (
        <>🙏 Amén</>
      )}
    </button>
  );
}

function Tag({ label, color = C.primaryLight }) {
  return (
    <span
      style={{
        background: color + "22",
        color: color,
        border: `1px solid ${color}55`,
        borderRadius: 20,
        padding: "2px 10px",
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );
}

function ProgressBar({ value, color = C.primary }) {
  return (
    <div
      style={{
        background: C.border,
        borderRadius: 10,
        height: 8,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          background: `linear-gradient(90deg, ${color}, ${C.primaryLight})`,
          width: `${value}%`,
          height: "100%",
          borderRadius: 10,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
}

function Card({ children, style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.card,
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 2px 16px rgba(139,75,140,0.08)",
        border: `1px solid ${C.border}`,
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(139,75,140,0.15)";
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 16px rgba(139,75,140,0.08)";
        }
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA: INICIO (versículo del día)
// ─────────────────────────────────────────────
function HomeScreen({ favorites, setFavorites }) {
  const today = new Date();
  const todayStr = today.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
  const isNight = today.getHours() >= 19 || today.getHours() < 6;
  const dayVerse = VERSES[today.getDay() % VERSES.length];
  const nightVerse = VERSES[(today.getDay() + 3) % VERSES.length];

  const [activeTab, setActiveTab] = useState(isNight ? "noche" : "dia");
  const [reflection, setReflection] = useState({ dia: "", noche: "" });
  const [saved, setSaved] = useState({ dia: false, noche: false });
  const [amenDone, setAmenDone] = useState(false);

  const verse = activeTab === "dia" ? dayVerse : nightVerse;
  const todayKey = today.toISOString().split("T")[0];
  const isFav = favorites.some((f) => f.key === todayKey + activeTab);

  const toggleFav = () => {
    if (isFav) {
      setFavorites((prev) => prev.filter((f) => f.key !== todayKey + activeTab));
    } else {
      setFavorites((prev) => [
        ...prev,
        { key: todayKey + activeTab, date: todayKey, verse, tab: activeTab },
      ]);
    }
  };

  const saveReflection = () => {
    setSaved((s) => ({ ...s, [activeTab]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [activeTab]: false })), 2500);
  };

  const bgGrad =
    activeTab === "noche"
      ? "linear-gradient(160deg, #1A0D2E 0%, #2D1B3D 60%, #4A1942 100%)"
      : "linear-gradient(160deg, #8B4B8C 0%, #C17FC2 60%, #E8A0B8 100%)";

  return (
    <div style={{ paddingBottom: 30 }}>
      {/* Header hero */}
      <div
        style={{
          background: bgGrad,
          borderRadius: "0 0 32px 32px",
          padding: "32px 24px 36px",
          color: C.white,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: -20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <p style={{ fontSize: 13, opacity: 0.75, margin: "0 0 4px", textTransform: "capitalize" }}>
          📅 {todayStr}
        </p>
        <h2 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 800 }}>
          {activeTab === "dia" ? "☀️ Versículo de la Mañana" : "🌙 Versículo de la Noche"}
        </h2>

        {/* Tab selector */}
        <div
          style={{
            display: "flex",
            background: "rgba(255,255,255,0.12)",
            borderRadius: 30,
            padding: 4,
            marginBottom: 24,
            width: "fit-content",
          }}
        >
          {["dia", "noche"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                background: activeTab === t ? "rgba(255,255,255,0.9)" : "transparent",
                color: activeTab === t ? C.primary : "rgba(255,255,255,0.85)",
                border: "none",
                borderRadius: 26,
                padding: "8px 22px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            >
              {t === "dia" ? "☀️ Día" : "🌙 Noche"}
            </button>
          ))}
        </div>

        <blockquote
          style={{
            margin: 0,
            fontSize: 18,
            lineHeight: 1.65,
            fontStyle: "italic",
            fontWeight: 500,
            borderLeft: `3px solid rgba(255,255,255,0.4)`,
            paddingLeft: 16,
          }}
        >
          "{verse.text}"
        </blockquote>
        <p
          style={{
            margin: "14px 0 0",
            fontWeight: 700,
            fontSize: 14,
            opacity: 0.9,
            letterSpacing: 0.5,
          }}
        >
          — {verse.ref}
        </p>

        {/* Favorite button */}
        <button
          onClick={toggleFav}
          style={{
            position: "absolute",
            top: 28,
            right: 24,
            background: "rgba(255,255,255,0.15)",
            border: "none",
            borderRadius: "50%",
            width: 40,
            height: 40,
            fontSize: 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          title={isFav ? "Quitar favorito" : "Marcar como favorito"}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Amén */}
      <div style={{ display: "flex", justifyContent: "center", margin: "24px 0 8px" }}>
        <AmenButton onAmen={() => setAmenDone(true)} />
      </div>
      {amenDone && (
        <p style={{ textAlign: "center", color: C.primary, fontSize: 13, margin: "4px 0 8px" }}>
          🙏 Que tu corazón sienta Su presencia
        </p>
      )}

      {/* Reflexión personal */}
      <div style={{ padding: "0 16px" }}>
        <Card style={{ marginTop: 16 }}>
          <h3
            style={{
              margin: "0 0 6px",
              color: C.primary,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ✍️ Mi reflexión {activeTab === "dia" ? "de hoy" : "de esta noche"}
          </h3>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: C.textLight }}>
            Escribe lo que Dios pone en tu corazón...
          </p>
          <textarea
            value={reflection[activeTab]}
            onChange={(e) =>
              setReflection((r) => ({ ...r, [activeTab]: e.target.value }))
            }
            placeholder={
              activeTab === "dia"
                ? "¿Qué te habla Dios esta mañana? ¿Cómo aplicarás este versículo hoy?"
                : "¿Cómo fue tu día a la luz de esta palabra? ¿Por qué das gracias esta noche?"
            }
            style={{
              width: "100%",
              minHeight: 120,
              border: `1.5px solid ${C.border}`,
              borderRadius: 14,
              padding: 14,
              fontSize: 14,
              color: C.text,
              resize: "vertical",
              fontFamily: "inherit",
              lineHeight: 1.6,
              outline: "none",
              background: C.accentLight,
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={saveReflection}
            style={{
              marginTop: 12,
              background: saved[activeTab]
                ? C.success
                : `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`,
              color: C.white,
              border: "none",
              borderRadius: 20,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            {saved[activeTab] ? "✅ Guardada" : "💾 Guardar reflexión"}
          </button>
        </Card>

        {/* Versículos sugeridos */}
        <h3 style={{ margin: "24px 0 12px", color: C.text, fontSize: 16, fontWeight: 700 }}>
          🌸 Versículos para ti
        </h3>
        {VERSES.slice(0, 4).map((v) => (
          <Card
            key={v.id}
            style={{ marginBottom: 12 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <Tag label={v.theme} color={C.primary} />
                <p style={{ margin: "10px 0 6px", color: C.text, fontSize: 15, fontStyle: "italic", lineHeight: 1.55 }}>
                  "{v.text}"
                </p>
                <p style={{ margin: 0, color: C.textMid, fontSize: 13, fontWeight: 600 }}>{v.ref}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA: DEVOCIONALES
// ─────────────────────────────────────────────
function DevotionalScreen() {
  const [selected, setSelected] = useState(null);
  const [reflections, setReflections] = useState({});
  const [savedIds, setSavedIds] = useState([]);

  const saveRefl = (id) => {
    setSavedIds((p) => (p.includes(id) ? p : [...p, id]));
    setTimeout(() => setSavedIds((p) => p.filter((x) => x !== id)), 2500);
  };

  if (selected) {
    const d = DEVOTIONALS.find((x) => x.id === selected);
    return (
      <div style={{ padding: "0 0 40px" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`,
            padding: "28px 20px 36px",
            borderRadius: "0 0 28px 28px",
            color: C.white,
          }}
        >
          <button
            onClick={() => setSelected(null)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 20,
              color: C.white,
              padding: "6px 16px",
              fontSize: 13,
              cursor: "pointer",
              marginBottom: 16,
            }}
          >
            ← Volver
          </button>
          <Tag label={d.tag} color={C.accent} />
          <h2 style={{ margin: "10px 0 8px", fontSize: 22, fontWeight: 800 }}>{d.title}</h2>
          <p style={{ margin: 0, opacity: 0.8, fontSize: 13 }}>⏱ {d.duration} de lectura</p>
        </div>

        <div style={{ padding: "20px 16px 0" }}>
          <Card style={{ background: C.accentLight, border: `1.5px solid ${C.accent}` }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.primary }}>
              📖 {d.verse}
            </p>
            <p style={{ margin: "8px 0 0", fontSize: 15, fontStyle: "italic", color: C.text, lineHeight: 1.6 }}>
              "{d.verseText}"
            </p>
          </Card>

          <Card style={{ marginTop: 16 }}>
            <p style={{ margin: 0, color: C.text, fontSize: 15, lineHeight: 1.75 }}>{d.body}</p>
            {/* TODO: Add full devotional multi-paragraph content from real content source */}
            <p style={{ margin: "16px 0 0", color: C.text, fontSize: 15, lineHeight: 1.75 }}>
              Dios te conoce a ti, conoce tu nombre, tus luchas, tus sueños. Él no te pide que seas perfecta, sino que seas auténtica. Entrega cada parte de tu historia en Sus manos y observa cómo Él la convierte en algo hermoso.
            </p>
          </Card>

          <Card style={{ marginTop: 16 }}>
            <h3 style={{ margin: "0 0 6px", color: C.primary, fontSize: 15 }}>
              ✍️ Mi reflexión personal
            </h3>
            <textarea
              value={reflections[d.id] || ""}
              onChange={(e) =>
                setReflections((r) => ({ ...r, [d.id]: e.target.value }))
              }
              placeholder="¿Qué te habló Dios en este devocional?"
              style={{
                width: "100%",
                minHeight: 110,
                border: `1.5px solid ${C.border}`,
                borderRadius: 12,
                padding: 12,
                fontSize: 14,
                fontFamily: "inherit",
                resize: "vertical",
                outline: "none",
                background: C.accentLight,
                color: C.text,
                boxSizing: "border-box",
              }}
            />
            <div style={{ marginTop: 12, display: "flex", gap: 10, justifyContent: "space-between" }}>
              <AmenButton />
              <button
                onClick={() => saveRefl(d.id)}
                style={{
                  background: savedIds.includes(d.id) ? C.success : C.primary,
                  color: C.white,
                  border: "none",
                  borderRadius: 20,
                  padding: "10px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
              >
                {savedIds.includes(d.id) ? "✅ Guardada" : "💾 Guardar"}
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 16px 40px" }}>
      <div style={{ padding: "24px 0 16px" }}>
        <h2 style={{ margin: 0, color: C.text, fontSize: 22, fontWeight: 800 }}>
          💗 Devocionales
        </h2>
        <p style={{ margin: "6px 0 0", color: C.textLight, fontSize: 14 }}>
          Reflexiones diarias para tu corazón
        </p>
      </div>

      {/* Audio banner */}
      {/* TODO: Integrate real audio devotional player with Bible audio API */}
      <Card style={{ background: `linear-gradient(135deg, ${C.goldLight}, #FFF8F0)`, border: `1.5px solid ${C.gold}33`, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.gold}, #E8A0B8)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
            }}
          >
            🎵
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 700, color: C.text, fontSize: 15 }}>
              Audio Devocional
            </p>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: C.textLight }}>
              Escucha mientras haces tus actividades
            </p>
          </div>
          <button
            style={{
              background: `linear-gradient(135deg, ${C.gold}, #C9883A)`,
              border: "none",
              borderRadius: 20,
              color: C.white,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ▶ Escuchar
          </button>
        </div>
      </Card>

      {DEVOTIONALS.map((d) => (
        <Card key={d.id} onClick={() => setSelected(d.id)} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: `linear-gradient(135deg, ${C.primary}22, ${C.accentLight})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              📖
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <Tag label={d.tag} color={d.tag === "Noche" ? C.primaryDark : C.primary} />
                <span style={{ fontSize: 12, color: C.textLight }}>⏱ {d.duration}</span>
              </div>
              <h3 style={{ margin: "0 0 4px", color: C.text, fontSize: 15, fontWeight: 700 }}>{d.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: C.textLight }}>{d.date} · {d.verse}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA: PLANES DE LECTURA
// ─────────────────────────────────────────────
function PlansScreen() {
  const [activeVersion, setActiveVersion] = useState("RVR");
  const versions = ["RVR", "KJV", "NVI", "NKJV"];

  return (
    <div style={{ padding: "0 16px 40px" }}>
      <div style={{ padding: "24px 0 16px" }}>
        <h2 style={{ margin: 0, color: C.text, fontSize: 22, fontWeight: 800 }}>
          📅 Planes de Lectura
        </h2>
        <p style={{ margin: "6px 0 0", color: C.textLight, fontSize: 14 }}>
          Sigue tu camino con la Palabra de Dios
        </p>
      </div>

      {/* Version selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {versions.map((v) => (
          <button
            key={v}
            onClick={() => setActiveVersion(v)}
            style={{
              background: activeVersion === v ? C.primary : C.white,
              color: activeVersion === v ? C.white : C.textMid,
              border: `1.5px solid ${activeVersion === v ? C.primary : C.border}`,
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {READING_PLANS.map((plan) => (
        <Card key={plan.id} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 18,
                background: `linear-gradient(135deg, ${C.accentLight}, ${C.border})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                flexShrink: 0,
              }}
            >
              {plan.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 4px", color: C.text, fontSize: 15, fontWeight: 700 }}>
                {plan.title}
              </h3>
              <p style={{ margin: "0 0 10px", fontSize: 13, color: C.textLight }}>
                {plan.description}
              </p>
              <ProgressBar value={plan.progress} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontSize: 12, color: C.textLight }}>
                  {plan.completed} de {plan.days} días
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>
                  {plan.progress}% completado
                </span>
              </div>
            </div>
          </div>
          <button
            style={{
              marginTop: 14,
              width: "100%",
              background:
                plan.progress === 0
                  ? `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`
                  : `linear-gradient(135deg, ${C.primaryLight}, ${C.accent})`,
              color: C.white,
              border: "none",
              borderRadius: 20,
              padding: "11px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
          >
            {plan.progress === 0 ? "▶ Comenzar plan" : plan.progress === 100 ? "✅ Completado" : "▶ Continuar lectura"}
          </button>
        </Card>
      ))}

      {/* TODO: Fetch and render Bible reading plan content from a real Bible API (e.g., api.scripture.api.bible) */}
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA: BIBLIA (lector)
// ─────────────────────────────────────────────
function BibleScreen({ favorites, setFavorites }) {
  const [testament, setTestament] = useState("AT");
  const [selectedBook, setSelectedBook] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState({});
  const [noteOpen, setNoteOpen] = useState(null);

  const books = BOOKS_OF_BIBLE.filter((b) => b.testament === testament);

  // Mock verses for a "book"
  const mockVerses = selectedBook
    ? Array.from({ length: 12 }, (_, i) => ({
        num: i + 1,
        text: VERSES[(i + selectedBook.name.length) % VERSES.length].text,
        ref: `${selectedBook.name} 1:${i + 1}`,
      }))
    : [];

  const toggleHighlight = (ref) => {
    setHighlights((h) => (h.includes(ref) ? h.filter((x) => x !== ref) : [...h, ref]));
  };

  const toggleBookmark = (ref) => {
    setBookmarks((b) => (b.includes(ref) ? b.filter((x) => x !== ref) : [...b, ref]));
  };

  if (selectedBook) {
    return (
      <div style={{ padding: "0 0 40px" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})`,
            padding: "24px 20px",
            borderRadius: "0 0 24px 24px",
            color: C.white,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <button
            onClick={() => setSelectedBook(null)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 20,
              color: C.white,
              padding: "6px 14px",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            ← Volver
          </button>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{selectedBook.name}</h2>
            <p style={{ margin: "2px 0 0", opacity: 0.75, fontSize: 13 }}>
              Capítulo 1 · {selectedBook.chapters} capítulos
            </p>
          </div>
        </div>

        <div style={{ padding: "20px 16px" }}>
          {mockVerses.map((v) => (
            <div
              key={v.num}
              style={{
                padding: "14px 16px",
                marginBottom: 8,
                borderRadius: 14,
                background: highlights.includes(v.ref)
                  ? "#FFF3E0"
                  : C.white,
                border: `1.5px solid ${highlights.includes(v.ref) ? C.gold : C.border}`,
                transition: "background 0.2s",
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span
                  style={{
                    fontWeight: 800,
                    color: C.primary,
                    fontSize: 13,
                    minWidth: 20,
                    paddingTop: 2,
                  }}
                >
                  {v.num}
                </span>
                <p style={{ margin: 0, flex: 1, color: C.text, fontSize: 15, lineHeight: 1.7 }}>
                  {v.text}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <button
                    onClick={() => toggleHighlight(v.ref)}
                    title="Resaltar"
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: 16,
                      cursor: "pointer",
                      opacity: highlights.includes(v.ref) ? 1 : 0.4,
                    }}
                  >
                    🌟
                  </button>
                  <button
                    onClick={() => toggleBookmark(v.ref)}
                    title="Marcador"
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: 16,
                      cursor: "pointer",
                      opacity: bookmarks.includes(v.ref) ? 1 : 0.4,
                    }}
                  >
                    🔖
                  </button>
                  <button
                    onClick={() => setNoteOpen(noteOpen === v.ref ? null : v.ref)}
                    title="Nota"
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: 16,
                      cursor: "pointer",
                      opacity: notes[v.ref] ? 1 : 0.4,
                    }}
                  >
                    📝
                  </button>
                </div>
              </div>
              {noteOpen === v.ref && (
                <div style={{ marginTop: 10 }}>
                  <textarea
                    value={notes[v.ref] || ""}
                    onChange={(e) => setNotes((n) => ({ ...n, [v.ref]: e.target.value }))}
                    placeholder="Escribe tu nota aquí..."
                    style={{
                      width: "100%",
                      minHeight: 80,
                      border: `1.5px solid ${C.border}`,
                      borderRadius: 10,
                      padding: 10,
                      fontSize: 13,
                      fontFamily: "inherit",
                      resize: "vertical",
                      outline: "none",
                      background: C.accentLight,
                      color: C.text,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
          {/* TODO: Load real Bible text from API (e.g., api.bible, getbible.net) for all chapters */}
          <p style={{ textAlign: "center", color: C.textLight, fontSize: 13, marginTop: 16 }}>
            📖 Este es un fragmento de demostración. En la versión completa se cargaría el texto real de {selectedBook.name}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 16px 40px" }}>
      <div style={{ padding: "24px 0 16px" }}>
        <h2 style={{ margin: 0, color: C.text, fontSize: 22, fontWeight: 800 }}>
          📖 La Biblia
        </h2>
        <p style={{ margin: "6px 0 0", color: C.textLight, fontSize: 14 }}>
          Explora los libros sagrados
        </p>
      </div>

      {/* Search bar */}
      {/* TODO: Implement full-text Bible search using API */}
      <div
        style={{
          background: C.white,
          border: `1.5px solid ${C.border}`,
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          padding: "10px 16px",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <span style={{ fontSize: 16 }}>🔍</span>
        <input
          placeholder="Buscar versículo, libro, referencia..."
          style={{
            border: "none",
            outline: "none",
            flex: 1,
            fontSize: 14,
            color: C.text,
            background: "transparent",
          }}
        />
      </div>

      {/* Testament tabs */}
      <div
        style={{
          display: "flex",
          background: C.border,
          borderRadius: 20,
          padding: 4,
          marginBottom: 18,
          width: "100%",
        }}
      >
        {["AT", "NT"].map((t) => (
          <button
            key={t}
            onClick={() => setTestament(t)}
            style={{
              flex: 1,
              background: testament === t ? C.primary : "transparent",
              color: testament === t ? C.white : C.textMid,
              border: "none",
              borderRadius: 16,
              padding: "10px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.25s",
            }}
          >
            {t === "AT" ? "📜 Antiguo Testamento" : "✝️ Nuevo Testamento"}
          </button>
        ))}
      </div>

      {/* Books grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
        }}
      >
        {books.map((book) => (
          <Card
            key={book.name}
            onClick={() => setSelectedBook(book)}
            style={{ padding: 16 }}
          >
            <p style={{ margin: "0 0 4px", fontWeight: 700, color: C.text, fontSize: 14 }}>
              {book.name}
            </p>
            <p style={{ margin: 0, fontSize: 12, color: C.textLight }}>
              {book.chapters} capítulos
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA: CALENDARIO / FAVORITOS
// ─────────────────────────────────────────────
function CalendarScreen({ favorites }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const favDays = favorites.map((f) => {
    const d = new Date(f.date + "T00:00:00");
    return d.getDate();
  });

  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const selectedKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
  const dayFavs = favorites.filter((f) => f.date === selectedKey);

  return (
    <div style={{ padding: "0 16px 40px" }}>
      <div style={{ padding: "24px 0 16px" }}>
        <h2 style={{ margin: 0, color: C.text, fontSize: 22, fontWeight: 800 }}>
          ❤️ Favoritos y Calendario
        </h2>
        <p style={{ margin: "6px 0 0", color: C.textLight, fontSize: 14 }}>
          Tus versículos marcados con amor
        </p>
      </div>

      <Card style={{ marginBottom: 20 }}>
        {/* Month title */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0, color: C.text, fontSize: 16, fontWeight: 700, textTransform: "capitalize" }}>
            {monthName}
          </h3>
          <span style={{ fontSize: 12, color: C.textLight }}>
            {favorites.length} favorito{favorites.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Week header */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 6 }}>
          {weekDays.map((d) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: 11,
                fontWeight: 700,
                color: C.textLight,
                padding: "4px 0",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const isToday = day === today.getDate();
            const isFav = favDays.includes(day);
            const isSelected = day === selectedDay;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                style={{
                  aspectRatio: "1",
                  borderRadius: "50%",
                  border: isSelected ? `2px solid ${C.primary}` : "2px solid transparent",
                  background: isToday
                    ? `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`
                    : "transparent",
                  color: isToday ? C.white : C.text,
                  fontSize: isFav ? 9 : 13,
                  fontWeight: isToday || isSelected ? 700 : 400,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 1,
                  padding: 2,
                  transition: "background 0.2s",
                  position: "relative",
                }}
              >
                <span style={{ fontSize: 13 }}>{day}</span>
                {isFav && <span style={{ fontSize: 9, lineHeight: 1 }}>❤️</span>}
              </button>
            );
          })}
        </div>
      </Card>

      {/* Selected day favorites */}
      <h3 style={{ margin: "0 0 12px", color: C.text, fontSize: 16, fontWeight: 700 }}>
        📌 Día {selectedDay} — {dayFavs.length > 0 ? `${dayFavs.length} favorito(s)` : "Sin favoritos"}
      </h3>
      {dayFavs.length === 0 ? (
        <Card style={{ textAlign: "center", padding: "28px 20px" }}>
          <p style={{ margin: 0, fontSize: 32 }}>🤍</p>
          <p style={{ margin: "10px 0 0", color: C.textLight, fontSize: 14 }}>
            Marca un versículo como favorito desde la pantalla de inicio para verlo aquí con ❤️
          </p>
        </Card>
      ) : (
        dayFavs.map((f, idx) => (
          <Card key={idx} style={{ marginBottom: 12, border: `1.5px solid ${C.accent}55` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>❤️</span>
              <Tag label={f.tab === "dia" ? "☀️ Mañana" : "🌙 Noche"} color={C.primary} />
            </div>
            <p style={{ margin: "0 0 6px", fontSize: 15, fontStyle: "italic", color: C.text, lineHeight: 1.6 }}>
              "{f.verse.text}"
            </p>
            <p style={{ margin: 0, fontWeight: 700, color: C.textMid, fontSize: 13 }}>
              — {f.verse.ref}
            </p>
          </Card>
        ))
      )}

      {/* All favorites list */}
      {favorites.length > 0 && (
        <>
          <h3 style={{ margin: "24px 0 12px", color: C.text, fontSize: 16, fontWeight: 700 }}>
            ❤️ Todos mis favoritos ({favorites.length})
          </h3>
          {favorites.map((f, idx) => (
            <Card key={idx} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <Tag label={f.date} color={C.gold} />
                    <Tag label={f.tab === "dia" ? "☀️ Día" : "🌙 Noche"} color={C.primary} />
                  </div>
                  <p style={{ margin: "0 0 6px", fontSize: 14, fontStyle: "italic", color: C.text, lineHeight: 1.6 }}>
                    "{f.verse.text}"
                  </p>
                  <p style={{ margin: 0, fontWeight: 700, color: C.textMid, fontSize: 13 }}>
                    — {f.verse.ref}
                  </p>
                </div>
                <span style={{ fontSize: 22, marginLeft: 8 }}>❤️</span>
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA: QUIZ
// ─────────────────────────────────────────────
function QuizScreen() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState([]);

  const q = QUIZ_QUESTIONS[current];

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.answer;
    if (correct) setScore((s) => s + 1);
    setAnswered((a) => [...a, { q: q.q, selected: idx, correct, answer: q.answer }]);
    setTimeout(() => {
      if (current + 1 < QUIZ_QUESTIONS.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered([]);
  };

  if (finished) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div style={{ padding: "24px 16px 40px" }}>
        <Card
          style={{
            textAlign: "center",
            background: `linear-gradient(135deg, ${C.accentLight}, ${C.white})`,
            padding: 32,
          }}
        >
          <p style={{ fontSize: 52, margin: "0 0 10px" }}>
            {pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📖"}
          </p>
          <h2 style={{ margin: "0 0 8px", color: C.primary, fontSize: 24 }}>
            {pct >= 80 ? "¡Excelente!" : pct >= 60 ? "¡Bien hecho!" : "¡Sigue estudiando!"}
          </h2>
          <p style={{ color: C.textLight, fontSize: 15, margin: "0 0 20px" }}>
            Respondiste correctamente {score} de {QUIZ_QUESTIONS.length} preguntas
          </p>
          <div
            style={{
              background: pct >= 80 ? C.success : pct >= 60 ? C.gold : C.primary,
              color: C.white,
              borderRadius: 50,
              width: 90,
              height: 90,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 28,
              fontWeight: 900,
            }}
          >
            {pct}%
          </div>
          <button
            onClick={restart}
            style={{
              background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`,
              color: C.white,
              border: "none",
              borderRadius: 24,
              padding: "14px 36px",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              width: "100%",
            }}
          >
            🔄 Intentar de nuevo
          </button>
        </Card>

        <h3 style={{ margin: "24px 0 12px", color: C.text }}>Resumen de respuestas</h3>
        {answered.map((a, i) => (
          <Card key={i} style={{ marginBottom: 10 }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, color: C.text, fontSize: 14 }}>
              {i + 1}. {a.q}
            </p>
            <p
              style={{
                margin: 0,
                color: a.correct ? C.success : "#E53935",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {a.correct ? "✅" : "❌"} Tu respuesta: {QUIZ_QUESTIONS[i].options[a.selected]}
            </p>
            {!a.correct && (
              <p style={{ margin: "4px 0 0", color: C.success, fontSize: 13 }}>
                ✅ Respuesta correcta: {QUIZ_QUESTIONS[i].options[a.answer]}
              </p>
            )}
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: "0 16px 40px" }}>
      <div style={{ padding: "24px 0 16px" }}>
        <h2 style={{ margin: 0, color: C.text, fontSize: 22, fontWeight: 800 }}>
          💡 Desafío Bíblico
        </h2>
        <p style={{ margin: "6px 0 0", color: C.textLight, fontSize: 14 }}>
          Pon a prueba tu conocimiento de la Biblia
        </p>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: C.textLight }}>
            Pregunta {current + 1} de {QUIZ_QUESTIONS.length}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>
            Puntos: {score}
          </span>
        </div>
        <ProgressBar value={((current) / QUIZ_QUESTIONS.length) * 100} />
      </div>

      <Card style={{ marginBottom: 20, background: `linear-gradient(135deg, ${C.primary}11, ${C.white})` }}>
        <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.text, lineHeight: 1.5 }}>
          {q.q}
        </p>
      </Card>

      {q.options.map((opt, idx) => {
        let bg = C.white;
        let border = C.border;
        let textColor = C.text;
        if (selected !== null) {
          if (idx === q.answer) {
            bg = "#E8F5E9";
            border = C.success;
            textColor = "#2E7D32";
          } else if (idx === selected && selected !== q.answer) {
            bg = "#FFEBEE";
            border = "#E53935";
            textColor = "#C62828";
          }
        }

        return (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            style={{
              display: "block",
              width: "100%",
              background: bg,
              border: `2px solid ${border}`,
              borderRadius: 16,
              padding: "16px 18px",
              marginBottom: 10,
              textAlign: "left",
              fontSize: 15,
              color: textColor,
              fontWeight: selected !== null && idx === q.answer ? 700 : 400,
              cursor: selected !== null ? "default" : "pointer",
              transition: "all 0.25s",
              fontFamily: "inherit",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                width: 26,
                height: 26,
                borderRadius: "50%",
                background:
                  selected !== null && idx === q.answer
                    ? C.success
                    : selected !== null && idx === selected && selected !== q.answer
                    ? "#E53935"
                    : C.border,
                color: selected !== null && (idx === q.answer || idx === selected) ? C.white : C.textMid,
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                marginRight: 12,
              }}
            >
              {["A", "B", "C", "D"][idx]}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// PANTALLA: RECORDATORIOS
// ─────────────────────────────────────────────
function RemindersScreen() {
  const [reminders, setReminders] = useState([
    { id: 1, label: "Oración matutina", time: "07:00", active: true, icon: "☀️" },
    { id: 2, label: "Versículo del mediodía", time: "12:00", active: false, icon: "📖" },
    { id: 3, label: "Reflexión nocturna", time: "21:00", active: true, icon: "🌙" },
  ]);

  const toggle = (id) => {
    setReminders((r) =>
      r.map((rem) => (rem.id === id ? { ...rem, active: !rem.active } : rem))
    );
  };

  // TODO: Implement real push notifications using Web Push API or Firebase Cloud Messaging

  return (
    <div style={{ padding: "0 16px 40px" }}>
      <div style={{ padding: "24px 0 16px" }}>
        <h2 style={{ margin: 0, color: C.text, fontSize: 22, fontWeight: 800 }}>
          🔔 Recordatorios
        </h2>
        <p style={{ margin: "6px 0 0", color: C.textLight, fontSize: 14 }}>
          Mantén tu ritmo espiritual diario
        </p>
      </div>

      <Card
        style={{
          background: `linear-gradient(135deg, ${C.accentLight}, ${C.white})`,
          marginBottom: 20,
          textAlign: "center",
          padding: "24px",
        }}
      >
        <p style={{ fontSize: 40, margin: "0 0 8px" }}>🙏</p>
        <p style={{ margin: 0, color: C.text, fontSize: 14, lineHeight: 1.6 }}>
          "Oren sin cesar" — 1 Tesalonicenses 5:17
        </p>
      </Card>

      {reminders.map((r) => (
        <Card key={r.id} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 16,
                background: r.active
                  ? `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`
                  : C.border,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
                transition: "background 0.3s",
              }}
            >
              {r.icon}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: "0 0 2px", fontWeight: 700, color: C.text, fontSize: 15 }}>
                {r.label}
              </p>
              <p style={{ margin: 0, color: C.textLight, fontSize: 13 }}>
                ⏰ {r.time} · {r.active ? "Activo" : "Inactivo"}
              </p>
            </div>
            <button
              onClick={() => toggle(r.id)}
              style={{
                width: 50,
                height: 28,
                borderRadius: 14,
                background: r.active
                  ? `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`
                  : C.border,
                border: "none",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.3s",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: C.white,
                  position: "absolute",
                  top: 3,
                  left: r.active ? 25 : 3,
                  transition: "left 0.3s",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              />
            </button>
          </div>
        </Card>
      ))}

      <button
        style={{
          width: "100%",
          background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`,
          color: C.white,
          border: "none",
          borderRadius: 20,
          padding: 16,
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        ＋ Agregar recordatorio
      </button>

      {/* TODO: Add time picker for custom reminder configuration */}
    </div>
  );
}

// ─────────────────────────────────────────────
// APP PRINCIPAL
// ─────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("home");
  const [favorites, setFavorites] = useState([]);

  const TABS = [
    { id: "home", icon: "🏠", label: "Inicio" },
    { id: "bible", icon: "📖", label: "Biblia" },
    { id: "devotional", icon: "💗", label: "Devocional" },
    { id: "plans", icon: "📅", label: "Planes" },
    { id: "calendar", icon: "❤️", label: "Favoritos" },
    { id: "quiz", icon: "💡", label: "Quiz" },
    { id: "reminders", icon: "🔔", label: "Alertas" },
  ];

  const renderScreen = () => {
    switch (tab) {
      case "home":
        return <HomeScreen favorites={favorites} setFavorites={setFavorites} />;
      case "bible":
        return <BibleScreen favorites={favorites} setFavorites={setFavorites} />;
      case "devotional":
        return <DevotionalScreen />;
      case "plans":
        return <PlansScreen />;
      case "calendar":
        return <CalendarScreen favorites={favorites} />;
      case "quiz":
        return <QuizScreen />;
      case "reminders":
        return <RemindersScreen />;
      default:
        return <HomeScreen favorites={favorites} setFavorites={setFavorites} />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      {/* Mobile frame */}
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: "100vh",
          background: C.bg,
          position: "relative",
          fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          boxShadow: "0 0 40px rgba(139,75,140,0.12)",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            background: C.primary,
            padding: "10px 20px 8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 600 }}>
            🌸 Biblia para Mujeres
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>
              {new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
            </span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>📶 🔋</span>
          </div>
        </div>

        {/* Screen content — scrollable */}
        <div
          style={{
            overflowY: "auto",
            height: "calc(100vh - 48px - 70px)",
          }}
        >
          {renderScreen()}
        </div>

        {/* Bottom navigation */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            maxWidth: 430,
            background: C.white,
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            overflowX: "auto",
            boxShadow: "0 -4px 20px rgba(139,75,140,0.1)",
            zIndex: 100,
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: "0 0 auto",
                minWidth: 58,
                padding: "10px 6px 8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                position: "relative",
              }}
            >
              {tab === t.id && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 28,
                    height: 3,
                    background: `linear-gradient(90deg, ${C.primary}, ${C.primaryLight})`,
                    borderRadius: "0 0 4px 4px",
                  }}
                />
              )}
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: tab === t.id ? 700 : 400,
                  color: tab === t.id ? C.primary : C.textLight,
                  transition: "color 0.2s",
                }}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}