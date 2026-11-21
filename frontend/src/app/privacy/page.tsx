import Link from "next/link";
import { PageHero } from "@/components/UI";

export const metadata = {
  title: "Privacy Policy | Cine Connect",
  description: "Privacy Policy and Data Protection Information for Cine Connect website and iOS application.",
};

export default function PrivacyPage() {
  const lastUpdated = "February 17, 2025";

  return (
    <>
      <PageHero
        eyebrow="LEGAL & DATA PROTECTION"
        title="Privacy Policy"
        subtitle="How Cine Connect collects, uses, protects, and respects your personal data across our web platform and iOS application."
      />
      <section className="section">
        <div className="container article-width">
          <div className="article-prose">
            <p><strong>Effective Date & Last Updated:</strong> {lastUpdated}</p>

            <p>
              Cine Connect (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy and ensuring a safe, transparent digital ecosystem for India&apos;s cinema industry. This Privacy Policy applies to our website (<strong>https://cineconnect.cc</strong>) and the official <strong>Cine Connect iOS Application</strong>.
            </p>

            <h3>1. Information We Collect</h3>
            <p>
              To provide professional networking, craft discovery, and industry collaboration services, we may collect the following categories of information:
            </p>
            <ul>
              <li><strong>Account & Identity Data:</strong> Full name, email address, phone number, and optional profile pictures provided during sign-up or profile creation.</li>
              <li><strong>Professional & Craft Details:</strong> Filmmaking craft (e.g., Acting, Direction, Cinematography, Sound Design), portfolio links, showreels, work experience, and availability.</li>
              <li><strong>Authentication Data:</strong> Login credentials, Sign in with Apple identifier tokens, or OTP verification metrics.</li>
              <li><strong>Device & Usage Technical Information:</strong> IP address, operating system version (iOS/Web), device identifier, app analytics, and crash reports.</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>We process your data strictly to fulfill your requested features and improve our platform services:</p>
            <ul>
              <li>To enable professional profile discovery and collaborative networking across the 24 cinema crafts.</li>
              <li>To manage auditions, project postings, casting calls, and production opportunities.</li>
              <li>To authenticate users securely via email, Sign in with Apple, or multi-factor tokens.</li>
              <li>To deliver technical notifications, platform updates, and respond to support queries.</li>
              <li>To monitor app performance, fix crashes, and ensure system security against abuse.</li>
            </ul>

            <h3>3. Data Sharing & Third-Party Services</h3>
            <p>
              <strong>We do not sell, rent, or trade your personal data to third parties or advertisers.</strong> We only share information with trusted infrastructure providers essential to operating our services:
            </p>
            <ul>
              <li><strong>Cloud Infrastructure & Database:</strong> Hosted database and storage services (Supabase) to store user data securely.</li>
              <li><strong>Apple App Store Ecosystem:</strong> Authentication services (Sign in with Apple) and push notification delivery (APNs).</li>
              <li><strong>Legal Compliance:</strong> If required by law, subpoena, or legal regulation to protect the rights and safety of our users.</li>
            </ul>

            <h3>4. Data Security & Retention</h3>
            <p>
              We implement industry-standard encryption in transit (HTTPS / TLS 1.3) and at rest to protect your personal data against unauthorized access, loss, or alteration. We retain user records only as long as your account remains active or as required by applicable laws.
            </p>

            <h3>5. User Data Rights & Account Deletion (Apple App Store Guideline 5.1.1(v))</h3>
            <p>
              In accordance with Apple App Store guidelines and international data privacy laws, you have full control over your personal data:
            </p>
            <ul>
              <li><strong>Access & Update:</strong> You may review and update your profile information at any time within the Cine Connect iOS app or website settings.</li>
              <li><strong>Account & Data Deletion:</strong> You have the right to request full deletion of your account and associated personal data. To initiate deletion:
                <br />
                - Go to <strong>Settings & Account</strong> within the Cine Connect iOS App and tap <em>Delete Account</em>, or
                <br />
                - Email our privacy team at <a className="text-link" href="mailto:reachus@cineconnect.cc">reachus@cineconnect.cc</a> with the subject line <code>&quot;Account Deletion Request&quot;</code>.
              </li>
            </ul>

            <h3>6. Children&apos;s Privacy</h3>
            <p>
              Cine Connect is designed exclusively for cinema professionals, artists, and creators. Our platform and iOS app are not directed to children under 13 years of age. We do not knowingly collect personal information from children.
            </p>

            <h3>7. Updates to This Policy</h3>
            <p>
              We may update this Privacy Policy periodically to reflect app updates or legal requirements. Any updates will be posted on this page with an updated &quot;Last Updated&quot; date.
            </p>

            <h3>8. Contact Us</h3>
            <p>
              If you have any questions, concerns, or data rights requests regarding this Privacy Policy, please contact our Data Protection Team:
            </p>
            <p>
              <strong>Cine Connect Data Protection Team</strong><br />
              Email: <a className="text-link" href="mailto:reachus@cineconnect.cc">reachus@cineconnect.cc</a><br />
              Location: Hyderabad, Telangana, India
            </p>
          </div>

          <div style={{ marginTop: "40px" }}>
            <Link className="back-link" href="/">← Return to Cine Connect Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
