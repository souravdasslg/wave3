'use client';
import styles from "./page.module.css";
import {useMetaMask} from "@/hooks/useMetaMask";
import {useWavePortal} from "@/hooks/useWavePortal";
import {useCallback, useEffect, useState} from "react";



export default function Main() {
    const { metamaskAccount, requestMetaMaskAccounts} = useMetaMask()
    const {wave, getWaves, initialWaves} = useWavePortal()
    const [waves, setWaves] = useState([])
    const  onClickWave = useCallback(async ()=>{
        await wave()
        setWaves(await getWaves())

    },[getWaves, wave])


  return (
    <main className={styles.main}>
      <h1 className={styles.h1}> 👋 Hey There</h1>
      <p className={styles.description}>
        {`I'm Sourav and I'm a Software Engineer. Connect your Ethereum wallet
        and`}
      </p>
      <div >
          {!metamaskAccount ?
              <button className={styles.button} onClick={requestMetaMaskAccounts}>Connect Wallet</button>:
              <button className={styles.button} onClick={onClickWave}>👋 Wave at me</button>
          }

          {(initialWaves??waves).map((wave, index) => {
              return (
                  <div key={index} style={{  marginTop: "16px", padding: "8px" }}>
                      <div>Address: {wave?.address}</div>
                      <div>Time: {wave?.timestamp.toString()}</div>
                      <div>Message: {wave?.message}</div>
                  </div>)
          })}

      </div>
    </main>
  );
}
