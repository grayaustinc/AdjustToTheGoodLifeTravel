//node_modules
import React, { useState } from "react";
import { NextComponentType } from "next";

//layout
import AdminLayout from "src/layouts/admin-layout";

//components
import TestimonialModifierComponent from "src/components/admin-components/testimonial-modifier-component";

//alert
import AlertProvider from "src/contexts/error-alert/alert-provider";

//types
import type { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";
import type { PageProps } from "../types";

const AdminLocationCreateEditPage: NextComponentType<any, any, PageProps> = (props) => {
  const [testimonial, setLocation] = useState<TestimonialDocumentData>(props.testimonial);

  return (
    <AdminLayout>
      <AlertProvider>
        <TestimonialModifierComponent testimonial={testimonial} setTestimonial={setLocation} />
      </AlertProvider>
    </AdminLayout>
  );
};

export default AdminLocationCreateEditPage;
