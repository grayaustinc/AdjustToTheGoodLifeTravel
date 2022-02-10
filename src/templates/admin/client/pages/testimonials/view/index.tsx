//node_modules
import React, { FunctionComponent, useCallback, useState } from "react";
import { useUpdateEffect } from "react-use";

//modifier
import createModifierComponent from "src/components/admin-components/modifier-component";

//components
import PagingComponent from "./router-component";

//api
import saveTestimonial from "src/templates/api/admin/db/testimonial/upsert/client";
import deleteTestimonial from "src/templates/api/admin/db/testimonial/delete/client";

//types
import type { PageProps } from "src/templates/admin/server/paths/testimonials/view";
import type { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";

const ModifierComponent = createModifierComponent<TestimonialDocumentData>();

function getHref(testimonial: TestimonialDocumentData) {
  return `/admin/testimonials/create/${testimonial._key}/`;
}

function getHeader(testimonial: TestimonialDocumentData) {
  return `${testimonial._key} - ${testimonial.title}`;
}

const AdminTestimonialsPage: FunctionComponent<PageProps> = (props) => {
  const [testimonial, setTestimonial] = useState(props.testimonials);

  const onDelete = useCallback(
    async (target: TestimonialDocumentData) => {
      if (window.confirm(`Are you sure you want to delete Testimonial: ${target.title}?`)) {
        const response = await deleteTestimonial(target);
        if (response.ok) {
          setTestimonial((data) => data.filter((value) => value._key !== target._key));
        } else {
          window.alert(response.message);
        }
      }
    },
    [setTestimonial]
  );

  useUpdateEffect(() => {
    setTestimonial(props.testimonials);
  }, [props]);

  return (
    <>
      <ModifierComponent
        name="testimonial"
        title="List of all Testimonials"
        subtitle="You can use this menu in order to modify/delete Testimonials"
        values={testimonial}
        getHeader={getHeader}
        getHref={getHref}
        onDelete={onDelete}
      />
      <div className="my-auto" />
      <PagingComponent page={props.page} total={props.total} />
    </>
  );
};

export default AdminTestimonialsPage;
