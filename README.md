# MDServices

Osobní prezentace Michala Důma, IT konzultanta a vývojáře. Značka MDServices, kontakt info@mdoom.net. Česká verze `/`, anglická `/en/`.

## Soubory a provoz

Statický web je v `public/`. Nepotřebuje build, databázi ani externí služby. Písma jsou lokální (Inter a IBM Plex Mono). Texty jsou součástí HTML, stránky fungují i bez JavaScriptu; JavaScript ovládá pouze mobilní navigaci. Web nepoužívá cookies, analytiku ani kontaktní formulář; kontakt otevírá e-mailovou aplikaci.

Repozitář na serveru: `/home/ad/web/doomWeb`. Publikovaná kopie: `/home/ad/web/src/mdservices`, dostupná ve stávajícím kontejneru `web-web-1` jako `/var/www/html/mdservices`. Publikuje se pouze obsah `public/`, takže Git a provozní soubory nejsou ve webovém kořeni.

Konfigurace Apache: `ops/011-mdservices.conf` a `ops/mdservices-common.inc`, instalované do `/home/ad/web/apache_config/`. Vhost je aktivovaný pomocí `a2ensite 011-mdservices`. Nový mount ani restart kontejneru nejsou potřeba. TLS pro veřejnou doménu ukončuje stávající nginx proxy; interní HTTPS origin používá stávající serverový certifikát. Zachovat HTTP Host a X-Forwarded-Proto při proxy průchodu. Hlavní adresa je https://www.mdoom.net/. Apache je připravený přesměrovat holou doménu na www se zachováním cesty. Veřejná nginx proxy ale nyní pro https://mdoom.net/ vrací vlastní 404 ještě před Apache; pro fungování holé domény je potřeba přidat tuto doménu také do konfigurace vstupní proxy. www.mdoom.net v obou jazycích funguje přes veřejné HTTPS.

## Úpravy a nasazení

1. Upravit obě jazykové verze a případné sdílené soubory v `public/assets/`.
2. Zkontrolovat změny, oba jazyky, mobilní navigaci, odkazy a přetečení rozvržení.
3. Zkopírovat obsah `public/` do `/home/ad/web/src/mdservices/` pomocí `rsync -a public/ /home/ad/web/src/mdservices/`.
4. Při změně konfigurace zkopírovat oba soubory z `ops/` do `/home/ad/web/apache_config/`, spustit `docker exec web-web-1 apachectl configtest` a teprve po úspěchu `docker exec web-web-1 apachectl -k graceful`.
5. Ověřit veřejné HTTPS stránky a přesměrování, commitnout a pushnout do `main`.

Původní obsah repozitáře je dohledatelný v historii Git. Ostatní weby mají vlastní vhosty a adresáře.
