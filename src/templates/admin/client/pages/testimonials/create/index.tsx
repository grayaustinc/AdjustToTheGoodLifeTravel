//node_modules
import React, { FunctionComponent, useState } from "react";
import { useUpdateEffect } from "react-use";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//components
import TestimonialComponent from "./testimonial-component";

//types
import type { PageProps } from "src/templates/admin/server/paths/testimonials/create";

const AdminTestimonialCreateEditPage: FunctionComponent<PageProps> = (props) => {
  const [testimonial, setTestimonial] = useState(props.testimonial);

  useUpdateEffect(() => {
    setTestimonial(props.testimonial);
  }, [props]);

  return (
    <AlertProvider>
      <TestimonialComponent testimonial={testimonial} setTestimonial={setTestimonial} />
    </AlertProvider>
  );
};

export default React.memo(AdminTestimonialCreateEditPage);
