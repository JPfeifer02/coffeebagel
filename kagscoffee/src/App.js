import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import CreateAccountPage from './pages/CreateAccountPage';
import MenuPage from './pages/MenuPage';
import ForumPage from './pages/ForumPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import NewBlogPostPage from './pages/NewBlogPostPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import PageContainer from './components/layout/PageContainer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <PageContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/blog/new" element={<NewBlogPostPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
          </Routes>
        </PageContainer>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
