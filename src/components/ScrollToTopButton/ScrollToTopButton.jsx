import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.history.replaceState(null, null, " ");
  };

  return isVisible ? (
    <button className="scroll-to-top" onClick={scrollToTop}>
      🔝
    </button>
  ) : null;
};

export default ScrollToTopButton;
