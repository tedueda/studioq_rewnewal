import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import PropertyPage from './pages/PropertyPage.tsx';
import AdminPage from './pages/AdminPage.tsx';
import './i18n/index.ts';

const supportedLangs = ['en', 'ja', 'ko', 'zh-hans', 'zh-hant'];

function LangRedirect() {
  const { i18n } = useTranslation();
  const lang = supportedLangs.includes(i18n.language) ? i18n.language : 'en';
  return <Navigate to={`/${lang}`} replace />;
}

function LanguageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LangRedirect />} />
        <Route
          path="/:lang"
          element={
            <LanguageWrapper>
              <HomePage />
            </LanguageWrapper>
          }
        />
        <Route
          path="/:lang/property/:slug"
          element={
            <LanguageWrapper>
              <PropertyPage />
            </LanguageWrapper>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <LanguageWrapper>
              <AdminPage />
            </LanguageWrapper>
          }
        />
        <Route path="*" element={<LangRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
