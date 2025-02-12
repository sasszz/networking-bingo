export const handleShare = async (gameCode: string) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "check out networking bingo!",
        text: `join me in this fun networking game! the game code is ${gameCode}`,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  } else {
    alert("Sharing is not supported on this browser.");
  }
};

export const handleCopy = async (
  text: string,
  setCopied: (copied: boolean) => void
) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
};

export const openLink = (url: string) => {
  window.open(url, "_blank");
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
