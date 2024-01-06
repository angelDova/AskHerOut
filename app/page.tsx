"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const noButton = document.getElementById(
      "no-button"
    ) as HTMLButtonElement | null;

    const getRandomPosition = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const buttonWidth = noButton?.offsetWidth || 0;
      const buttonHeight = noButton?.offsetHeight || 0;

      const maxX = viewportWidth - buttonWidth;
      const maxY = viewportHeight - buttonHeight;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      return { x: randomX, y: randomY };
    };

    const handleHover = () => {
      if (noButton) {
        const newPosition = getRandomPosition();
        noButton.style.left = `${newPosition.x}px`;
        noButton.style.top = `${newPosition.y}px`;
      }
    };

    if (noButton) {
      noButton.addEventListener("mouseover", handleHover);
    }

    return () => {
      if (noButton) {
        noButton.removeEventListener("mouseover", handleHover);
      }
    };
  }, []);

  const moveButton = () => {
    const noButton = document.getElementById("no-button");

    if (noButton instanceof HTMLElement) {
      const x = Math.random() * (window.innerWidth - noButton.offsetWidth) - 85;
      const y =
        Math.random() * (window.innerHeight - noButton.offsetHeight) - 48;

      noButton.style.left = `${Math.floor(x)}px`;
      noButton.style.top = `${Math.floor(y)}px`;
    }
  };

  const onClick = () => {
    try {
      setIsLoading(true);
      router.push("/yes");
      confetti.onOpen();
      toast.success("She said YES!!!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center h-[100vh] bg-[#A2E5E8] p-24">
      <div className="">
        <h1 className="text-5xl font-bold text-white text-center mt-[20px] mb-0">
          Will you be my girlfriend?
        </h1>
        <div className="flex items-center justify-center">
          <Image
            src={"/images/elly-belly1.gif"}
            alt="Cute animated illustrations"
            height={120}
            width={500}
          />
        </div>
        <div className="flex flex-row justify-center align-center mt-[20px] ml-[20px] space-x-16">
          <Link href={"/yes"}>
            <Button
              className="absolute ml-[-120px]"
              variant={"custom"}
              size={"lg"}
              onClick={onClick}
              disabled={isLoading}
            >
              Yes
            </Button>
          </Link>
          <div className="">
            <Button
              id="no-button"
              className="absolute ml-[15px] transition ease-in hover:duration-500 duration-500"
              variant={"custom"}
              size={"lg"}
              onClick={moveButton}
            >
              No
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
