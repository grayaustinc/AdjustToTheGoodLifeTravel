//node_modules
import React, { useCallback, useState, FunctionComponent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Navbar } from "react-bootstrap";
import { faBars, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//components
import SubmitButton from "src/components/submit-button";

//api
import logoutFetch from "src/templates/api/admin/logout/client";

//styles
import styles from "src/styles/admin-layout/index.module.scss";

interface AdminMainProps {
  toggle: boolean;
  onToggle: (value: boolean) => void;
}

const AdminMainComponent: FunctionComponent<AdminMainProps> = ({ toggle, onToggle, children }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const setToggle = useCallback(() => onToggle(!toggle), [toggle, onToggle]);

  const router = useRouter();

  async function sendLogout() {
    setSubmitting(true);
    try {
      const data = await logoutFetch();
      if (data.ok) {
        router.push("/");
      } else {
        setSubmitting(false);
        window.alert(data.message);
      }
    } catch (error: any) {
      setSubmitting(false);
      window.alert(error?.message || "An unknown error occurred");
    }
  }

  return (
    <main className={styles.main}>
      <Navbar bg="light" variant="light">
        <Button variant="light" className="m-2 d-block d-md-none" onClick={setToggle}>
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <div className="mx-auto" />
        <Link href="/" passHref>
          <Button variant="outline-success">
            <span className="me-2">Home</span>
            <FontAwesomeIcon icon={faHome} />
          </Button>
        </Link>
        <SubmitButton variant="outline-danger" className="m-2" submitting={submitting} onClick={sendLogout}>
          <span className="me-2">Logout</span>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </SubmitButton>
      </Navbar>
      {children}
    </main>
  );
};

export default AdminMainComponent;
