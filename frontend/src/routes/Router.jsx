import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import BlogPost from "src/components/BlogPost";
import CreatePost from "src/components/CreatePost";
import Dashboard from "src/components/Dashboard";
import LoginForm from "src/components/LoginForm";
import NotFound from "src/components/NotFound";
import ShowPosts from "src/components/ShowPosts";
import SignupForm from "src/components/SignupForm";
import UpdatePost from "src/components/UpdatePost";
import MainLayout from "src/layouts/MainLayout";
import Home from "src/components/Home";
import AuthTestComponent from "src/components/AuthTestComponent";
import useAuth from "src/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

/*
Home: /
All Posts: /posts
Signup: /auth/signup
Login: /auth/login
Blog Post: /posts/:postId
Dashboard: /admin/dashboard
Create Post: /admin/posts/create
Update Post: /admin/posts/:postId/update
*/

const Router = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        {/* // Displays homepage and some blogposts */}
        <Route index path="/" element={<Home />} />
        <Route index path="/authtest" element={<AuthTestComponent />} />
        {/*  View all posts here */}
        <Route index path="/posts" element={<ShowPosts />} />
        {/* AUTH ROUTES */}
        <Route path="/auth">
          <Route index path="signup" element={<SignupForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>
        {/*  Displays single post. logged in users can post, like comments, and the blogpost itself 
            if logged in user is an admin, they can delete comments */}
        <Route path="/posts/:postId" element={<BlogPost />} />

        {/* ADMIN ROUTES */}

        <Route path="/admin">
          {/*  View all posts in a table with buttons to edit/delete posts */}
          <Route
            index
            path="dashboard"
            element={
              isAdmin && isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/auth/login" replace />
              )
            }
          />
          {/* POSTS ROUTES */}
          <Route path="posts">
            {/* CREATE POST */}
            <Route
              index
              path="create"
              element={
                isAdmin && isAuthenticated ? (
                  <CreatePost />
                ) : (
                  <Navigate to="/auth/login" replace />
                )
              }
            />
            <Route
              path=":postId/update"
              element={
                isAdmin && isAuthenticated ? (
                  <UpdatePost />
                ) : (
                  <Navigate to="/auth/login" replace />
                )
              }
            />
            {/* UPDATE POST */}
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
