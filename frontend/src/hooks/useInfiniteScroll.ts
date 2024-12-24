import { useEffect, useState } from "react";
import useThrottle from "./useThrottle";

const useInfiniteScroll = (url:string) => {
    const [news, setNews] = useState<any[]>([]);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await fetch(`${url}?startIndex=${startIndex}`);
          if (!response.ok) throw new Error("Failed to fetch news");
  
          const data = await response.json();
          setNews((prev) => [...prev, ...data.news]);
          setLoading(false);
        } catch (error: any) {
          console.log(error);
        }
      };
      fetchNews();
    }, [startIndex]);
  
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight + 1000 >= scrollHeight) {
        setLoading(true);
        setStartIndex((prev) => prev + 9);
      }
    };
  
    const throttleHandleScroll = useThrottle(handleScroll, 300);
  
    useEffect(() => {
      window.addEventListener("scroll", throttleHandleScroll);
  
      return () => window.removeEventListener("scroll", throttleHandleScroll);
    }, []);

    return { news, loading };
};

export default useInfiniteScroll;
