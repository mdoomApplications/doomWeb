# MDServices

Osobní prezentace Michala Důma, IT konzultanta a vývojáře. Značka MDServices, kontakt info@mdoom.net. Česká verze `/`, anglická `/en/`.

## Soubory a provoz

Statický web je v `public/`. Nepotřebuje build ani databázi. Písma jsou lokální (Inter a IBM Plex Mono). Texty jsou součástí HTML, stránky fungují i bez JavaScriptu; JavaScript ovládá mobilní navigaci a volbu analytiky. Google Analytics 4 se načítá pouze po souhlasu návštěvníka. Web nemá kontaktní formulář; kontakt otevírá e-mailovou aplikaci.

Repozitář na serveru: `/home/ad/web/doomWeb`. Publikovaná kopie: `/home/ad/web/src/mdservices`, dostupná ve stávajícím kontejneru `web-web-1` jako `/var/www/html/mdservices`. Publikuje se pouze obsah `public/`, takže Git a provozní soubory nejsou ve webovém kořeni.

Konfigurace Apache: `ops/011-mdservices.conf` a `ops/mdservices-common.inc`, instalované do `/home/ad/web/apache_config/`. Vhost je aktivovaný pomocí `a2ensite 011-mdservices`. Nový mount ani restart kontejneru nejsou potřeba. TLS pro veřejnou doménu ukončuje stávající nginx proxy; interní HTTPS origin používá stávající serverový certifikát. Zachovat HTTP Host a X-Forwarded-Proto při proxy průchodu. Hlavní adresa je https://www.mdoom.net/. Holá doména mdoom.net má samostatný záznam v Nginx Proxy Manageru se scheme http, cílem 192.168.3.100 a portem 80. Apache ji přesměrovává HTTP 301 na https://www.mdoom.net/ se zachováním cesty. Ověřeno pro HTTP i HTTPS, anglickou verzi a stránku služby; cílová stránka vrací 200.

## Úpravy a nasazení

1. Upravit obě jazykové verze a případné sdílené soubory v `public/assets/`.
2. Zkontrolovat změny, oba jazyky, mobilní navigaci, odkazy a přetečení rozvržení.
3. Zkopírovat obsah `public/` do `/home/ad/web/src/mdservices/` pomocí `rsync -a public/ /home/ad/web/src/mdservices/`.
4. Při změně konfigurace zkopírovat oba soubory z `ops/` do `/home/ad/web/apache_config/`, spustit `docker exec web-web-1 apachectl configtest` a teprve po úspěchu `docker exec web-web-1 apachectl -k graceful`.
5. Ověřit veřejné HTTPS stránky a přesměrování, commitnout a pushnout do `main`.

Původní obsah repozitáře je dohledatelný v historii Git. Ostatní weby mají vlastní vhosty a adresáře.

## SEO a analytika (27. 11. 2026)

- Služby mají vlastní stránky v CZ a EN: vývoj aplikací s AI, integrace a automatizace, síťová architektura. Každá stránka má vlastní title, description, canonical, vzájemné hreflang odkazy, strukturovaná data a interní odkazy. Sitemap obsahuje 10 URL včetně obou stránek soukromí.
- Search Console: URL-prefix služba `https://www.mdoom.net/`, ověřené vlastnictví metaznačkou. Sitemap `https://www.mdoom.net/sitemap.xml` byla odeslána. Přijetí sitemapy není potvrzením indexace každé URL; počáteční stav lze kontrolovat v GSC a analytickém dashboardu.
- GA4: služba `566039954`, stream `16427690521`, měřicí ID `G-FQTDFZ74VQ`; veřejná identifikace je v `ops/google-services.json` (žádná hesla ani OAuth tokeny).
- `public/assets/analytics.js` načítá GA4 až po povolení analytiky. Do té doby neposílá Googlu žádné požadavky. Odmítnutí i odvolání souhlasu vypíná měření; volba se uchovává 180 dní. Nastavení je dostupné v patičce. Google Signals a reklamní personalizace jsou vypnuté. Retence dat uživatelů i událostí je dva měsíce bez resetování novou aktivitou.
- Události: `page_view`, `contact_click` (GA4 key event, kliknutí na mailto, nikoli odeslaná zpráva), `project_click` (kliknutí na referenci). Neodesílá se obsah e-mailu.
- Dashboard na serveru 100: `/home/ad/web/analytics`, https://analytics.mdoom.net/. Projekt `mdservices` používá vlastní GA4 a GSC data; má deník, podrobný filtr webu a je zahrnutý ve stávající automatické obnově v 06:00 Europe/Prague. Kontaktní kliknutí se zobrazují jako `email_clicks`.
- Nová GA4 služba nemá historickou návštěvnost. Denní reporty končí včerejškem. Nové záznamy vyhledávání se objeví po zpracování Googlem.
