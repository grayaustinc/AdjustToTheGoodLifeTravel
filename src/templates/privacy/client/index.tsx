//node_modules
import React from "react";
import { NextPage } from "next";
import { Container } from "react-bootstrap";

//layout
import SiteLayout from "src/layouts/site-layout";

//components
import MetaComponent from "./meta";

//styles
import styles from "./style.module.scss";

const website_name = "Adjust to the Good Life Travel";
const website_url = "https://www.adjusttothegoodlifetravel.com/";
const contact_email = "privacy@adjusttothegoodlifetravel.com";

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
          <a className="text-break" href={website_url}>
            {website_url}
          </a>
          , one of our main priorities is the privacy of our visitors. This Privacy Notice contains types of information that is collected and recorded by {website_name} and how we
          use it.
        </p>
        <p>
          If you have additional questions or require more information about our Privacy Notice, do not hesitate to contact us through email at{" "}
          <a className="text-break" href={`mailto:${contact_email}`}>
            {contact_email}
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
          designs. We sometimes track specific link clicks to help inform some design decisions. These web analytics data are tied to your IP address.
        </p>
        <h2>Third Party Information</h2>
        <hr />
        <div className="ms-2 mb-5">
          <h3>Third Party Privacy Notices</h3>
          <p>
            {website_name}'s Privacy Notice does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Notices of these
            third-party servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
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

export default React.memo(PrivacyPage);
