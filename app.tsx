
import React from 'react';
import './srcstyle.css';

const Hero = () => (
  <div className="hero">
    <h1>NovaOS Library</h1>
  </div>
);

const Footer = () => (
  <footer style={{textAlign: 'center', padding: '2rem 0', color: 'var(--fg)'}}>
    &copy; {new Date().getFullYear()} NovaOS Library
  </footer>
);

const App: React.FC = () => {
  return (
    <div>
      <Hero />
      <main style={{maxWidth: 900, margin: '2rem auto', padding: '1rem'}}>
        {/* Add your main website components here */}
        <section>
          <h2>Welcome to NovaOS Library</h2>
          <p>This site hosts documents, images, and notes for NovaOS. All content is managed via GitHub and deployed with GitHub Pages.</p>
        </section>
        <section>
          <h3>Featured Banner</h3>
          <img src="nova-hero.jpg" alt="Nova Banner" style={{width: '100%', borderRadius: 8}} />
        </section>
        <section>
          <h3>Library Items</h3>
          <ul>
            <li>Order Flow Cheat Sheet (PDF)</li>
            <li>Nova Notes (Text)</li>
            <li>Lyra Portrait (Image)</li>
            <li>Nova Banner (Image)</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
