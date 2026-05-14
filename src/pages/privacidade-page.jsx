import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import policySource from '../../privacidade.md?raw';

export default function PrivacidadePage() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'Política de Privacidade | IgaraLead';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <>
      <Header />
      <main className="privacy-main">
        <div className="container privacy-inner">
          <article className="glass privacy-article">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{policySource}</ReactMarkdown>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
