"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "./components/Hero";
import Category from "./components/Category";
import CardBox from "./components/CardBox";
import Reviews from "./components/Reviews";
import CommunityHero from "./components/CommunityHero";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;
const getCategory = async () => {
  try {
    const response = await axios.get(`${serverUrl}/get-all-category`);
    return response.data.data.category;
  } catch (error) {
    return error;
  }
};
const getTasks = async () => {
  try {
    const response = await axios.get(`${serverUrl}/tasks`);
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export default function Home() {
  const [category, setCategory] = useState([]);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getCategory().then((res: any) => {
      setCategory(res);
    });
    getTasks().then((res: any) => {
      setTasks(res);
    });
  }, []);

  return (
    <>
      <h1 className="mt-20 flex items-center justify-center gap-[5px] text-[25px] font-black">
        <img
          className="h-6 w-6 rounded-full shadow-title-logo"
          src="/title-logo.svg"
          alt="title-icon"
        />
        Get things done
      </h1>
      <Hero />
      {category.length > 0 && <Category category={category} />}
      {tasks.length > 0 && <Reviews tasks={tasks} />}
      <CardBox />
      <CommunityHero />
    </>
  );
}
