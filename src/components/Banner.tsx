import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

 // 打字机效果组件
 function Typewriter({
   texts,
   typingSpeed = 100,
   deletingSpeed = 50,
   pauseTime = 2000,
   transitionDelay = 1000,
   className = ""
 }: {
   texts: string[];
   typingSpeed?: number;
   deletingSpeed?: number;
   pauseTime?: number;
   transitionDelay?: number;
   className?: string;
 }) {
   const [currentTextIndex, setCurrentTextIndex] = useState(0);
   const [displayedText, setDisplayedText] = useState("");
   const [isDeleting, setIsDeleting] = useState(false);
   const [isPausing, setIsPausing] = useState(false);
 
   useEffect(() => {
     let timer: number;
 
     if (!isDeleting && displayedText === texts[currentTextIndex]) {
       // 完成打字，开始暂停
       setIsPausing(true);
       timer = window.setTimeout(() => {
         setIsDeleting(true);
         setIsPausing(false);
       }, pauseTime);
        } else if (isDeleting && displayedText === "") {
          // 完成删除，停留1秒后切换到下一个文本
          timer = window.setTimeout(() => {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }, 1000); // 停留1秒
     } else if (!isDeleting && !isPausing) {
       // 正在打字
       timer = window.setTimeout(() => {
         setDisplayedText(
           texts[currentTextIndex].substring(0, displayedText.length + 1)
         );
       }, typingSpeed);
     } else if (isDeleting && !isPausing) {
       // 正在删除
       timer = window.setTimeout(() => {
         setDisplayedText(
           texts[currentTextIndex].substring(0, displayedText.length - 1)
         );
       }, deletingSpeed);
     }
 
     return () => window.clearTimeout(timer);
   }, [
     displayedText,
     isDeleting,
     isPausing,
     currentTextIndex,
     texts,
     typingSpeed,
     deletingSpeed,
     pauseTime,
     transitionDelay
   ]);
 
   return (
     <motion.h1
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: "easeOut" }}
       className={className}
     >
        {displayedText}
        <span className={`cursor ${(isDeleting && displayedText === "") ? 'slide-transition' : ''}`} aria-hidden="true"></span>
      
       {/* Scroll indicator */}
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1, y: [0, 8, 0] }}
         transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeInOut" }}
         className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-center"
       >
         <p className="mb-2 text-xs tracking-wider">向下滚动探索更多</p>
         <i className="fa-solid fa-chevron-down text-xs"></i>
       </motion.div>
     </motion.h1>
   );
 }

export default function Banner({ title, subtitle, ctaText, ctaLink, imageUrl }: BannerProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover brightness-90"
        />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      {/* 装饰元素 */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      
       {/* 打字机效果组件 */}
        <style jsx>{`

         
         @keyframes fadeOutUp {
           from {
             opacity: 1;
             transform: translateY(0);
           }
           to {
             opacity: 0;
             transform: translateY(-10px);
           }
         }
         
         @keyframes fadeInDown {
           from {
             opacity: 0;
             transform: translateY(10px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }
         
         .cursor {
           display: inline-block;
           margin-left: 0.2em;
           width: 0.8em;
           height: 0.8em;
           border-radius: 50%;
           background-color: currentColor;
           vertical-align: middle;
           position: relative;
           margin-top: -0.1em;
           transition: all 0.3s ease;
         }
         

         
         .cursor.slide-transition {
           animation: fadeOutUp 0.3s forwards, fadeInDown 0.3s 0.7s forwards;
         }
       `}</style>
       
       {/* Content */}
       <div className="relative z-10 h-full flex items-center">
         <div className="container mx-auto px-4">
           <div className="max-w-2xl mx-auto text-center">
             <Typewriter 
               texts={[
                 "精致甜品，点亮您的特别时刻",
                 "匠心制作，每一口都是艺术",
                 "为您的庆典增添甜蜜回忆",
                 "定制专属甜品台，打造独特体验"
               ]}
               typingSpeed={80}
               deletingSpeed={50}
               pauseTime={2000}
               transitionDelay={500}
               className="text-3xl md:text-5xl font-light tracking-tight mb-6 leading-tight text-white"
             />
            
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
               className="text-lg md:text-xl mb-10 text-white/90 max-w-xl mx-auto"
             >
               {subtitle}
             </motion.p>
             
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
             >
                <Link 
                   to={ctaLink}
                   className="bg-gradient-to-r from-black/80 to-black text-white hover:from-black hover:to-gray-900 px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-md transform hover:scale-[1.02]"
               >
                 {ctaText}
                 <i className="fa-solid fa-arrow-right ml-2"></i>
               </Link>
             </motion.div>
           </div>
         </div>
       </div>
     </section>
   );
 }