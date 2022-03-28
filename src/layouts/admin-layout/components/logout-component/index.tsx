//node_modules
import React, { useCallback, useState, FunctionComponent } from "react";
import { useRouter } from "next/router";
import { MenuItem } from "react-pro-sidebar";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//components
import SubmitButton from "src/components/submit-button";

//api
import logoutFetch from "src/templates/api/admin/logout/client";

interface LogoutProps {
  type: "pro-sidebar" | "navbar";
}

const LogoutComponent: FunctionComponent<LogoutProps> = ({ type }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const sendLogout = useCallback(async () => {
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
  }, [router, setSubmitting]);

  if (type === "pro-sidebar") {
    return (
      <MenuItem icon={<FontAwesomeIcon icon={faSignOutAlt} />} onClick={sendLogout}>
        Logout
      </MenuItem>
    );
  }
  if (type === "navbar") {
    return (
      <SubmitButton variant="outline-danger" className="m-2" submitting={submitting} onClick={sendLogout}>
        <span className="me-2">Logout</span>
        <FontAwesomeIcon icon={faSignOutAlt} />
      </SubmitButton>
    );
  }

  throw new Error("Type must be specified!");
};

export default React.memo(LogoutComponent);
