import { Button, Card } from 'flowbite-react';
import React, { useState } from 'react';
import { ArrowDown, ArrowUp, BarChart, Bookmark, User } from 'react-feather';
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
      <span className='text-sm'>
        This Application collects some Personal Data from its Users.
      </span>
      <hr className='my-4' />
      <h2>Personal Data processed for the following purposes and using the following services:</h2>
      <div>
        <div className='my-4 mx-2'>
          <div className='flex gap-x-4'>
            <BarChart />
            <div>
              <h3 className='!mt-0'>Analytics</h3>
              <p>
                <strong>Google Analytics 4</strong>
                <br />
                Personal Data: number of Users; session statistics; Trackers; Usage Data
              </p> 
            </div> 
          </div>
        </div>
      </div>
      <h2>Contact information</h2>
      <div>
        <div className='my-4 mx-2'>
          <div className='flex gap-x-4'>
            <User />
            <div>
              <h3 className='!mt-0'>Owner and Data Controller</h3>
              <p>
                {/* <strong>Owner and Data Controller</strong><br />
                Address1<br />
                Address2<br />
                City,State,Zip,Country<br/>
                <br /> */}
                <strong>Contact email</strong>: <a href="mailto:rpganesshkumar@gmail.com">rpganesshkumar@gmail.com</a>
              </p> 
            </div> 
          </div>
        </div>
      </div>
      <p className='pt-4'>Latest update: January 14, 2025</p>
      <Button onClick={handleTogglePolicy} color="dark" className='mt-2'>
        {showFullPolicy ? 'Hide Complete Privacy Policy' : 'Show the Complete Privacy Policy'}
      </Button>
    </>
  );

  // Complete policy conten
  const completePolicy = (
    <>
      <h1>Privacy Policy of Obsidian Stats</h1>
      <span className='text-sm'>This Application collects some Personal Data from its Users.</span>
      <hr className='my-4' />
      
      <h2>Owner and Data Controller</h2>
      <p>
        <strong>Contact email</strong>: <a href="mailto:rpganesshkumar@gmail.com">rpganesshkumar@gmail.com</a>
      </p>

      <h2>Types of Data collected</h2>
      <p className='pb-2'>
        Among the types of Personal Data that this Application collects, by itself or through third
        parties, there are: Trackers; Usage Data; number of Users; session statistics.
      </p>
      <p className='pb-2'>
        Complete details on each type of Personal Data collected are provided in the dedicated
        sections of this privacy policy or by specific explanation texts displayed prior to the Data
        collection. Personal Data may be freely provided by the User, or, in case of Usage Data,
        collected automatically when using this Application.
      </p>
      <p className='pb-2'>
        Unless specified otherwise, all Data requested by this Application is mandatory and failure
        to provide this Data may make it impossible for this Application to provide its services. In
        cases where this Application specifically states that some Data is not mandatory, Users are
        free not to communicate this Data without consequences to the availability or the
        functioning of the Service.
      </p>
      <p className='pb-2'>
        Users who are uncertain about which Personal Data is mandatory are welcome to contact the
        Owner. Any use of Cookies – or of other tracking tools — by this Application or by the
        owners of third-party services used by this Application serves the purpose of providing the
        Service required by the User, in addition to any other purposes described in the present
        document and in the Cookie Policy.
      </p>
      <p>
        Users are responsible for any third-party Personal Data obtained, published or shared
        through this Application.
      </p>

      <hr/>
      <h3>Mode and place of processing the Data</h3>
      <h4>Methods of processing</h4>
      <p>
        The Owner takes appropriate security measures to prevent unauthorized access, disclosure,
        modification, or unauthorized destruction of the Data. The Data processing is carried out
        using computers and/or IT enabled tools, following organizational procedures and modes
        strictly related to the purposes indicated. In addition to the Owner, in some cases, the Data
        may be accessible to certain types of persons in charge, involved with the operation of this
        Application (administration, sales, marketing, legal, system administration) or external
        parties (such as third-party technical service providers, mail carriers, hosting providers,
        IT companies, communications agencies) appointed, if necessary, as Data Processors by the
        Owner. The updated list of these parties may be requested from the Owner at any time.
      </p>

      <h4>Place</h4>
      <p>
        The Data is processed at the Owner&apos;s operating offices and in any other places where
        the parties involved in the processing are located.
      </p>
      <p>
        Depending on the User&apos;s location, data transfers may involve transferring the User&apos;s
        Data to a country other than their own. To find out more about the place of processing of
        such transferred Data, Users can check the section containing details about the processing
        of Personal Data.
      </p>

      <h4>Retention time</h4>
      <p>
        Unless specified otherwise in this document, Personal Data shall be processed and stored for
        as long as required by the purpose they have been collected for and may be retained for
        longer due to applicable legal obligation or based on the Users’ consent.
      </p>

      <hr/>
      <h3>The purposes of processing</h3>
      <p className='pb-2'>
        The Data concerning the User is collected to allow the Owner to provide its Service, comply
        with its legal obligations, respond to enforcement requests, protect its rights and
        interests (or those of its Users or third parties), detect any malicious or fraudulent
        activity, as well as the following: Analytics and Tag Management.
      </p>
      <p>
        For specific information about the Personal Data used for each purpose, the User may refer
        to the section “Detailed information on the processing of Personal Data”.
      </p>

      <hr/>
      <h3>Detailed information on the processing of Personal Data</h3>
      <p>Personal Data is collected for the following purposes and using the following services:</p>
      <div className='grid md:grid-cols-2 gap-4 my-4'>
        <DetailedItem title={
          <div className='flex gap-x-2'>
            <BarChart />
            <span>Analytics</span>
          </div>}>
          <p>
            The services contained in this section enable the Owner to monitor and analyze web traffic
            and can be used to keep track of User behavior.
          </p>
          <p>
            <strong>Google Analytics 4 (Google LLC)</strong><br />
            Google Analytics 4 is a web analysis service provided by Google LLC (“Google”). Google
            utilizes the Data collected to track and examine the use of this Application, to prepare
            reports on its activities and share them with other Google services. Google may use the Data
            collected to contextualize and personalize the ads of its own advertising network. In Google
            Analytics 4, IP addresses are used at collection time and then discarded before Data is
            logged in any data center or server. Users can learn more by consulting <a href="https://support.google.com/analytics/answer/12017362?hl=en&ref_topic=2919631">Google’s official
            documentation</a>. In order to understand Google&apos;s use of Data, consult their partner policy
            and their <a href="https://business.safety.google/privacy/">Business Data page</a>.
            <br />
            <strong>Personal Data processed:</strong> number of Users; session statistics; Trackers;
            Usage Data.
            <br />
            <strong>Place of processing:</strong> United States –{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>{' '}
            –{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Opt Out
            </a>
            .
          </p>
        </DetailedItem>
      </div>

      <hr />
      <h2>Cookie Policy</h2>
      <p>
        This Application uses Trackers. To learn more, Users may consult the <a href="/cookie-policy">Cookie Policy</a>.
      </p>

      <h2>Further Information for Users</h2>
      <h3>Legal basis of processing</h3>
      <p>
        The Owner may process Personal Data relating to Users if one of the following applies:
      </p>
      <ul>
        <li>Users have given their consent for one or more specific purposes.</li>
        <li>
          Provision of Data is necessary for the performance of an agreement with the User and/or
          for any pre-contractual obligations thereof.
        </li>
        <li>Processing is necessary for compliance with a legal obligation to which the Owner is subject.</li>
        <li>
          Processing is related to a task that is carried out in the public interest or in the
          exercise of official authority vested in the Owner.
        </li>
        <li>
          Processing is necessary for the purposes of the legitimate interests pursued by the Owner
          or by a third party.
        </li>
      </ul>
      <p>
        In any case, the Owner will gladly help to clarify the specific legal basis that applies to
        the processing.
      </p>

      <h3>Further information about retention time</h3>
      <p>
        Unless specified otherwise in this document, Personal Data shall be processed and stored for
        as long as required by the purpose they have been collected for and may be retained for
        longer due to applicable legal obligation or based on the Users’ consent.
      </p>
      <p>
        Therefore:
        <ul>
          <li>
            Personal Data collected for purposes related to the performance of a contract between
            the Owner and the User shall be retained until such contract has been fully performed.
          </li>
          <li>
            Personal Data collected for the purposes of the Owner’s legitimate interests shall be
            retained as long as needed to fulfill such purposes.
          </li>
          <li>
            The Owner may be allowed to retain Personal Data for a longer period whenever the User
            has given consent to such processing, as long as such consent is not withdrawn.
          </li>
          <li>
            The Owner may be obliged to retain Personal Data for a longer period whenever required
            to fulfil a legal obligation or upon order of an authority.
          </li>
        </ul>
        Once the retention period expires, Personal Data shall be deleted. Therefore, the right of access, the right to erasure, the right to rectification and the right to data portability cannot be enforced after expiration of the retention period.
      </p>

      <h3>The rights of Users based on the General Data Protection Regulation (GDPR)</h3>
      <p>
        Users may exercise certain rights regarding their Data processed by the Owner.
      </p>
      <p>
        In particular, Users have the right to do the following, to the extent permitted by law:
      </p>
      <ul>
        <li>
          Withdraw their consent at any time. Users have the right to withdraw consent where they have previously given their consent to the processing of their Personal Data.
        </li>
        <li>
          Object to processing of their Data. Users have the right to object to the processing of their Data if the processing is carried out on a legal basis other than consent.
        </li>
        <li>
          Access their Data. Users have the right to learn if Data is being processed by the Owner, obtain disclosure regarding certain aspects of the processing and obtain a copy of the Data undergoing processing.
        </li>
        <li>
          Verify and seek rectification. Users have the right to verify the accuracy of their Data and ask for it to be updated or corrected.
        </li>
        <li>
          Restrict the processing of their Data. Users have the right to restrict the processing of their Data. In this case, the Owner will not process their Data for any purpose other than storing it.
        </li>
        <li>
          Have their Personal Data deleted or otherwise removed. Users have the right to obtain the erasure of their Data from the Owner.
        </li>
        <li>
          Receive their Data and have it transferred to another controller. Users have the right to receive their Data in a structured, commonly used and machine readable format and, if technically feasible, to have it transmitted to another controller without any hindrance.
        </li>
        <li>
          Lodge a complaint. Users have the right to bring a claim before their competent data protection authority.
        </li>
      </ul>

      <p>Users are also entitled to learn about the legal basis for Data transfers abroad including to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by the Owner to safeguard their Data.s</p>

      <h4>Details about the right to object to processing</h4>
      <p className='pb-2'>
        Where Personal Data is processed for a public interest, in the exercise of an official authority vested in the Owner or for the purposes of the legitimate interests pursued by the Owner, Users may object to such processing by providing a ground related to their particular situation to justify the objection.
      </p>
      <p>
        Users must know that, however, should their Personal Data be processed for direct marketing purposes, they can object to that processing at any time, free of charge and without providing any justification. Where the User objects to processing for direct marketing purposes, the Personal Data will no longer be processed for such purposes. To learn whether the Owner is processing Personal Data for direct marketing purposes, Users may refer to the relevant sections of this document.
      </p>

      <h4>How to exercise these rights</h4>
      <p>Any requests to exercise User rights can be directed to the Owner through the contact details provided in this document. Such requests are free of charge and will be answered by the Owner as early as possible and always within one month, providing Users with the information required by law. Any rectification or erasure of Personal Data or restriction of processing will be communicated by the Owner to each recipient, if any, to whom the Personal Data has been disclosed unless this proves impossible or involves disproportionate effort. At the Users’ request, the Owner will inform them about those recipients.</p>
      <hr />

      <h3>Additional information about Data collection and processing</h3>
      <h4>Legal action</h4>
      <p>
        The User&apos;s Personal Data may be used for legal purposes by the Owner in Court or in the
        stages leading to possible legal action arising from improper use of this Application or the
        related Services.
      </p>
      <p>
        The User declares to be aware that the Owner may be required to reveal personal data upon request of public authorities.
      </p>
      <h4>Additional information about User&apos;s Personal Data</h4>
      <p>
        In addition to the information contained in this privacy policy, this Application may
        provide the User with additional and contextual information concerning particular Services
        or the collection and processing of Personal Data upon request.
      </p>

      <h4>System logs and maintenance</h4>
      <p>
        For operation and maintenance purposes, this Application and any third-party services may
        collect files that record interaction with this Application (System logs) or use other
        Personal Data (such as the IP Address) for this purpose.
      </p>

      <h4>Information not contained in this policy</h4>
      <p>
        More details concerning the collection or processing of Personal Data may be requested from
        the Owner at any time. Please see the contact information at the beginning of this document.
      </p>

      <h4>Changes to this privacy policy</h4>
      <p>
        The Owner reserves the right to make changes to this privacy policy at any time by
        notifying its Users on this page and possibly within this Application and/or – as far as
        technically and legally feasible – sending a notice to Users via any contact information
        available to the Owner. It is strongly recommended to check this page often, referring to
        the date of the last modification listed at the bottom.
      </p>
      <p>
        Should the changes affect processing activities performed on the basis of the User&apos;s
        consent, the Owner shall collect new consent from the User, where required.
      </p>

      <div className='mt-4'>
        <DetailedItem title={
          <div className='flex gap-x-2'>
            <Bookmark />
            Definitions and legal references
          </div>}
          className='pt-4'>
            <h4>Personal Data (or Data)</h4>
            <p>Any information that directly, indirectly, or in connection with other information — including a personal identification number — allows for the identification or identifiability of a natural person.</p>

            <h4>Usage Data</h4>
            <p>Information collected automatically through this Application (or third-party services employed in this Application), which can include: the IP addresses or domain names of the computers utilized by the Users who use this Application, the URI addresses (Uniform Resource Identifier), the time of the request, the method utilized to submit the request to the server, the size of the file received in response, the numerical code indicating the status of the server's answer (successful outcome, error, etc.), the country of origin, the features of the browser and the operating system utilized by the User, the various time details per visit (e.g., the time spent on each page within the Application) and the details about the path followed within the Application with special reference to the sequence of pages visited, and other parameters about the device operating system and/or the User's IT environment.</p>

            <h4>User</h4>
            <p>The individual using this Application who, unless otherwise specified, coincides with the Data Subject.</p>

            <h4>Data Subject</h4>
            <p>The natural person to whom the Personal Data refers.</p>

            <h4>Data Processor (or Processor)</h4>
            <p>The natural or legal person, public authority, agency or other body which processes Personal Data on behalf of the Controller, as described in this privacy policy.</p>

            <h4>Data Controller (or Owner)</h4>
            <p>The natural or legal person, public authority, agency or other body which, alone or jointly with others, determines the purposes and means of the processing of Personal Data, including the security measures concerning the operation and use of this Application. The Data Controller, unless otherwise specified, is the Owner of this Application.</p>

            <h4>This Application</h4>
            <p>The means by which the Personal Data of the User is collected and processed.</p>

            <h4>Service</h4>
            <p>The service provided by this Application as described in the relative terms (if available) and on this site/application.</p>

            <h4>European Union (or EU)</h4>
            <p>Unless otherwise specified, all references made within this document to the European Union include all current member states to the European Union and the European Economic Area.</p>

            <h4>Cookie</h4>
            <p>Cookies are Trackers consisting of small sets of data stored in the User's browser.</p>

            <h4>Tracker</h4>
            <p>Tracker indicates any technology - e.g Cookies, unique identifiers, web beacons, embedded scripts, e-tags and fingerprinting - that enables the tracking of Users, for example by accessing or storing information on the User’s device.</p>

            <h4>Legal information</h4>
            <p>This privacy policy relates solely to this Application, if not stated otherwise within this document.</p>
        </DetailedItem>
      </div>

      <p className='pt-4'>Latest update: January 14, 2025</p>
      <Button onClick={handleTogglePolicy} color="dark" className='mt-2'>
        {showFullPolicy ? 'Hide Complete Privacy Policy' : 'Show the Complete Privacy Policy'}
      </Button>
    </>
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <Header title='Privacy Policy | Obsidian Stats' description='Privacy policy for Obsidian Stats' canonical='https://www.obsidianstats.com/privacy-policy' image='https://www.obsidianstats.com/logo-512.png'  />
        <Navbar current="privacy-policy" />

        <div className="bg-white pt-5 grow mt-8">
          <div className="max-w-6xl mx-auto px-2 flex flex-col h-full">
            <div className={`prose !max-w-none 
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
      <Card color='light' className='block' onClick={() => setExpand(!expand)}>
        <div className='w-full flex justify-between'>
          {props.title}
          <ArrowDown />
        </div>
      </Card>
    )
  }
  return (
    <div>
      <Card className='py-0'>
        <div className='w-full flex justify-between' onClick={() => setExpand(!expand)}>
          {props.title}
          <ArrowUp />
        </div>
        {props.children}
      </Card>
    </div>
  )
}

export default PrivacyPolicy;
