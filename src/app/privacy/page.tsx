'use client'

import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navigation */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <Link href="/" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            AI Image Tools
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Privacy Policy</h1>
            <p className="text-sm text-zinc-400">Last updated: July 1, 2026</p>
          </div>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-600 dark:text-zinc-400">
          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">1. Introduction</h2>
            <p>
              AI Image Tools ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at <strong>img.aixiaot.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">2. Data We Collect</h2>
            <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mt-4">2.1 No Image Upload</h3>
            <p>
              All image processing is performed entirely in your browser using WebAssembly, Canvas API, and TensorFlow.js. <strong>Your images and files never leave your device.</strong> We do not store, transmit, or have access to any images you process on our website.
            </p>

            <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mt-4">2.2 Automatically Collected Data</h3>
            <p>We may use Google AdSense to display advertisements. Google AdSense may collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Pages visited and time spent</li>
              <li>IP address (anonymized)</li>
              <li>Cookie identifiers</li>
            </ul>
            <p className="mt-2">
              This data is collected by Google and is subject to Google's Privacy Policy. We do not have access to this data in identifiable form.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">3. Cookies</h2>
            <p>
              Our website uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Language preference</strong>: Stores your selected language in localStorage (not a cookie).</li>
              <li><strong>AdSense cookies</strong>: Google AdSense uses cookies to serve personalized advertisements based on your browsing history.</li>
            </ul>
            <p className="mt-2">
              You can control cookies through your browser settings. You can also opt out of personalized advertising at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google Ad Settings</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">4. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Google AdSense</strong> — for displaying advertisements. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google Privacy Policy</a></li>
              <li><strong>Vercel</strong> — for website hosting. <a href="https://vercel.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Vercel Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">5. Data Security</h2>
            <p>
              Since all image processing occurs locally in your browser, there is no data transmission risk for the images you process. Our website is served over HTTPS, ensuring secure communication between your browser and our hosting provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">6. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access information about how your data is processed</li>
              <li>Request deletion of your data</li>
              <li>Opt out of personalized advertising</li>
              <li>Withdraw consent for cookie usage</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, please contact us at the email address below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">7. Open Source</h2>
            <p>
              This website is open source software licensed under the GNU Affero General Public License v3. You can view the source code at <a href="https://github.com/haizeigh/ai-image-tools" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">GitHub</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">9. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support.img@aixiaot.com" className="text-blue-600 dark:text-blue-400 underline">support.img@aixiaot.com</a> or open an issue on our <a href="https://github.com/haizeigh/ai-image-tools" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">GitHub repository</a>.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-sm text-zinc-400">
        <p>AI Image Tools · <Link href="/" className="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-300">Home</Link></p>
      </footer>
    </div>
  )
}
