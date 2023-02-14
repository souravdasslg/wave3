'use client';
import {useCallback, useMemo, useState} from "react";
import {useMetaMask} from "@/hooks/useMetaMask";
import { ethers } from "ethers";
const contractAddress = "0x920994F906594bc3C21279785d472d3A5bC8cA0d";
import abi from "./WavePortal.json";
export function useWavePortal() {
    const {getEthereum} = useMetaMask()
    const [isMining, setIsMining] = useState(false)
    const [initialWaves, setInitialWaves]= useState()
    const wavePortalContract = useMemo( ()=>{
        const ethereum = getEthereum();
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const wavePortalContract = new ethers.Contract(
                contractAddress,
                abi.abi,
                signer
            );
            wavePortalContract.getAllWaves().then(setInitialWaves)
            return wavePortalContract;
        }
        return null;
    },[getEthereum])

    const getTotalWaves = useCallback(async ()=>{
        if (wavePortalContract) {
            const totalWaves = await wavePortalContract.getTotalWaves();
            console.log("Retrieved total wave count...", totalWaves.toNumber())
            return totalWaves.toNumber();
        }
        return null;
    },[wavePortalContract])

    const getWaves = useCallback(async ()=>{
        if (!wavePortalContract) return;
        const waves = await wavePortalContract.getAllWaves();
        return waves;
    },[wavePortalContract])

    const wave = useCallback(async ()=>{
        if(!wavePortalContract) return;
        try {
            setIsMining(true);
            const waveTxn = await wavePortalContract.wave('Hey there!');
            console.log("Mining...", waveTxn.hash);
            await waveTxn.wait();
            console.log("Mined --", waveTxn.hash);
            setIsMining(false);
        }  catch (e:any) {
            console.log(e)
        }

    },[wavePortalContract])
    return useMemo(()=>({wavePortalContract, wave, getTotalWaves, isMining, getWaves,initialWaves}),[wavePortalContract, wave, getTotalWaves, isMining, getWaves, initialWaves])
}
