import { useEffect, useState } from "react";
import useThrottle from "./useThrottle";

const useInfiniteScroll = (url:string) => {
    const [news, setNews] = useState<any[]>([]);
  
    //? filtering state 
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [flare, setFlare] = useState<string>("");
    const [filter, setFilter] = useState<string>("new");

    //? pagination state
    const [startIndex, setStartIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [err, setErr] = useState<string>("");
    
    //? filtering state changing logic from UI
  const changeSearchTerm = (newSearchTerm: string) => {
      if (newSearchTerm === searchTerm) return;
      setNews([]);
      setStartIndex(0);
      setSearchTerm(newSearchTerm);
    };
    const changeFlare = (newFlare: string) => {
      setNews([]);
      setStartIndex(0);
      setFlare(newFlare);
    };
    const changeFilter = (newFilter: string) => {
     setNews([]);
      setStartIndex(0);
      setFilter(newFilter);
    };
  
    useEffect(() => {
      const fetchNews = async () => {
        try {
          const response = await fetch(`${url}?searchTerm=${searchTerm}&flare=${flare}&filter=${filter}&startIndex=${startIndex}`);
          if (!response.ok) throw new Error("Failed to fetch news");
  
          const data = await response.json();
          setNews((prev) => [...prev, ...data.news]);
          setLoading(false);
        } catch (error: any) {
          setErr(error);
        }
      };
      fetchNews();
    }, [startIndex, searchTerm, filter, flare]);
  
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

    return { news, loading, err, changeSearchTerm, changeFlare, changeFilter };
};

export default useInfiniteScroll;
