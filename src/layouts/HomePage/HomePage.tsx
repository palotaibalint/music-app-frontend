import { Carousel } from "./components/Carousel";
import { ExploreMusic } from "./components/ExploreMusic";
import { Heros } from "./components/Heros";

export const HomePage = () => {
  return (
    <>
      <ExploreMusic />
      <Carousel />
      <Heros />
    </>
  );
};
