import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import siteCss from "../site.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
// Page metadata (browser <title>/favicon + social og: tags) committed into the
// repo and read at BUILD time — no runtime fetch.
import appMetaJson from "../app-meta.json";
import { SITE } from "../site-data";

declare const __HF_DESIGN_INSPECTOR__: boolean;

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;

// Social crawlers need absolute URLs, so root-relative asset paths are
// resolved against the canonical site origin.
function absolute(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/")) return SITE.url + value;
  return value;
}

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? SITE.name;
  const description = meta.og_description ?? SITE.description;
  const ogImage = absolute(meta.og_image_url);
  const favicon = meta.favicon_url ?? "/favicon.svg";

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#3A2E27" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "geo.region", content: "GB-RDB" },
      { name: "geo.placename", content: "Woodford Green" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE.url + "/" },
      { property: "og:locale", content: "en_GB" },
      { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { property: "og:image:alt", content: "Elena Beauty Expert, beauty salon in Woodford Green" },
            { name: "twitter:image", content: ogImage },
          ]
        : []),
    ],
    links: [
      { rel: "canonical", href: SITE.url + "/" },
      { rel: "preload", href: "/fonts/cormorant.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" as const },
      { rel: "preload", href: "/fonts/jost.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" as const },
      { rel: "preload", href: "/assets/hero-poster.webp", as: "image", fetchPriority: "high" as const },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: siteCss },
      { rel: "icon", href: favicon, type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  };
}

function NotFoundComponent() {
  return (
    <main className="fallback">
      <p className="fallback__code">404</p>
      <h1>This page has drifted away.</h1>
      <a href="/">Return to Elena Beauty Expert</a>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportHiggsfieldError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main className="fallback">
      <h1>This page didn't load.</h1>
      <p>Please refresh, or call us on {SITE.phoneDisplay}.</p>
      <button
        type="button"
        onClick={() => {
          router.invalidate();
          reset();
        }}
      >
        Try again
      </button>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" style={{ colorScheme: "light" }}>
      <head>
        <HeadContent />
      </head>
      <body className="site">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) {
      return;
    }

    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => {
        installHiggsfieldDesignInspector();
      })
      .catch((error) => {
        reportHiggsfieldError(
          error instanceof Error ? error : new Error("Failed to load design inspector"),
          {
            boundary: "higgsfield_design_inspector_import",
          },
        );
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
