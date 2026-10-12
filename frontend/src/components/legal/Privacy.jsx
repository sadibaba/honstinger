import React from "react";
import LegalLayout from "./LegalLayout";

const Privacy = () => (
  <LegalLayout title="Privacy Policy" subtitle="How information is handled when you visit Chronica." lastUpdated="October 12, 2026">
    <p>This policy describes information associated with the static Chronica website. This version has no reader accounts, user profiles, comments, analytics, or application database.</p>

    <h2>1. Information processed when you visit</h2>
    <p>Chronica is hosted as static pages. The hosting provider may process technical request information, such as an IP address, browser details, requested URL, and request time, to deliver and protect the site. Please review the hosting provider's privacy information for its handling and retention of this data.</p>
    <p>The site stores your theme preference and cookie-banner choice in your browser's local storage. These values stay in your browser and are not used to identify you.</p>

    <h2>2. Contact form</h2>
    <p>If you submit the Contact form, the information you provide is sent directly to Web3Forms, the third-party form service used to deliver the message to the editorial team. The form will be enabled after the site owner replaces the setup placeholder with a valid Web3Forms access key. Web3Forms' privacy policy governs its handling and retention of submitted messages.</p>
    <p>You may instead contact us at <a href="mailto:sadisheikh169@gmail.com">sadisheikh169@gmail.com</a>.</p>

    <h2>3. Cookies, analytics, and advertising</h2>
    <p>This version does not include analytics or advertising scripts. Theme and consent preferences use browser local storage rather than cookies. If third-party advertising or analytics is added later, this policy will be updated to describe the providers and their data practices.</p>

    <h2>4. External websites</h2>
    <p>Articles and policy pages may link to other websites. Chronica does not control their content or privacy practices; review their policies before sharing information with them.</p>

    <h2>5. Your choices</h2>
    <p>You can remove the saved theme and consent choices by clearing this site's local storage in your browser. For questions about a message sent through the contact form or this policy, email <a href="mailto:sadisheikh169@gmail.com">sadisheikh169@gmail.com</a>.</p>

    <h2>6. Changes</h2>
    <p>This notice may be updated when the website's features or service providers change. The revision date above indicates the latest update.</p>
  </LegalLayout>
);

export default Privacy;
