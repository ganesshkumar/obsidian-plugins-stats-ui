import { Button, Card } from 'flowbite-react';
import React, { useState } from 'react';
import { ArrowDown, ArrowUp, BarChart, Bookmark, User } from 'react-feather';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const CookiePolicy = () => {
  // Complete policy conten
  const completePolicy = (
    <>
      <h1>Cookie Policy for Obsidian Stats</h1>
      <p className='mb-2'>This document informs Users about the technologies that help this Application to achieve the purposes described below. Such technologies allow the Owner to access and store information (for example by using a Cookie) or use resources (for example by running a script) on a User’s device as they interact with this Application.</p>
      <p className='mb-2'>For simplicity, all such technologies are defined as "Trackers" within this document – unless there is a reason to differentiate.</p>
      <p className='mb-2'>For example, while Cookies can be used on both web and mobile browsers, it would be inaccurate to talk about Cookies in the context of mobile apps as they are a browser-based Tracker. For this reason, within this document, the term Cookies is only used where it is specifically meant to indicate that particular type of Tracker.</p>
      <p className='mb-2'>Some of the purposes for which Trackers are used may also require the User's consent. Whenever consent is given, it can be freely withdrawn at any time following the instructions provided in this document.</p>
      <p className='mb-2'>This Application uses Trackers managed directly by the Owner (so-called “first-party” Trackers) and Trackers that enable services provided by a third-party (so-called “third-party” Trackers). Unless otherwise specified within this document, third-party providers may access the Trackers managed by them.</p>
      <p className='mb-2'>The validity and expiration periods of Cookies and other similar Trackers may vary depending on the lifetime set by the Owner or the relevant provider. Some of them expire upon termination of the User’s browsing session.</p>
      <p className='mb-2'>In addition to what’s specified in the descriptions within each of the categories below, Users may find more precise and updated information regarding lifetime specification as well as any other relevant information — such as the presence of other Trackers — in the linked privacy policies of the respective third-party providers or by contacting the Owner.</p>

      <hr/>
      <h2>How this Application uses Trackers</h2>
      <h3>Measurement </h3>
      <p>
        This Application uses Trackers to measure traffic and analyse User behaviour to improve the Service.
      </p>
      <h4>Trackers managed by third parties</h4>
      <div className='grid md:grid-cols-2 gap-4 my-4'>
        <DetailedItem title={
          <div className='flex gap-x-2'>
            <BarChart />
            Google Analytics 4 (Google LLC)
          </div>
        }>
          <p>Google Analytics 4 is a web analysis service provided by Google LLC (“Google”). Google utilizes the Data collected to track and examine the use of this Application, to prepare reports on its activities and share them with other Google services. Google may use the Data collected to contextualize and personalize the ads of its own advertising network. In Google Analytics 4, IP addresses are used at collection time and then discarded before Data is logged in any data center or server. Users can learn more by consulting <a href="https://support.google.com/analytics/answer/12017362?hl=en&ref_topic=2919631">Google’s</a> official documentation.</p>
          <p>In order to understand Google's use of Data, consult their partner policy and their <a href="https://business.safety.google/privacy/">Business Data page.</a></p>
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
        </DetailedItem>
      </div>
      
      
      <h2>How to manage preferences and provide or withdraw consent on this Application</h2>
      <p>Whenever the use of Trackers is based on consent, users can provide or withdraw such consent by setting or updating their preferences via the relevant privacy choices panel available on this Application.</p>
      <p>With regard to any third-party Trackers, Users can manage their preferences via the related opt-out link (where provided), by using the means indicated in the third party's privacy policy, or by contacting the third party.</p>

      <h4>How to control or delete Cookies and similar technologies via your device settings</h4>
      <p>Users may use their own browser settings to:</p>
      <ul>
        <li>See what Cookies or other similar technologies have been set on the device;</li>
        <li>Block Cookies or similar technologies;</li>
        <li>Clear Cookies or similar technologies from the browser.</li>
      </ul>
      <p>The browser settings, however, do not allow granular control of consent by category.</p>
      
      <p>Users can, for example, find information about how to manage Cookies in the most commonly used browsers at the following addresses:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647?hl=en&p=cpn_cookies">Google Chrome</a> </li>
        <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/">Apple Safari</a></li>
        <li><a href="http://windows.microsoft.com/en-us/windows-vista/block-or-allow-cookies">Microsoft Internet Explorer</a></li>
        <li><a href="https://support.microsoft.com/en-us/help/4027947">Microsoft Edge</a></li>
        <li><a href="https://support.brave.com/hc/en-us/articles/360022806212-How-do-I-use-Shields-while-browsing">Brave</a></li>
        <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies">Opera</a></li>
      </ul>

      <p>Users may also manage certain categories of Trackers used on mobile apps by opting out through relevant device settings such as the device advertising settings for mobile devices, or tracking settings in general (Users may open the device settings and look for the relevant setting).</p>

      <h4>Consequences of denying the use of Trackers</h4>
      <p>Users are free to decide whether or not to allow the use of Trackers. However, please note that Trackers help this Application to provide a better experience and advanced functionalities to Users (in line with the purposes outlined in this document). Therefore, if the User chooses to block the use of Trackers, the Owner may be unable to provide related features.</p>

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

      <p>Since the use of third-party Trackers through this Application cannot be fully controlled by the Owner, any specific references to third-party Trackers are to be considered indicative. In order to obtain complete information, Users are kindly requested to consult the privacy policies of the respective third-party services listed in this document.</p>
      <p>Given the objective complexity surrounding tracking technologies, Users are encouraged to contact the Owner should they wish to receive any further information on the use of such technologies by this Application.</p>

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
      <Button onClick={() => {
        window.location.href = '/privacy-policy';
      }} color="dark" className='mt-2'>
        Show the Complete Privacy Policy
      </Button>
    </>
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <Header title='Privacy Policy | Obsidian Stats' description='Privacy policy for Obsidian Stats' canonical='https://www.obsidianstats.com/privacy-policy' image='/images/obsidian-stats-ogImage.png'  />
        <Navbar current="privacy-policy" />

        <div className="bg-white pt-5 grow">
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
              {completePolicy}
            </div>
          </div>
        </div>
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

export default CookiePolicy;
