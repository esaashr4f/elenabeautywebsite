import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { StructuredData } from "../components/StructuredData";
import { useParallax, useReveal } from "../lib/parallax";
import { JSON_LD, REVIEWS, SITE, TREATMENTS } from "../site-data";

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
        <Treatments />
        <Clinic />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </>
  );
}

function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M19 52V28a13 13 0 0 1 26 0v24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M13 52h38" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M32 29c-4.6 6.2-6.8 9.4-6.8 12.4a6.8 6.8 0 0 0 13.6 0c0-3-2.2-6.2-6.8-12.4z"
        fill="var(--blush)"
      />
      <path d="M45 24c5-1 8 1 9 5-5 1-8-1-9-5z" fill="var(--sage)" />
    </svg>
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
      <a className="brand" href="#top" aria-label="Elena Beauty Expert, back to top">
        <Mark className="brand__mark" />
        <span className="brand__word">
          Elena <em>Beauty Expert</em>
        </span>
      </a>
      <nav className="masthead__nav" aria-label="Sections">
        <a href="#about">About</a>
        <a href="#treatments">Treatments</a>
        <a href="#reviews">Reviews</a>
        <a href="#visit">Visit</a>
      </nav>
      <a className="arch-call" href={SITE.phoneHref}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
        </svg>
        <span className="arch-call__label">Call</span>
        <span className="arch-call__num">{SITE.phoneDisplay}</span>
      </a>
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
      <div className="hero__layer hero__layer--back" data-speed="0.38">
        <div ref={mediaRef} className="hero__media" dangerouslySetInnerHTML={{ __html: HERO_VIDEO_HTML }} />
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <img
        className="hero__sprig"
        src="/assets/eucalyptus.webp"
        alt=""
        aria-hidden="true"
        width={700}
        height={862}
        data-speed="-0.22"
      />
      <div className="hero__copy" data-speed="0.14">
        <p className="hero__eyebrow">
          <span>Beauty salon</span>
          <span aria-hidden="true">·</span>
          <span>Woodford Green</span>
        </p>
        <h1 id="hero-title" className="hero__title">
          <span className="hero__name">Elena Beauty Expert</span>
          <span className="hero__line">
            Skin, <em>tailored</em>
          </span>
          <span className="hero__line">to you.</span>
        </h1>
        <p className="hero__lede">
          Personalised facials, laser and light treatments and massage, in a calm and spotless
          clinic on Warley Road.
        </p>
        <div className="hero__actions">
          <a className="dew-call" href={SITE.phoneHref}>
            <span className="dew-call__drop" aria-hidden="true" />
            <span className="dew-call__text">
              Call to book <strong>{SITE.phoneDisplay}</strong>
            </span>
          </a>
          <a className="thread-link" href={SITE.directionsHref} target="_blank" rel="noopener">
            Get directions
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
        <a className="rating-chip" href="#reviews">
          <Stars />
          <span>
            <strong>{SITE.rating}</strong> from {SITE.reviewCount} Google reviews
          </span>
        </a>
      </div>
      <a className="hero__cue" href="#about" aria-label="Scroll to About">
        <span />
      </a>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about__dew" data-speed="0.3" aria-hidden="true">
        <img src="/assets/dew.webp" alt="" width={1600} height={895} loading="lazy" decoding="async" />
      </div>
      <div className="about__inner">
        <figure className="about__portrait" data-reveal>
          <div className="arch">
            <img
              src="/assets/elena-portrait.webp"
              alt="Elena standing in the softly lit entrance of her clinic"
              width={900}
              height={1028}
              loading="lazy"
              decoding="async"
            />
          </div>
          <img
            className="about__sprig"
            src="/assets/eucalyptus.webp"
            alt=""
            aria-hidden="true"
            width={700}
            height={862}
            loading="lazy"
            data-speed="-0.18"
          />
          <figcaption>Elena, in the clinic on Warley Road</figcaption>
        </figure>
        <div className="about__text" data-reveal>
          <p className="kicker">About</p>
          <h2 id="about-title" className="display">
            Meet <em>Elena</em>
          </h2>
          <p>
            Elena is the cosmetologist behind Elena Beauty Expert. Her approach is simple: listen
            first, then tailor every treatment to the person in the chair, never one routine for
            everyone.
          </p>
          <p>
            Many of her clients have been coming back for years, and the reviews speak of skin
            that has changed with her care. The clinic is designed to slow you down, with soft
            light, warm textures and a spotless treatment room.
          </p>
          <ul className="tenets">
            <li>
              <span>01</span>Consultation first
            </li>
            <li>
              <span>02</span>Treatments tailored to you
            </li>
            <li>
              <span>03</span>Aftercare you can follow
            </li>
          </ul>
          <blockquote className="pull">
            <p>“I simply said “glass skin” and that’s exactly what I left with!”</p>
            <cite>From a Google review</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section className="treatments" id="treatments" aria-labelledby="treatments-title">
      <header className="treatments__head" data-reveal>
        <p className="kicker">Treatments</p>
        <h2 id="treatments-title" className="display">
          Considered care,
          <br />
          <em>face and body</em>
        </h2>
        <p>
          Every treatment starts with a conversation about your skin. Call to talk through what is
          right for you, and for prices and availability.
        </p>
      </header>
      <ol className="treatments__list">
        {TREATMENTS.map((t, i) => (
          <li key={t.id} className={`ritual${i % 2 ? " ritual--flip" : ""}`} data-reveal>
            <div className="ritual__frame">
              <img
                src={t.image}
                alt={t.alt}
                width={900}
                height={1125}
                loading="lazy"
                decoding="async"
                data-speed="0.12"
              />
            </div>
            <div className="ritual__text">
              <span className="ritual__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t.name}</h3>
              <p className="ritual__line">{t.line}</p>
              <p>{t.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Clinic() {
  return (
    <section className="clinic" aria-labelledby="clinic-title">
      <div className="clinic__stage">
        <div className="clinic__shot clinic__shot--room" data-speed="0.24">
          <img
            src="/assets/clinic-room.webp"
            alt="The treatment room with a fur-draped bed, skylight and shelves of skincare"
            width={1400}
            height={867}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="clinic__shot clinic__shot--hands" data-speed="-0.12">
          <img
            src="/assets/elena-treatment.webp"
            alt="Elena performing a laser facial on a client wearing a mask and eye protection"
            width={1400}
            height={817}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="clinic__caption" data-speed="0.06" data-reveal>
          <p className="kicker">Inside the clinic</p>
          <h2 id="clinic-title" className="display">
            Calm, considered,
            <br />
            <em>spotless.</em>
          </h2>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-title">
      <header className="reviews__head" data-reveal>
        <p className="kicker">Reviews</p>
        <h2 id="reviews-title" className="display">
          In their <em>words</em>
        </h2>
        <div className="reviews__score">
          <span className="reviews__big">{SITE.rating}</span>
          <span>
            <Stars />
            <span className="reviews__count">{SITE.reviewCount} reviews on Google</span>
          </span>
        </div>
      </header>
      <div className="reviews__grid">
        {REVIEWS.map((r, i) => (
          <figure key={r.name} className={`note note--${i + 1}`} data-reveal>
            <Stars />
            <blockquote>
              <p>{r.quote}</p>
            </blockquote>
            <figcaption>
              <strong>{r.name}</strong>
              <span>{r.meta}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <a className="thread-link thread-link--dark" href={SITE.mapsHref} target="_blank" rel="noopener">
        Read every review on Google
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
      </a>
    </section>
  );
}

function Visit() {
  return (
    <section className="visit" id="visit" aria-labelledby="visit-title">
      <div className="visit__bg" data-speed="0.32" aria-hidden="true">
        <img src="/assets/hero-still.webp" alt="" width={1344} height={752} loading="lazy" decoding="async" />
      </div>
      <div className="visit__card" data-reveal>
        <p className="kicker">Visit</p>
        <h2 id="visit-title" className="display">
          Find us in <em>Woodford Green</em>
        </h2>
        <dl className="visit__facts">
          <div>
            <dt>Address</dt>
            <dd>
              <a href={SITE.directionsHref} target="_blank" rel="noopener">
                {SITE.street}, {SITE.area},
                <br />
                {SITE.locality} {SITE.postcode}
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
            <dt>Hours</dt>
            <dd>
              Thursday: opens 9am
              <br />
              <span className="muted">For other days and times, please call ahead.</span>
            </dd>
          </div>
          <div>
            <dt>Plus code</dt>
            <dd>{SITE.plusCode}</dd>
          </div>
        </dl>
        <div className="visit__actions">
          <a className="arch-cta" href={SITE.directionsHref} target="_blank" rel="noopener">
            <span>Open directions in Google Maps</span>
          </a>
          <a className="ring-call" href={SITE.phoneHref}>
            <span className="ring-call__ring" aria-hidden="true" />
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <Mark className="footer__mark" />
        <p className="footer__word">
          Elena <em>Beauty Expert</em>
        </p>
        <p className="muted">Beauty salon in Woodford Green</p>
      </div>
      <div className="footer__col">
        <h2>Contact</h2>
        <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
        <a href={SITE.directionsHref} target="_blank" rel="noopener">
          {SITE.street}, {SITE.locality} {SITE.postcode}
        </a>
      </div>
      <div className="footer__col">
        <h2>Explore</h2>
        <a href="#about">About Elena</a>
        <a href="#treatments">Treatments</a>
        <a href="#reviews">Reviews</a>
        <a href="#visit">Visit</a>
      </div>
      <p className="footer__legal">© {new Date().getFullYear()} Elena Beauty Expert</p>
    </footer>
  );
}
