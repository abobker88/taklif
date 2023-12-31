"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "./components/Hero";
import Category from "./components/Category";
import CardBox from "./components/CardBox";
import Reviews from "./components/Reviews";

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
    const response = await axios.get(`${serverUrl}/browse-task`);
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export default function Home() {
  const [category, setCategory] = useState([]);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getCategory().then((res) => {
      setCategory(res);
    });
    getTasks().then((res) => {
      setTasks(res);
    });
    //
  }, []);

  return (
    <>
      <Hero />
      {category.length > 0 && <Category category={category} />}
      {tasks.length > 0 && <Reviews tasks={tasks} />}
      <CardBox />
    </>
  );
}
