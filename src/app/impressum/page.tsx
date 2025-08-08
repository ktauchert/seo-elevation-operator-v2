"use client";
import React from "react";

const ImpressumPage = () => {
  const [tab, setTab] = React.useState("impressum");

  const active_tab = "bg-slate-400 text-slate-900";
  const inactive_tab =
    "bg-slate-600 text-slate-400 shadow-inner shadow-slate-900 hover:bg-slate-500";

  return (
    <section id="impressum" className="my-20 h-full pb-10">
      <div className="w-full flex">
        <button
          className={`flex-1 p-3 rounded-t-md text-2xl  ${
            tab === "impressum" ? active_tab : inactive_tab
          }`}
          onClick={() => setTab("impressum")}
        >
          Impressum
        </button>
        <button
          className={`flex-1 p-3 rounded-t-md text-2xl  ${
            tab === "privacy" ? active_tab : inactive_tab
          }`}
          onClick={() => setTab("privacy")}
        >
          Privacy
        </button>
      </div>
      <div className="w-full p-5 bg-slate-400">
        <div
          id="impressum"
          className={`tab ${tab === "impressum" ? "block" : "hidden"}`}
        >
          <p>
            Wir informieren Sie nachfolgend gemäß den gesetzlichen Vorgaben des
            Datenschutzrechts (insb. gemäß BDSG n.F. und der europäischen
            Datenschutz-Grundverordnung ‚DS-GVO‘) über die Art, den Umfang und
            Zweck der Verarbeitung personenbezogener Daten durch unser
            Unternehmen. Diese Datenschutzerklärung gilt auch für unsere
            Websites und Sozial-Media-Profile. Bezüglich der Definition von
            Begriffen wie etwa „personenbezogene Daten“ oder „Verarbeitung“
            verweisen wir auf Art. 4 DS-GVO.
          </p>
          <strong>Name und Kontaktdaten des / der Verantwortlichen</strong>
          <br />
          Unser/e Verantwortliche/r (nachfolgend „Verantwortlicher“) i.S.d. Art.
          4 Zif. 7 DS-GVO ist:
          <br />
          <br />
          Karsten Tauchert
          <br />
          c/o Block Services, Stuttgarter Str. 106
          <br />
          70736 Fellbach
          <br />
          E-Mail-Adresse: webmaster@ktauchert.de
          <br />
          <br />
          <strong>Datenschutzbeauftragte/r</strong>
          <br />
          webmaster@ktauchert.de
          <br />
          <br />
          <strong>
            Datenarten, Zwecke der Verarbeitung und Kategorien betroffener
            Personen
          </strong>
          <br />
          <p>
            Nachfolgend informieren wir Sie über Art, Umfang und Zweck der
            Erhebung, Verarbeitung und Nutzung personenbezogener Daten.
          </p>
          <strong>1. Arten der Daten, die wir verarbeiten</strong>
          <br />
          Nutzungsdaten (Zugriffszeiten, besuchte Websites etc.), Bestandsdaten
          (Name, Adresse etc.), Kontaktdaten (Telefonnummer, E-Mail, Fax etc.),
          Inhaltsdaten (Texteingaben, Videos, Fotos etc.), Kommunikationsdaten
          (IP-Adresse etc.), <br />
          <br />
          <strong>
            2. Zwecke der Verarbeitung nach Art. 13 Abs. 1 c) DS-GVO
          </strong>
          <br />
          Nutzererfahrung verbessern, <br />
          <br />
          <strong>
            3. Kategorien der betroffenen Personen nach Art. 13 Abs. 1 e) DS-GVO
          </strong>
          <br />
          Besucher/Nutzer der Website, Kunden, <br />
          <br />
          <p>
            Die betroffenen Personen werden zusammenfassend als „Nutzer“
            bezeichnet.
          </p>
          <br />
          <strong>
            Rechtsgrundlagen der Verarbeitung personenbezogener Daten
          </strong>
          <p>
            Nachfolgend Informieren wir Sie über die Rechtsgrundlagen der
            Verarbeitung personenbezogener Daten:
          </p>
          <ol>
            <li>
              Wenn wir Ihre Einwilligung für die Verarbeitung personenbezogenen
              Daten eingeholt haben, ist Art. 6 Abs. 1 S. 1 lit. a) DS-GVO
              Rechtsgrundlage.
            </li>
            <li>
              Ist die Verarbeitung zur Erfüllung eines Vertrags oder zur
              Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Ihre
              Anfrage hin erfolgen, so ist Art. 6 Abs. 1 S. 1 lit. b) DS-GVO
              Rechtsgrundlage.
            </li>
            <li>
              Ist die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung
              erforderlich, der wir unterliegen (z.B. gesetzliche
              Aufbewahrungspflichten), so ist Art. 6 Abs. 1 S. 1 lit. c) DS-GVO
              Rechtsgrundlage.
            </li>
            <li>
              Ist die Verarbeitung erforderlich, um lebenswichtige Interessen
              der betroffenen Person oder einer anderen natürlichen Person zu
              schützen, so ist Art. 6 Abs. 1 S. 1 lit. d) DS-GVO
              Rechtsgrundlage.
            </li>
            <li>
              Ist die Verarbeitung zur Wahrung unserer oder der berechtigten
              Interessen eines Dritten erforderlich und überwiegen diesbezüglich
              Ihre Interessen oder Grundrechte und Grundfreiheiten nicht, so ist
              Art. 6 Abs. 1 S. 1 lit. f) DS-GVO Rechtsgrundlage.
            </li>
          </ol>
          <br />
          <strong>
            Weitergabe personenbezogener Daten an Dritte und Auftragsverarbeiter
          </strong>
          <p>
            Ohne Ihre Einwilligung geben wir grundsätzlich keine Daten an Dritte
            weiter. Sollte dies doch der Fall sein, dann erfolgt die Weitergabe
            auf der Grundlage der zuvor genannten Rechtsgrundlagen z.B. bei der
            Weitergabe von Daten an Online-Paymentanbieter zur Vertragserfüllung
            oder aufgrund gerichtlicher Anordnung oder wegen einer gesetzlichen
            Verpflichtung zur Herausgabe der Daten zum Zwecke der
            Strafverfolgung, zur Gefahrenabwehr oder zur Durchsetzung der Rechte
            am geistigen Eigentum.
            <br />
            Wir setzen zudem Auftragsverarbeiter (externe Dienstleister z.B. zum
            Webhosting unserer Websites und Datenbanken) zur Verarbeitung Ihrer
            Daten ein. Wenn im Rahmen einer Vereinbarung zur
            Auftragsverarbeitung an die Auftragsverarbeiter Daten weitergegeben
            werden, erfolgt dies immer nach Art. 28 DS-GVO. Wir wählen dabei
            unsere Auftragsverarbeiter sorgfältig aus, kontrollieren diese
            regelmäßig und haben uns ein Weisungsrecht hinsichtlich der Daten
            einräumen lassen. Zudem müssen die Auftragsverarbeiter geeignete
            technische und organisatorische Maßnahmen getroffen haben und die
            Datenschutzvorschriften gem. BDSG n.F. und DS-GVO einhalten
          </p>
          <br />
          <strong>Datenübermittlung in Drittstaaten</strong>
          <p>
            Durch die Verabschiedung der europäischen
            Datenschutz-Grundverordnung (DS-GVO) wurde eine einheitliche
            Grundlage für den Datenschutz in Europa geschaffen. Ihre Daten
            werden daher vorwiegend durch Unternehmen verarbeitet, für die
            DS-GVO Anwendung findet. Sollte doch die Verarbeitung durch Dienste
            Dritter außerhalb der Europäischen Union oder des Europäischen
            Wirtschaftsraums stattfinden, so müssen diese die besonderen
            Voraussetzungen der Art. 44 ff. DS-GVO erfüllen. Das bedeutet, die
            Verarbeitung erfolgt aufgrund besonderer Garantien, wie etwa die von
            der EU-Kommission offiziell anerkannte Feststellung eines der EU
            entsprechenden Datenschutzniveaus oder der Beachtung offiziell
            anerkannter spezieller vertraglicher Verpflichtungen, der so
            genannten „Standardvertragsklauseln“.
            <br />
            Soweit wir aufgrund der Unwirksamkeit des sog. „Privacy Shields“,
            nach Art. 49 Abs. 1 S. 1 lit. a) DSGVO die ausdrückliche
            Einwilligung in die Datenübermittlung in die USA von Ihnen einholen,
            weisen wird diesbezüglich auf das Risiko eines geheimen Zugriffs
            durch US-Behörden und die Nutzung der Daten zu Überwachungszwecken,
            ggf. ohne Rechtsbehelfsmöglichkeiten für EU-Bürger, hin.
          </p>
          <br />
          <strong>Löschung von Daten und Speicherdauer</strong>
          <p>
            Sofern nicht in dieser Datenschutzerklärung ausdrücklich angegeben,
            werden Ihre personenbezogen Daten gelöscht oder gesperrt, sobald die
            zur Verarbeitung erteilte Einwilligung von Ihnen widerrufen wird
            oder der Zweck für die Speicherung entfällt bzw. die Daten für den
            Zweck nicht mehr erforderlich sind, es sei denn deren weitere
            Aufbewahrung ist zu Beweiszwecken erforderlich oder dem stehen
            gesetzliche Aufbewahrungspflichten entgegenstehen. Darunter fallen
            etwa handelsrechtliche Aufbewahrungspflichten von Geschäftsbriefen
            nach § 257 Abs. 1 HGB (6 Jahre) sowie steuerrechtliche
            Aufbewahrungspflichten nach § 147 Abs. 1 AO von Belegen (10 Jahre).
            Wenn die vorgeschriebene Aufbewahrungsfrist abläuft, erfolgt eine
            Sperrung oder Löschung Ihrer Daten, es sei denn die Speicherung ist
            weiterhin für einen Vertragsabschluss oder zur Vertragserfüllung
            erforderlich.
          </p>
          <br />
          <strong>Bestehen einer automatisierten Entscheidungsfindung</strong>
          <p>
            Wir setzen keine automatische Entscheidungsfindung oder ein
            Profiling ein.
          </p>
          <br />
          <strong>
            Bereitstellung unserer Website und Erstellung von Logfiles
          </strong>
          <ol>
            <li>
              Wenn Sie unsere Webseite lediglich informatorisch nutzen (also
              keine Registrierung und auch keine anderweitige Übermittlung von
              Informationen), erheben wir nur die personenbezogenen Daten, die
              Ihr Browser an unseren Server übermittelt. Wenn Sie unsere Website
              betrachten möchten, erheben wir die folgenden Daten:
              <br />
              • IP-Adresse;
              <br />
              • Internet-Service-Provider des Nutzers;
              <br />
              • Datum und Uhrzeit des Abrufs;
              <br />
              • Browsertyp;
              <br />
              • Sprache und Browser-Version;
              <br />
              • Inhalt des Abrufs;
              <br />
              • Zeitzone;
              <br />
              • Zugriffsstatus/HTTP-Statuscode;
              <br />
              • Datenmenge;
              <br />
              • Websites, von denen die Anforderung kommt;
              <br />
              • Betriebssystem.
              <br />
              Eine Speicherung dieser Daten zusammen mit anderen
              personenbezogenen Daten von Ihnen findet nicht statt.
              <br />
              <br />
            </li>
            <li>
              Diese Daten dienen dem Zweck der nutzerfreundlichen,
              funktionsfähigen und sicheren Auslieferung unserer Website an Sie
              mit Funktionen und Inhalten sowie deren Optimierung und
              statistischen Auswertung.
              <br />
              <br />
            </li>
            <li>
              Rechtsgrundlage hierfür ist unser in den obigen Zwecken auch
              liegendes berechtigtes Interesse an der Datenverarbeitung nach
              Art. 6 Abs. 1 S.1 lit. f) DS-GVO.
              <br />
              <br />
            </li>
            <li>
              Wir speichern aus Sicherheitsgründen diese Daten in
              Server-Logfiles für die Speicherdauer von Tagen. Nach Ablauf
              dieser Frist werden diese automatisch gelöscht, es sei denn wir
              benötigen deren Aufbewahrung zu Beweiszwecken bei Angriffen auf
              die Serverinfrastruktur oder anderen Rechtsverletzungen.
              <br />
            </li>
          </ol>
          <br />
          <strong>Cookies</strong>
          <ol>
            <li>
              Wir verwenden sog. Cookies bei Ihrem Besuch unserer Website.
              Cookies sind kleine Textdateien, die Ihr Internet-Browser auf
              Ihrem Rechner ablegt und speichert. Wenn Sie unsere Website erneut
              aufrufen, geben diese Cookies Informationen ab, um Sie automatisch
              wiederzuerkennen. Zu den Cookies zählen auch die sog.
              „Nutzer-IDs“, wo Angaben der Nutzer mittels pseudonymisierter
              Profile gespeichert werden. Wir informieren Sie dazu beim Aufruf
              unserer Website mittels eines Hinweises auf unsere
              Datenschutzerklärung über die Verwendung von Cookies zu den zuvor
              genannten Zwecken und wie Sie dieser widersprechen bzw. deren
              Speicherung verhindern können („Opt-out“).
              <br />
              <br />
              <strong>Es werden folgende Cookie-Arten unterschieden:</strong>
              <br />
              <br />
              <strong>• Notwendige, essentielle Cookies:</strong> Essentielle
              Cookies sind Cookies, die zum Betrieb der Webseite unbedingt
              erforderlich sind, um bestimmte Funktionen der Webseite wie
              Logins, Warenkorb oder Nutzereingaben z.B. bzgl. Sprache der
              Webseite zu speichern.
              <br />
              <br />
              <strong>• Session-Cookies:</strong> Session-Cookies werden zum
              Wiedererkennen mehrfacher Nutzung eines Angebots durch denselben
              Nutzer (z.B. wenn Sie sich eingeloggt haben zur Feststellung Ihres
              Login-Status) benötigt. Wenn Sie unsere Seite erneut aufrufen,
              geben diese Cookies Informationen ab, um Sie automatisch
              wiederzuerkennen. Die so erlangten Informationen dienen dazu,
              unsere Angebote zu optimieren und Ihnen einen leichteren Zugang
              auf unsere Seite zu ermöglichen. Wenn Sie den Browser schließen
              oder Sie sich ausloggen, werden die Session-Cookies gelöscht.
              <br />
              <br />
              <strong>• Persistente Cookies:</strong> Diese Cookies bleiben auch
              nach dem Schließen des Browsers gespeichert. Sie dienen zur
              Speicherung des Logins, der Reichweitenmessung und zu
              Marketingzwecken. Diese werden automatisiert nach einer
              vorgegebenen Dauer gelöscht, die sich je nach Cookie unterscheiden
              kann. In den Sicherheitseinstellungen Ihres Browsers können Sie
              die Cookies jederzeit löschen.
              <br />
              <br />
              <strong>
                • Cookies von Drittanbietern (Third-Party-Cookies insb. von
                Werbetreibenden):
              </strong>{" "}
              Entsprechend Ihren Wünschen können Sie Ihre Browser-Einstellung
              konfigurieren und z. B. Die Annahme von Third-Party-Cookies oder
              allen Cookies ablehnen. Wir weisen Sie jedoch an dieser Stelle
              darauf hin, dass Sie dann eventuell nicht alle Funktionen dieser
              Website nutzen können. Lesen Sie Näheres zu diesen Cookies bei den
              jeweiligen Datenschutzerklärungen zu den Drittanbietern.
              <br />
              <br />
            </li>
            <li>
              <strong>Datenkategorien:</strong> Nutzerdaten, Cookie, Nutzer-ID
              (inb. die besuchten Seiten, Geräteinformationen, Zugriffszeiten
              und IP-Adressen).
              <br />
              <br />
            </li>
            <li>
              <strong>Zwecke der Verarbeitung:</strong> Die so erlangten
              Informationen dienen dem Zweck, unsere Webangebote technisch und
              wirtschaftlich zu optimieren und Ihnen einen leichteren und
              sicheren Zugang auf unsere Website zu ermöglichen.
              <br />
              <br />
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Wenn wir Ihre personenbezogenen
              Daten mit Hilfe von Cookies aufgrund Ihrer Einwilligung
              verarbeiten („Opt-in“), dann ist Art. 6 Abs. 1 S. 1 lit. a) DSGVO
              die Rechtsgrundlage. Ansonsten haben wir ein berechtigtes
              Interesse an der effektiven Funktionalität, Verbesserung und
              wirtschaftlichen Betrieb der Website, so dass in dem Falle Art. 6
              Abs. 1 S. 1 lit. f) DS-GVO Rechtsgrundlage ist. Rechtsgrundlage
              ist zudem Art. 6 Abs. 1 S. 1 lit. b) DS-GVO, wenn die Cookies zur
              Vertragsanbahnung z.B. bei Bestellungen gesetzt werden.
              <br />
              <br />
            </li>
            <li>
              <strong>Speicherdauer/ Löschung:</strong> Die Daten werden
              gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung
              nicht mehr erforderlich sind. Im Falle der Erfassung der Daten zur
              Bereitstellung der Website ist dies der Fall, wenn die jeweilige
              Session beendet ist.
              <br />
              <br />
              Cookies werden ansonsten auf Ihrem Computer gespeichert und von
              diesem an unsere Seite übermittelt. Daher haben Sie als Nutzer
              auch die volle Kontrolle über die Verwendung von Cookies. Durch
              eine Änderung der Einstellungen in Ihrem Internetbrowser können
              Sie die Übertragung von Cookies deaktivieren oder einschränken.
              Bereits gespeicherte Cookies können jederzeit gelöscht werden.
              Dies kann auch automatisiert erfolgen. Werden Cookies für unsere
              Website deaktiviert, können möglicherweise nicht mehr alle
              Funktionen der Website vollumfänglich genutzt werden.
              <br />
              <br />
              <strong>
                Hier finden Sie Informationen zur Löschung von Cookies nach
                Browsern:
              </strong>
              <br />
              <br />
              <strong>Chrome:</strong>{" "}
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="nofollow"
                title="Link: https://support.google.com/chrome/answer/95647"
              >
                Link
              </a>
              <br />
              <br />
              <strong>Safari:</strong>{" "}
              <a
                href="https://support.apple.com/de-at/guide/safari/sfri11471/mac"
                target="_blank"
                rel="nofollow"
                title="Link: https://support.apple.com/de-at/guide/safari/sfri11471/mac"
              >
                Link
              </a>
              <br />
              <br />
              <strong>Firefox:</strong>{" "}
              <a
                href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen"
                target="_blank"
                rel="nofollow"
                title="Link: https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen"
              >
                Link
              </a>
              <br />
              <br />
              <strong>Internet Explorer:</strong>{" "}
              <a
                href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies"
                target="_blank"
                rel="nofollow"
                title="Link: https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies"
              >
                Link
              </a>
              <br />
              <br />
              <strong>Microsoft Edge:</strong>{" "}
              <a
                href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies"
                target="_blank"
                rel="nofollow"
                title="Link: https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies"
              >
                Link
              </a>
              <br />
              <br />
            </li>
            <li>
              <strong>Widerspruch und „Opt-Out“:</strong> Das Speichern von
              Cookies auf Ihrer Festplatte können Sie unabhängig von einer
              Einwilligung oder gesetzlichen Erlaubnis allgemein verhindern,
              indem Sie in Ihren Browser-Einstellungen „keine Cookies
              akzeptieren“ wählen. Dies kann aber eine Funktionseinschränkung
              unserer Angebote zur Folge haben. Sie können dem Einsatz von
              Cookies von Drittanbietern zu Werbezwecken über ein sog. „Opt-out“
              über diese amerikanische Website (
              <a
                href="https://optout.aboutads.info"
                target="_blank"
                rel="nofollow"
                title="Link: https://optout.aboutads.info"
              >
                Link
              </a>
              ) oder diese europäische Website (
              <a
                href="http://www.youronlinechoices.com/de/praferenzmanagement/"
                target="_blank"
                rel="nofollow"
                title="Link: http://www.youronlinechoices.com/de/praferenzmanagement/"
              >
                Link
              </a>
              ) widersprechen.
              <br />
              <br />
            </li>
          </ol>
          <br />
          <strong>
            Kontaktaufnahme per Kontaktformular / E-Mail / Fax / Post
          </strong>
          <ol>
            <li>
              Bei der Kontaktaufnahme mit uns per Kontaktformular, Fax, Post
              oder E-Mail werden Ihre Angaben zum Zwecke der Abwicklung der
              Kontaktanfrage verarbeitet.
              <br />
              <br />
            </li>
            <li>
              Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen
              einer Einwilligung von Ihnen Art. 6 Abs. 1 S. 1 lit. a) DS-GVO.
              Rechtsgrundlage für die Verarbeitung der Daten, die im Zuge einer
              Kontaktanfrage oder E-Mail, eines Briefes oder Faxes übermittelt
              werden, ist Art. 6 Abs. 1 S. 1 lit. f) DS-GVO. Der Verantwortliche
              hat ein berechtigtes Interesse an der Verarbeitung und Speicherung
              der Daten, um Anfragen der Nutzer beantworten zu können, zur
              Beweissicherung aus Haftungsgründen und um ggf. seiner
              gesetzlichen Aufbewahrungspflichten bei Geschäftsbriefen
              nachkommen zu können. Zielt der Kontakt auf den Abschluss eines
              Vertrages ab, so ist zusätzliche Rechtsgrundlage für die
              Verarbeitung Art. 6 Abs. 1 S. 1 lit. b) DS-GVO.
              <br />
              <br />
            </li>
            <li>
              Wir können Ihre Angaben und Kontaktanfrage in unserem
              Customer-Relationship-Management System (&quot;CRM System&quot;)
              oder einem vergleichbaren System speichern.
              <br />
              <br />
            </li>
            <li>
              Die Daten werden gelöscht, sobald sie für die Erreichung des
              Zweckes ihrer Erhebung nicht mehr erforderlich sind. Für die
              personenbezogenen Daten aus der Eingabemaske des Kontaktformulars
              und diejenigen, die per E-Mail übersandt wurden, ist dies dann der
              Fall, wenn die jeweilige Konversation mit Ihnen beendet ist.
              Beendet ist die Konversation dann, wenn sich aus den Umständen
              entnehmen lässt, dass der betroffene Sachverhalt abschließend
              geklärt ist. Anfragen von Nutzern, die über einen Account bzw.
              Vertrag mit uns verfügen, speichern wir bis zum Ablauf von zwei
              Jahren nach Vertragsbeendigung. Im Fall von gesetzlichen
              Archivierungspflichten erfolgt die Löschung nach deren Ablauf:
              Ende handelsrechtlicher (6 Jahre) und steuerrechtlicher (10 Jahre)
              Aufbewahrungspflicht.
              <br />
              <br />
            </li>
            <li>
              Sie haben jederzeit die Möglichkeit, die Einwilligung nach Art. 6
              Abs. 1 S. 1 lit. a) DS-GVO zur Verarbeitung der personenbezogenen
              Daten zu widerrufen. Nehmen Sie per E-Mail Kontakt mit uns auf, so
              können Sie der Speicherung der personenbezogenen Daten jederzeit
              widersprechen.
              <br />
              <br />
            </li>
          </ol>
          <br />
          <strong>Google Analytics</strong>
          <ol>
            <li>
              Wir haben das Webseitenanalyse-Tool „Google Analytics“ (
              <strong>Dienstanbieter:</strong> Google Ireland Limited,
              Registernr.: 368047, Gordon House, Barrow Street, Dublin 4,
              Irland) auf unserer Website integriert. Es besteht hinsichtlich
              der Verwendung der Daten eine gemeinsame Verantwortung
              hinsichtlich der Datenverarbeitung zwischen Google und uns gem.
              Art. 26 DSGVO. Wir haben mit Google vereinbart, dass die primäre
              Verantwortung gemäß DSGVO für die Verarbeitung der Daten wir
              übernehmen und sämtliche Pflichten aus der DSGVO im Hinblick auf
              die Verarbeitung der Daten erfüllen (u. a. Art. 12, 13 DSGVO, Art.
              15 bis 22 DSGVO und Art. 32 bis 34 DSGVO).
              <br />
              <br />
            </li>
            <li>
              <strong>
                Datenkategorien und Beschreibung der Datenverarbeitung:
              </strong>{" "}
              User-ID, IP-Adresse (anonymisiert). Beim Besuch unserer Website
              setzt Google einen Cookie auf Ihren Computer, um die Benutzung
              unserer Website durch Sie analysieren zu können. Wir haben die
              IP-Anonymisierung „anonymizeIP“ aktiviert, wodurch die IP-Adressen
              nur gekürzt weiterverarbeitet werden. Auf dieser Webseite wird
              Ihre IP-Adresse von Google daher innerhalb von Mitgliedstaaten der
              Europäischen Union oder in anderen Vertragsstaaten des Abkommens
              über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in
              Ausnahmefällen wird die volle IP-Adresse an einen Server von
              Google in den USA übertragen und dort gekürzt. Im Auftrag des
              Betreibers dieser Webseite wird Google diese Informationen
              benutzen, um Ihre Nutzung der Webseite auszuwerten, um Reports
              über die Webseitenaktivitäten zusammenzustellen und um weitere,
              mit der Websitenutzung und der Internetnutzung verbundene,
              Dienstleistungen gegenüber dem Verantwortlichen zu erbringen. Wir
              haben darüber hinaus die geräteübergreifende Analyse von
              Website-Besuchern aktiviert, die über eine sog. User-ID
              durchgeführt wird. Die im Rahmen von Google Analytics von Ihrem
              Browser übermittelte IP-Adresse wird nicht mit anderen Daten von
              Google zusammengeführt. Weitere Informationen zu Datennutzung bei
              Google Analytics finden Sie hier: 
              <a
                href="https://www.google.com/analytics/terms/de.html"
                rel="nofollow"
                target="_blank"
                title="Google Analytics Nutzungsbedingungen"
              >
                Link
              </a>
               (Nutzungsbedingungen von Analytics), 
              <a
                href="https://support.google.com/analytics/answer/6004245?hl=de"
                rel="nofollow"
                target="_blank"
                title="Datenschutzerklärung"
              >
                Link
              </a>
               (Hinweise zum Datenschutz bei Analytics) und Googles
              Datenschutzerklärung 
              <a
                href="https://policies.google.com/privacy"
                rel="nofollow"
                target="_blank"
                title="Datenschutzerklärung"
              >
                Link
              </a>
              .<br />
              <br />
            </li>
            <li>
              <strong>Zweck der Verarbeitung:</strong> Die Nutzung von Google
              Analytics dient dem Zweck der Analyse, Optimierung und
              Verbesserung unserer Website.
              <br />
              <br />
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Haben Sie für Verarbeitung
              Ihrer personenbezogenen Daten mittels „Google Analytics“ vom
              Drittanbieter Ihre Einwilligung erteilt („Opt-in“), dann ist Art.
              6 Abs. 1 S. 1 lit. a) DS-GVO die Rechtsgrundlage. Rechtsgrundlage
              ist zudem unser in den obigen Zwecken liegendes berechtigtes
              Interesse (der Analyse, Optimierung und Verbesserung unserer
              Website) an der Datenverarbeitung nach Art. 6 Abs. 1 S.1 lit. f)
              DS-GVO. Bei Services, die im Zusammenhang mit einem Vertrag
              erbracht werden, erfolgt das Tracking und die Analyse des
              Nutzerhaltens nach Art. 6 Abs. 1 S. 1 lit. b) DS-GVO, um mit den
              dadurch gewonnen Informationen, optimierte Services zur Erfüllung
              des Vertragszwecks anbieten zu können.
              <br />
              <br />
            </li>
            <li>
              <strong>Speicherdauer:</strong> Die von uns gesendeten und mit
              Cookies, Nutzerkennungen (z. B. User-ID) oder Werbe-IDs
              verknüpften Daten werden nach Monaten automatisch gelöscht. Die
              Löschung von Daten, deren Aufbewahrungsdauer erreicht ist, erfolgt
              automatisch einmal im Monat.
              <br />
              <br />
            </li>
            <li>
              <strong>Datenübermittlung/Empfängerkategorie:</strong> Google,
              Irland und USA. Wir haben zudem mit Google eine Vereinbarung zur
              Auftragsverarbeitung nach Art. 28 DS-GVO geschlossen.
              <br />
              <br />
            </li>
            <li>
              <strong>
                Widerspruchs- und Beseitigungsmöglichkeiten („Opt-Out“):
              </strong>
              <br />
              •Das Speichern von Cookies auf Ihrer Festplatte können Sie
              allgemein verhindern, indem Sie in Ihren Browser-Einstellungen
              „keine Cookies akzeptieren“ wählen. Dies kann aber eine
              Funktionseinschränkung unserer Angebote zur Folge haben. Sie
              können darüber hinaus die Erfassung der, durch das Cookie
              erzeugten und auf Ihre Nutzung der Website bezogenen, Daten an
              Google sowie die Verarbeitung dieser Daten durch Google
              verhindern, indem sie das unter dem folgenden Link verfügbare
              Browser-Plugin herunterladen und installieren: 
              <a
                href="http://tools.google.com/dlpage/gaoptout?hl=de"
                target="_blank"
                rel="nofollow"
                title="Browser-Add-on zur Deaktivierung von Google Analytics"
              >
                Link
              </a>
              <br />
              <br />
              •Als Alternative zum obigen Browser-Plugin können Sie die
              Erfassung durch Google Analytics unterbinden, indem Sie 
              <strong>
                [__hier bitte__den Analytics Opt-Out Link Ihrer Webseite
                einfügen]
              </strong>
               klicken. Durch den Klick wird ein „Opt-out“-Cookie gesetzt, das
              die Erfassung Ihrer Daten beim Besuch dieser Webseite zukünftig
              verhindert. Dieses Cookie gilt nur für unsere Webseite und Ihren
              aktuellen Browser und hat nur solange Bestand bis Sie Ihre Cookies
              löschen. In dem Falle müssten Sie das Cookie erneut setzen.
              <br />
              <br />
              •Die <strong>geräteübergreifende Nutzeranalyse</strong> können Sie
              in Ihrem Google-Account unter „Meine Daten - persönliche Daten“
              deaktivieren.
              <br />
              <br />
            </li>
          </ol>
          <br />
          <strong>Präsenz in sozialen Medien</strong>
          <ol>
            <li>
              Wir unterhalten in sozialen Medien Profile bzw. Fanpages. Bei der
              Nutzung und dem Aufruf unseres Profils im jeweiligen Netzwerk
              durch Sie gelten die jeweiligen Datenschutzhinweise und
              Nutzungsbedingungen des jeweiligen Netzwerks.
              <br />
              <br />
            </li>
            <li>
              <strong>
                Datenkategorien und Beschreibung der Datenverarbeitung:
              </strong>{" "}
              Nutzungsdaten, Kontaktdaten, Inhaltsdaten, Bestandsdaten. Ferner
              werden die Daten der Nutzer innerhalb sozialer Netzwerke im
              Regelfall für Marktforschungs- und Werbezwecke verarbeitet. So
              können z.B. anhand des Nutzungsverhaltens und sich daraus
              ergebender Interessen der Nutzer Nutzungsprofile erstellt werden.
              Die Nutzungsprofile können wiederum verwendet werden, um z.B.
              Werbeanzeigen innerhalb und außerhalb der Netzwerke zu schalten,
              die mutmaßlich den Interessen der Nutzer entsprechen. Zu diesen
              Zwecken werden im Regelfall Cookies auf den Rechnern der Nutzer
              gespeichert, in denen das Nutzungsverhalten und die Interessen der
              Nutzer gespeichert werden. Ferner können in den Nutzungsprofilen
              auch Daten unabhängig der von den Nutzern verwendeten Geräte
              gespeichert werden (insbesondere, wenn die Nutzer Mitglieder der
              jeweiligen Plattformen sind und bei diesen eingeloggt sind). Für
              eine detaillierte Darstellung der jeweiligen Verarbeitungsformen
              und der Widerspruchsmöglichkeiten (Opt-Out) verweisen wir auf die
              Datenschutzerklärungen und Angaben der Betreiber der jeweiligen
              Netzwerke. Auch im Fall von Auskunftsanfragen und der
              Geltendmachung von Betroffenenrechten weisen wir darauf hin, dass
              diese am effektivsten bei den Anbietern geltend gemacht werden
              können. Nur die Anbieter haben jeweils Zugriff auf die Daten der
              Nutzer und können direkt entsprechende Maßnahmen ergreifen und
              Auskünfte geben. Sollten Sie dennoch Hilfe benötigen, dann können
              Sie sich an uns wenden.
              <br />
              <br />
            </li>
            <li>
              <strong>Zweck der Verarbeitung:</strong> Kommunikation mit den auf
              den sozialen Netzwerken angeschlossenen und registrierten Nutzern;
              Information und Werbung für unsere Produkte, Angebote und
              Dienstleistungen; Außerdarstellung und Imagepflege; Auswertung und
              Analyse der Nutzer und Inhalte unserer Präsenzen in den sozialen
              Medien.
              <br />
              <br />
            </li>
            <li>
              <strong>Rechtsgrundlagen:</strong> Die Rechtsgrundlage für die
              Verarbeitung der personenbezogenen Daten ist unser in den obigen
              Zwecken liegendes berechtigtes Interesse gemäß Art. 6 Abs. 1 S. 1
              lit. f) DS-GVO. Soweit Sie uns bzw. dem Verantwortlichen des
              sozialen Netzwerks eine Einwilligung in die Verarbeitung Ihrer
              personenbezogenen Daten erteilt haben, ist Rechtsgrundlage Art. 6
              Abs. 1 S. 1 lit. a) i.V.m. Art. 7 DS-GVO.
              <br />
              <br />
            </li>
            <li>
              <strong>Datenübermittlung/Empfängerkategorie:</strong> Soziales
              Netzwerk.
              <br />
              <br />
            </li>
            <li>
              Die Datenschutzhinweise, Auskunftsmöglichkeiten und
              Widerspruchmöglichkeiten (Opt-Out) der jeweiligen Netzwerke /
              Diensteanbieter finden Sie hier:
              <br />
              <br />• <strong>LinkedIn</strong> – Diensteanbieter: LinkedIn
              Ireland Unlimited Company, Wilton Place, Dublin 2, Irland) –
              Datenschutzerklärung: 
              <a
                href="https://www.linkedin.com/legal/privacy-policy"
                target="_blank"
                rel="nofollow"
                title="Datenschutzerklärung"
              >
                Link
              </a>
              , Cookie-Richtlinie und Opt-Out: 
              <a
                href="https://www.linkedin.com/legal/cookie-policy"
                target="_blank"
                rel="nofollow"
                title="Cookie-Richtlinie"
              >
                Link
              </a>
              .<br />
              <br />
            </li>
          </ol>
          <br />
          <strong>Rechte der betroffenen Person</strong>
          <ol>
            <li>
              <strong>
                Widerspruch oder Widerruf gegen die Verarbeitung Ihrer Daten
                <br />
                <br />
                Soweit die Verarbeitung auf Ihrer Einwilligung gemäß Art. 6 Abs.
                1 S. 1 lit. a), Art. 7 DS-GVO beruht, haben Sie das Recht, die
                Einwilligung jederzeit zu widerrufen. Die Rechtmäßigkeit der
                aufgrund der Einwilligung bis zum Widerruf erfolgten
                Verarbeitung wird dadurch nicht berührt.
                <br />
                <br />
                Soweit wir die Verarbeitung Ihrer personenbezogenen Daten auf
                die Interessenabwägung gemäß Art. 6 Abs. 1 S. 1 lit. f) DS-GVO
                stützen, können Sie Widerspruch gegen die Verarbeitung einlegen.
                Dies ist der Fall, wenn die Verarbeitung insbesondere nicht zur
                Erfüllung eines Vertrags mit Ihnen erforderlich ist, was von uns
                jeweils bei der nachfolgenden Beschreibung der Funktionen
                dargestellt wird. Bei Ausübung eines solchen Widerspruchs bitten
                wir um Darlegung der Gründe, weshalb wir Ihre personenbezogenen
                Daten nicht wie von uns durchgeführt verarbeiten sollten. Im
                Falle Ihres begründeten Widerspruchs prüfen wir die Sachlage und
                werden entweder die Datenverarbeitung einstellen bzw. anpassen
                oder Ihnen unsere zwingenden schutzwürdigen Gründe aufzeigen,
                aufgrund derer wir die Verarbeitung fortführen.
                <br />
                <br />
                Sie können der Verarbeitung Ihrer personenbezogenen Daten für
                Zwecke der Werbung und Datenanalyse jederzeit widersprechen. Das
                Widerspruchsrecht können Sie kostenfrei ausüben. Über Ihren
                Werbewiderspruch können Sie uns unter folgenden Kontaktdaten
                informieren:
                <br />
                <br />
                Karsten Tauchert
                <br />
                c/o Block Services, Stuttgarter Str. 106
                <br />
                70736 Fellbach
                <br />
                E-Mail-Adresse: webmaster@ktauchert.de
                <br />
              </strong>
              <br />
            </li>
            <li>
              <strong>Recht auf Auskunft</strong>
              <br />
              Sie haben das Recht, von uns eine Bestätigung darüber zu
              verlangen, ob Sie betreffende personenbezogene Daten verarbeitet
              werden. Sofern dies der Fall ist, haben Sie ein Recht auf Auskunft
              über Ihre bei uns gespeicherten persönlichen Daten nach Art. 15
              DS-GVO. Dies beinhaltet insbesondere die Auskunft über die
              Verarbeitungszwecke, die Kategorie der personenbezogenen Daten,
              die Kategorien von Empfängern, gegenüber denen Ihre Daten
              offengelegt wurden oder werden, die geplante Speicherdauer, die
              Herkunft ihrer Daten, sofern diese nicht direkt bei Ihnen erhoben
              wurden.
              <br />
              <br />
            </li>
            <li>
              <strong>Recht auf Berichtigung</strong>
              <br />
              Sie haben ein Recht auf Berichtigung unrichtiger oder auf
              Vervollständigung richtiger Daten nach Art. 16 DS-GVO.
              <br />
              <br />
            </li>
            <li>
              <strong>Recht auf Löschung</strong>
              <br />
              Sie haben ein Recht auf Löschung Ihrer bei uns gespeicherten Daten
              nach Art. 17 DS-GVO, es sei denn gesetzliche oder vertraglichen
              Aufbewahrungsfristen oder andere gesetzliche Pflichten bzw. Rechte
              zur weiteren Speicherung stehen dieser entgegen.
              <br />
              <br />
            </li>
            <li>
              <strong>Recht auf Einschränkung</strong>
              <br />
              Sie haben das Recht, eine Einschränkung bei der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen, wenn eine der
              Voraussetzungen in Art. 18 Abs. 1 lit. a) bis d) DS-GVO erfüllt
              ist:
              <br />
              • Wenn Sie die Richtigkeit der Sie betreffenden personenbezogenen
              für eine Dauer bestreiten, die es dem Verantwortlichen ermöglicht,
              die Richtigkeit der personenbezogenen Daten zu überprüfen;
              <br />
              <br />
              • die Verarbeitung unrechtmäßig ist und Sie die Löschung der
              personenbezogenen Daten ablehnen und stattdessen die Einschränkung
              der Nutzung der personenbezogenen Daten verlangen;
              <br />
              <br />
              • der Verantwortliche die personenbezogenen Daten für die Zwecke
              der Verarbeitung nicht länger benötigt, Sie diese jedoch zur
              Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen
              benötigen, oder
              <br />
              <br />
              • wenn Sie Widerspruch gegen die Verarbeitung gemäß Art. 21 Abs. 1
              DS-GVO eingelegt haben und noch nicht feststeht, ob die
              berechtigten Gründe des Verantwortlichen gegenüber Ihren Gründen
              überwiegen.
              <br />
              <br />
            </li>
            <li>
              <strong>Recht auf Datenübertragbarkeit</strong>
              <br />
              Sie haben ein Recht auf Datenübertragbarkeit nach Art. 20 DS-GVO,
              was bedeutet, dass Sie die bei uns über Sie gespeicherten
              personenbezogenen Daten in einem strukturierten, gängigen und
              maschinenlesbaren Format erhalten können oder die Übermittlung an
              einen anderen Verantwortlichen verlangen können.
              <br />
              <br />
            </li>
            <li>
              <strong>Recht auf Beschwerde</strong>
              <br />
              Sie haben ein Recht auf Beschwerde bei einer Aufsichtsbehörde. In
              der Regel können Sie sich hierfür an die Aufsichtsbehörde
              insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres
              Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes wenden.
              <br />
              <br />
            </li>
          </ol>
          <br />
          <strong>Datensicherheit</strong>
          <p>
            Um alle personenbezogen Daten, die an uns übermittelt werden, zu
            schützen und um sicherzustellen, dass die Datenschutzvorschriften
            von uns, aber auch unseren externen Dienstleistern eingehalten
            werden, haben wir geeignete technische und organisatorische
            Sicherheitsmaßnahmen getroffen. Deshalb werden unter anderem alle
            Daten zwischen Ihrem Browser und unserem Server über eine sichere
            SSL-Verbindung verschlüsselt übertragen.
          </p>
          <br />
          <strong>Hinweis zum Barrierefreiheitsstärkungsgesetzes (BFSG)</strong>
          <p>
            Diese Website dient ausschließlich als persönliches
            Portfolio-Projekt und wird von einer Privatperson betrieben. Es
            handelt sich nicht um ein kommerzielles Angebot oder eine
            B2C-Dienstleistung im Sinne des Barrierefreiheitsstärkungsgesetzes
            (BFSG). Da keine wirtschaftliche Tätigkeit vorliegt und kein Produkt
            oder Dienstleistung am Markt angeboten wird, unterliegt diese
            Website nicht den Anforderungen des BFSG. Dennoch bemühen wir uns,
            die Inhalte so zugänglich wie möglich zu gestalten.
          </p>
          <br />
          <strong>Stand: 01.12.2024</strong>
        </div>
        <div
          id="privacy"
          className={`tab ${tab === "privacy" ? "block" : "hidden"}`}
        >
          <h1 className="text-2xl font-bold mt-4">Terms of Use</h1>
          <p className="mt-2">1. Acceptance of Terms</p>
          <p className="mt-1">
            By accessing and using the Seo-Elevation-Operator app, you accept
            and agree to be bound by these Terms of Use. If you do not agree to
            these terms, please do not use the app.
          </p>

          <p className="mt-2">2. Use of the App</p>
          <p className="mt-1">
            Seo-Elevation-Operator provides AI-generated analysis of SEO data
            from a given URL. You are responsible for any data you enter and for
            maintaining the confidentiality of your account and password.
          </p>

          <p className="mt-2">3. User Data</p>
          <p className="mt-1">
            We use Google Auth to collect your email, name, and URLs entered for
            analysis. The data is saved in Firestore and used only for the user
            to see and use. We also collect data on sites visited if agreed with
            Google Analytics, to help improve our app and monitor usage.
          </p>

          <p className="mt-2">4. Data Sharing</p>
          <p className="mt-1">
            We do not share your personal information (email, name, URLs) with
            other parties. The only exception is the data collected via Google
            Analytics, which is used to monitor site usage.
          </p>

          <p className="mt-2">5. User Rights</p>
          <p className="mt-1">
            You have the right to generate, read, and delete your data. You can
            also delete your account, which will result in the permanent
            deletion of your data.
          </p>

          <p className="mt-2">6. Security Measures</p>
          <p className="mt-1">
            We use Firebase security methods to protect your data. This includes
            encryption and regular security audits. For more information on
            Firebase security, please refer to their documentation here.
          </p>

          <p className="mt-2">7. Contact Information</p>
          <p className="mt-1">
            If you have any questions or concerns about these Terms of Use,
            please contact us at webmaster@ktauchert.de.
          </p>

          <h1 className="text-2xl font-bold mt-4">Privacy Policy</h1>
          <p className="mt-2">1. Introduction</p>
          <p className="mt-1">
            We respect your privacy and are committed to protecting your
            personal data. This Privacy Policy explains how we collect, use, and
            share your personal information.
          </p>

          <p className="mt-2">2. Information We Collect</p>
          <p className="mt-1">
            We collect information through Google Auth, including your email and
            name. We also collect URLs entered for analysis and data on sites
            visited if you agree to use Google Analytics.
          </p>

          <p className="mt-2">3. How We Use Your Information</p>
          <p className="mt-1">To provide and improve our services</p>
          <p className="mt-1">
            To analyze usage patterns and enhance the app’s performance
          </p>
          <p className="mt-1">
            To communicate with you about updates and offers
          </p>

          <p className="mt-2">4. Data Sharing</p>
          <p className="mt-1">
            We do not share your personal data with third parties, except for
            data collected through Google Analytics for app improvement
            purposes.
          </p>

          <p className="mt-2">5. Your Rights</p>
          <p className="mt-1">
            You have the right to access, correct, and delete your personal
            data. You can also delete your account, which will permanently
            remove your data.
          </p>

          <p className="mt-2">6. Security Measures</p>
          <p className="mt-1">
            We implement Firebase’s security measures to protect your data,
            including encryption and regular security audits. More information
            on Firebase security can be found here.
          </p>

          <p className="mt-2">7. Contact Us</p>
          <p className="mt-1">
            If you have any questions or concerns about our Privacy Policy,
            please contact us at webmaster@ktauchert.de.
          </p>

          <h2 className="text-xl font-semibold mt-4">
            How to Exercise Your Rights
          </h2>
          <p className="mt-2">
            To exercise your rights regarding your data, please follow these
            steps:
          </p>

          <p className="mt-1">
            Access Data: Log in to your account to view and manage your data.
          </p>
          <p className="mt-1">
            Delete Data: Go to the user-page and hit &quot;Delete Account&quot;.
            Your account will be deleted, and your data permanently removed.
          </p>
          <p className="mt-1">
            Correct Data: Log in to your account to update your information or
            contact us for assistance. Some information may be unchangeable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpressumPage;
