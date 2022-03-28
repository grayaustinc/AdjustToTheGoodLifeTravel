import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

//context
import { AuthProvider } from "src/contexts/user";

//layout
import AdminLayout from "src/layouts/admin-layout";

//helpers
import LoadingComponent from "./helpers/loading-component";

//types
import type { PropsType } from "src/templates/admin/server";

//dashboard
const DashboardPage = dynamic(() => import("./pages/dashboard"), { loading: LoadingComponent });

//account
const AccountChangePasswordPage = dynamic(() => import("./pages/account/change-password"), { loading: LoadingComponent });

//blogs
const BlogsCreatePage = dynamic(() => import("./pages/blogs/create"), { loading: LoadingComponent });
const BlogsViewPage = dynamic(() => import("./pages/blogs/view"), { loading: LoadingComponent });

//locations
const LocationsCreatePage = dynamic(() => import("./pages/locations/create"), { loading: LoadingComponent });
const LocationsViewPage = dynamic(() => import("./pages/locations/view"), { loading: LoadingComponent });

//mentions
const MentionsCreatePage = dynamic(() => import("./pages/mentions/create"), { loading: LoadingComponent });
const MentionsViewPage = dynamic(() => import("./pages/mentions/view"), { loading: LoadingComponent });

//testimonials
const TestimonialsCreatePage = dynamic(() => import("./pages/testimonials/create"), { loading: LoadingComponent });
const TestimonialsViewPage = dynamic(() => import("./pages/testimonials/view"), { loading: LoadingComponent });

//users
const UsersCreatePage = dynamic(() => import("./pages/users/create"), { loading: LoadingComponent });
const UsersViewPage = dynamic(() => import("./pages/users/view"), { loading: LoadingComponent });

//404
const NotFoundPage = dynamic(() => import("./pages/404"), { loading: LoadingComponent });

const AdminPage: NextPage<PropsType> = ({ location, user, notFound, props }) => {
  return (
    <AuthProvider value={user}>
      <Head>
        <title key="admin-title">Admin Page</title>
      </Head>
      <AdminLayout>
        <StaticRouter location={notFound ? "/404" : location}>
          <Routes>
            <Route path="dashboard" element={<DashboardPage {...props} />} />
            <Route path="account">
              <Route path="change-password" element={<AccountChangePasswordPage {...props} />} />
            </Route>
            <Route path="blogs">
              <Route path="view">
                <Route path=":page" element={<BlogsViewPage {...props} />} />
              </Route>
              <Route path="create">
                <Route path=":key" element={<BlogsCreatePage {...props} />} />
              </Route>
            </Route>
            <Route path="locations">
              <Route path="view">
                <Route path=":page" element={<LocationsViewPage {...props} />} />
              </Route>
              <Route path="create" element={<LocationsCreatePage {...props} />}>
                <Route path=":key" element={<LocationsCreatePage {...props} />} />
              </Route>
            </Route>
            <Route path="mentions">
              <Route path="view">
                <Route path=":page" element={<MentionsViewPage {...props} />} />
              </Route>
              <Route path="create" element={<MentionsCreatePage {...props} />}>
                <Route path=":key" element={<MentionsCreatePage {...props} />} />
              </Route>
            </Route>
            <Route path="testimonials">
              <Route path="view">
                <Route path=":page" element={<TestimonialsViewPage {...props} />} />
              </Route>
              <Route path="create" element={<TestimonialsCreatePage {...props} />}>
                <Route path=":key" element={<TestimonialsCreatePage {...props} />} />
              </Route>
            </Route>
            <Route path="users">
              <Route path="view">
                <Route path=":page" element={<UsersViewPage {...props} />} />
              </Route>
              <Route path="create" element={<UsersCreatePage {...props} />}>
                <Route path=":key" element={<UsersCreatePage {...props} />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage {...props} />} />
          </Routes>
        </StaticRouter>
      </AdminLayout>
    </AuthProvider>
  );
};

export default React.memo(AdminPage);
