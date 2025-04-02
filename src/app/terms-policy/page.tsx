"use client";
import React from "react";

const TermsAndPrivacy = () => {
  const [activeTab, setActiveTab] = React.useState<string>("english");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full text-md md:text-lg lg:text-xl backdrop-blur-md bg-slate-400/20 p-5 rounded-md text-slate-100 mt-20">
      <div className="flex justify-center">
        <button
          className="py-2 px-4 bg-slate-700 hover:bg-cyan-700"
          onClick={() => handleTabChange("english")}
        >
          English
        </button>
        <button onClick={() => handleTabChange("german")}>German</button>
      </div>
      {activeTab === "english" && (
        <>
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
        </>
      )}
      {activeTab === "german" && (
        <>
          <h1 className="text-2xl font-bold mt-4">Nutzungsbedingungen</h1>
          <p className="mt-2">1. Annahme der Bedingungen</p>
          <p className="mt-1">
            Durch den Zugriff auf und die Nutzung der Seo-Elevation-Operator-App
            akzeptieren und stimmen Sie diesen Nutzungsbedingungen zu. Wenn Sie
            diesen Bedingungen nicht zustimmen, verwenden Sie die App bitte
            nicht.
          </p>

          <p className="mt-2">2. Nutzung der App</p>
          <p className="mt-1">
            Seo-Elevation-Operator bietet eine KI-generierte Analyse von
            SEO-Daten von einer angegebenen URL. Sie sind für alle eingegebenen
            Daten und die Vertraulichkeit Ihres Kontos und Passworts
            verantwortlich.
          </p>

          <p className="mt-2">3. Benutzerdaten</p>
          <p className="mt-1">
            Wir verwenden Google Auth, um Ihre E-Mail, Ihren Namen und die
            eingegebenen URLs für die Analyse zu sammeln. Die Daten werden in
            Firestore gespeichert und nur für den Benutzer sichtbar und nutzbar
            gemacht. Wir sammeln auch Daten über besuchte Websites, wenn Sie
            Google Analytics zustimmen, um unsere App zu verbessern und die
            Nutzung zu überwachen.
          </p>

          <p className="mt-2">4. Datenweitergabe</p>
          <p className="mt-1">
            Wir geben Ihre persönlichen Informationen (E-Mail, Name, URLs) nicht
            an andere Parteien weiter. Die einzige Ausnahme sind die über Google
            Analytics gesammelten Daten, die zur Überwachung der Website-Nutzung
            verwendet werden.
          </p>

          <p className="mt-2">5. Benutzerrechte</p>
          <p className="mt-1">
            Sie haben das Recht, Ihre Daten zu erstellen, zu lesen und zu
            löschen. Sie können auch Ihr Konto löschen, was zur dauerhaften
            Löschung Ihrer Daten führt.
          </p>

          <p className="mt-2">6. Sicherheitsmaßnahmen</p>
          <p className="mt-1">
            Wir verwenden Firebase-Sicherheitsmethoden, um Ihre Daten zu
            schützen. Dazu gehören Verschlüsselung und regelmäßige
            Sicherheitsüberprüfungen. Weitere Informationen zur
            Firebase-Sicherheit finden Sie hier.
          </p>

          <p className="mt-2">7. Kontaktinformationen</p>
          <p className="mt-1">
            Wenn Sie Fragen oder Bedenken zu diesen Nutzungsbedingungen haben,
            kontaktieren Sie uns bitte unter webmaster@ktauchert.de.
          </p>

          <h1 className="text-2xl font-bold mt-4">Datenschutzrichtlinie</h1>
          <p className="mt-2">1. Einführung</p>
          <p className="mt-1">
            Wir respektieren Ihre Privatsphäre und verpflichten uns, Ihre
            persönlichen Daten zu schützen. Diese Datenschutzrichtlinie erklärt,
            wie wir Ihre persönlichen Informationen sammeln, verwenden und
            teilen.
          </p>

          <p className="mt-2">2. Informationen, die wir sammeln</p>
          <p className="mt-1">
            Wir sammeln Informationen über Google Auth, einschließlich Ihrer
            E-Mail und Ihres Namens. Wir sammeln auch eingegebene URLs zur
            Analyse und Daten über besuchte Websites, wenn Sie der Nutzung von
            Google Analytics zustimmen.
          </p>

          <p className="mt-2">3. Wie wir Ihre Informationen verwenden</p>
          <p className="mt-1">
            Um unsere Dienste bereitzustellen und zu verbessern
          </p>
          <p className="mt-1">
            Um Nutzungsmuster zu analysieren und die Leistung der App zu
            verbessern
          </p>
          <p className="mt-1">
            Um mit Ihnen über Updates und Angebote zu kommunizieren
          </p>

          <p className="mt-2">4. Datenweitergabe</p>
          <p className="mt-1">
            Wir geben Ihre persönlichen Daten nicht an Dritte weiter, außer für
            Daten, die über Google Analytics zur Verbesserung der App gesammelt
            werden.
          </p>

          <p className="mt-2">5. Ihre Rechte</p>
          <p className="mt-1">
            Sie haben das Recht, auf Ihre persönlichen Daten zuzugreifen, diese
            zu korrigieren und zu löschen. Sie können auch Ihr Konto löschen,
            was Ihre Daten dauerhaft entfernt.
          </p>

          <p className="mt-2">6. Sicherheitsmaßnahmen</p>
          <p className="mt-1">
            Wir implementieren die Sicherheitsmaßnahmen von Firebase, um Ihre
            Daten zu schützen, einschließlich Verschlüsselung und regelmäßiger
            Sicherheitsüberprüfungen. Weitere Informationen zur
            Firebase-Sicherheit finden Sie hier.
          </p>

          <p className="mt-2">7. Kontaktieren Sie uns</p>
          <p className="mt-1">
            Wenn Sie Fragen oder Bedenken zu unserer Datenschutzrichtlinie
            haben, kontaktieren Sie uns bitte unter webmaster@ktauchert.de.
          </p>

          <h2 className="text-xl font-semibold mt-4">
            So üben Sie Ihre Rechte aus
          </h2>
          <p className="mt-2">
            Um Ihre Rechte in Bezug auf Ihre Daten auszuüben, befolgen Sie bitte
            diese Schritte:
          </p>

          <p className="mt-1">
            Datenzugriff: Melden Sie sich bei Ihrem Konto an, um Ihre Daten
            anzuzeigen und zu verwalten.
          </p>
          <p className="mt-1">
            Daten löschen: Gehen Sie zur Benutzerseite und klicken Sie auf
            &quot;Konto löschen&quot;. Ihr Konto wird gelöscht und Ihre Daten
            dauerhaft entfernt.
          </p>
          <p className="mt-1">
            Daten korrigieren: Melden Sie sich bei Ihrem Konto an, um Ihre
            Informationen zu aktualisieren, oder kontaktieren Sie uns für
            Unterstützung. Einige Informationen können unveränderlich sein.
          </p>
        </>
      )}
    </div>
  );
};

export default TermsAndPrivacy;
