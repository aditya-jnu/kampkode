import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { cn } from "../../utils/cn";

const FloatingNav = ({ navItems = [], className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true); // Start with true for initial render

  useEffect(() => {
    const handleScrollChange = (current) => {
      console.log('Current Scroll:', current);
      console.log('Previous Scroll:', scrollYProgress.getPrevious());
      let direction = current - scrollYProgress.getPrevious();
      console.log('Direction:', direction);

      if (scrollYProgress.get() < 0) {
        setVisible(false);
      } else {
        setVisible(direction < 0);
      }
    };

    scrollYProgress.on('change', handleScrollChange);

    return () => {
      scrollYProgress.clearListeners('change');
    };
  }, [scrollYProgress]);

  console.log("navItems:", navItems); // Debugging

  return (
    <AnimatePresence mode="wait">
      {visible && ( // Only render if visible
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-screen fixed top-5 inset-x-0 border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] py-13.5 px-40 items-center justify-between mx-4",
            className
          )}
        >
        <div>
          <img src="/NAVBAR.png" alt="" />
        </div>

        <div className="flex font-bold gap-8">
          {navItems.map((navItem, idx) => (
            <a
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex   dark:hover:text-neutral-300 hover:text-neutral-500"
              )}
            >
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </a>
          ))}
        </div>

        <div className="flex gap-12px">
          <button className="border text-sm font-medium relative border-customPurple text-customPurple dark:text-white px-4 py-2 rounded-xl">
            <span>Log in</span>
          </button>
          <button className="border text-sm font-medium relative text-white dark:text-white px-4 py-2 rounded-xl bg-customPurple">
            <span>Sign up</span>
          </button>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
