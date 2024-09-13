'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Move } from "lucide-react"
import Image from 'next/image'

const slides = [
  {
    image: "/images/gaming.jpg",
    title: "Gaming Community",
    description: "Join our vibrant community of gamers. Share strategies, find teammates, and level up together!"
  },
  {
    image: "/images/tech.jpg",
    title: "Tech Enthusiasts",
    description: "Connect with fellow developers, designers, and tech enthusiasts. Collaborate on projects and stay updated with the latest trends."
  },
  {
    image: "/images/creative.jpg",
    title: "Creative Arts",
    description: "A space for artists, musicians, and creators to share their work, get feedback, and find inspiration."
  }
]

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLiveStreamOnline, setIsLiveStreamOnline] = useState(true);
  const [isPositionSet, setIsPositionSet] = useState(false);
  const [viewerCount, setViewerCount] = useState(1);
  const [streamTitle, setStreamTitle] = useState("iamVIZZI is streaming");
  const [streamCategory, setStreamCategory] = useState("Just Chatting");
  const dragRef = useRef(null);

  const nextSlide = useCallback(() => {
    if (!isPaused) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }
  }, [isPaused])

  useEffect(() => {
    const timer = setInterval(nextSlide, 2000)
    return () => clearInterval(timer)
  }, [nextSlide])

  useEffect(() => {
    const updatePosition = () => {
      setPosition({
        x: window.innerWidth - 420,
        y: window.innerHeight - 245  // 225 (height) + 20 (bottom margin)
      });
      setIsPositionSet(true);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  useEffect(() => {
    const fetchStreamInfo = async () => {
      try {
        const response = await fetch('https://kick.com/api/v1/channels/iamvizzi');
        const data = await response.json();
        setIsLiveStreamOnline(data.livestream !== null);
        if (data.livestream) {
          setViewerCount(data.livestream.viewer_count);
          setStreamTitle(data.livestream.session_title);
          setStreamCategory(data.livestream.categories[0]?.name || "Just Chatting");
        }
      } catch (error) {
        console.error('Error fetching stream info:', error);
      }
    };

    fetchStreamInfo();
    const intervalId = setInterval(fetchStreamInfo, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const startX = e.pageX - position.x;
    const startY = e.pageY - position.y;

    const handleMouseMove = (e) => {
      setPosition({
        x: Math.max(0, Math.min(e.pageX - startX, window.innerWidth - 420)),
        y: Math.max(0, Math.min(e.pageY - startY, window.innerHeight - 245))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!isLiveStreamOnline) {
    return null;
  }

  return (
    <div className="DuelGambleMainContainer flex min-h-screen bg-white" itemScope itemType="https://schema.org/WebPage">
      <main className="DuelGambleContentWrapper flex flex-col md:flex-row w-full h-screen">
        <section className="DuelGambleLeftSection md:w-1/2 relative" aria-label="Community Highlights">
          <a 
            href="https://discord.gg/Z3ESnvwAK4" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="DuelGambleDiscordLink absolute top-8 right-8 bg-white rounded-lg px-6 py-2 flex items-center text-sm z-10 shadow-md border border-gray-300 hover:bg-gray-500/30 hover:text-gray-700 hover:border-gray-500/50 transition-colors duration-300 cursor-pointer animate-none sm:animate-float"
          >
            discord.gg/DuelGamble 
            <ArrowUpRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </a>
          <div 
            className="DuelGambleSliderContainer relative h-full p-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-4 left-4 right-4 bottom-4 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={`Discord Community ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8 rounded-b-3xl">
                  <h2 className="DuelGambleSlideTitle text-2xl font-bold mb-2 text-white" itemProp="headline">{slide.title}</h2>
                  <p className="DuelGambleSlideDescription text-sm mb-4 text-white" itemProp="description">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="DuelGambleSliderDots absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </section>
        <section className="DuelGambleRightSection md:w-1/2 p-8 md:p-12 flex flex-col justify-center" aria-label="Join Our Community">
          <h1 className="DuelGambleMainTitle text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[#5865F2] text-center mx-auto max-w-3xl px-4 font-sf-pro leading-tight" itemProp="headline">
            You've been invited<br className="hidden sm:inline" /> to Discord!
          </h1>
          <h2 className="DuelGambleSubtitle text-2xl sm:text-3xl md:text-3xl font-semibold mb-4 text-center leading-tight">
            Join DuelGamble<br className="hidden sm:inline" /> Community
          </h2>
          <p className="DuelGambleDescription text-gray-600 mb-8 text-center mx-auto max-w-2xl" itemProp="description">
            Connect with like-minded individuals in our Discord server.
          </p>
          <Button 
            className="DuelGambleDiscordButton w-full mb-4 bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors rounded-lg"
            onClick={() => window.open('https://discord.gg/Z3ESnvwAK4', '_blank')}
          >
            <svg className="DuelGambleDiscordIcon w-6 h-6 mr-2" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="#ffffff"/>
            </svg>
            Continue with Discord
          </Button>
          <Button 
            className="DuelGambleWebsiteButton group w-full mb-4 bg-gray-100 text-gray-800 border border-gray-300 transition-colors duration-300 ease-in-out hover:bg-gray-500/30 hover:text-gray-700 hover:border-gray-500/30 rounded-lg"
            variant="outline"
            onClick={() => window.open('https://duelgamble.com', '_blank')}
          >
            <ArrowUpRight className="DuelGambleArrowIcon w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
            Visit Our Website
          </Button>
          <div 
            ref={dragRef}
            className="DuelGambleLiveStream absolute cursor-move group"
            style={{
              top: `${position.y}px`,
              left: `${position.x}px`,
              zIndex: 1000,
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="relative w-[400px] h-[225px] overflow-hidden rounded-xl border-2 border-gray-300 shadow-md">
              <div className="absolute top-0 left-0 w-full h-8 bg-gray-800 bg-opacity-50 flex items-center justify-between px-2 cursor-move">
                <span className="text-white text-sm font-semibold">Live Stream</span>
                <Move className="w-5 h-5 text-white" />
              </div>
              <iframe 
                src="https://player.kick.com/iamvizzi?autoplay=true" 
                height="100%"
                width="100%"
                frameBorder="0" 
                scrolling="no" 
                allowFullScreen={true}
                title="FeralGirl Live Stream"
                className="rounded-b-xl"
              > 
              </iframe>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-xl transition-colors duration-300 pointer-events-none"></div>
            </div>
          </div>
          <div className="DuelGambleCopyright text-center text-sm text-gray-500 mt-4 font-sf-pro">
            ©2024 <a href="https://duelgamble.com" className="text-black font-bold hover:text-[#5865F2] transition-colors duration-300">DUELGAMBLE.COM</a>
          </div>
        </section>
      </main>
    </div>
  )
}