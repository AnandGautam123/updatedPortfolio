import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Enhanced global styles with better mobile support
  useEffect(() => {
    const globalStyles = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html, body {
        overflow-x: hidden;
        scroll-behavior: smooth;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: rgba(11, 11, 23, 0.3);
      }

      ::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #09FFE3, #EE4266);
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, #EE4266, #09FFE3);
      }

      /* Enhanced mobile-specific styles */
      @media (max-width: 768px) {
        .cursor-tracker {
          display: none !important;
        }

        /* Optimize text readability on mobile */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-size: 16px;
        }

        /* Prevent zoom on input focus */
        input, textarea, select {
          font-size: 16px !important;
          border-radius: 8px !important;
        }

        /* Touch-friendly interactive elements */
        button, a {
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Performance optimizations for mobile */
        .particle-system circle {
          animation-duration: 4s !important;
        }

        .neural-network line {
          stroke-width: 0.5px !important;
        }
      }

      /* Tablet specific optimizations */
      @media (min-width: 769px) and (max-width: 1024px) {
        .skills-grid, .projects-grid {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
        }
      }

      /* Accessibility improvements */
      *:focus {
        outline: 2px solid #09FFE3;
        outline-offset: 2px;
      }

      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* Force hardware acceleration for smooth animations */
      .will-change-transform {
        will-change: transform;
        transform: translateZ(0);
        backface-visibility: hidden;
      }
    `;

    const styleElement = document.createElement("style");
    styleElement.textContent = globalStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui", overflowX: "hidden" }}>
      <CursorTracker mousePosition={mousePosition} />
      <Navbar />
      <HeroSection mousePosition={mousePosition} />
      <SkillsConstellation />
      <ExperienceTimeline />
      <EducationOrbit />
      <AchievementsGrid />
      <ProjectsGalaxy />
      <ContactTerminal />
      <Footer />
    </div>
  );
}

// Enhanced Cursor Tracker (desktop only)
function CursorTracker({ mousePosition }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="cursor-tracker"
      style={{
        position: "fixed",
        left: mousePosition.x - 20,
        top: mousePosition.y - 20,
        width: 40,
        height: 40,
        background: "radial-gradient(circle, rgba(9,255,227,0.3) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "screen"
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
}

// Enhanced Responsive Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { label: "Home", anchor: "#home" },
    { label: "Skills", anchor: "#skills" },
    { label: "Experience", anchor: "#experience" },
    { label: "Education", anchor: "#education" },
    { label: "Achievements", anchor: "#achievements" },
    { label: "Projects", anchor: "#projects" },
    { label: "Contact", anchor: "#contact" }
  ];

  const handleNavClick = (anchor) => {
    setMobileMenuOpen(false);
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        background: scrolled 
          ? "rgba(11, 11, 23, 0.9)" 
          : "transparent",
        borderBottom: scrolled ? "1px solid rgba(9,255,227,0.1)" : "none",
        transition: "all 0.3s ease"
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: isMobile ? "1rem 1.5rem" : "1rem 2rem",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <motion.div
          style={{
            fontSize: isMobile ? "1.3rem" : "1.5rem",
            fontWeight: "700",
            background: "linear-gradient(45deg, #09FFE3, #0F83FF, #EE4266)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: "2px"
          }}
          whileHover={{ scale: 1.05 }}
        >
          ANAND.DEV
        </motion.div>
        
        {/* Desktop Menu */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.anchor}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.anchor);
                }}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  position: "relative",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(9,255,227,0.1)"
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "linear-gradient(90deg, #09FFE3, #EE4266)",
                    borderRadius: "2px",
                    scaleX: 0,
                    transformOrigin: "left"
                  }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <motion.button
            style={{
              background: "none",
              border: "none",
              color: "#09FFE3",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.5rem",
              minHeight: "44px",
              minWidth: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </motion.button>
        )}
      </div>

      {/* Enhanced Mobile Menu */}
      {isMobile && (
        <motion.div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(11, 11, 23, 0.98)",
            backdropFilter: "blur(20px)",
            display: mobileMenuOpen ? "block" : "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.anchor}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.anchor);
              }}
              style={{
                display: "block",
                color: "#fff",
                textDecoration: "none",
                padding: "1.2rem 2rem",
                borderBottom: "1px solid rgba(9,255,227,0.1)",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500"
              }}
              whileHover={{ backgroundColor: "rgba(9,255,227,0.1)" }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

// Enhanced Hero Section
function HeroSection({ mousePosition }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "50%" : "100%"]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Optimized particle system
  const particles = useMemo(() => 
    Array.from({ length: isMobile ? 50 : 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isMobile ? 2 : 3) + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.8 + 0.2
    })), [isMobile]
  );

  // Optimized neural network
  const connections = useMemo(() => {
    const nodes = [];
    const nodeCount = isMobile ? 8 : 20;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        connections: Math.floor(Math.random() * 3) + 1
      });
    }
    return nodes;
  }, [isMobile]);

  return (
    <motion.section
      ref={containerRef}
      id="home"
      style={{
        height: "100vh",
        background: "radial-gradient(ellipse at center, #0B0B17 0%, #000000 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "0 1.5rem" : "0 2rem"
      }}
    >
      {/* Animated Background */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(9,255,227,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(238,66,102,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(15,131,255,0.05) 0%, transparent 50%)
          `,
          y: backgroundY
        }}
      />

      {/* Optimized Particle System */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} className="particle-system">
        {particles.map((particle) => (
          <motion.circle
            key={particle.id}
            cx={`${particle.x}%`}
            cy={`${particle.y}%`}
            r={particle.size}
            fill="#09FFE3"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
              scale: [1, 1.5, 1],
              y: [0, -20, 0]
            }}
            transition={{
              duration: isMobile ? 4 : 3 + particle.speed * 2,
              repeat: Infinity,
              delay: particle.id * (isMobile ? 0.05 : 0.1)
            }}
          />
        ))}
        
        {/* Neural Network */}
        <g className="neural-network">
          {connections.map((node, index) => (
            <g key={index}>
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={isMobile ? "2" : "3"}
                fill="#EE4266"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
              {index < connections.length - 1 && (
                <motion.line
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${connections[index + 1].x}%`}
                  y2={`${connections[index + 1].y}%`}
                  stroke="rgba(9,255,227,0.2)"
                  strokeWidth={isMobile ? "0.5" : "1"}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              )}
            </g>
          ))}
        </g>
      </svg>

      {/* Main Content */}
      <motion.div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 10,
          y: textY,
          width: "100%",
          maxWidth: isMobile ? "100%" : "900px"
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            background: "rgba(11, 11, 23, 0.4)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(9,255,227,0.2)",
            borderRadius: isMobile ? "16px" : "20px",
            padding: isMobile ? "2rem 1.5rem" : "3rem",
            margin: "0 auto"
          }}
        >
          <motion.h1
            style={{
              fontSize: isMobile ? "2.5rem" : "clamp(3rem, 8vw, 5rem)",
              fontWeight: "800",
              background: "linear-gradient(45deg, #09FFE3 0%, #0F83FF 50%, #EE4266 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              margin: "0 0 1rem 0",
              letterSpacing: isMobile ? "-1px" : "-2px",
              lineHeight: "1.1"
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            ANAND GAUTAM
          </motion.h1>
          
          <motion.div
            style={{
              fontSize: isMobile ? "1rem" : "1.2rem",
              color: "#09FFE3",
              marginBottom: "2rem",
              fontWeight: "500",
              lineHeight: "1.4"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <TypewriterText text="DevOps Engineer • Cloud Architect • Infrastructure Specialist" />
          </motion.div>

          <motion.p
            style={{
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              color: "rgba(255,255,255,0.8)",
              lineHeight: "1.6",
              marginBottom: "3rem",
              maxWidth: isMobile ? "100%" : "600px",
              margin: "0 auto 3rem auto"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Skilled in automating scalable and secure infrastructure using Docker, Kubernetes, Terraform across AWS, GCP, and Azure. 
            Building CI/CD pipelines and implementing DevSecOps practices.
          </motion.p>

          <motion.div
            style={{ 
              display: "flex", 
              gap: isMobile ? "1rem" : "1.5rem", 
              justifyContent: "center", 
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <ProfessionalButton href="#projects" primary isMobile={isMobile}>
              View Projects
            </ProfessionalButton>
            <ProfessionalButton href="https://drive.google.com/file/d/1kPmbdDOIaX5X2ToV2MDOi43evFbp0BEZ/view?usp=sharing" isMobile={isMobile}>
              Download Resume
            </ProfessionalButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem"
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>SCROLL</span>
        <div style={{
          width: "2px",
          height: "30px",
          background: "linear-gradient(to bottom, #09FFE3, transparent)",
          borderRadius: "2px"
        }} />
      </motion.div>
    </motion.section>
  );
}

// Typewriter Effect Component
function TypewriterText({ text }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span>{displayText}<span style={{ opacity: 0.5 }}>|</span></span>;
}

// Enhanced Professional Button Component
function ProfessionalButton({ children, href, primary = false, isMobile = false }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel={href.startsWith("http") ? "noopener noreferrer" : ""}
      style={{
        display: "block",
        padding: isMobile ? "1rem 2rem" : "1rem 2rem",
        fontSize: isMobile ? "1rem" : "1rem",
        fontWeight: "600",
        textDecoration: "none",
        borderRadius: "12px",
        border: primary ? "none" : "2px solid rgba(9,255,227,0.3)",
        background: primary 
          ? "linear-gradient(45deg, #09FFE3, #0F83FF)" 
          : "rgba(9,255,227,0.1)",
        color: primary ? "#000" : "#09FFE3",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        minWidth: isMobile ? "100%" : "150px",
        textAlign: "center",
        minHeight: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      whileHover={{
        scale: isMobile ? 1.02 : 1.05,
        boxShadow: primary 
          ? "0 10px 40px rgba(9,255,227,0.4)" 
          : "0 10px 40px rgba(9,255,227,0.2)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: primary 
            ? "linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)"
            : "linear-gradient(45deg, transparent, rgba(9,255,227,0.1), transparent)",
          transform: "translateX(-100%)"
        }}
        whileHover={{
          transform: "translateX(100%)"
        }}
        transition={{ duration: 0.6 }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.a>
  );
}

// Enhanced Skills Section - Mobile Optimized
function SkillsConstellation() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skills = [
    { name: "Java", category: "Programming", icon: "☕" },
    { name: "Golang", category: "Programming", icon: "🐹" },
    { name: "JavaScript", category: "Programming", icon: "🟨" },
    { name: "SQL", category: "Database", icon: "🗃️" },
    { name: "React.js", category: "Frontend", icon: "⚛️" },
    { name: "Node.js", category: "Backend", icon: "💚" },
    { name: "Express.js", category: "Backend", icon: "🚂" },
    { name: "MongoDB", category: "Database", icon: "🍃" },
    { name: "Docker", category: "Containerization", icon: "🐳" },
    { name: "Kubernetes", category: "Orchestration", icon: "⚙️" },
    { name: "AWS", category: "Cloud", icon: "☁️" },
    { name: "GCP", category: "Cloud", icon: "🌍" },
    { name: "Azure", category: "Cloud", icon: "🔷" },
    { name: "Terraform", category: "IaC", icon: "🏗️" },
    { name: "Jenkins", category: "CI/CD", icon: "🔧" },
    { name: "GitLab CI", category: "CI/CD", icon: "🚀" },
    { name: "Git", category: "Version Control", icon: "📂" },
    { name: "Ansible", category: "Automation", icon: "🤖" },
    { name: "Helm", category: "Package Manager", icon: "⛵" },
    { name: "Prometheus", category: "Monitoring", icon: "📊" },
    { name: "Grafana", category: "Visualization", icon: "📈" },
    { name: "Loki", category: "Logging", icon: "📋" },
    { name: "ZAP", category: "Security", icon: "🔒" },
    { name: "SonarQube", category: "Code Quality", icon: "🔍" },
    { name: "Figma", category: "Design", icon: "🎨" }
  ];

  const categoryColors = {
    "Programming": "#FF6B6B",
    "Frontend": "#4ECDC4",
    "Backend": "#45B7D1",
    "Database": "#96CEB4",
    "Containerization": "#FFEAA7",
    "Orchestration": "#DDA0DD",
    "Cloud": "#74B9FF",
    "IaC": "#FD79A8",
    "CI/CD": "#FDCB6E",
    "Version Control": "#6C5CE7",
    "Automation": "#A29BFE",
    "Package Manager": "#FD79A8",
    "Monitoring": "#00B894",
    "Visualization": "#E17055",
    "Logging": "#81ECEC",
    "Security": "#FF7675",
    "Code Quality": "#FDCB6E",
    "Design": "#A29BFE"
  };

  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true });

  return (
    <section
      ref={containerRef}
      id="skills"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0B0B17 0%, #1A1A2E 100%)",
        padding: isMobile ? "3rem 1.5rem" : "5rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <motion.h2
        style={{
          fontSize: isMobile ? "2rem" : "3rem",
          fontWeight: "800",
          textAlign: "center",
          marginBottom: isMobile ? "2.5rem" : "4rem",
          background: "linear-gradient(45deg, #09FFE3, #EE4266)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        TECHNICAL EXPERTISE
      </motion.h2>

      <div 
        className="skills-grid"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile 
            ? "repeat(2, 1fr)" 
            : "repeat(auto-fit, minmax(200px, 1fr))",
          gap: isMobile ? "1rem" : "2rem",
          maxWidth: "1400px",
          margin: "0 auto"
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            style={{
              background: "rgba(11, 11, 23, 0.6)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${categoryColors[skill.category]}40`,
              borderRadius: "16px",
              padding: isMobile ? "1rem 0.5rem" : "1.5rem",
              position: "relative",
              overflow: "hidden",
              minHeight: isMobile ? "100px" : "120px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            whileHover={{
              scale: isMobile ? 1.02 : 1.05,
              boxShadow: `0 20px 60px ${categoryColors[skill.category]}20`
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: categoryColors[skill.category],
                scaleX: 0,
                transformOrigin: "left"
              }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: index * 0.05 + 0.5 }}
            />
            
            <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: isMobile ? "1.5rem" : "2rem" }}>{skill.icon}</span>
            </div>
            
            <h3 style={{
              fontSize: isMobile ? "0.85rem" : "1.2rem",
              fontWeight: "700",
              color: categoryColors[skill.category],
              marginBottom: "0.2rem",
              textAlign: "center",
              lineHeight: "1.2"
            }}>
              {skill.name}
            </h3>
            
            <div style={{
              fontSize: isMobile ? "0.7rem" : "0.8rem",
              color: "rgba(255,255,255,0.7)",
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              {skill.category}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Enhanced Experience Timeline - Mobile Optimized
function ExperienceTimeline() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const experiences = [
    {
      role: "Assistant Software Engineer – DevOps",
      company: "WITS Innovation Lab",
      period: "June 2025 – Present",
      location: "India",
      details: [
        "Orchestrated automation of CI/CD pipelines using GitLab CI, reducing deployment time by 60%",
        "Designed & provisioned cloud-native infrastructure using Terraform on AWS, GCP, and Azure",
        "Deployed centralized monitoring and alerting systems with Prometheus, Grafana, and Loki, reducing incident resolution time by 40%",
        "Integrated Helm charts for streamlined deployment of microservices, enhancing release consistency",
        "Documented workflows, setup steps, and troubleshooting guides for team knowledge sharing"
      ]
    },
    {
      role: "Intern - Software Engineering (DevOps)",
      company: "WITS Innovation Lab",
      period: "Dec 2024 – June 2025",
      location: "India",
      details: [
        "Constructed CI/CD pipelines with integrated security and quality gates (ZAP, SonarQube)",
        "Containerized services using Docker and Docker Compose for consistent environments",
        "Managed infrastructure using Terraform and Ansible to deploy scalable AWS environments",
        "Set up real-time logging and alerting with Grafana and Loki to improve observability"
      ]
    }
  ];

  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true });

  return (
    <section
      ref={containerRef}
      id="experience"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
        padding: isMobile ? "3rem 1.5rem" : "5rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <motion.h2
        style={{
          fontSize: isMobile ? "2rem" : "3rem",
          fontWeight: "800",
          textAlign: "center",
          marginBottom: isMobile ? "2.5rem" : "4rem",
          background: "linear-gradient(45deg, #EE4266, #09FFE3)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        PROFESSIONAL EXPERIENCE
      </motion.h2>

      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative" }}>
        {/* Timeline line - Desktop only */}
        {!isMobile && (
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: "0",
              bottom: "0",
              width: "2px",
              background: "linear-gradient(to bottom, #09FFE3, #EE4266)",
              transform: "translateX(-50%)"
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5 }}
          />
        )}

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: index < experiences.length - 1 ? (isMobile ? "2rem" : "4rem") : "0",
              position: "relative",
              flexDirection: isMobile ? "column" : "row"
            }}
            initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -100 : 100) }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.3 }}
          >
            {/* Timeline dot - Desktop only */}
            {!isMobile && (
              <motion.div
                style={{
                  position: "absolute",
                  left: "50%",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: index === 0 ? "#09FFE3" : "#EE4266",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  boxShadow: `0 0 20px ${index === 0 ? "#09FFE3" : "#EE4266"}`
                }}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.3 + 0.5 }}
              />
            )}

            {/* Content */}
            <motion.div
              style={{
                width: isMobile ? "100%" : "45%",
                marginLeft: isMobile ? "0" : (index % 2 === 0 ? "0" : "55%"),
                background: "rgba(11, 11, 23, 0.8)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${index === 0 ? "#09FFE3" : "#EE4266"}40`,
                borderRadius: "16px",
                padding: isMobile ? "1.5rem" : "2rem"
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 20px 60px ${index === 0 ? "#09FFE3" : "#EE4266"}20`
              }}
            >
              <h3 style={{
                fontSize: isMobile ? "1.2rem" : "1.5rem",
                fontWeight: "700",
                color: index === 0 ? "#09FFE3" : "#EE4266",
                marginBottom: "0.5rem",
                lineHeight: "1.3"
              }}>
                {exp.role}
              </h3>
              
              <div style={{
                fontSize: isMobile ? "1rem" : "1.1rem",
                color: "#62D6E8",
                fontWeight: "600",
                marginBottom: "0.5rem"
              }}>
                {exp.company} • {exp.location}
              </div>
              
              <div style={{
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                color: "rgba(255,255,255,0.7)",
                marginBottom: "1.5rem"
              }}>
                {exp.period}
              </div>
              
              <ul style={{ paddingLeft: "1.5rem", color: "rgba(255,255,255,0.9)" }}>
                {exp.details.map((detail, i) => (
                  <li key={i} style={{ 
                    marginBottom: "0.8rem", 
                    lineHeight: "1.5",
                    fontSize: isMobile ? "0.9rem" : "1rem"
                  }}>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Enhanced Education Section - Mobile Optimized
function EducationOrbit() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const education = [
    { period: "2021-2025", degree: "B.E. Computer Science", school: "Chitkara University, Punjab" },
    { period: "2019-2021", degree: "XIIth", school: "Delhi Public School, Korba, Chhattisgarh" },
    { period: "2017-2019", degree: "Xth", school: "Sri Chaitanya Vidya Niketan, Visakhapatnam" }
  ];

  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true });

  return (
    <section
      ref={containerRef}
      id="education"
      style={{
        minHeight: isMobile ? "auto" : "60vh",
        background: "linear-gradient(135deg, #0B0B17 0%, #1A1A2E 100%)",
        padding: isMobile ? "3rem 1.5rem" : "4rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <motion.h2
        style={{
          fontSize: isMobile ? "2rem" : "2.5rem",
          fontWeight: "800",
          textAlign: "center",
          marginBottom: isMobile ? "2rem" : "3rem",
          background: "linear-gradient(45deg, #62D6E8, #09FFE3)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        EDUCATION
      </motion.h2>

      <div style={{
        display: isMobile ? "flex" : "grid",
        flexDirection: isMobile ? "column" : "row",
        gridTemplateColumns: isMobile ? "none" : "repeat(auto-fit, minmax(280px, 1fr))",
        gap: isMobile ? "1.5rem" : "2rem",
        maxWidth: "1000px",
        margin: "0 auto",
        width: "100%"
      }}>
        {education.map((edu, index) => (
          <motion.div
            key={index}
            style={{
              background: "rgba(11, 11, 23, 0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(98,214,232,0.3)",
              borderRadius: "12px",
              padding: isMobile ? "1.2rem" : "1.5rem",
              position: "relative",
              overflow: "hidden"
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 15px 40px rgba(98,214,232,0.2)"
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "3px",
                background: "linear-gradient(90deg, #62D6E8, #09FFE3)",
                scaleX: 0,
                transformOrigin: "left"
              }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
            />
            
            <div style={{
              fontSize: isMobile ? "0.9rem" : "1rem",
              fontWeight: "700",
              color: "#EE4266",
              marginBottom: "0.5rem"
            }}>
              {edu.period}
            </div>
            
            <h3 style={{
              fontSize: isMobile ? "1.1rem" : "1.3rem",
              fontWeight: "700",
              color: "#09FFE3",
              marginBottom: "0.5rem",
              lineHeight: "1.3"
            }}>
              {edu.degree}
            </h3>
            
            <div style={{
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              color: "rgba(255,255,255,0.7)",
              lineHeight: "1.4"
            }}>
              {edu.school}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Enhanced Achievements Section - Mobile Optimized
function AchievementsGrid() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const achievements = [
    "Received the Emerging Heroes Award at WITS Innovation Lab's annual event for exceptional growth, initiative, and impact."
  ];

  const certifications = [
    "Gemini for Cloud Architects",
    "Gemini for Security Engineers", 
    "Gemini for Network Engineers",
    "MLOps for Generative AI",
    "AWS Academy Graduate - Cloud Foundations"
  ];

  const extraCurricular = [
    "Regular participant in weekly badminton and football sessions at WITS Innovation Lab",
    "Active gamer with interest in strategic, multiplayer, and simulation games",
    "Contributing to open-source DevOps projects and documentation"
  ];

  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true });

  return (
    <section
      ref={containerRef}
      id="achievements"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
        padding: isMobile ? "3rem 1.5rem" : "5rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <motion.div
        style={{ textAlign: "center", marginBottom: isMobile ? "2.5rem" : "4rem" }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          style={{
            fontSize: isMobile ? "2rem" : "3rem",
            fontWeight: "800",
            background: "linear-gradient(45deg, #FFD600, #09FFE3)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "1rem"
          }}
        >
          ACHIEVEMENTS & CERTIFICATIONS
        </motion.h2>
        
        <motion.div
          style={{ fontSize: isMobile ? "2rem" : "3rem" }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🏆
        </motion.div>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(350px, 1fr))",
        gap: isMobile ? "2rem" : "3rem",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {/* Achievements Card */}
        <motion.div
          style={{
            background: "rgba(11, 11, 23, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,214,0,0.3)",
            borderRadius: "20px",
            padding: isMobile ? "1.5rem" : "2.5rem",
            position: "relative"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 70px rgba(255,214,0,0.2)"
          }}
        >
          <h3 style={{
            fontSize: isMobile ? "1.3rem" : "1.8rem",
            fontWeight: "700",
            color: "#FFD600",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap"
          }}>
            🏅 Achievements
          </h3>
          
          <ul style={{ paddingLeft: "1.5rem" }}>
            {achievements.map((achievement, i) => (
              <motion.li
                key={i}
                style={{
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: "1.6",
                  fontSize: isMobile ? "0.95rem" : "1.1rem",
                  marginBottom: "1rem"
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2 + 0.5 }}
              >
                {achievement}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Certifications Card */}
        <motion.div
          style={{
            background: "rgba(11, 11, 23, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(9,255,227,0.3)",
            borderRadius: "20px",
            padding: isMobile ? "1.5rem" : "2.5rem",
            position: "relative"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 70px rgba(9,255,227,0.2)"
          }}
        >
          <h3 style={{
            fontSize: isMobile ? "1.3rem" : "1.8rem",
            fontWeight: "700",
            color: "#09FFE3",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap"
          }}>
            🎓 Certifications
          </h3>
          
          <ul style={{ paddingLeft: "1.5rem" }}>
            {certifications.map((cert, i) => (
              <motion.li
                key={i}
                style={{
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: "1.6",
                  fontSize: isMobile ? "0.95rem" : "1.1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem"
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.7 }}
              >
                <span>🥇</span> {cert}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Extra-Curricular Card */}
        <motion.div
          style={{
            background: "rgba(11, 11, 23, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(238,66,102,0.3)",
            borderRadius: "20px",
            padding: isMobile ? "1.5rem" : "2.5rem",
            position: "relative"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 25px 70px rgba(238,66,102,0.2)"
          }}
        >
          <h3 style={{
            fontSize: isMobile ? "1.3rem" : "1.8rem",
            fontWeight: "700",
            color: "#EE4266",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap"
          }}>
            🎯 Extra-Curricular
          </h3>
          
          <ul style={{ paddingLeft: "1.5rem" }}>
            {extraCurricular.map((activity, i) => (
              <motion.li
                key={i}
                style={{
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: "1.6",
                  fontSize: isMobile ? "0.95rem" : "1.1rem",
                  marginBottom: "1rem"
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.9 }}
              >
                {activity}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

// Enhanced Projects Section - Mobile Optimized
function ProjectsGalaxy() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projects = [
    { 
      name: "Marblex", 
      stack: "GitLab, GCP, NGINX", 
      desc: "Implemented GitLab CI/CD for building, testing, and deploying a Next.js app with NGINX for production and domain routing.", 
      link: "", 
      category: "DevOps" 
    },
    { 
      name: "Test Automation Suite", 
      stack: "GCP, Docker, Kubernetes, NGINX", 
      desc: "Automated frontend/API testing with GitLab CI/CD and scheduled cron jobs. Hosted test reports via NGINX.", 
      link: "", 
      category: "DevOps" 
    },
    { 
      name: "Pipeline Modernization", 
      stack: "GitLab CI/CD, Docker, Compose, NGINX", 
      desc: "Centralized CI/CD strategy using GitLab shared templates. Standardized naming conventions and deployment logic.", 
      link: "", 
      category: "DevOps" 
    },
    { 
      name: "DevOps 2.0", 
      stack: "Terraform, K8s, Ansible, Helm, AWS/GCP", 
      desc: "Executed DevOps roadmap across hybrid cloud. Developed reusable Terraform modules for clusters, gateways, and SSL.", 
      link: "", 
      category: "DevOps" 
    },
    { 
      name: "NewsPulse", 
      stack: "React", 
      desc: "Modern responsive news site built with React for optimal user experience and performance.", 
      link: "https://github.com/AnandGautam123/projects.git", 
      category: "Frontend" 
    },
    { 
      name: "Weather360", 
      stack: "HTML, CSS, JS", 
      desc: "Weather application with geolocation integration for real-time weather data and forecasting.", 
      link: "https://github.com/AnandGautam123/FinalProject.git", 
      category: "Frontend" 
    },
    { 
      name: "Cinemix", 
      stack: "React-Redux, Vite", 
      desc: "Movie application built with React-Redux state management and Vite for fast development and build.", 
      link: "https://github.com/AnandGautam123/FinalProject.git", 
      category: "Frontend" 
    },
    { 
      name: "MERN Portfolio", 
      stack: "MERN", 
      desc: "Full-stack portfolio application with authentication and CRUD operations using MongoDB, Express, React, Node.js.", 
      link: "https://github.com/AnandGautam123/MERNportfolioProj", 
      category: "Full-Stack" 
    },
    { 
      name: "Twitex", 
      stack: "MERN, Firebase", 
      desc: "Real-time Twitter clone with Firebase integration for authentication and real-time updates.", 
      link: "https://github.com/AnandGautam123/Twitex", 
      category: "Full-Stack" 
    }
  ];

  const categoryColors = {
    "DevOps": "#09FFE3",
    "Frontend": "#FF65CF",
    "Full-Stack": "#62D6E8"
  };

  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true });

  return (
    <section
      ref={containerRef}
      id="projects"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0B0B17 0%, #1A1A2E 100%)",
        padding: isMobile ? "3rem 1.5rem" : "5rem 2rem"
      }}
    >
      <motion.h2
        style={{
          fontSize: isMobile ? "2rem" : "3rem",
          fontWeight: "800",
          textAlign: "center",
          marginBottom: isMobile ? "2.5rem" : "4rem",
          background: "linear-gradient(45deg, #09FFE3, #FF65CF)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        FEATURED PROJECTS
      </motion.h2>

      <div 
        className="projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile 
            ? "1fr" 
            : "repeat(auto-fit, minmax(350px, 1fr))",
          gap: isMobile ? "1.5rem" : "2rem",
          maxWidth: "1400px",
          margin: "0 auto"
        }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            style={{
              background: "rgba(11, 11, 23, 0.6)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${categoryColors[project.category]}20`,
              borderRadius: "20px",
              padding: isMobile ? "1.5rem" : "2rem",
              position: "relative",
              overflow: "hidden"
            }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{
              scale: isMobile ? 1.02 : 1.03,
              boxShadow: `0 25px 70px ${categoryColors[project.category]}30`
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: `linear-gradient(90deg, ${categoryColors[project.category]}, ${categoryColors[project.category]}80)`,
                scaleX: 0,
                transformOrigin: "left"
              }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            />
            
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{
                width: isMobile ? "50px" : "60px",
                height: isMobile ? "50px" : "60px",
                borderRadius: "50%",
                background: `linear-gradient(45deg, ${categoryColors[project.category]}, ${categoryColors[project.category]}80)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: isMobile ? "1.2rem" : "1.5rem"
              }}>
                {project.category === "DevOps" ? "⚙️" : project.category === "Frontend" ? "🎨" : "🔗"}
              </div>
            </div>
            
            <div style={{
              fontSize: "0.8rem",
              color: categoryColors[project.category],
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "1rem",
              padding: "0.3rem 0.8rem",
              background: `${categoryColors[project.category]}15`,
              borderRadius: "15px",
              border: `1px solid ${categoryColors[project.category]}30`
            }}>
              {project.category}
            </div>
            
            <h3 style={{
              fontSize: isMobile ? "1.2rem" : "1.5rem",
              fontWeight: "700",
              color: "#fff",
              marginBottom: "1rem",
              textAlign: "center"
            }}>
              {project.name}
            </h3>
            
            <div style={{
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              color: categoryColors[project.category],
              fontWeight: "600",
              textAlign: "center",
              marginBottom: "1rem",
              padding: "0.5rem 1rem",
              background: `${categoryColors[project.category]}10`,
              borderRadius: "20px",
              border: `1px solid ${categoryColors[project.category]}20`
            }}>
              {project.stack}
            </div>
            
            <p style={{
              color: "rgba(255,255,255,0.8)",
              lineHeight: "1.5",
              marginBottom: "2rem",
              textAlign: "center",
              fontSize: isMobile ? "0.9rem" : "1rem"
            }}>
              {project.desc}
            </p>
            
            {project.link && (
              <div style={{ textAlign: "center" }}>
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: isMobile ? "0.8rem 1.5rem" : "0.8rem 1.5rem",
                    background: `linear-gradient(45deg, ${categoryColors[project.category]}, ${categoryColors[project.category]}CC)`,
                    color: "#000",
                    textDecoration: "none",
                    borderRadius: "10px",
                    fontWeight: "600",
                    fontSize: isMobile ? "0.85rem" : "0.9rem",
                    minHeight: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project →
                </motion.a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
// Enhanced Contact Section - Mobile Optimized
function ContactTerminal() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true });

  return (
    <section
      ref={containerRef}
      id="contact"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
        padding: isMobile ? "3rem 1rem" : "5rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <motion.h2
        style={{
          fontSize: isMobile ? "2rem" : "3rem",
          fontWeight: "800",
          textAlign: "center",
          marginBottom: isMobile ? "2.5rem" : "4rem",
          background: "linear-gradient(45deg, #09FFE3, #EE4266)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        GET IN TOUCH
      </motion.h2>

      <motion.div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "rgba(11, 11, 23, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(9,255,227,0.2)",
          borderRadius: "20px",
          padding: isMobile ? "2rem 1rem" : "3rem 2rem",
          position: "relative",
          width: "100%",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Terminal Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(9,255,227,0.1)",
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27ca3f" }} />
          </div>
          <div style={{
            marginLeft: "1rem",
            color: "#09FFE3",
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            fontFamily: "monospace"
          }}>
            contact@anand.dev
          </div>
        </div>

        {sent && (
          <motion.div
            style={{
              color: "#27ca3f",
              textAlign: "center",
              marginBottom: "2rem",
              fontWeight: "600",
              fontSize: isMobile ? "1rem" : "1.1rem"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            ✓ Message sent successfully!
          </motion.div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                color: "#09FFE3",
                marginBottom: "0.5rem",
                fontWeight: "600",
                fontSize: isMobile ? "1rem" : "1.1rem",
              }}
            >
              Name
            </label>
            <motion.input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{
                width: "100%",
                padding: isMobile ? "0.8rem" : "1rem",
                background: "rgba(9,255,227,0.05)",
                border: "1px solid rgba(9,255,227,0.2)",
                borderRadius: "10px",
                color: "#fff",
                fontSize: isMobile ? "1rem" : "1.1rem",
                fontFamily: "inherit",
                boxSizing: "border-box"
              }}
              whileFocus={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(9,255,227,0.3)"
              }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                color: "#09FFE3",
                marginBottom: "0.5rem",
                fontWeight: "600",
                fontSize: isMobile ? "1rem" : "1.1rem",
              }}
            >
              Email
            </label>
            <motion.input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{
                width: "100%",
                padding: isMobile ? "0.8rem" : "1rem",
                background: "rgba(9,255,227,0.05)",
                border: "1px solid rgba(9,255,227,0.2)",
                borderRadius: "10px",
                color: "#fff",
                fontSize: isMobile ? "1rem" : "1.1rem",
                fontFamily: "inherit",
                boxSizing: "border-box"
              }}
              whileFocus={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(9,255,227,0.3)"
              }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                color: "#09FFE3",
                marginBottom: "0.5rem",
                fontWeight: "600",
                fontSize: isMobile ? "1rem" : "1.1rem",
              }}
            >
              Message
            </label>
            <motion.textarea
              required
              rows={isMobile ? 4 : 5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{
                width: "100%",
                padding: isMobile ? "0.8rem" : "1rem",
                background: "rgba(9,255,227,0.05)",
                border: "1px solid rgba(9,255,227,0.2)",
                borderRadius: "10px",
                color: "#fff",
                fontSize: isMobile ? "1rem" : "1.1rem",
                fontFamily: "inherit",
                resize: "vertical",
                boxSizing: "border-box"
              }}
              whileFocus={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(9,255,227,0.3)"
              }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: isMobile ? "1rem" : "1.1rem",
              background: loading
                ? "rgba(9,255,227,0.3)"
                : "linear-gradient(45deg, #09FFE3, #0F83FF)",
              color: loading ? "rgba(255,255,255,0.7)" : "#000",
              border: "none",
              borderRadius: "10px",
              fontSize: isMobile ? "1rem" : "1.1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>

        {/* Contact Info */}
        <div
          style={{
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(9,255,227,0.1)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: isMobile ? "0.85rem" : "0.9rem",
              marginBottom: "1rem",
            }}
          >
            Or reach out directly:
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              alignItems: "center",
              fontSize: isMobile ? "1rem" : "1.1rem"
            }}
          >
            <a
              href="mailto:anandgautam062003@gmail.com"
              style={{
                color: "#09FFE3",
                textDecoration: "none",
              }}
            >
              📧 Email
            </a>
            <a
              href="tel:+916200961600"
              style={{
                color: "#09FFE3",
                textDecoration: "none",
              }}
            >
              📱 Phone
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Responsive Footer - Mobile friendly
function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #000000 0%, #0B0B17 100%)",
        padding: isMobile ? "2rem 1rem" : "3rem 2rem",
        borderTop: "1px solid rgba(9,255,227,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}
      >
        <motion.div
          style={{
            fontSize: isMobile ? "1.2rem" : "1.7rem",
            marginBottom: "1rem"
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🚀
        </motion.div>

        <div
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: isMobile ? "0.9rem" : "1rem",
            marginBottom: "0.7rem",
            lineHeight: "1.5"
          }}
        >
          Designed with <span style={{ color: "#EE4266" }}>❤️</span> by Anand Gautam | DevOps Engineer
        </div>

        {/* Contact Links */}
        <div
          style={{
            display: "flex",
            gap: isMobile ? "1rem" : "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "0.7rem"
          }}
        >
          <motion.a
            href="https://www.linkedin.com/in/anand--gautam"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#09FFE3",
              textDecoration: "none",
              fontSize: isMobile ? "0.9rem" : "1rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            whileHover={{ scale: 1.1, color: "#0A66C2" }}
          >
            🔗 LinkedIn
          </motion.a>

          <motion.a
            href="https://github.com/AnandGautam123"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#09FFE3",
              textDecoration: "none",
              fontSize: isMobile ? "0.9rem" : "1rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            whileHover={{ scale: 1.1, color: "#4078c0" }}
          >
            💻 GitHub
          </motion.a>

          <motion.a
            href="mailto:anandgautam062003@gmail.com"
            style={{
              color: "#09FFE3",
              textDecoration: "none",
              fontSize: isMobile ? "0.9rem" : "1rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            whileHover={{ scale: 1.1, color: "#EA4335" }}
          >
            📧 Email
          </motion.a>

          <motion.a
            href="tel:+916200961600"
            style={{
              color: "#09FFE3",
              textDecoration: "none",
              fontSize: isMobile ? "0.9rem" : "1rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            whileHover={{ scale: 1.1, color: "#34A853" }}
          >
            📱 Call
          </motion.a>
        </div>

        {/* System Status */}
        <motion.div
          style={{
            fontSize: isMobile ? "0.7rem" : "0.8rem",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "monospace",
            padding: "0.5rem",
            background: "rgba(9,255,227,0.05)",
            borderRadius: "8px",
            border: "1px solid rgba(9,255,227,0.1)",
            marginBottom: "0.5rem"
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          System Status: Online • Uptime: 99.9% • Last Deploy: {new Date().toLocaleDateString()} • Bihar, India
        </motion.div>

        {/* Copyright */}
        <div style={{
          fontSize: isMobile ? "0.7rem" : "0.8rem",
          color: "rgba(255,255,255,0.4)",
          paddingTop: "1rem",
          borderTop: "1px solid rgba(9,255,227,0.1)"
        }}>
          © 2025 Anand Gautam. All rights reserved. Built with React & Framer Motion.
        </div>
      </div>
    </footer>
  );
}
