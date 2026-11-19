import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, BadgeCheck, Bell, CalendarDays, Check, ChevronDown,
  ChevronRight, CircleAlert, Clock3, Dumbbell, Eye, EyeOff, Filter, LayoutDashboard,
  LockKeyhole, LogOut, MapPin, Menu, Search, Settings2, ShieldCheck, SlidersHorizontal,
  Sparkles, Trophy, User, Users, Waves, X,
} from 'lucide-react'
import heroImage from './assets/sgred-hero.png'

type View =
  | 'home' | 'catalog' | 'unit' | 'availability' | 'request' | 'success' | 'reservations'
  | 'profile' | 'login' | 'register' | 'recovery' | 'new-password' | 'internal-login'
  | 'admin' | 'admin-detail' | 'scenarios' | 'schedule' | 'staff'

const scenarios = [
  { name: 'Cancha de fútbol 1', type: 'Fútbol 11', capacity: 22, icon: Trophy, available: true },
  { name: 'Cancha de baloncesto', type: 'Baloncesto', capacity: 16, icon: Dumbbell, available: true },
  { name: 'Piscina semiolímpica', type: 'Natación', capacity: 30, icon: Waves, available: true },
  { name: 'Cancha de voleibol playa', type: 'Voleibol', capacity: 12, icon: Users, available: false },
]

const reservations = [
  { code: 'SGR-2847', place: 'Cancha de fútbol 1', date: '24 Jun 2025', time: '08:00 – 09:00', use: 'Entrenamiento', status: 'Pendiente' },
  { code: 'SGR-2712', place: 'Piscina semiolímpica', date: '18 Jun 2025', time: '10:00 – 11:00', use: 'Práctica libre', status: 'Aprobada' },
  { code: 'SGR-2639', place: 'Cancha de baloncesto', date: '12 Jun 2025', time: '16:00 – 17:00', use: 'Torneo', status: 'Rechazada' },
]

const pending = [
  { code: 'SGR-2851', user: 'Mariana López', club: 'Club Halcones', place: 'Cancha de fútbol 1', date: '25 Jun', time: '08:00–09:00', use: 'Entrenamiento', people: 18, ago: 'Hace 2 h' },
  { code: 'SGR-2849', user: 'Carlos Ramírez', club: 'Independiente Medellín Norte', place: 'Cancha de baloncesto', date: '25 Jun', time: '14:00–15:00', use: 'Torneo', people: 14, ago: 'Hace 4 h' },
  { code: 'SGR-2843', user: 'Ana Torres', club: 'Sin institución', place: 'Piscina semiolímpica', date: '26 Jun', time: '10:00–11:00', use: 'Práctica libre', people: 8, ago: 'Ayer' },
]

const cn = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

function Button({ children, variant = 'primary', className, onClick, disabled, type = 'button' }: {
  children: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'white'
  className?: string; onClick?: () => void; disabled?: boolean; type?: 'button' | 'submit'
}) {
  return <button type={type} disabled={disabled} onClick={onClick} className={cn('btn', `btn-${variant}`, className)}>{children}</button>
}

function Field({ label, placeholder, type = 'text', icon, value, readOnly, error }: {
  label: string; placeholder?: string; type?: string; icon?: React.ReactNode; value?: string; readOnly?: boolean; error?: string
}) {
  const [show, setShow] = useState(false)
  return <label className="field">
    <span className="field-label">{label}{readOnly && <LockKeyhole size={13} />}</span>
    <span className={cn('input-wrap', error && 'input-error', readOnly && 'input-readonly')}>
      {icon}<input type={show ? 'text' : type} placeholder={placeholder} defaultValue={value} readOnly={readOnly} />
      {type === 'password' && <button type="button" className="icon-btn mini" onClick={() => setShow(!show)} aria-label="Mostrar contraseña">{show ? <EyeOff /> : <Eye />}</button>}
    </span>
    {error && <span className="error-text"><CircleAlert size={14} />{error}</span>}
  </label>
}

function SelectField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="field"><span className="field-label">{label}</span><span className="input-wrap">
    <select defaultValue=""><option value="" disabled>Seleccionar</option>{children}</select><ChevronDown size={17} />
  </span></label>
}

function Badge({ status }: { status: string }) {
  return <span className={cn('badge', `badge-${status.toLowerCase().replaceAll(' ', '-')}`)}>
    <span className="status-dot" />{status}
  </span>
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className={cn('logo', light && 'logo-light')}><span className="logo-mark"><Trophy /></span><span><b>SGRED</b><small>Medellín se mueve</small></span></div>
}

function PublicHeader({ go, signedIn, onMenu }: { go: (v: View) => void; signedIn: boolean; onMenu: () => void }) {
  return <header className="public-header">
    <div className="container nav-inner">
      <button className="logo-button" onClick={() => go('home')}><Logo /></button>
      <nav className="desktop-nav"><button onClick={() => go('home')}>Inicio</button><button onClick={() => go('catalog')}>Escenarios</button><button>¿Cómo funciona?</button></nav>
      <div className="nav-actions">
        {signedIn ? <>
          <Button variant="ghost" onClick={() => go('reservations')}><CalendarDays /> Mis reservas</Button>
          <button className="avatar" onClick={() => go('profile')}>JL</button>
        </> : <>
          <Button variant="ghost" onClick={() => go('login')}>Iniciar sesión</Button>
          <Button onClick={() => go('register')}>Crear cuenta</Button>
        </>}
      </div>
      <button className="mobile-menu" onClick={onMenu}><Menu /></button>
    </div>
  </header>
}

function Footer() {
  return <footer><div className="container footer-grid"><Logo light /><p>Reserva escenarios deportivos públicos de Medellín de forma fácil, transparente y segura.</p><div><b>Explora</b><span>Unidades deportivas</span><span>Cómo funciona</span><span>Preguntas frecuentes</span></div><div><b>Soporte</b><span>Centro de ayuda</span><span>contacto@sgred.gov.co</span><span>Línea 604 444 44 44</span></div></div><div className="container copyright">© 2025 SGRED · Alcaldía de Medellín <span>Términos · Privacidad · Accesibilidad</span></div></footer>
}

