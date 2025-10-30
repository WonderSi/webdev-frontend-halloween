export interface PositionData {
  lat: number | null;
  long: number | null;
}

export interface BatteryData {
  level: number;
}

export interface IPData {
  city: string;
  continentName: string;
  countryCode: string;
  countryName: string;
  ipAddress: string;
  stateProv: string;
}

export class Userinfo {
  timezone: number;

  constructor() {
    this.timezone = new Date().getTimezoneOffset() / 60;
  }

  browserInfo(): Navigator {
    return navigator;
  }

  sizeScreen() {
    return {
      width: screen.width,
      height: screen.height,
      clientWidth: document.body.clientWidth,
      clientHeight: document.body.clientHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
    };
  }

  async position(): Promise<PositionData> {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    };
  }

  async battery(): Promise<BatteryData> {
    const battery = await (navigator as any).getBattery();
    return {
      level: battery.level,
    };
  }

  async ip(): Promise<IPData> {
    const res = await fetch('https://api.db-ip.com/v2/free/self');
    const data = await res.json();
    return data;
  }
}
