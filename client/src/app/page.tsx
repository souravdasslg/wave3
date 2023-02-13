import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <h1> 👋 Hey There</h1>
      <p className={styles.description}>
        I'm Sourav and I'm a Software Engineer. Connect your Ethereum wallet and
      </p>
      <div className={styles.center}>
        <button style={{ height: "35px", width: "150px" }}>
          👋 Wave at me
        </button>
      </div>
    </main>
  );
}
