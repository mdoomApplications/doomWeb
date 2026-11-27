<Directory /var/www/html/mdservices>
    Options -Indexes
    AllowOverride None
    Require all granted
    DirectoryIndex index.html
    <FilesMatch "^\.">
        Require all denied
    </FilesMatch>
</Directory>
RewriteEngine On
RewriteCond %{HTTP_HOST} !^www\.mdoom\.net$ [NC]
RewriteRule ^ https://www.mdoom.net%{REQUEST_URI} [R=301,L,NE]
RewriteCond %{HTTPS} off
RewriteCond %{HTTP:X-Forwarded-Proto} !https [NC]
RewriteRule ^ https://www.mdoom.net%{REQUEST_URI} [R=301,L,NE]
ErrorDocument 404 /404.html
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-Frame-Options "DENY"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'"
<FilesMatch "\.(html|css|js)$">
    Header set Cache-Control "no-cache"
</FilesMatch>
