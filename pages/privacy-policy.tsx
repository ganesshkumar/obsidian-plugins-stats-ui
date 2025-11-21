import { Button, Card } from 'flowbite-react';
import React, { useState } from 'react';
import { ArrowDown, ArrowUp, BarChart, Bookmark, User, Shield, Database } from 'react-feather';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

const PrivacyPolicy = () => {
  // State to determine if we show the full policy or only the simplified version
  const [showFullPolicy, setShowFullPolicy] = useState(false);

  const handleTogglePolicy = () => {
    setShowFullPolicy((prevShowFullPolicy) => !prevShowFullPolicy);
  };

  // Simplified policy content
  const simplifiedPolicy = (
    <>
      <h1>Privacy Policy (Simplified)</h1>
      <span className="text-sm">
        Obsidian Stats collects anonymized analytics data automatically and optional personal data if you choose to create an account.
      </span>
      <hr className="my-4" />
      <h2>
        Personal Data processed for the following purposes and using the
        following services:
      </h2>
      
      <div className="my-4 mx-2">
        <div className="flex gap-x-4">
          <BarChart />
          <div>
            <h3 className="mt-0!">Analytics</h3>
            <p>
              <strong>Plausible Analytics (Self-Hosted)</strong>
              <br />
              Personal Data: Anonymized page views, session statistics, referrer information
              <br />
              <em>Privacy-focused, no cookies, no cross-site tracking, GDPR compliant</em>
            </p>
          </div>
        </div>
      </div>

      <div className="my-4 mx-2">
        <div className="flex gap-x-4">
          <Shield />
          <div>
            <h3 className="mt-0!">Authentication & User Accounts</h3>
            <p>
              <strong>Google OAuth 2.0</strong>
              <br />
              Personal Data: Email address, Google ID, name, profile picture
              <br />
              <em>Used for secure login and to associate ratings/reviews with user accounts</em>
            </p>
          </div>
        </div>
      </div>

      <div className="my-4 mx-2">
        <div className="flex gap-x-4">
          <Database />
          <div>
            <h3 className="mt-0!">User-Generated Content</h3>
            <p>
              <strong>Plugin Ratings & Reviews</strong>
              <br />
              Personal Data: User ID, rating (1-5 stars), optional review text (max 2000 characters)
              <br />
              <em>Stored in our database to display community feedback on plugins</em>
            </p>
          </div>
        </div>
      </div>

      <div className="my-4 mx-2">
        <div className="flex gap-x-4">
          <Bookmark />
          <div>
            <h3 className="mt-0!">Local Storage</h3>
            <p>
              <strong>Browser Local Storage</strong>
              <br />
              Data Stored: Favorite plugins list, authentication tokens (access token only), feature flag user ID, user email (when logged in)
              <br />
              <em>Stored locally in your browser, never sent to our servers</em>
            </p>
          </div>
        </div>
      </div>

      <div className="my-4 mx-2">
        <div className="flex gap-x-4">
          <Shield />
          <div>
            <h3 className="mt-0!">Feature Flags & A/B Testing</h3>
            <p>
              <strong>GrowthBook (Self-Hosted)</strong>
              <br />
              Personal Data: User identifier (email if logged in, otherwise random UUID), feature flag evaluations
              <br />
              <em>Uses localStorage (no cookies), fully self-hosted on our infrastructure at growthbookapi.obsidianstats.com - no data sent to third parties</em>
            </p>
          </div>
        </div>
      </div>

      <h2>Analytics (Automatic)</h2>
      <p>
        <strong>Important:</strong> We use privacy-focused Plausible Analytics that automatically collects 
        anonymized usage data for all visitors. No personal data is collected, no cookies are used, 
        and users cannot be identified. This is essential for improving the service.
      </p>

      <h2>Cookies</h2>
      <p>
        We use minimal cookies:
      </p>
      <ul>
        <li><strong>Refresh Token</strong> - HttpOnly secure cookie for authentication (only if you sign in, 7 days expiry)</li>
        <li><strong>Plausible Analytics</strong> - No cookies used (cookieless analytics)</li>
      </ul>
      <p>
        See our <a href="/cookie-policy">Cookie Policy</a> for more details.
      </p>

      <h2>Third-Party Services</h2>
      <ul>
        <li><strong>Google OAuth</strong> - For user authentication</li>
        <li><strong>Plausible Analytics</strong> - Self-hosted, privacy-focused analytics</li>
        <li><strong>EthicalAds</strong> - Privacy-focused advertising network (no cookies, no personal data collection)</li>
        <li><strong>GrowthBook</strong> - Self-hosted feature flag and A/B testing platform on our own infrastructure (no cookies, uses localStorage only, no external data sharing)</li>
        <li><strong>Utterances</strong> - GitHub-based comments (loads on demand)</li>
      </ul>

      <h2>Advertising</h2>
      <p>
        We display ads through EthicalAds, a privacy-focused advertising network. EthicalAds:
      </p>
      <ul>
        <li>Does not use cookies or tracking technologies</li>
        <li>Does not collect personal information</li>
        <li>Does not track users across websites</li>
        <li>Shows contextual ads based on page content only</li>
        <li>Is fully GDPR compliant</li>
      </ul>
      <p>
        Learn more at{' '}
        <a href="https://www.ethicalads.io/privacy-policy/" target="_blank" rel="noopener noreferrer">
          EthicalAds Privacy Policy
        </a>.
      </p>

      <h2>Contact information</h2>
      <div>
        <div className="my-4 mx-2">
          <div className="flex gap-x-4">
            <User />
            <div>
              <h3 className="mt-0!">Owner and Data Controller</h3>
              <p>
                <strong>Contact email</strong>:{' '}
                <a href="mailto:rpganesshkumar@gmail.com">
                  rpganesshkumar@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4">Latest update: November 21, 2025</p>
      <Button onClick={handleTogglePolicy} color="dark" className="mt-2">
        {showFullPolicy
          ? 'Hide Complete Privacy Policy'
          : 'Show the Complete Privacy Policy'}
      </Button>
    </>
  );

  // Complete policy conten
  const completePolicy = (
    <>
      <h1>Privacy Policy of Obsidian Stats</h1>
      <span className="text-sm">
        This Application collects some Personal Data from its Users.
      </span>
      <hr className="my-4" />

      <h2>Owner and Data Controller</h2>
      <p>
        <strong>Contact email</strong>:{' '}
        <a href="mailto:rpganesshkumar@gmail.com">rpganesshkumar@gmail.com</a>
      </p>

      <h2>Types of Data collected</h2>
      <p className="pb-2">
        Obsidian Stats collects the following types of Data:
      </p>
      <ul>
        <li><strong>Authentication Data (Optional)</strong>: Email address, Google ID, name, profile picture (via Google OAuth) - only collected if you choose to sign in</li>
        <li><strong>User-Generated Content (Optional)</strong>: Plugin/theme ratings (1-5 stars), optional review text - only if you choose to submit ratings/reviews</li>
        <li><strong>Analytics Data (Automatic)</strong>: Anonymized page views, referrer information, browser type, device type, country (via Plausible Analytics - privacy-focused, cookieless, no personal data collected)</li>
        <li><strong>Feature Flag Data (Automatic)</strong>: User identifier (email if logged in, random UUID otherwise), feature flag evaluations, A/B test assignments (via GrowthBook - self-hosted, cookieless, uses localStorage only)</li>
        <li><strong>Local Storage Data (Client-side only)</strong>: Favorite plugins list, authentication access token, feature flag user ID, user email (stored in browser only, never transmitted to servers)</li>
      </ul>
      <p className="pb-2">
        <strong>What is optional vs automatic:</strong>
      </p>
      <ul>
        <li><strong>Optional:</strong> Creating an account and submitting ratings/reviews. You can browse and use the site without signing in.</li>
        <li><strong>Automatic:</strong> Privacy-focused analytics data is collected automatically for all visitors to help us understand site usage and improve the service. This analytics data is fully anonymized, does not use cookies, and does not collect any personal information. There is no opt-out mechanism, but the data collected is non-personal and GDPR compliant.</li>
        <li><strong>Client-side only:</strong> Favorites and authentication tokens are stored locally in your browser and are never sent to our servers.</li>
      </ul>

      <hr />
      <h3>Mode and place of processing the Data</h3>
      <h4>Methods of processing</h4>
      <p>
        The Owner takes appropriate security measures to prevent unauthorized
        access, disclosure, modification, or unauthorized destruction of the
        Data. The Data processing is carried out using computers and/or IT
        enabled tools, following organizational procedures and modes strictly
        related to the purposes indicated. In addition to the Owner, in some
        cases, the Data may be accessible to certain types of persons in charge,
        involved with the operation of this Application (administration, sales,
        marketing, legal, system administration) or external parties (such as
        third-party technical service providers, mail carriers, hosting
        providers, IT companies, communications agencies) appointed, if
        necessary, as Data Processors by the Owner. The updated list of these
        parties may be requested from the Owner at any time.
      </p>

      <h4>Place</h4>
      <p>
        Data is processed at the Owner's hosting providers' data centers:
      </p>
      <ul>
        <li><strong>Vercel</strong> - Web application hosting (United States)</li>
        <li><strong>MongoDB Atlas</strong> - Database hosting (configurable region)</li>
        <li><strong>Self-hosted infrastructure</strong> - Plausible Analytics server</li>
      </ul>
      <p>
        Depending on the User's location, data transfers may involve
        transferring the User's Data to a country other than their own.
      </p>

      <h4>Retention time</h4>
      <p>
        Data is processed and stored for as long as required:
      </p>
      <ul>
        <li><strong>User account data</strong>: Retained until account deletion is requested</li>
        <li><strong>Ratings and reviews</strong>: Retained indefinitely to maintain community feedback integrity, unless deletion is requested</li>
        <li><strong>Authentication tokens</strong>: Access tokens expire after 15 minutes; refresh tokens expire after 7 days</li>
        <li><strong>Analytics data</strong>: Retained for up to 24 months in aggregated, anonymized form (no personal data)</li>
        <li><strong>Local storage data</strong>: Retained in browser until cleared by user</li>
      </ul>

      <hr />
      <h3>The purposes of processing</h3>
      <p className="pb-2">
        Data is collected for the following purposes:
      </p>
      <ul>
        <li><strong>Service Provision</strong>: To provide and operate the Obsidian Stats website and its features</li>
        <li><strong>Authentication (Optional)</strong>: To provide secure user accounts via Google OAuth for those who choose to rate/review plugins</li>
        <li><strong>Community Features (Optional)</strong>: To enable users who sign in to rate and review plugins/themes</li>
        <li><strong>Analytics (Automatic, Non-Personal)</strong>: To understand aggregate usage patterns and improve user experience through privacy-focused, cookieless analytics that does not collect personal data</li>
        <li><strong>Service Operation</strong>: To maintain, improve, and secure the service</li>
        <li><strong>Legal Compliance</strong>: To comply with legal obligations and respond to lawful requests</li>
      </ul>

      <hr />
      <h3>Detailed information on the processing of Personal Data</h3>
      <p>
        Personal Data is collected for the following purposes and using the
        following services:
      </p>
      <div className="grid md:grid-cols-2 gap-4 my-4">
        <DetailedItem
          title={
            <div className="flex gap-x-2">
              <BarChart />
              <span>Analytics</span>
            </div>
          }
        >
          <p>
            The services contained in this section enable the Owner to monitor
            and analyze web traffic and can be used to keep track of User
            behavior.
          </p>
          <p>
            <strong>Plausible Analytics (Self-Hosted)</strong>
            <br />
            Plausible Analytics is a privacy-focused web analytics service that we self-host at plausible.obsidianstats.com.
            Plausible is designed to be privacy-friendly and GDPR compliant. It does not use cookies, does not collect 
            personal data, and does not track users across websites. All data collected is fully anonymized and aggregated.
            <br />
            <strong>Data processed:</strong> Page views, referrer sources, country/region (derived from IP address without storing the IP),
            device type, operating system, and browser type. No personal data or unique identifiers are collected.
            <br />
            <strong>Place of processing:</strong> Self-hosted at plausible.obsidianstats.com {' '}
            <a
              href="https://plausible.io/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Plausible Privacy Policy
            </a>{' '}
            {' '}
            <a
              href="https://plausible.io/data-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data Policy
            </a>
            .
            <br />
            <strong>Important:</strong> Analytics collection is automatic and does not provide an opt-out mechanism
            because no personal data or cookies are used. This is our legitimate interest to improve the service
            while maintaining your privacy.
            .
          </p>
        </DetailedItem>

        <DetailedItem
          title={
            <div className="flex gap-x-2">
              <Shield />
              <span>Feature Flags & A/B Testing</span>
            </div>
          }
        >
          <p>
            <strong>GrowthBook (Self-Hosted)</strong>
            <br />
            GrowthBook is an open-source feature flagging and A/B testing platform that we fully self-host on our own infrastructure at growthbookapi.obsidianstats.com.
            Because it is self-hosted, we maintain complete control over the data and no information is shared with GrowthBook, Inc. or any external parties.
            GrowthBook is used to safely roll out new features and run experiments to improve user experience.
            <br />
            <strong>Data processed:</strong> User identifier (email address if logged in, otherwise a random UUID stored in localStorage),
            feature flag evaluations, A/B test variation assignments. This data is processed entirely client-side in your browser
            and only metadata about which features you've seen is sent to our self-hosted GrowthBook server (under our control) for analytics purposes.
            <br />
            <strong>No cookies used:</strong> GrowthBook stores data only in browser localStorage, not cookies. Data is not shared
            across websites or sold to third parties.
            <br />
            <strong>Self-hosted infrastructure:</strong> All GrowthBook data remains on our own servers at growthbookapi.obsidianstats.com. 
            No data is transmitted to GrowthBook, Inc. or any third-party services.
            <br />
            <strong>Place of processing:</strong> Self-hosted at growthbookapi.obsidianstats.com {' '}
            <a
              href="https://www.growthbook.io/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              GrowthBook Open Source Project
            </a>
            .
            <br />
            <strong>Purpose:</strong> To test and gradually release new features, measure their impact, and provide a better
            user experience through controlled feature rollouts.
          </p>
        </DetailedItem>
      </div>

      <hr />
      <h2>Cookie Policy</h2>
      <p>
        Obsidian Stats uses minimal cookies. For complete details, see our{' '}
        <a href="/cookie-policy">Cookie Policy</a>.
      </p>
      <p>
        <strong>Summary:</strong> We use one httpOnly secure cookie for authentication (refresh token, 7 days). 
        Plausible Analytics and GrowthBook use no cookies.
      </p>

      <h2>Analytics Disclosure</h2>
      <p>
        <strong>Important:</strong> Obsidian Stats uses Plausible Analytics to collect anonymized usage statistics 
        automatically for all visitors. This analytics service:
      </p>
      <ul>
        <li>Does not use cookies or any tracking technologies</li>
        <li>Does not collect any personal information</li>
        <li>Does not track users across websites</li>
        <li>Collects only aggregated, anonymized data (page views, referrers, browser types, device types, country)</li>
        <li>Is fully GDPR, CCPA, and PECR compliant</li>
        <li>Cannot identify individual users</li>
      </ul>
      <p>
        There is no opt-out mechanism for analytics because no personal data is collected. 
        By using this website, you acknowledge that anonymized, non-personal analytics data will be collected.
      </p>

      <h2>Further Information for Users</h2>
      <h3>Legal basis of processing</h3>
      <p>
        The Owner processes Data relating to Users based on the following legal grounds:
      </p>
      <ul>
        <li>
          <strong>Consent</strong>: Users have given explicit consent when creating an account or submitting reviews.
        </li>
        <li>
          <strong>Legitimate Interests</strong>: Analytics data is processed based on legitimate interest to 
          improve the service. The analytics are privacy-focused, cookieless, and collect no personal data, 
          minimizing any impact on user privacy.
        </li>
        <li>
          <strong>Contract Performance</strong>: Processing is necessary to provide the services you request 
          (e.g., displaying your ratings and reviews).
        </li>
        <li>
          <strong>Legal Compliance</strong>: Processing may be necessary to comply with legal obligations.
        </li>
      </ul>
      <p>
        In any case, the Owner will gladly help to clarify the specific legal
        basis that applies to the processing.
      </p>

      <h3>Further information about retention time</h3>
      <p>
        Unless specified otherwise in this document, Personal Data shall be
        processed and stored for as long as required by the purpose they have
        been collected for and may be retained for longer due to applicable
        legal obligation or based on the Users’ consent.
      </p>
      <p>
        Therefore:
        <ul>
          <li>
            Personal Data collected for purposes related to the performance of a
            contract between the Owner and the User shall be retained until such
            contract has been fully performed.
          </li>
          <li>
            Personal Data collected for the purposes of the Owner’s legitimate
            interests shall be retained as long as needed to fulfill such
            purposes.
          </li>
          <li>
            The Owner may be allowed to retain Personal Data for a longer period
            whenever the User has given consent to such processing, as long as
            such consent is not withdrawn.
          </li>
          <li>
            The Owner may be obliged to retain Personal Data for a longer period
            whenever required to fulfil a legal obligation or upon order of an
            authority.
          </li>
        </ul>
        Once the retention period expires, Personal Data shall be deleted.
        Therefore, the right of access, the right to erasure, the right to
        rectification and the right to data portability cannot be enforced after
        expiration of the retention period.
      </p>

      <h3>
        The rights of Users based on the General Data Protection Regulation
        (GDPR)
      </h3>
      <p>
        Users may exercise certain rights regarding their Data processed by the
        Owner.
      </p>
      <p>
        In particular, Users have the right to do the following, to the extent
        permitted by law:
      </p>
      <ul>
        <li>
          Withdraw their consent at any time. Users have the right to withdraw
          consent where they have previously given their consent to the
          processing of their Personal Data.
        </li>
        <li>
          Object to processing of their Data. Users have the right to object to
          the processing of their Data if the processing is carried out on a
          legal basis other than consent.
        </li>
        <li>
          Access their Data. Users have the right to learn if Data is being
          processed by the Owner, obtain disclosure regarding certain aspects of
          the processing and obtain a copy of the Data undergoing processing.
        </li>
        <li>
          Verify and seek rectification. Users have the right to verify the
          accuracy of their Data and ask for it to be updated or corrected.
        </li>
        <li>
          Restrict the processing of their Data. Users have the right to
          restrict the processing of their Data. In this case, the Owner will
          not process their Data for any purpose other than storing it.
        </li>
        <li>
          Have their Personal Data deleted or otherwise removed. Users have the
          right to obtain the erasure of their Data from the Owner.
        </li>
        <li>
          Receive their Data and have it transferred to another controller.
          Users have the right to receive their Data in a structured, commonly
          used and machine readable format and, if technically feasible, to have
          it transmitted to another controller without any hindrance.
        </li>
        <li>
          Lodge a complaint. Users have the right to bring a claim before their
          competent data protection authority.
        </li>
      </ul>

      <p>
        Users are also entitled to learn about the legal basis for Data
        transfers abroad including to any international organization governed by
        public international law or set up by two or more countries, such as the
        UN, and about the security measures taken by the Owner to safeguard
        their Data.s
      </p>

      <h4>Details about the right to object to processing</h4>
      <p className="pb-2">
        Where Personal Data is processed for a public interest, in the exercise
        of an official authority vested in the Owner or for the purposes of the
        legitimate interests pursued by the Owner, Users may object to such
        processing by providing a ground related to their particular situation
        to justify the objection.
      </p>
      <p>
        Users must know that, however, should their Personal Data be processed
        for direct marketing purposes, they can object to that processing at any
        time, free of charge and without providing any justification. Where the
        User objects to processing for direct marketing purposes, the Personal
        Data will no longer be processed for such purposes. To learn whether the
        Owner is processing Personal Data for direct marketing purposes, Users
        may refer to the relevant sections of this document.
      </p>

      <h4>How to exercise these rights</h4>
      <p>
        Any requests to exercise User rights can be directed to the Owner
        through the contact details provided in this document. Such requests are
        free of charge and will be answered by the Owner as early as possible
        and always within one month, providing Users with the information
        required by law. Any rectification or erasure of Personal Data or
        restriction of processing will be communicated by the Owner to each
        recipient, if any, to whom the Personal Data has been disclosed unless
        this proves impossible or involves disproportionate effort. At the
        Users’ request, the Owner will inform them about those recipients.
      </p>
      <hr />

      <h3>Additional information about Data collection and processing</h3>
      <h4>Legal action</h4>
      <p>
        The User&apos;s Personal Data may be used for legal purposes by the
        Owner in Court or in the stages leading to possible legal action arising
        from improper use of this Application or the related Services.
      </p>
      <p>
        The User declares to be aware that the Owner may be required to reveal
        personal data upon request of public authorities.
      </p>
      <h4>Additional information about User&apos;s Personal Data</h4>
      <p>
        In addition to the information contained in this privacy policy, this
        Application may provide the User with additional and contextual
        information concerning particular Services or the collection and
        processing of Personal Data upon request.
      </p>

      <h4>System logs and maintenance</h4>
      <p>
        For operation and maintenance purposes, this Application and any
        third-party services may collect files that record interaction with this
        Application (System logs) or use other Personal Data (such as the IP
        Address) for this purpose.
      </p>

      <h4>Information not contained in this policy</h4>
      <p>
        More details concerning the collection or processing of Personal Data
        may be requested from the Owner at any time. Please see the contact
        information at the beginning of this document.
      </p>

      <h4>Changes to this privacy policy</h4>
      <p>
        The Owner reserves the right to make changes to this privacy policy at
        any time by notifying its Users on this page and possibly within this
        Application and/or – as far as technically and legally feasible –
        sending a notice to Users via any contact information available to the
        Owner. It is strongly recommended to check this page often, referring to
        the date of the last modification listed at the bottom.
      </p>
      <p>
        Should the changes affect processing activities performed on the basis
        of the User&apos;s consent, the Owner shall collect new consent from the
        User, where required.
      </p>

      <div className="mt-4">
        <DetailedItem
          title={
            <div className="flex gap-x-2">
              <Bookmark />
              Definitions and legal references
            </div>
          }
          className="pt-4"
        >
          <h4>Personal Data (or Data)</h4>
          <p>
            Any information that directly, indirectly, or in connection with
            other information — including a personal identification number —
            allows for the identification or identifiability of a natural
            person.
          </p>

          <h4>Usage Data</h4>
          <p>
            Information collected automatically through this Application (or
            third-party services employed in this Application), which can
            include: the IP addresses or domain names of the computers utilized
            by the Users who use this Application, the URI addresses (Uniform
            Resource Identifier), the time of the request, the method utilized
            to submit the request to the server, the size of the file received
            in response, the numerical code indicating the status of the
            server's answer (successful outcome, error, etc.), the country of
            origin, the features of the browser and the operating system
            utilized by the User, the various time details per visit (e.g., the
            time spent on each page within the Application) and the details
            about the path followed within the Application with special
            reference to the sequence of pages visited, and other parameters
            about the device operating system and/or the User's IT environment.
          </p>

          <h4>User</h4>
          <p>
            The individual using this Application who, unless otherwise
            specified, coincides with the Data Subject.
          </p>

          <h4>Data Subject</h4>
          <p>The natural person to whom the Personal Data refers.</p>

          <h4>Data Processor (or Processor)</h4>
          <p>
            The natural or legal person, public authority, agency or other body
            which processes Personal Data on behalf of the Controller, as
            described in this privacy policy.
          </p>

          <h4>Data Controller (or Owner)</h4>
          <p>
            The natural or legal person, public authority, agency or other body
            which, alone or jointly with others, determines the purposes and
            means of the processing of Personal Data, including the security
            measures concerning the operation and use of this Application. The
            Data Controller, unless otherwise specified, is the Owner of this
            Application.
          </p>

          <h4>This Application</h4>
          <p>
            The means by which the Personal Data of the User is collected and
            processed.
          </p>

          <h4>Service</h4>
          <p>
            The service provided by this Application as described in the
            relative terms (if available) and on this site/application.
          </p>

          <h4>European Union (or EU)</h4>
          <p>
            Unless otherwise specified, all references made within this document
            to the European Union include all current member states to the
            European Union and the European Economic Area.
          </p>

          <h4>Cookie</h4>
          <p>
            Cookies are Trackers consisting of small sets of data stored in the
            User's browser.
          </p>

          <h4>Tracker</h4>
          <p>
            Tracker indicates any technology - e.g Cookies, unique identifiers,
            web beacons, embedded scripts, e-tags and fingerprinting - that
            enables the tracking of Users, for example by accessing or storing
            information on the User’s device.
          </p>

          <h4>Legal information</h4>
          <p>
            This privacy policy relates solely to this Application, if not
            stated otherwise within this document.
          </p>
        </DetailedItem>
      </div>

      <p className="pt-4">Latest update: November 21, 2025</p>
      <Button onClick={handleTogglePolicy} color="dark" className="mt-2">
        {showFullPolicy
          ? 'Hide Complete Privacy Policy'
          : 'Show the Complete Privacy Policy'}
      </Button>
    </>
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <Header
          title="Privacy Policy | Obsidian Stats"
          description="Privacy policy for Obsidian Stats"
          canonical="https://www.obsidianstats.com/privacy-policy"
          image="/images/obsidian-stats-ogImage.png"
        />
        <Navbar current="privacy-policy" />

        <div className="bg-white pt-5 grow mt-8">
          <div className="max-w-6xl mx-auto px-2 flex flex-col h-full">
            <div
              className={`prose max-w-none! 
                prose-h1:text-2xl prose-h1:mb-0
                prose-h2:text-xl prose-h2:mt-4 prose-h2:mb-1
                prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-1
                prose-h4:mt-4 prose-h4:mb-1
                prose-hr:my-4
                prose-p:my-1 prose-p:text-sm
                prose-li:text-sm`}
            >
              {/* Show the simplified policy by default, and render the complete policy if toggled */}
              {showFullPolicy ? completePolicy : simplifiedPolicy}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

const DetailedItem = (props) => {
  const [expand, setExpand] = useState(false);
  if (!expand) {
    return (
      <Card color="light" className="block" onClick={() => setExpand(!expand)}>
        <div className="w-full flex justify-between">
          {props.title}
          <ArrowDown />
        </div>
      </Card>
    );
  }
  return (
    <div>
      <Card className="py-0">
        <div
          className="w-full flex justify-between"
          onClick={() => setExpand(!expand)}
        >
          {props.title}
          <ArrowUp />
        </div>
        {props.children}
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
