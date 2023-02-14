'use client';
import {useCallback, useEffect, useMemo, useState} from "react";

export function useMetaMask() {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [metamaskAccount, setMetamaskAccount] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getEthereum = useCallback(()=>{
        return window?.ethereum;
    },[])
    const requestMetaMaskAccounts = useCallback(async ()=>{
        if(!window) return
        try {
            if (isMetaMaskInstalled) {
                const accounts = await window?.ethereum.request({ method: "eth_requestAccounts" });
                setMetamaskAccount(accounts[0]);
            }
        } catch (e:any) {
            setError(e.message);
            console.log(e)
        }
    },[isMetaMaskInstalled])

   useEffect(()=>{
         if (window?.ethereum) {
              setIsMetaMaskInstalled(true);
              requestMetaMaskAccounts();
         } else {
                setError("Metamask is not installed");
         }
   },[requestMetaMaskAccounts])


    return useMemo(()=>({isMetaMaskInstalled,requestMetaMaskAccounts, metamaskAccount, error, getEthereum}),[error, getEthereum, isMetaMaskInstalled, metamaskAccount, requestMetaMaskAccounts])
}
