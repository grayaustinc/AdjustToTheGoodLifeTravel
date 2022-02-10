//node_modules
import React, { FunctionComponent, useCallback, useContext, useState } from "react";
import { faHistory, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner, Dropdown, ButtonGroup, ListGroup, Button } from "react-bootstrap";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

//types
import type { DraftDocumentData } from "libs/arangodb/collections/drafts";
import type { BlogDocumentData } from "libs/arangodb/collections/blogs";

//alert
import useMakeAlert from "src/contexts/error-alert/useMakeAlert";

//api
import getMetadataDraft from "src/templates/api/admin/db/draft/get-metadata/client";
import getDraft from "src/templates/api/admin/db/draft/get/client";
import deleteDraft from "src/templates/api/admin/db/draft/delete/client";

//style
import style from "./history.module.scss";

type DraftMetadata = Pick<DraftDocumentData, "_key" | "_id" | "_rev" | "modified_time">;

interface HistoryButtonProps {
  blog: BlogDocumentData;
  draft: DraftDocumentData;
  setDraft: (draft: DraftDocumentData) => void;
}

const HistoryButtonComponent: FunctionComponent<HistoryButtonProps> = ({ blog, draft, setDraft }) => {
  const makeAlert = useMakeAlert();
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<DraftMetadata[]>([]);

  const handleToggle = useCallback(
    async (nextShow: boolean) => {
      try {
        if (nextShow) {
          setHistory([]);
          setLoading(true);
          const response = await getMetadataDraft({ blog_id: blog._id });
          if (response.ok) {
            setHistory(response.drafts);
            setLoading(false);
          } else {
            makeAlert(`Failed to retrieve history: ${response.message}`);
            setLoading(false);
          }
        }
      } catch (error) {
        makeAlert(`Failed to retrieve history: ${error}`);
        setLoading(false);
      }
    },
    [blog, makeAlert, setLoading, setHistory]
  );

  const handleDraftChange = useCallback(
    async (_key: string) => {
      try {
        const response = await getDraft({ _key: _key });
        if (response.ok) {
          setDraft(response.draft);
        } else {
          makeAlert(`Failed to get draft: ${response.message}`);
        }
      } catch (error) {
        makeAlert(`Failed to get draft: ${error}`);
      }
    },
    [setDraft, makeAlert]
  );

  const handleDelete = useCallback(
    async (_key: string) => {
      try {
        if (window.confirm("Are you sure you want to delete this draft?")) {
          const response = await deleteDraft({ _key: _key });
          if (response.ok) {
            setHistory((history) => history.filter((draft) => draft._key !== _key));
          } else {
            makeAlert(`Failed to delete draft: ${response.message}`);
          }
        }
      } catch (error) {
        makeAlert(`Failed to delete draft: ${error}`);
      }
    },
    [setHistory, makeAlert]
  );

  return (
    <Dropdown className="d-flex flex-column mx-2 my-1" onToggle={handleToggle}>
      <Dropdown.Toggle id="blog-history-button-4YcGNa" variant="light">
        <FontAwesomeIcon icon={faHistory} />
        <span className="ms-2">History</span>
      </Dropdown.Toggle>
      <Dropdown.Menu align="end" className="p-0 mb-0">
        {loading ? (
          <Dropdown.Item className="text-center" disabled>
            <Spinner animation="grow" size="sm" variant="dark" />
            <span className="text-black ms-2">Loading...</span>
          </Dropdown.Item>
        ) : (
          <>
            {history.map((old) => {
              const active = old._key === draft._key;
              return (
                <ListGroup.Item key={old._key} className={`${style["item"]} d-flex m-0 p-0`} disabled={active}>
                  <ButtonGroup className="flex-grow-1 my-1 p-0">
                    <Button variant="light" className="py-2" onClick={() => handleDraftChange(old._key)} active={active} disabled={active}>
                      {formatDistanceToNow(old.modified_time, { includeSeconds: true, addSuffix: true })}
                    </Button>
                    <Button variant="outline-danger" className="ms-1 flex-grow-0" onClick={() => handleDelete(old._key)} active={active} disabled={active}>
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </ButtonGroup>
                </ListGroup.Item>
              );
            })}
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default React.memo(HistoryButtonComponent);
