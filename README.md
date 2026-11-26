# Spielhalle – App-Wrapper für https://familien-kopf.de

## 1. Website vorbereiten (Offline-Modus)
- `site/sw.js` ins Hauptverzeichnis der Website hochladen (-> https://familien-kopf.de/sw.js)
- Den Code aus `site/register-sw.html` in jede Spielseite vor `</body>` einfügen

## 2. Apps bauen
1. Diesen Ordner als neues GitHub-Repository hochladen
2. Tab "Actions" -> "Build APK und IPA" -> "Run workflow"
3. Unter "Artifacts" spielhalle-apk und spielhalle-ipa-unsigned herunterladen

APK: direkt auf Android installierbar (Debug-Build).
IPA: unsigniert, zum Installieren mit Apple-Developer-Account signieren
(Xcode, Sideloadly) oder per TestFlight/App Store veröffentlichen.

Icons und Splash-Screens werden aus `assets/` automatisch erzeugt.
