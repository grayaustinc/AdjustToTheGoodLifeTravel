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

const AdminLocationCreatePage: NextComponentType<any, any, PageProps> = (_) => {
  const [testimonial, setTestimonial] = useState<TestimonialDocumentData>();

  return (
    <AdminLayout>
      <AlertProvider>
        <TestimonialModifierComponent testimonial={testimonial} setTestimonial={setTestimonial} />;
      </AlertProvider>
    </AdminLayout>
  );
};

export default AdminLocationCreatePage;
