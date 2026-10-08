import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { StructuredData } from "../components/StructuredData";
import { useParallax, useReveal } from "../lib/parallax";
import {
  CLOSE_HOUR,
  FEATURED,
  GALLERY,
  HOURS,
  INSTAGRAM_PHOTOS,
  JSON_LD,
  MENU,
  OPEN_HOUR,
  REVIEWS,
  SITE,
  type MenuItem,
} from "../site-data";

export const Route = createFileRoute("/")({
  component: Index,
});

// The video markup is injected as raw HTML so the `muted` attribute is present
// in the server-rendered document. React omits it during SSR, which stops
// mobile browsers from autoplaying.
const HERO_VIDEO_HTML = `<video class="hero__video" autoplay muted loop playsinline preload="auto" poster="/assets/hero-poster.webp" aria-hidden="true" tabindex="-1" disablepictureinpicture>
  <source src="/assets/hero-720.mp4" type="video/mp4" media="(max-width: 760px)">
  <source src="/assets/hero-1080.mp4" type="video/mp4">
</video>`;

function Index() {
  useParallax();
  useReveal();

  return (
    <>
      <StructuredData json={JSON_LD} />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Prices />
        <Gallery />
        <Reviews />
        <Instagram />
        <Visit />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

function BookLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a className={className} href={SITE.bookingHref} target="_blank" rel="noopener">
      {children}
      <span className="sr-only"> (opens Fresha in a new tab)</span>
    </a>
  );
}

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wordmark ${className ?? ""}`}>
      <span className="wordmark__name">Elena</span>
      <span className="wordmark__sub">Beauty Expert</span>
    </span>
  );
}

function Stars() {
  return (
    <span className="stars" role="img" aria-label="Five out of five stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 1.6l2.5 5.4 5.9.7-4.4 4 1.2 5.8L10 14.6l-5.2 2.9L6 11.7l-4.4-4 5.9-.7z" />
        </svg>
      ))}
    </span>
  );
}

function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`masthead${solid ? " is-solid" : ""}`}>
      <a className="masthead__brand" href="#top" aria-label="Elena Beauty Expert, back to top">
        <Wordmark />
      </a>
      <nav className="masthead__nav" aria-label="Sections">
        <a href="#about">About</a>
        <a href="#prices">Treatments &amp; prices</a>
        <a href="#reviews">Reviews</a>
        <a href="#visit">Find us</a>
      </nav>
      <a className="masthead__phone" href={SITE.phoneHref}>
        {SITE.phoneDisplay}
      </a>
      <BookLink className="btn btn--small masthead__book">Book</BookLink>
    </header>
  );
}

function Hero() {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = mediaRef.current?.querySelector("video");
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) {
        video.pause();
      } else {
        video.muted = true;
        void video.play().catch(() => undefined);
      }
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__media-wrap" data-speed="0.3">
        <div ref={mediaRef} className="hero__media" dangerouslySetInnerHTML={{ __html: HERO_VIDEO_HTML }} />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__copy">
        <h1 id="hero-title">Elena Beauty Expert</h1>
        <p className="hero__lede">
          Facials, laser treatments and skin care by Elena, at her clinic in Woodford Green.
        </p>
        <div className="hero__actions">
          <BookLink className="btn btn--light">Book an appointment</BookLink>
          <a className="hero__call" href={SITE.phoneHref}>
            or call {SITE.phoneDisplay}
          </a>
        </div>
        <p className="hero__meta">
          <a href="#reviews">
            <Stars /> {SITE.rating} on Google
          </a>
          <span aria-hidden="true">|</span>
          <span>Mon to Sat, 9am to 5pm</span>
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <figure className="about__photo" data-reveal>
        <img
          src="/assets/elena-portrait.webp"
          alt="Elena standing at the entrance of her clinic"
          width={900}
          height={1027}
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="about__text" data-reveal>
        <h2 id="about-title">About Elena</h2>
        <p>
          Elena is a cosmetologist with a loyal local following. Many of her clients have been
          coming to her for years; one Google reviewer has been a regular since 2017.
        </p>
        <p>
          Every appointment starts with a consultation. Elena looks at your skin, asks what you
          want to change, and adjusts the treatment to suit you, including if your skin is
          sensitive or acne-prone. You leave with clear aftercare advice.
        </p>
        <p>
          The clinic offers facials including HydraFacial and PRP, carbon laser peels, laser hair
          and tattoo removal, face lifting massage and lipolytics.
        </p>
        <BookLink className="btn">Book an appointment</BookLink>
      </div>
    </section>
  );
}

function PriceRow({ item }: { item: MenuItem }) {
  return (
    <li className="price">
      <div className="price__head">
        <h4>{item.name}</h4>
        <p className="price__amount">
          {item.was ? (
            <s>
              <span className="sr-only">was </span>
              {item.was}
            </s>
          ) : null}
          <span>
            {item.was ? <span className="sr-only">now </span> : null}
            {item.price}
          </span>
        </p>
      </div>
      <p className="price__note">
        {item.duration ? <span className="price__time">{item.duration}</span> : null}
        {item.save ? <span className="price__save">{item.save}</span> : null}
        {item.note}
      </p>
    </li>
  );
}

function Prices() {
  return (
    <section className="prices section" id="prices" aria-labelledby="prices-title">
      <header className="prices__head">
        <h2 id="prices-title">Treatments &amp; prices</h2>
        <p>
          Prices as listed on Fresha. If you're not sure which treatment is right for you, call
          Elena on <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a> and she'll advise.
        </p>
      </header>

      <div className="featured" data-reveal>
        <h3 className="featured__title">Featured</h3>
        <ul>
          {FEATURED.map((f) => (
            <li key={f.name}>
              <h4>{f.name}</h4>
              <p>{f.note}</p>
              <p className="featured__foot">
                <span>{f.duration}</span>
                <span className="featured__price">{f.price}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      {MENU.map((g) => (
        <section
          key={g.id}
          id={`menu-${g.id}`}
          className={`menu-group${g.image ? " has-image" : ""}`}
          aria-labelledby={`menu-${g.id}-title`}
          data-reveal
        >
          <div className="menu-group__side">
            <h3 id={`menu-${g.id}-title`}>{g.title}</h3>
            {g.intro ? <p>{g.intro}</p> : null}
            {g.image ? (
              <img src={g.image.src} alt={g.image.alt} width={900} height={1100} loading="lazy" decoding="async" />
            ) : null}
          </div>
          <ul className="menu-group__list">
            {g.items.map((item) => (
              <PriceRow key={item.name} item={item} />
            ))}
          </ul>
        </section>
      ))}

      <div className="prices__book">
        <BookLink className="btn">See available times on Fresha</BookLink>
      </div>
    </section>
  );
}

// Live open/closed status in UK time, computed after hydration so the
// server-rendered HTML never disagrees with the visitor's clock.
function useOpenStatus() {
  const [state, setState] = useState<{ today: number; label: string; open: boolean } | null>(null);
  useEffect(() => {
    const compute = () => {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hourCycle: "h23",
      }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      const today = HOURS.findIndex((h) => h.short === get("weekday"));
      const mins = Number(get("hour")) * 60 + Number(get("minute"));
      const openDay = today >= 0 && HOURS[today].open !== null;
      const open = openDay && mins >= OPEN_HOUR * 60 && mins < CLOSE_HOUR * 60;
      let label: string;
      if (open) label = "Open now, until 5pm";
      else if (openDay && mins < OPEN_HOUR * 60) label = "Closed, opens at 9am today";
      else label = today === 5 || today === 6 ? "Closed, opens at 9am Monday" : "Closed, opens at 9am tomorrow";
      setState({ today, label, open });
    };
    compute();
    const id = window.setInterval(compute, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return state;
}

function Gallery() {
  return (
    <section className="gallery" aria-label="Inside the clinic">
      <ul className="gallery__grid">
        {GALLERY.map((g) => (
          <li key={g.src} className={`gallery__item gallery__item--${g.shape}`}>
            <figure>
              <img src={g.src} alt={g.alt} width={g.width} height={g.height} loading="lazy" decoding="async" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews section" id="reviews" aria-labelledby="reviews-title">
      <header className="reviews__head">
        <h2 id="reviews-title">Reviews</h2>
        <p>
          <Stars /> {SITE.rating} average from {SITE.reviewCount} reviews on Google
        </p>
      </header>
      <div className="reviews__grid">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="review" data-reveal>
            <blockquote>
              <p>“{r.quote}”</p>
            </blockquote>
            <figcaption>{r.name}</figcaption>
          </figure>
        ))}
      </div>
      <a className="text-link" href={SITE.mapsHref} target="_blank" rel="noopener">
        Read all reviews on Google
      </a>
    </section>
  );
}

function Instagram() {
  return (
    <section className="insta section" id="instagram" aria-labelledby="insta-title">
      <header className="insta__head">
        <h2 id="insta-title">On Instagram</h2>
        <a className="text-link" href={SITE.instagramHref} target="_blank" rel="noopener">
          Follow {SITE.instagramHandle}
        </a>
      </header>
      <ul className="insta__grid">
        {INSTAGRAM_PHOTOS.map((t) => (
          <li key={t.src}>
            <a href={SITE.instagramHref} target="_blank" rel="noopener" aria-label={`${t.alt}. See more on Instagram`}>
              <img src={t.src} alt="" width={600} height={600} loading="lazy" decoding="async" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Visit() {
  const status = useOpenStatus();
  return (
    <section className="visit section" id="visit" aria-labelledby="visit-title">
      <div className="visit__info">
        <h2 id="visit-title">Find us</h2>
        <dl className="visit__facts">
          <div>
            <dt>Address</dt>
            <dd>
              {SITE.street}, {SITE.area}
              <br />
              {SITE.locality} {SITE.postcode}
              <br />
              <a className="text-link" href={SITE.directionsHref} target="_blank" rel="noopener">
                Get directions
              </a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
            </dd>
          </div>
          <div>
            <dt>Opening hours</dt>
            <dd>
              {status ? (
                <p className={`open-status${status.open ? " is-open" : ""}`} aria-live="polite">
                  {status.label}
                </p>
              ) : null}
              <table className="hours">
                <tbody>
                  {HOURS.map((h, i) => (
                    <tr key={h.day} className={status?.today === i ? "is-today" : undefined}>
                      <th scope="row">{h.day}</th>
                      <td>{h.open ?? "Closed"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </dd>
          </div>
        </dl>
        <BookLink className="btn">Book an appointment</BookLink>
      </div>
      <figure className="visit__photo" data-reveal>
        <img
          src="/assets/arch-lounge.webp"
          alt="The waiting area, with the backlit Elena Beauty Expert sign above a velvet sofa"
          width={760}
          height={1317}
          loading="lazy"
          decoding="async"
        />
      </figure>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <Wordmark className="wordmark--footer" />
        <p>
          {SITE.street}, {SITE.locality} {SITE.postcode}
        </p>
      </div>
      <ul className="footer__links">
        <li>
          <BookLink>Book online</BookLink>
        </li>
        <li>
          <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
        </li>
        <li>
          <a href={SITE.instagramHref} target="_blank" rel="noopener">
            Instagram
          </a>
        </li>
        <li>
          <a href={SITE.directionsHref} target="_blank" rel="noopener">
            Directions
          </a>
        </li>
      </ul>
      <p className="footer__legal">
        © {new Date().getFullYear()} Elena Beauty Expert. Mon to Sat, 9am to 5pm. Closed Sunday.
      </p>
    </footer>
  );
}

// Phones only: a slim bar with booking and calling once the hero is out of view.
function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const visit = document.getElementById("visit");
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const atVisit = visit ? visit.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
      setShow(pastHero && !atVisit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`mobile-bar${show ? " is-shown" : ""}`} aria-hidden={!show}>
      <a className="mobile-bar__call" href={SITE.phoneHref} tabIndex={show ? 0 : -1}>
        Call
      </a>
      <a className="mobile-bar__book" href={SITE.bookingHref} target="_blank" rel="noopener" tabIndex={show ? 0 : -1}>
        Book an appointment
        <span className="sr-only"> (opens Fresha in a new tab)</span>
      </a>
    </div>
  );
}
