import type { CookieConsentConfig } from "vanilla-cookieconsent";
import { GOOGLE_ANALYTICS_ID } from "../../consts.ts";

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    gtag: (...args: any[]) => void;
  }
}

export const config: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box inline",
      position: "bottom left",
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
    },
    functionality: {},
    analytics: {
      services: {
        ga4: {
          label:
            '<a href="https://marketingplatform.google.com/about/analytics/terms/pl/" target="_blank">Google Analytics</a>',
          onAccept: () => {
            const script = document.createElement("script");
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
            script.async = true;

            document.head.appendChild(script);
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(...args: any[]) {
              window.dataLayer.push(arguments);
            };
            window.gtag("js", new Date());
            window.gtag("config", GOOGLE_ANALYTICS_ID);
          },
          onReject: () => {},
          cookies: [
            {
              name: /^_ga/,
            },
          ],
        },
      },
    },
  },
  language: {
    default: "en",
    autoDetect: "browser",
    translations: {
      en: {
        consentModal: {
          title: "Ciasteczka",
          description:
            'Strona używa plików cookies. Kliknięcie przycisku "Akceptuj" oznacza zgodę na wykorzystanie wszystkich plików cookie.\n',
          acceptAllBtn: "Akceptuj",
          acceptNecessaryBtn: "Odrzucam",
          showPreferencesBtn: "Zarządzaj opcjami",
          footer: '<a href="/polityka-prywatnosci">Polityka prywatności</a>',
        },
        preferencesModal: {
          title: "Ustawienia ciasteczek",
          acceptAllBtn: "Akceptuję wszystkie",
          acceptNecessaryBtn: "Odrzucam wszystkie",
          savePreferencesBtn: "Zapisz ustawienia",
          closeIconLabel: "Zamknij okno",
          serviceCounterLabel: "Serwisy",
          sections: [
            {
              description:
                "Używamy plików cookies, aby zapewnić podstawowe funkcjonalności strony oraz poprawić komfort użytkowania. " +
                "Możesz w każdej chwili wybrać, które kategorie plików cookies akceptujesz lub odrzucasz. " +
                "Więcej informacji na temat plików cookies i ochrony danych osobowych znajdziesz w naszej polityce prywatności.\n",
            },
            {
              title: 'Niezbędne ciasteczka <span class="pm__badge">Zawsze włączone</span>',
              description:
                "Te pliki cookies są niezbędne do prawidłowego funkcjonowania strony internetowej. Bez nich strona nie będzie działać poprawnie.",
              linkedCategory: "necessary",
            },
            {
              title: "Analityczne ciasteczka",
              description: "Te pliki cookie analizowanie ruchu na stronie i zbieranie statystyk.",
              linkedCategory: "analytics",
            },
          ],
        },
      },
    },
  },
};
