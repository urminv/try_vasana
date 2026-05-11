const appTitle = document.getElementById("app-title");
const playStoreLink = document.getElementById("play-store-link");
const appStoreLink = document.getElementById("app-store-link");
const userAgent = navigator.userAgent || navigator.vendor || "";
const isAndroid = /android/i.test(userAgent);
const isIOS = /iPad|iPhone|iPod/.test(userAgent)
  || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const fallbackConfig = {
  appName: "Vasana ai",
  playStore: "https://play.google.com/store/apps/details?id=com.vasana.app",
  appStore: "https://apps.apple.com/us/app/vasana-ai/id6757174037",
};

function applyConfig(config) {
  appTitle.textContent = "Vasana ai";
  document.title = "Vasana ai";
  playStoreLink.href = config.playStore;
  appStoreLink.href = config.appStore;

  let redirectUrl = "";

  if (isAndroid) {
    redirectUrl = config.playStore;
  } else if (isIOS) {
    redirectUrl = config.appStore;
  }

  if (!redirectUrl) {
    return;
  }

  window.setTimeout(() => {
    window.location.href = redirectUrl;
  }, 250);
}

async function init() {
  try {
    const response = await fetch("./data.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Failed to load app data");
    }

    const config = await response.json();
    applyConfig(config);
  } catch (error) {
    applyConfig(fallbackConfig);
  }
}

init();
