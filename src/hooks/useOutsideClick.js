import { useEffect, useRef } from "react";

const useOutsideClick = (fn, listenCapturing = true) => {
  let refEl = useRef();

  useEffect(() => {
    function closeModalHandler(e) {
      if (refEl.current && !refEl.current.contains(e.target)) {
        fn();
      }
    }

    document.addEventListener("click", closeModalHandler, listenCapturing);
    return () => {
      document.removeEventListener("click", closeModalHandler, listenCapturing);
    };
  }, [fn, listenCapturing]);

  return { refEl };
};

export default useOutsideClick;
