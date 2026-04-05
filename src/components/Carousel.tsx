import {
  type MouseEvent,
  type ReactNode,
  type UIEvent,
  useRef,
  useState,
} from "react";

type CarouselProps = {
  children: ReactNode;
  itemCount: number;
  className?: string;
  containerClassName?: string;
};

export function Carousel({
  children,
  itemCount,
  className = "",
  containerClassName = "",
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
    carouselRef.current.style.scrollSnapType = "none";
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.scrollSnapType = "x mandatory";
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.scrollSnapType = "x mandatory";
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const currentScrollLeft = container.scrollLeft;

    const cardWidth = (container.firstChild as HTMLElement)?.clientWidth || 0;
    if (cardWidth > 0) {
      let gap = 24;
      if (container.children.length > 1) {
        const first = container.children[0] as HTMLElement;
        const second = container.children[1] as HTMLElement;
        gap = second.offsetLeft - (first.offsetLeft + first.clientWidth);
      }

      const newIndex = Math.round(currentScrollLeft / (cardWidth + gap));
      setActiveIndex(newIndex);
    }
  };

  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = (container.firstChild as HTMLElement)?.clientWidth || 0;
    if (cardWidth > 0) {
      let gap = 24;
      if (container.children.length > 1) {
        const first = container.children[0] as HTMLElement;
        const second = container.children[1] as HTMLElement;
        gap = second.offsetLeft - (first.offsetLeft + first.clientWidth);
      }
      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className={containerClassName}>
      <div
        ref={carouselRef}
        className={`flex overflow-x-auto snap-x snap-mandatory overscroll-x-contain cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${className}`}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </div>

      <div className="mt-4 flex justify-center gap-2 md:hidden">
        {Array.from({ length: itemCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-8 bg-primary"
                : "w-4 bg-outline-variant/30 hover:bg-outline-variant/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
