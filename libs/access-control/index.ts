import { AccessControl } from "accesscontrol";

const ac = new AccessControl();

ac.grant("none");

ac.grant("blogger").readAny("blog");

ac.grant("manager").readAny("testimonial").readAny("blog").readAny("location").readAny("mention");

ac.grant("admin").readAny("user").extend("manager");

export default ac.lock();
