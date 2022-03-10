//node_modules
import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Container, Table } from "react-bootstrap";

//layout
import SiteLayout from "src/layouts/site-layout";

//components
import MetaComponent from "./meta";

//styles
import styles from "./style.module.scss";

const website_name = "Adjust to the Good Life Travel";
const website = "https://www.adjusttothegoodlifetravel.com/";
const email = "stacygray@adjusttothegoodlifetravel.com";

const PrivacyPage: NextPage = () => {
  return (
    <SiteLayout>
      <MetaComponent />
      <Container className={`${styles["modified"]} my-5`}>
        <h1 className="text-center mb-3">Privacy Notice</h1>
        <hr />
        <p>
          <i>Last Updated: March 15, 2022</i>
        </p>
        <p>
          At {website_name}, accessible at{" "}
          <a className="text-break" href={website}>
            {website}
          </a>
          , one of our main priorities is the privacy of our visitors. This Privacy Notice contains types of information that is collected and recorded by {website_name} and how we
          use it.
        </p>
        <p>
          If you have additional questions or require more information about our Privacy Notice, do not hesitate to contact us through email at{" "}
          <a className="text-break" href={`mailto:${email}`}>
            {email}
          </a>
        </p>
        <h2>Information Collection and Use</h2>
        <hr />
        <p>
          For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your
          name, phone number, and email address. The information that we collect will be used to contact or identify you.
        </p>
        <h2>Log Files</h2>
        <hr />
        <p>
          {website_name} follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting
          services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp,
          referring/exit pages, and possibly the number of clicks. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the
          website, and gathering demographic information.
        </p>
        <h2>Website interactions</h2>
        <hr />
        <p>
          When you browse our website, your browser automatically shares certain information such as which operating system and browser version you are using. We track that
          information, along with the pages you are visiting, page load timing, and which website referred you for statistical purposes like conversion rates and to test new
          designs. We sometimes track specific link clicks to help inform some design decisions. These web analytics data are tied to your IP address. Other web analytics we
          utilize are described further in the <a href="#Cookies-and-Do-Not-Track">Cookies and Do Not Track</a> section.
        </p>
        <h2 id="Cookies-and-Do-Not-Track">Cookies and Do Not Track</h2>
        <hr />
        <div className="ms-2 mb-5">
          <h3>Cookies</h3>
          <p>We do use persistent first-party cookies to store certain preferences, make it easier for you to use our website, and support some in-house analytics.</p>
          <p>
            A cookie is a piece of text stored by your browser. It may help remember login information and site preferences. It might also collect information such as your browser
            type, operating system, web pages visited, duration of visit, content viewed, and other click-stream data. You can adjust cookie retention settings in your own browser.
            To learn more about cookies, including how to view which cookies have been set and how to manage and delete them, please visit:{" "}
            <a className="text-break" href="www.allaboutcookies.org" rel="noopener nofollow" target="_blank">
              www.allaboutcookies.org
            </a>
          </p>
          <p>Below the different categories of cookies are outlined, with specific examples detailed in the table that follows.</p>
          <p>
            <b>Tracking: </b>
            These are set by trusted third party networks (e.g. Google Analytics) to track details such as the number of unique visitors, and pageviews to help improve the user
            experience.
          </p>
          <p>
            <b>Third Party/Embedded Content: </b>
            Adjust to the Good Life Travel makes use of different third party applications and services to enhance the experience of website visitors. These include social media
            platforms such as Facebook and Twitter, or embedded content from YouTube. As a result, cookies may be set by these third parties, and used by them to track your online
            activity. We have no direct control over the information that is collected by these cookies.
          </p>
          <h3>Cookies set by {website_name}</h3>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Duration</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga</td>
                <td>2 years</td>
                <td>
                  <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage" rel="noopener nofollow" target="_blank">
                    Google Analytics
                  </a>{" "}
                  - Used to distinguish users.
                </td>
              </tr>
            </tbody>
          </Table>
          <h3>Controlling Cookies</h3>
          <p>
            Visitors may wish to restrict the use of cookies, or completely prevent them from being set. Most browsers provide for ways to control cookie behavior such as the
            length of time they are stored — either through built-in functionality or by utilizing third party plugins.
          </p>
          <p>Some specific opt-out programs are available here:</p>
          <ul>
            <li>
              Google Analytics -{" "}
              <a className="text-break" href="https://tools.google.com/dlpage/gaoptout" rel="noopener nofollow" target="_blank">
                https://tools.google.com/dlpage/gaoptout
              </a>
            </li>
          </ul>
        </div>
        <h2>Third Party Information</h2>
        <hr />
        <div className="ms-2 mb-5">
          <h3>Third Party Privacy Notices</h3>
          <p>
            {website_name}'s Privacy Notice does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Notices of these
            third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can
            be found at the browsers' respective websites.
          </p>
          <h3>Third Party Links</h3>
          <p>
            Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by
            us. Therefore, we strongly advise you to review the Privacy Notice of these websites. We have no control over, and assume no responsibility for the content, privacy
            notices, or practices of any third-party sites or services.
          </p>
        </div>
        <h2>Children's Information</h2>
        <hr />
        <p>
          Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and
          guide their online activity.
        </p>
        <p>
          {website_name} does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of
          information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
        </p>
        <h2>Online Privacy Only</h2>
        <hr />
        <p>
          This privacy notice applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in{" "}
          {website_name}. This notice is not applicable to any information collected offline or via channels other than this website.
        </p>
        <h2>Privacy Notice Changes</h2>
        <hr />
        <p>
          We may update our Privacy Notice from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the
          new Privacy Notice on this page. These changes are effective immediately, after they are posted on this page.
        </p>
        <h2>Consent</h2>
        <hr />
        <p>By using our website, you hereby consent to our Privacy Notice and agree to its Terms and Conditions.</p>
      </Container>
    </SiteLayout>
  );
};

export default PrivacyPage;
