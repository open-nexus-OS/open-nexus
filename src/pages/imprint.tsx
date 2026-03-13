import React from 'react';
import Layout from '@theme/Layout';
import styles from './legal.module.css';

export default function Imprint() {
  return (
    <Layout
      title="Imprint"
      description="Legal notice and provider information for the Open Nexus website.">
      <main className={styles.legalPage}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Imprint</h1>
            <p className={styles.subtitle}>
              Legal notice for the Open Nexus website.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.card}>
              <div className={styles.block}>
                <h2 className={styles.heading}>Provider information</h2>
                <p className={styles.text}>Jenning Schäfer</p>
                <p className={styles.text}>Durlacher Str. 111</p>
                <p className={styles.text}>69219 Mannheim</p>
                <p className={styles.text}>Germany</p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>Contact</h2>
                <p className={styles.text}>Email: jenning@open-nexus-os.io</p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>Responsible for content</h2>
                <p className={styles.text}>Jenning Schäfer</p>
                <p className={styles.text}>Durlacher Str. 111</p>
                <p className={styles.text}>69219 Mannheim</p>
                <p className={styles.text}>Germany</p>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>Additional regulatory details</h2>
                <p className={styles.text}>
                  If you operate Open Nexus through a company or registered entity, also add the following where
                  applicable:
                </p>
                <ul className={styles.list}>
                  <li>Legal form</li>
                  <li>Authorized representative</li>
                  <li>Commercial register and register number</li>
                  <li>VAT ID or tax identification number</li>
                  <li>Supervisory authority, if applicable</li>
                </ul>
              </div>

              <div className={styles.block}>
                <h2 className={styles.heading}>Note</h2>
                <p className={styles.text}>
                  This information reflects the current provider and content responsibility for the Open Nexus website.
                  If a company, association, or registered entity later becomes the legal operator of the site, this
                  page should be updated accordingly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
