import React from "react";
import LegalLayout from "./LegalLayout";

const Cookies = () => (
  <LegalLayout title="Cookie and Storage Policy" subtitle="Browser storage used by Chronica." lastUpdated="October 12, 2026">
    <p>Chronica's current static website does not set login, analytics, or advertising cookies. It uses browser local storage for a small number of reader preferences.</p>

    <h2>1. Preferences stored in your browser</h2>
    <ul>
      <li><strong>theme</strong> — remembers your light or dark theme preference.</li>
      <li><strong>cookieConsent</strong> — remembers whether you accepted or declined the notice shown on the site.</li>
    </ul>
    <p>These values are stored by your browser and are not sent to a Chronica application server.</p>

    <h2>2. Hosting and third parties</h2>
    <p>The hosting provider may use technical mechanisms necessary to deliver and protect the website. The Contact form sends information to Web3Forms when submitted. Consult those providers' privacy notices for details about their own technologies and data retention.</p>

    <h2>3. Future advertising or analytics</h2>
    <p>No advertising or analytics scripts are configured in this version. If they are added, this policy and the site's consent choices will be reviewed and updated to explain any related cookies or storage.</p>

    <h2>4. Managing local storage</h2>
    <p>You can clear site data through your browser's privacy or site settings. Doing so resets the saved theme and consent-banner choice. Browser help pages explain how to manage this data in Chrome, Firefox, Safari, and Edge.</p>

    <h2>5. Contact</h2>
    <p>Questions? Email <a href="mailto:sadisheikh169@gmail.com">sadisheikh169@gmail.com</a>.</p>
  </LegalLayout>
);

export default Cookies;
