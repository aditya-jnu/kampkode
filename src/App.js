import { useState, useEffect } from "react";
import FloatingNav from "./components/ui/floating-navbar";
import MobileNav from './components/ui/mobile-nav';
import StickyScroll from "./components/ui/sticky-scroll-reveal";
import { OrbitingCirclesDemo } from "./components/orbit";
import { OrbitPhone } from "./components/orbitPhone";
export default function App() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "Resources",
      link: "/resources",
    },
    {
      name:'Pricing',
      link:'/pricing'
    }
  ];

  const content = [
    {
      title: "Real Time Changes",
      description:"Copy paste the most trending components and use them in your websites without having to worry about styling and animations.",
      content: <p>This is some content for the introduction.</p>, // Replace with actual React component or node
    },
    {
      title: "Version Control",
      description: "Your Description Here Copy paste the most trending components and use them in your websites without having to worry about styling and animations.",
      content: <p>This is some content for the introduction.</p>, // Replace with actual React component or node
    },
  ];
           

  return (
    <div>
      {windowWidth < 800 ? <MobileNav navItems={navItems}/> : <FloatingNav navItems={navItems}/>}   
      {windowWidth < 800 ?<OrbitPhone/>:<OrbitingCirclesDemo/>}
      <StickyScroll content={content}/>
    </div>
  );
}