function Home({ go }: { go: (v: View) => void }) {
  return <><section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(8,23,18,.93) 0%, rgba(8,23,18,.62) 47%, rgba(8,23,18,.12) 100%), url(${heroImage})` }}>
    <div className="container hero-content"><span className="eyebrow-light"><Sparkles /> El deporte de Medellín, más cerca de ti</span>
      <h1>Tu espacio para<br /><em>moverte y crecer.</em></h1>
      <p>Encuentra y reserva los mejores escenarios deportivos públicos de la ciudad, en pocos pasos.</p>
      <div className="quick-search"><div><Search /><span><small>¿Qué deporte buscas?</small><b>Fútbol, natación, baloncesto...</b></span></div><div><MapPin /><span><small>Zona o barrio</small><b>Todo Medellín</b></span></div><Button onClick={() => go('catalog')}>Buscar espacios <ArrowRight /></Button></div>
      <div className="hero-stats"><span><b>18</b> unidades deportivas</span><i /><span><b>64</b> escenarios disponibles</span><i /><span><b>+8.000</b> reservas gestionadas</span></div>
    </div>
  </section>
  <section className="section"><div className="container"><div className="section-heading"><div><span className="eyebrow">ESPACIOS PARA TODOS</span><h2>Escenarios destacados</h2><p>Instalaciones de calidad para practicar el deporte que te apasiona.</p></div><Button variant="secondary" onClick={() => go('catalog')}>Ver todos <ArrowRight /></Button></div>
    <div className="featured-grid">
      <article className="feature-card feature-green"><div className="feature-icon"><Trophy /></div><Badge status="Disponible" /><h3>Unidad Deportiva Atanasio Girardot</h3><p><MapPin /> Laureles · Carrera 74 # 48-10</p><div className="sport-tags"><span>Fútbol</span><span>Natación</span><span>Baloncesto</span><span>+4</span></div><button onClick={() => go('unit')}>Explorar unidad <ArrowRight /></button></article>
      <article className="feature-card feature-blue"><div className="feature-icon"><Waves /></div><Badge status="Disponible" /><h3>Complejo Acuático César Zapata</h3><p><MapPin /> Laureles · Calle 48 # 70-30</p><div className="sport-tags"><span>Natación</span><span>Clavados</span><span>Polo acuático</span></div><button onClick={() => go('unit')}>Explorar unidad <ArrowRight /></button></article>
      <article className="feature-card feature-orange"><div className="feature-icon"><Users /></div><Badge status="Disponible" /><h3>Unidad Deportiva de Belén</h3><p><MapPin /> Belén · Carrera 66B # 30A-20</p><div className="sport-tags"><span>Tenis</span><span>Atletismo</span><span>Voleibol</span></div><button onClick={() => go('unit')}>Explorar unidad <ArrowRight /></button></article>
    </div>
  </div></section>
  <section className="how"><div className="container"><span className="eyebrow">SIMPLE Y TRANSPARENTE</span><h2>Reserva en tres pasos</h2><div className="steps"><div><b>01</b><span><Search /></span><h3>Encuentra tu espacio</h3><p>Filtra por deporte, zona y disponibilidad.</p></div><i /><div><b>02</b><span><CalendarDays /></span><h3>Elige fecha y hora</h3><p>Consulta las franjas disponibles en tiempo real.</p></div><i /><div><b>03</b><span><BadgeCheck /></span><h3>Envía tu solicitud</h3><p>Recibe confirmación y sigue su estado.</p></div></div></div></section>
  <section className="cta"><div><h2>¿Listo para moverte?</h2><p>Crea tu cuenta y empieza a reservar escenarios deportivos.</p></div><Button variant="white" onClick={() => go('register')}>Crear cuenta gratis <ArrowRight /></Button></section></>
}

function Catalog({ go }: { go: (v: View) => void }) {
  const [filters, setFilters] = useState(['Laureles', 'Fútbol'])
  return <main className="page-bg"><div className="container page-content">
    <div className="breadcrumbs">Inicio <ChevronRight /> Escenarios deportivos</div>
    <div className="title-row"><div><span className="eyebrow">EXPLORA MEDELLÍN</span><h1>Encuentra tu próximo escenario</h1><p>Descubre espacios deportivos disponibles cerca de ti.</p></div><div className="result-count"><b>24</b><span>escenarios<br />encontrados</span></div></div>
    <div className="catalog-layout"><aside className="filters-panel"><div className="filter-title"><b><SlidersHorizontal /> Filtros</b><button onClick={() => setFilters([])}>Limpiar</button></div>
      <Field label="Buscar" placeholder="Nombre del escenario" icon={<Search size={18} />} />
      <SelectField label="Zona o barrio"><option>Laureles</option><option>Belén</option><option>El Poblado</option></SelectField>
      <SelectField label="Tipo de unidad"><option>Unidad deportiva</option><option>Complejo acuático</option></SelectField>
      <div className="filter-group"><span className="field-label">Disciplina</span>{['Fútbol', 'Baloncesto', 'Natación', 'Voleibol', 'Tenis'].map(x => <label className="check" key={x}><input type="checkbox" defaultChecked={x === 'Fútbol'} /><span>{x}</span></label>)}</div>
      <Button className="full">Aplicar filtros</Button>
    </aside>
    <section className="results"><div className="active-filters">{filters.map(f => <button key={f} onClick={() => setFilters(filters.filter(x => x !== f))}>{f}<X /></button>)}{filters.length > 0 && <button className="clear" onClick={() => setFilters([])}>Limpiar todos</button>}<span className="sort">Ordenar por <b>Más cercanos</b><ChevronDown /></span></div>
      <article className="unit-card" onClick={() => go('unit')}><div className="unit-visual stadium"><span>4 escenarios</span><Trophy /></div><div className="unit-info"><div><Badge status="Disponible" /><span className="distance">A 1.8 km</span></div><h3>Unidad Deportiva Atanasio Girardot</h3><p><MapPin /> Laureles · Carrera 74 # 48-10</p><div className="sport-tags dark"><span>Fútbol</span><span>Natación</span><span>Baloncesto</span><span>Voleibol</span></div><button>Ver escenarios <ArrowRight /></button></div></article>
      <article className="unit-card"><div className="unit-visual pool"><span>3 escenarios</span><Waves /></div><div className="unit-info"><div><Badge status="Disponible" /><span className="distance">A 2.1 km</span></div><h3>Complejo Acuático César Zapata</h3><p><MapPin /> Laureles · Calle 48 # 70-30</p><div className="sport-tags dark"><span>Natación</span><span>Clavados</span><span>Polo acuático</span></div><button>Ver escenarios <ArrowRight /></button></div></article>
      <article className="unit-card"><div className="unit-visual court"><span>5 escenarios</span><Users /></div><div className="unit-info"><div><Badge status="Disponible" /><span className="distance">A 3.4 km</span></div><h3>Unidad Deportiva de Belén</h3><p><MapPin /> Belén · Carrera 66B # 30A-20</p><div className="sport-tags dark"><span>Tenis</span><span>Atletismo</span><span>Voleibol</span></div><button>Ver escenarios <ArrowRight /></button></div></article>
    </section></div>
  </div></main>
}

function Unit({ go }: { go: (v: View) => void }) {
  return <main><section className="unit-hero"><div className="container"><button className="back-light" onClick={() => go('catalog')}><ArrowLeft /> Volver al catálogo</button><div><span className="eyebrow-light"><MapPin /> LAURELES</span><h1>Unidad Deportiva<br />Atanasio Girardot</h1><p>Carrera 74 # 48-10 · Medellín, Antioquia</p><div className="sport-tags"><span>Fútbol</span><span>Natación</span><span>Baloncesto</span><span>Voleibol</span></div></div></div></section>
    <div className="container unit-content"><div className="unit-title"><div><span className="eyebrow">ELIGE TU ESPACIO</span><h2>Escenarios de esta unidad</h2><p>Consulta la disponibilidad y solicita tu reserva.</p></div><div className="legend"><b>Estado</b><Badge status="Disponible" /><Badge status="No disponible" /></div></div>
      <div className="scenario-grid">{scenarios.map(({ name, type, capacity, icon: Icon, available }) => <article className={cn('scenario-card', !available && 'disabled')} key={name}><div className="scenario-icon"><Icon /></div><div><Badge status={available ? 'Disponible' : 'No disponible'} /><h3>{name}</h3><p>{type} · Capacidad máxima: {capacity} personas</p></div>{available ? <Button onClick={() => go('availability')}>Ver disponibilidad <ArrowRight /></Button> : <Button disabled>No disponible</Button>}</article>)}</div>
      <div className="info-strip"><Clock3 /><div><b>Horario general de la unidad</b><p>Lunes a domingo de 6:00 a.m. a 10:00 p.m. Los horarios pueden variar según el escenario.</p></div></div>
    </div>
  </main>
}

function Availability({ go }: { go: (v: View) => void }) {
  const [selected, setSelected] = useState('08:00')
  const slots = [
    ['06:00', 'Disponible'], ['07:00', 'Disponible'], ['08:00', 'Disponible'], ['09:00', 'Reservada'],
    ['10:00', 'En revisión'], ['11:00', 'Disponible'], ['12:00', 'No disponible'], ['13:00', 'Disponible'],
  ]
  return <main className="page-bg"><div className="container page-content">
    <button className="back" onClick={() => go('unit')}><ArrowLeft /> Unidad Deportiva Atanasio Girardot</button>
    <div className="availability-head"><div><span className="eyebrow">CANCHA DE FÚTBOL 1</span><h1>Consulta la disponibilidad</h1><p>Selecciona una fecha y una franja disponible para continuar.</p></div><div className="legend large"><Badge status="Disponible" /><Badge status="Reservada" /><Badge status="En revisión" /><Badge status="No disponible" /></div></div>
    <div className="date-strip"><button disabled><ArrowLeft /></button>{[['LUN','23'],['MAR','24'],['MIÉ','25'],['JUE','26'],['VIE','27']].map((d,i) => <button className={i===1 ? 'active' : ''} key={d[1]}><small>{d[0]}</small><b>{d[1]}</b><span>JUN</span></button>)}<button><ArrowRight /></button></div>
    <section className="schedule-card"><div className="schedule-title"><div><CalendarDays /><span><b>Martes, 24 de junio</b><small>Horario de operación: 6:00 a.m. – 10:00 p.m.</small></span></div><span>Selecciona una franja</span></div>
      <div className="slots">{slots.map(([time,status]) => <button key={time} disabled={status !== 'Disponible'} onClick={() => setSelected(time)} className={cn(`slot-${status.toLowerCase().replace(' ', '-')}`, selected === time && 'selected')}><span>{time}</span><small>{`${String(Number(time.slice(0,2))+1).padStart(2,'0')}:00`}</small><b>{status === 'Disponible' ? selected === time ? 'Seleccionada' : 'Disponible' : status}</b>{selected === time && <Check />}</button>)}</div>
      <div className="schedule-footer"><span><CircleAlert /> Las fechas pasadas y franjas ocupadas no pueden seleccionarse.</span><Button onClick={() => go('request')}>Continuar con la reserva <ArrowRight /></Button></div>
    </section>
  </div></main>
}

function Request({ go }: { go: (v: View) => void }) {
  const [confirmed, setConfirmed] = useState(false)
  return <main className="page-bg"><div className="container narrow page-content"><button className="back" onClick={() => go('availability')}><ArrowLeft /> Volver a disponibilidad</button>
    <div className="stepper"><span className="done"><Check /></span><i /><span className="active">2</span><i /><span>3</span><div><b>Seleccionar franja</b><b>Completar solicitud</b><b>Confirmación</b></div></div>
    <div className="request-layout"><section><span className="eyebrow">SOLICITUD DE RESERVA</span><h1>Cuéntanos sobre tu actividad</h1><p>Completa la información para enviar tu solicitud.</p>
      <div className="form-card"><div className="two-col"><Field label="Escenario" value="Cancha de fútbol 1" readOnly /><Field label="Fecha" value="24/06/2025" readOnly /><Field label="Hora de inicio" value="08:00" readOnly /><Field label="Hora de fin" value="09:00" readOnly /></div><SelectField label="Tipo de uso *"><option>Entrenamiento</option><option>Torneo</option><option>Práctica libre</option></SelectField><Field label="Número de participantes *" value="18" /><label className="field"><span className="field-label">Observaciones <small>Opcional</small></span><textarea placeholder="Cuéntanos cualquier detalle relevante para tu solicitud..." /><small className="char-count">0 / 300</small></label>
      <label className="terms"><input type="checkbox" defaultChecked /><span>Acepto las normas de uso del escenario y confirmo que la información es correcta.</span></label></div>
    </section>
    <aside className="summary"><span className="eyebrow">RESUMEN</span><h3>Tu reserva</h3><div className="summary-place"><span><Trophy /></span><div><b>Cancha de fútbol 1</b><small>U.D. Atanasio Girardot</small></div></div><dl><div><dt><CalendarDays /> Fecha</dt><dd>Martes, 24 de junio</dd></div><div><dt><Clock3 /> Horario</dt><dd>08:00 – 09:00</dd></div><div><dt><Users /> Capacidad</dt><dd>Máximo 22 personas</dd></div></dl><div className="notice"><ShieldCheck /><p><b>Tu solicitud será revisada</b>Recibirás una notificación cuando el personal administrativo tome una decisión.</p></div><Button className="full" disabled={confirmed} onClick={() => { setConfirmed(true); setTimeout(() => go('success'), 500) }}>{confirmed ? 'Enviando solicitud…' : <>Enviar solicitud <ArrowRight /></>}</Button><small className="secure"><LockKeyhole /> Tus datos están protegidos</small></aside>
    </div></div></main>
}

function Success({ go }: { go: (v: View) => void }) {
  return <main className="success-page"><section className="success-card"><div className="success-icon"><Check /></div><span className="eyebrow">SOLICITUD ENVIADA</span><h1>¡Todo listo, Juan!</h1><p>Recibimos tu solicitud y ya está en proceso de revisión.</p><div className="tracking"><small>CÓDIGO DE SEGUIMIENTO</small><b>SGR-2847</b><span>Guárdalo para consultar tu solicitud</span></div><div className="success-details"><div><CalendarDays /><span><small>Fecha y hora</small><b>24 Jun 2025 · 08:00–09:00</b></span></div><div><Trophy /><span><small>Escenario</small><b>Cancha de fútbol 1</b></span></div><div><Clock3 /><span><small>Estado</small><Badge status="Pendiente" /></span></div></div><Button onClick={() => go('reservations')}>Ver mis reservas <ArrowRight /></Button><Button variant="ghost" onClick={() => go('catalog')}>Volver al catálogo</Button></section></main>
}

function Reservations({ go, toast }: { go: (v: View) => void; toast: (s: string) => void }) {
  const [cancel, setCancel] = useState(false)
  const [filter, setFilter] = useState('Todas')
  return <main className="page-bg"><div className="container page-content">
    <div className="dashboard-head"><div><span className="eyebrow">TU ACTIVIDAD</span><h1>Mis reservas</h1><p>Consulta y gestiona tus solicitudes deportivas.</p></div><Button onClick={() => go('catalog')}>Nueva reserva <ArrowRight /></Button></div>
    <div className="tabs">{['Todas', 'Pendientes', 'Aprobadas', 'Rechazadas'].map(x => <button className={filter === x ? 'active' : ''} onClick={() => setFilter(x)} key={x}>{x}<span>{x === 'Todas' ? 3 : 1}</span></button>)}</div>
    <div className="reservation-list">{reservations.filter(r => filter === 'Todas' || r.status === filter.slice(0,-1)).map(r => <article className="reservation-card" key={r.code}><div className="res-icon"><Trophy /></div><div className="res-main"><div><span className="code">{r.code}</span><Badge status={r.status} /></div><h3>{r.place}</h3><p><CalendarDays /> {r.date}<Clock3 /> {r.time}<Users /> {r.use}</p>{r.status === 'Rechazada' && <div className="rejection"><CircleAlert /> <span><b>Motivo del rechazo</b>Escenario reservado para evento institucional</span></div>}</div><div className="res-actions"><Button variant="secondary">Ver detalle</Button>{r.status !== 'Rechazada' && <Button variant="ghost" onClick={() => setCancel(true)}>Cancelar reserva</Button>}</div></article>)}</div>
    {cancel && <div className="modal-backdrop"><div className="modal"><button className="modal-x" onClick={() => setCancel(false)}><X /></button><div className="modal-icon danger"><CircleAlert /></div><h2>¿Cancelar esta reserva?</h2><p>Esta acción no se puede deshacer. La franja volverá a estar disponible para otros usuarios.</p><div className="modal-summary"><b>Cancha de fútbol 1</b><span>24 Jun 2025 · 08:00–09:00</span></div><div className="modal-actions"><Button variant="secondary" onClick={() => setCancel(false)}>No, mantener reserva</Button><Button variant="danger" onClick={() => { setCancel(false); toast('Reserva cancelada correctamente') }}>Sí, cancelar reserva</Button></div></div></div>}
  </div></main>
}

function AuthPage({ mode, go, login }: { mode: 'login' | 'register' | 'recovery' | 'new-password' | 'internal'; go: (v: View) => void; login: (admin?: boolean) => void }) {
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const isInternal = mode === 'internal'
  const title = mode === 'register' ? 'Crea tu cuenta' : mode === 'recovery' ? 'Recupera tu contraseña' : mode === 'new-password' ? 'Crea una nueva contraseña' : isInternal ? 'Acceso administrativo' : 'Qué bueno verte de nuevo'
  return <main className={cn('auth-page', isInternal && 'auth-internal')}><section className="auth-brand"><Logo light /><div><span className="eyebrow-light">{isInternal ? 'CANAL INTERNO' : 'DEPORTE PARA TODOS'}</span><h1>{isInternal ? <>Gestión eficiente para<br /><em>servir mejor.</em></> : <>Reserva. Muévete.<br /><em>Vive Medellín.</em></>}</h1><p>{isInternal ? 'Administra solicitudes, escenarios y horarios desde un solo lugar.' : 'Accede a los escenarios deportivos de la ciudad de forma simple y transparente.'}</p></div><small>© 2025 SGRED · Alcaldía de Medellín</small></section>
    <section className="auth-form"><button className="auth-back" onClick={() => go('home')}><ArrowLeft /> Volver al inicio</button><div className="auth-box">
      {isInternal && <span className="internal-icon"><ShieldCheck /></span>}<span className="eyebrow">{isInternal ? 'PERSONAL AUTORIZADO' : mode === 'register' ? 'EMPECEMOS' : 'BIENVENIDO'}</span><h2>{title}</h2>
      <p>{mode === 'register' ? 'Regístrate para solicitar y gestionar tus reservas.' : mode === 'recovery' ? 'Ingresa tu correo y te enviaremos las instrucciones.' : mode === 'new-password' ? 'Debe tener al menos 8 caracteres e incluir números.' : isInternal ? 'Ingresa con tus credenciales institucionales.' : 'Ingresa a tu cuenta para continuar.'}</p>
      {sent ? <div className="sent-state"><div className="success-icon small"><Check /></div><h3>Revisa tu correo</h3><p>Si el correo existe, recibirás instrucciones para restablecer tu contraseña.</p><Button className="full" onClick={() => go('login')}>Volver a iniciar sesión</Button></div> :
      <form onSubmit={e => { e.preventDefault(); if (mode === 'recovery') setSent(true); else if (mode === 'new-password') go('login'); else if (mode === 'register') { setError(''); go('login') } else login(isInternal) }}>
        {error && <div className="alert-error"><CircleAlert /><span><b>No pudimos iniciar sesión</b>{error}</span></div>}
        {mode === 'register' && <><div className="two-col"><Field label="Documento de identidad *" placeholder="Ej. 1020304050" /><Field label="Nombres *" placeholder="Tus nombres" /></div><div className="two-col"><Field label="Apellidos *" placeholder="Tus apellidos" /><Field label="Correo electrónico *" placeholder="nombre@correo.com" /></div></>}
        {(mode === 'login' || mode === 'internal' || mode === 'recovery') && <Field label={isInternal ? 'Correo institucional' : 'Correo electrónico'} placeholder={isInternal ? 'empleado1@sgred.com' : 'usuario1@sgred.com'} type="email" icon={<User size={18} />} />}
        {(mode === 'login' || mode === 'internal' || mode === 'register' || mode === 'new-password') && <Field label={mode === 'new-password' ? 'Nueva contraseña' : 'Contraseña'} placeholder="••••••••" type="password" icon={<LockKeyhole size={18} />} />}
        {(mode === 'register' || mode === 'new-password') && <><div className="strength"><span /><span /><span /><span /><small>Fortaleza: <b>Buena</b></small></div><Field label="Confirmar contraseña *" placeholder="••••••••" type="password" icon={<LockKeyhole size={18} />} /></>}
        {mode === 'login' && <div className="form-options"><label><input type="checkbox" /> Recordarme</label><button type="button" onClick={() => go('recovery')}>Olvidé mi contraseña</button></div>}
        <Button className="full" type="submit">{mode === 'register' ? 'Crear mi cuenta' : mode === 'recovery' ? 'Enviar instrucciones' : mode === 'new-password' ? 'Actualizar contraseña' : 'Ingresar'} <ArrowRight /></Button>
        {mode === 'login' && <p className="switch-auth">¿Aún no tienes una cuenta? <button type="button" onClick={() => go('register')}>Regístrate gratis</button></p>}
        {mode === 'register' && <p className="switch-auth">¿Ya tienes una cuenta? <button type="button" onClick={() => go('login')}>Inicia sesión</button></p>}
      </form>}
      {isInternal && <div className="internal-note"><LockKeyhole /> Acceso exclusivo para personal autorizado de las unidades deportivas.</div>}
    </div></section>
  </main>
}

function Profile({ go, toast, logout }: { go: (v: View) => void; toast: (s: string) => void; logout: () => void }) {
  const [phoneError, setPhoneError] = useState(false)
  return <main className="page-bg"><div className="container narrow page-content"><button className="back" onClick={() => go('home')}><ArrowLeft /> Volver</button><div className="profile-head"><div className="profile-avatar">JL</div><div><span className="eyebrow">MI CUENTA</span><h1>Mi perfil</h1><p>Mantén tus datos personales actualizados.</p></div></div><section className="form-card profile-form"><h3>Información personal</h3><div className="two-col"><Field label="Nombres" value="Juan Esteban" /><Field label="Apellidos" value="Londoño Pérez" /><Field label="Documento de identidad" value="1020304050" readOnly /><Field label="Correo electrónico" value="usuario1@sgred.com" readOnly /><Field label="Teléfono" value={phoneError ? '123' : '3001234567'} error={phoneError ? 'El número de teléfono no es válido' : undefined} /><Field label="Club o institución que representa" value="Club Deportivo Los Andes" /></div><div className="profile-actions"><Button variant="ghost" onClick={logout}><LogOut /> Cerrar sesión</Button><Button variant="secondary" onClick={() => setPhoneError(true)}>Probar validación</Button><Button onClick={() => { setPhoneError(false); toast('Perfil actualizado correctamente') }}>Guardar cambios</Button></div></section></div></main>
}

function AdminShell({ view, go, children, logout }: { view: View; go: (v: View) => void; children: React.ReactNode; logout: () => void }) {
  return <div className="admin-shell"><aside className="sidebar"><Logo light /><div className="admin-unit"><span>UD</span><div><small>UNIDAD ASIGNADA</small><b>Atanasio Girardot</b></div></div><nav>
    <button className={view === 'admin' || view === 'admin-detail' ? 'active' : ''} onClick={() => go('admin')}><LayoutDashboard /> Solicitudes <span className="count">3</span></button>
    <button className={view === 'scenarios' ? 'active' : ''} onClick={() => go('scenarios')}><Trophy /> Escenarios</button>
    <button className={view === 'schedule' ? 'active' : ''} onClick={() => go('schedule')}><CalendarDays /> Horarios y bloqueos</button>
    <button className={view === 'staff' ? 'active' : ''} onClick={() => go('staff')}><Users /> Personal</button><button><Settings2 /> Configuración</button>
  </nav><div className="side-profile"><span>AM</span><div><b>Andrés Mejía</b><small>Administrador</small></div><button onClick={logout}><LogOut /></button></div></aside><main className="admin-main"><header className="admin-top"><button className="mobile-menu"><Menu /></button><div><Search /><input placeholder="Buscar solicitudes..." /></div><button className="bell"><Bell /><span /></button><span className="today">Martes, 24 de junio de 2025</span></header>{children}</main></div>
}

function AdminDashboard({ go }: { go: (v: View) => void }) {
  return <div className="admin-content"><div className="admin-welcome"><div><span className="eyebrow">PANEL ADMINISTRATIVO</span><h1>Buenos días, Andrés</h1><p>Estas son las solicitudes que requieren tu atención.</p></div><Button><CalendarDays /> Ver calendario</Button></div>
    <div className="stats-grid"><article><span className="stat-icon amber"><Clock3 /></span><div><small>Solicitudes pendientes</small><b>3</b><em>Requieren revisión</em></div></article><article><span className="stat-icon green"><Check /></span><div><small>Aprobadas este mes</small><b>28</b><em>+12% vs. mes anterior</em></div></article><article><span className="stat-icon blue"><CalendarDays /></span><div><small>Reservas esta semana</small><b>16</b><em>En 4 escenarios</em></div></article><article><span className="stat-icon slate"><Trophy /></span><div><small>Escenarios activos</small><b>3/4</b><em>1 inactivo</em></div></article></div>
    <section className="admin-card"><div className="admin-card-head"><div><h2>Solicitudes pendientes <span>3</span></h2><p>Ordenadas por antigüedad · las más antiguas primero</p></div><div><Button variant="secondary"><Filter /> Filtrar</Button><Button variant="secondary">Exportar</Button></div></div>
      <div className="table-wrap"><table><thead><tr><th>Código</th><th>Solicitante</th><th>Escenario</th><th>Fecha y franja</th><th>Uso</th><th>Participantes</th><th>Solicitud</th><th /></tr></thead><tbody>{pending.map(p => <tr key={p.code} onClick={() => go('admin-detail')}><td><b className="green-text">{p.code}</b></td><td><b>{p.user}</b><small>{p.club}</small></td><td>{p.place}</td><td><b>{p.date}</b><small>{p.time}</small></td><td>{p.use}</td><td><Users /> {p.people}</td><td><Badge status="Pendiente" /><small>{p.ago}</small></td><td><ChevronRight /></td></tr>)}</tbody></table></div>
    </section>
  </div>
}

function AdminDetail({ go, toast }: { go: (v: View) => void; toast: (s: string) => void }) {
  const [modal, setModal] = useState<'approve' | 'reject' | null>(null)
  return <div className="admin-content"><button className="back" onClick={() => go('admin')}><ArrowLeft /> Volver a solicitudes</button><div className="detail-head"><div><span className="eyebrow">SOLICITUD SGR-2851</span><h1>Detalle de solicitud</h1><p>Recibida el 24 de junio de 2025 a las 08:42</p></div><Badge status="Pendiente" /></div>
    <div className="detail-layout"><section className="admin-card detail-card"><h3>Información de la reserva</h3><div className="summary-place large"><span><Trophy /></span><div><b>Cancha de fútbol 1</b><small>Unidad Deportiva Atanasio Girardot</small></div></div><div className="detail-grid"><div><small>Fecha</small><b><CalendarDays /> Miércoles, 25 de junio</b></div><div><small>Horario</small><b><Clock3 /> 08:00 – 09:00</b></div><div><small>Tipo de uso</small><b><Dumbbell /> Entrenamiento</b></div><div><small>Participantes</small><b><Users /> 18 personas</b></div></div><div className="observations"><small>OBSERVACIONES</small><p>Entrenamiento regular del equipo juvenil. Llevaremos nuestros propios implementos deportivos.</p></div></section>
      <aside className="admin-card applicant"><h3>Solicitante</h3><div className="applicant-head"><span>ML</span><div><b>Mariana López Gómez</b><small>CC 1032456789</small></div></div><dl><div><dt>Correo</dt><dd>mariana.lopez@email.com</dd></div><div><dt>Teléfono</dt><dd>301 456 7890</dd></div><div><dt>Club / Institución</dt><dd>Club Deportivo Halcones</dd></div></dl></aside></div>
    <div className="decision-bar"><div><ShieldCheck /><span><b>Decisión administrativa</b><small>Verifica que la información sea correcta antes de continuar.</small></span></div><Button variant="danger" onClick={() => setModal('reject')}>Rechazar solicitud</Button><Button onClick={() => setModal('approve')}><Check /> Aprobar solicitud</Button></div>
    {modal && <div className="modal-backdrop"><div className="modal"><button className="modal-x" onClick={() => setModal(null)}><X /></button><div className={cn('modal-icon', modal === 'approve' ? 'success' : 'danger')}>{modal === 'approve' ? <Check /> : <X />}</div><h2>{modal === 'approve' ? '¿Aprobar esta solicitud?' : 'Rechazar solicitud'}</h2><p>{modal === 'approve' ? 'La franja quedará reservada y la solicitante recibirá una notificación.' : 'Indica el motivo. Esta información será enviada a la solicitante.'}</p>{modal === 'reject' && <label className="field"><span className="field-label">Motivo del rechazo *</span><textarea defaultValue="Escenario reservado para evento institucional" /><small className="char-count">48 / 300 · Mínimo 10 caracteres</small></label>}<div className="modal-actions"><Button variant="secondary" onClick={() => setModal(null)}>Volver</Button><Button variant={modal === 'approve' ? 'primary' : 'danger'} onClick={() => { toast(modal === 'approve' ? 'Solicitud aprobada correctamente' : 'Solicitud rechazada correctamente'); setModal(null); go('admin') }}>{modal === 'approve' ? 'Sí, aprobar' : 'Confirmar rechazo'}</Button></div></div></div>}
  </div>
}

function Scenarios({ toast }: { toast: (s: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [active, setActive] = useState([true,true,true,false])
  return <div className="admin-content"><div className="admin-welcome"><div><span className="eyebrow">CONFIGURACIÓN</span><h1>Gestión de escenarios</h1><p>Administra los espacios deportivos de tu unidad.</p></div><Button onClick={() => setEditing(true)}>+ Nuevo escenario</Button></div>
    <section className="admin-card"><div className="admin-card-head"><div><h2>Escenarios <span>4</span></h2><p>Unidad Deportiva Atanasio Girardot</p></div><Field label="" placeholder="Buscar escenario..." icon={<Search size={17} />} /></div><div className="scenario-admin-list">{scenarios.map((s,i) => <article key={s.name}><span className="scenario-icon"><s.icon /></span><div><h3>{s.name}</h3><p>{s.type} · Capacidad: {s.capacity} personas</p></div><Badge status={active[i] ? 'Activo' : 'Inactivo'} /><label className="toggle"><input type="checkbox" checked={active[i]} onChange={() => { const n=[...active]; n[i]=!n[i]; setActive(n); toast(n[i] ? 'Escenario activado' : 'Escenario inactivado') }} /><span /></label><Button variant="ghost" onClick={() => setEditing(true)}>Editar</Button></article>)}</div></section>
    {editing && <div className="drawer-backdrop"><aside className="drawer"><div className="drawer-head"><div><span className="eyebrow">ESCENARIO</span><h2>Editar escenario</h2></div><button onClick={() => setEditing(false)}><X /></button></div><div className="drawer-body"><Field label="Nombre del escenario *" value="Cancha de fútbol 1" /><Field label="Unidad deportiva" value="Unidad Deportiva Atanasio Girardot" readOnly /><div className="two-col"><SelectField label="Tipo *"><option>Fútbol 11</option></SelectField><Field label="Capacidad *" value="22" /></div><Field label="Zona / Barrio *" value="Laureles" /><label className="field"><span className="field-label">Descripción</span><textarea defaultValue="Cancha reglamentaria de grama natural con iluminación." /></label></div><div className="drawer-footer"><Button variant="secondary" onClick={() => setEditing(false)}>Cancelar</Button><Button onClick={() => { setEditing(false); toast('Escenario actualizado correctamente') }}>Guardar cambios</Button></div></aside></div>}
  </div>
}

function Schedule({ toast }: { toast: (s: string) => void }) {
  const [block, setBlock] = useState(false)
  return <div className="admin-content"><div className="admin-welcome"><div><span className="eyebrow">OPERACIÓN</span><h1>Horarios y bloqueos</h1><p>Configura la disponibilidad de tus escenarios.</p></div><Button onClick={() => setBlock(true)}>+ Bloquear franja</Button></div>
    <div className="schedule-admin-layout"><section className="admin-card hours"><div className="admin-card-head"><div><h2>Horario de operación</h2><p>Cancha de fútbol 1</p></div><Button variant="secondary">Guardar horario</Button></div>{['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'].map((d,i) => <div className="day-row" key={d}><label className="toggle"><input type="checkbox" defaultChecked={i<6} /><span /></label><b>{d}</b><input type="time" defaultValue="06:00" disabled={i===6} /><span>a</span><input type="time" defaultValue="22:00" disabled={i===6} />{i===6 && <small>Cerrado</small>}</div>)}</section>
    <section className="admin-card blockers"><div className="admin-card-head"><div><h2>Bloqueos programados</h2><p>Junio 2025</p></div><div className="legend"><Badge status="Bloqueada" /><Badge status="Aprobada" /></div></div><div className="mini-calendar"><div className="week-head">{['Lun','Mar','Mié','Jue','Vie'].map(d=><b key={d}>{d}</b>)}</div>{[23,24,25,26,27].map(n=><div className="calendar-col" key={n}><b>{n}</b>{n===25 && <span className="calendar-book">08:00 Reserva</span>}{n===26 && <button className="calendar-block" onClick={() => setBlock(true)}>14:00 Mantenimiento</button>}{n===27 && <span className="calendar-book">10:00 Reserva</span>}</div>)}</div><div className="block-list"><div><span className="block-color" /><div><b>Mantenimiento del césped</b><small>26 Jun · 14:00–17:00 · Cancha de fútbol 1</small></div><Button variant="ghost" onClick={() => toast('Bloqueo eliminado correctamente')}>Desbloquear</Button></div></div></section></div>
    {block && <div className="modal-backdrop"><div className="modal"><button className="modal-x" onClick={() => setBlock(false)}><X /></button><div className="modal-icon warning"><CalendarDays /></div><h2>Bloquear una franja</h2><p>El espacio no estará disponible para reservas durante este periodo.</p><SelectField label="Escenario *"><option>Cancha de fútbol 1</option></SelectField><div className="two-col"><Field label="Fecha *" value="26/06/2025" /><Field label="Horario *" value="14:00 – 17:00" /></div><Field label="Motivo *" value="Mantenimiento del césped" /><div className="modal-actions"><Button variant="secondary" onClick={() => setBlock(false)}>Cancelar</Button><Button onClick={() => { setBlock(false); toast('Franja bloqueada correctamente') }}>Confirmar bloqueo</Button></div></div></div>}
  </div>
}

function Staff({ toast }: { toast: (s: string) => void }) {
  const [confirm, setConfirm] = useState(false)
  const [denied, setDenied] = useState(false)
  if (denied) return <div className="admin-content permission-state"><div className="permission-icon"><LockKeyhole /></div><span className="eyebrow">ACCESO RESTRINGIDO</span><h1>Sin permisos</h1><p>No tienes permisos para realizar esta acción. Contacta al administrador principal de la plataforma.</p><Button variant="secondary" onClick={() => setDenied(false)}>Volver al formulario</Button></div>
  return <div className="admin-content"><div className="admin-welcome"><div><span className="eyebrow">ADMINISTRACIÓN DE ACCESO</span><h1>Registrar personal administrativo</h1><p>Crea un acceso y asigna la unidad deportiva correspondiente.</p></div><Button variant="secondary" onClick={() => setDenied(true)}><LockKeyhole /> Ver estado sin permisos</Button></div>
    <section className="admin-card staff-form"><div className="staff-note"><ShieldCheck /><div><b>Acceso institucional</b><p>La persona recibirá en su correo las instrucciones para activar la cuenta.</p></div></div><div className="two-col"><Field label="Documento de identidad *" placeholder="Ej. 1032456789" /><Field label="Correo institucional *" value="empleado1@sgred.com" /><Field label="Nombres *" placeholder="Nombres del empleado" /><Field label="Apellidos *" placeholder="Apellidos del empleado" /></div><label className="field"><span className="field-label">Unidad deportiva asignada *</span><span className="input-wrap"><Search size={17} /><input defaultValue="Unidad Deportiva Atanasio Girardot" /><ChevronDown size={17} /></span></label><div className="profile-actions"><Button variant="secondary">Cancelar</Button><Button onClick={() => setConfirm(true)}>Revisar y guardar <ArrowRight /></Button></div></section>
    {confirm && <div className="modal-backdrop"><div className="modal"><button className="modal-x" onClick={() => setConfirm(false)}><X /></button><div className="modal-icon success"><User /></div><h2>Confirmar nuevo acceso</h2><p>Verifica los datos antes de registrar a esta persona como personal administrativo.</p><div className="confirm-data"><span><small>Correo</small><b>empleado1@sgred.com</b></span><span><small>Unidad asignada</small><b>U.D. Atanasio Girardot</b></span></div><div className="modal-actions"><Button variant="secondary" onClick={() => setConfirm(false)}>Corregir datos</Button><Button onClick={() => { setConfirm(false); toast('Personal administrativo registrado correctamente') }}>Confirmar y guardar</Button></div></div></div>}
  </div>
}

export default function App() {
  const [view, setView] = useState<View>('home')
  const [signedIn, setSignedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [mobile, setMobile] = useState(false)

  const go = (v: View) => { setView(v); setMobile(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const toast = (message: string) => { setToastMessage(message); setTimeout(() => setToastMessage(''), 3200) }
  const login = (admin = false) => { setSignedIn(true); setIsAdmin(admin); go(admin ? 'admin' : 'home'); toast(admin ? 'Bienvenido al canal administrativo' : 'Sesión iniciada correctamente') }
  const logout = () => { setSignedIn(false); setIsAdmin(false); go('login'); toast('Tu sesión se cerró correctamente') }

  const authViews: View[] = ['login','register','recovery','new-password','internal-login']
  const adminViews: View[] = ['admin','admin-detail','scenarios','schedule','staff']
  const content = view === 'home' ? <Home go={go} /> : view === 'catalog' ? <Catalog go={go} /> : view === 'unit' ? <Unit go={go} /> :
    view === 'availability' ? <Availability go={go} /> : view === 'request' ? <Request go={go} /> : view === 'success' ? <Success go={go} /> :
    view === 'reservations' ? <Reservations go={go} toast={toast} /> : view === 'profile' ? <Profile go={go} toast={toast} logout={logout} /> : null

  return <div className="app">
    {authViews.includes(view) ? <AuthPage mode={view === 'internal-login' ? 'internal' : view as 'login'|'register'|'recovery'|'new-password'} go={go} login={login} /> :
    adminViews.includes(view) ? <AdminShell view={view} go={go} logout={logout}>{view === 'admin' ? <AdminDashboard go={go} /> : view === 'admin-detail' ? <AdminDetail go={go} toast={toast} /> : view === 'scenarios' ? <Scenarios toast={toast} /> : view === 'schedule' ? <Schedule toast={toast} /> : <Staff toast={toast} />}</AdminShell> :
    <><PublicHeader go={go} signedIn={signedIn} onMenu={() => setMobile(!mobile)} />{mobile && <div className="mobile-nav"><button onClick={() => go('home')}>Inicio</button><button onClick={() => go('catalog')}>Escenarios</button><button onClick={() => go('login')}>Iniciar sesión</button><button onClick={() => go('internal-login')}>Canal administrativo</button></div>}{content}<Footer /></>}
    {toastMessage && <div className="toast"><span><Check /></span><div><b>Operación exitosa</b><p>{toastMessage}</p></div><button onClick={() => setToastMessage('')}><X /></button></div>}
    {view === 'home' && <button className="admin-shortcut" onClick={() => go(isAdmin ? 'admin' : 'internal-login')}><ShieldCheck /> Canal administrativo</button>}
  </div>
}
