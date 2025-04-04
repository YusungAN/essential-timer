import { useEffect } from "react";


export function useHotKey(subKey: 'Ctrl' | 'Alt', mainKey: string, action: (...args: any[]) => any) {
  // const {subKey, mainKey, action} = args;  
  function handleHotKey(e: KeyboardEvent) {
    // console.log('sadf');
    if (subKey === 'Ctrl' && e.ctrlKey) {
      if (e.key === mainKey || kor2engMapForMac[e.key]) {
        action();
      }
    } else if (subKey === 'Alt' && e.altKey) {
      console.log('sdf', e.key);
      if (e.key === mainKey || kor2engMapForMac[e.key]) {
        console.log('alt', mainKey);
        action();
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleHotKey);
    return () => document.addEventListener('keydown', handleHotKey);
  }, []);

}

const kor2engMapForMac: {[key: string]: string} = {
  'ㅂ': 'q', 'ㅈ': 'w', 'ㄷ': 'e', 'ㄱ': 'r', 'ㅅ': 't',
  'ㅛ': 'y', 'ㅕ': 'u', 'ㅑ': 'i', 'ㅐ': 'o', 'ㅔ': 'p',
  'ㅁ': 'a', 'ㄴ': 's', 'ㅇ': 'd', 'ㄹ': 'f', 'ㅎ': 'g',
  'ㅗ': 'h', 'ㅓ': 'j', 'ㅏ': 'k', 'ㅣ': 'l',
  'ㅋ': 'z', 'ㅌ': 'x', 'ㅊ': 'c', 'ㅍ': 'v', 'ㅠ': 'b',
  'ㅜ': 'n', 'ㅡ': 'm'
};