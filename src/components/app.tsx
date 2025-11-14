import { motion, useAnimation, useInView } from "framer-motion";
import {
  Sofa,
  Refrigerator,
  UtensilsCrossed,
  MapPin,
  Star,
  Phone,
  Mail,
  Clock,
  Instagram,
  Navigation,
  Menu,
  X,
  Home,
  Sparkles
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/buttom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { MapComponent } from "./MapComponent";
import React from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Removed cardHover - using inline animations instead

const elegantFadeInUp = {
  initial: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1
  }
};

const numberAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { 
    opacity: 1, 
    scale: 1
  }
};

// Componente contador animado
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev < value) {
            return Math.min(prev + Math.ceil(value / 50), value);
          }
          return value;
        });
      }, 30);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      variants={numberAnimation}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      className="text-4xl font-bold text-primary mb-2"
    >
      {count}{suffix}
    </motion.div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const heroBgImages = [
    '/432865590_18419672290011329_6005267552433611316_n.jpg',
    '/434141885_18420928693011329_19562244192325501_n.jpg',
    '/467764715_1499816830679563_6222721940556241865_n.jpg',
    '/467595127_869772781630477_6788903231586015869_n.jpg',
    '/470802364_18471595243011329_4682548222109658066_n.jpg',
    '/471709651_18473113426011329_5631290459759261661_n.jpg',
    '/571426648_18533131489011329_1296170101452556316_n.jpg'
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroBgImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navbar */}
      <header
        className="backdrop-blur-md bg-white/30 shadow-lg border-b border-white/20 sticky top-0 z-50"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="container mx-auto px-4 md:px-[12%] py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                <img src="/165665851_896197461216376_472536604504989290_n.jpg" alt="El Hogar Macorisano" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">El Hogar Macorisano</h1>
                <p className="text-sm text-muted-foreground">Tu casa, siempre soñada</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">Inicio</a>
              <a href="#catalogo" className="text-foreground hover:text-primary transition-colors font-medium">Catálogo</a>
              <a href="#nosotros" className="text-foreground hover:text-primary transition-colors font-medium">Quiénes Somos</a>
              <a href="#ofertas" className="text-foreground hover:text-primary transition-colors font-medium">Ofertas</a>
              <a href="#sucursales" className="text-foreground hover:text-primary transition-colors font-medium">Sucursales</a>
            </nav>

            {/* Desktop CTA Button */}
            <Button className="hidden md:flex bg-primary hover:bg-primary/90">
              <Sparkles className="h-4 w-4 mr-2" />
              Ver Catálogo
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            className={`lg:hidden overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
            initial={false}
            animate={{
              height: isMenuOpen ? 'auto' : 0,
              opacity: isMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <nav className="pt-4 pb-2 space-y-2">
              <a 
                href="#inicio" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
              <a 
                href="#catalogo" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Catálogo
              </a>
              <a 
                href="#nosotros" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiénes Somos
              </a>
              <a 
                href="#ofertas" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Ofertas
              </a>
              <a 
                href="#sucursales" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sucursales
              </a>
              <div className="pt-2">
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setIsMenuOpen(false)}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Ver Catálogo
                </Button>
              </div>
            </nav>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-[90vh] bg-gradient-to-br from-primary/5 via-secondary/30 to-accent/20 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {heroBgImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: `url('${image}')`,
                backgroundAttachment: 'fixed',
                transform: 'translateZ(0)',
                filter: 'brightness(0.3) contrast(1.1)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Botón Anterior */}
        <motion.button
          onClick={() => setCurrentImageIndex((prev) => (prev - 1 + heroBgImages.length) % heroBgImages.length)}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm"
          aria-label="Imagen anterior"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Botón Siguiente */}
        <motion.button
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % heroBgImages.length)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors backdrop-blur-sm"
          aria-label="Siguiente imagen"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        <div className="container mx-auto px-[12%] relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg overflow-hidden">
                <img src="/165665851_896197461216376_472536604504989290_n.jpg" alt="El Hogar Macorisano" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              El Hogar Macorisano
            </motion.h1>

            <motion.h2
              className="text-base md:text-lg font-medium text-white/90 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Tu casa, como siempre la soñaste
            </motion.h2>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 rounded-lg font-semibold"
                onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Ver Catálogo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-4 border-primary bg-primary text-white hover:bg-primary/90 hover:text-white rounded-lg font-semibold"
                onClick={() => document.getElementById('sucursales')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Encuentra tu sucursal
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Catálogo Section */}
      <section id="catalogo" className="py-20 bg-background">
        <div className="container mx-auto px-[12%]">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestro Catálogo</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              En un mismo lugar, todo lo que tu hogar necesita con la mejor variedad y calidad
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Sofa className="h-8 w-8" />,
                title: "Muebles de Sala",
                description: "Sofás, mesas de centro y estanterías que combinan diseño y durabilidad para tu sala de estar"
              },
              {
                icon: <Refrigerator className="h-8 w-8" />,
                title: "Electrodomésticos",
                description: "Refrigeradores, cocinas y electrodomésticos de las mejores marcas a los mejores precios"
              },
              {
                icon: <UtensilsCrossed className="h-8 w-8" />,
                title: "Artículos para Cocina",
                description: "Equipos completos para tu cocina con estilo moderno y funcionalidad garantizada"
              },
              {
                icon: <Home className="h-8 w-8" />,
                title: "Muebles Dormitorio",
                description: "Camas, closets y cómodas que transforman tu habitación en un espacio cómodo y elegante"
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "Decoración",
                description: "Accesorios y detalles decorativos que dan el toque final a tus espacios"
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Promociones",
                description: "Ofertas especiales, combos y descuentos por temporada en todos nuestros productos"
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={elegantFadeInUp}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="cursor-pointer"
              >
                <Card className="h-full border-border group rounded-lg">
                  <CardHeader>
                    <motion.div 
                      className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="text-primary"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                      </motion.div>
                    </motion.div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section id="nosotros" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-[12%]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">¿Quiénes Somos?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Desde San Francisco de Macorís hemos crecido junto a miles de familias dominicanas, 
                llevando a cada hogar los muebles y electrodomésticos que se convierten en parte de sus mejores momentos.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                En El Hogar Macorisano creemos que amueblar tu casa no debe ser complicado ni inalcanzable, 
                por eso trabajamos cada día para ofrecerte variedad, buen servicio y planes de financiamiento 
                adaptados a tu realidad. Somos una empresa cercana, comprometida con nuestra gente y con 
                las comunidades donde tenemos presencia.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">+20</div>
                  <div className="text-muted-foreground">Años de trayectoria</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-muted-foreground">Familias satisfechas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">6+</div>
                  <div className="text-muted-foreground">Sucursales</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99%</div>
                  <div className="text-muted-foreground">Satisfacción</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/467595127_869772781630477_6788903231586015869_n.jpg"
                  alt="Tienda El Hogar Macorisano"
                  className="w-full rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ofertas Section */}
      <section id="ofertas" className="py-20 bg-white">
        <div className="container mx-auto px-[12%]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              {...fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ofertas y Promociones</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Porque sabemos que cada peso cuenta, mantenemos especiales, combos y descuentos por temporada
              </p>
            </motion.div>

            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white border border-primary/20 rounded-xl p-0 overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-primary to-primary/80 p-8">
                    <h4 className="text-2xl font-bold text-white mb-2">Sigue nuestro Instagram</h4>
                    <p className="text-white/90 text-lg">
                      @elhogarmacorisano - Mantente atento a nuestras ofertas y novedades
                    </p>
                  </div>
                  <div className="p-6">
                    <iframe
                      src="https://www.instagram.com/elhogarmacorisano/embed"
                      width="100%"
                      height="600"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency={true}
                      title="Instagram El Hogar Macorisano"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clientes Satisfechos Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-[12%]">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestros Clientes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Miles de familias dominicanas confían en El Hogar Macorisano para transformar sus espacios
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Rosa Martínez",
                text: "Excelente variedad de productos y precios muy competitivos. El personal fue muy atento y me ayudó a elegir los muebles perfectos.",
                rating: 5
              },
              {
                name: "Juan Pérez",
                text: "Las facilidades de pago son increíbles. Me permitieron equipar mi casa de manera accesible. Muy recomendado.",
                rating: 5
              },
              {
                name: "María Gómez",
                text: "Encontré todo lo que necesitaba en El Hogar Macorisano. El servicio fue excepcional y los productos de buena calidad.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                variants={elegantFadeInUp}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 group rounded-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Avatar>
                          <AvatarFallback className="bg-primary text-white group-hover:bg-primary/90 transition-colors duration-300 rounded-lg">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                          {testimonial.name}
                        </CardTitle>
                        <div className="flex space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                              whileHover={{ scale: 1.2, rotate: 15 }}
                            >
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Confianza Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-[12%]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img
                src="/467764715_1499816830679563_6222721940556241865_n.jpg"
                alt="Productos de calidad en El Hogar Macorisano"
                className="w-full h-auto rounded-xl shadow-lg"
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Confianza y Calidad Garantizada
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Durante más de 20 años, hemos construido relaciones duraderas basadas en la confianza, 
                la variedad de productos y resultados excepcionales. Cada familia que visita nuestras 
                sucursales encuentra la solución perfecta para su hogar.
              </p>
              <motion.div 
                className="grid grid-cols-2 gap-6 mt-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  { value: 99, label: "Satisfacción" },
                  { value: 95, label: "Recomendarían" },
                  { value: 98, label: "Calidad de Productos" },
                  { value: 96, label: "Facilidades de Pago" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    variants={elegantFadeInUp}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <AnimatedCounter value={stat.value} suffix="%" />
                    <motion.div 
                      className="text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {stat.label}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mapa Section */}
      <section id="sucursales" className="py-20 bg-secondary/10">
        <div className="container mx-auto px-[12%]">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestras Sucursales</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mapa interactivo con todas nuestras ubicaciones. Haz clic para obtener indicaciones
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-xl overflow-hidden shadow-2xl h-[500px]">
              <MapComponent />
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "San Francisco de Macorís",
                address: "Sucursal Principal",
                coords: "19.0593318, -70.1514699",
                phone: "+1 (809) 573-1234",
                maps: "https://www.google.com/maps/place/El+Hogar+Macorisano/@19.0593318,-70.1514699"
              },
              {
                name: "Cotuí",
                address: "Centro, Cotuí",
                coords: "19.0398517, -70.1470676",
                phone: "+1 (809) 573-1234",
                maps: "https://www.google.com/maps/place/El+Hogar+Macorisano/@19.0398517,-70.1470676"
              },
              {
                name: "Gaspar Hernández",
                address: "Carr. Veragua-Gaspar Hernández",
                coords: "19.6436279, -70.2957958",
                phone: "+1 (809) 573-1234",
                maps: "https://www.google.com/maps/place/El+Hogar+Macorisano+Gh/@19.6436279,-70.2957958"
              },
              {
                name: "Moca",
                address: "Centro, Moca",
                coords: "19.3946125, -70.5271406",
                phone: "+1 (809) 573-1234",
                maps: "https://www.google.com/maps/place/9FVF%2BR4X,+56000+Moca/@19.3946125,-70.5271406"
              },
              {
                name: "Nagua",
                address: "Av. Central, Nagua",
                coords: "19.2915771, -70.2512833",
                phone: "+1 (809) 573-1234",
                maps: "https://www.google.com/maps/place/El+Hogar+Macorisano/@19.2915771,-70.2512833"
              },
              {
                name: "Tenares",
                address: "Centro, Tenares",
                coords: "19.2890928, -70.3165703",
                phone: "+1 (809) 573-1234",
                maps: "https://www.google.com/maps/"
              }
            ].map((sucursal, index) => (
              <motion.div
                key={index}
                variants={elegantFadeInUp}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="h-full group rounded-lg hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                      {sucursal.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{sucursal.address}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <a href={`tel:${sucursal.phone}`} className="text-sm text-primary hover:underline">
                        {sucursal.phone}
                      </a>
                    </div>
                    <div className="pt-2 space-y-2">
                      <a 
                        href={sucursal.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors py-2 rounded-lg text-sm font-medium"
                      >
                        <Navigation className="h-4 w-4 inline mr-1" />
                        Cómo llegar
                      </a>
                      <a 
                        href="https://wa.me/1234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-green-100 text-green-700 hover:bg-green-600 hover:text-white transition-colors py-2 rounded-lg text-sm font-medium"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-white">
        <div className="container mx-auto px-[12%]">
          {/* Main Footer Content */}
          <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                  <img src="/165665851_896197461216376_472536604504989290_n.jpg" alt="El Hogar Macorisano" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">El Hogar Macorisano</h3>
                  <p className="text-sm opacity-75">Tu casa, siempre soñada</p>
                </div>
              </div>
              <p className="text-white/80 mb-6 max-w-md">
                Te ayudamos a transformar cada espacio en un lugar cómodo, funcional y lleno de estilo. 
                Encuentra muebles, electrodomésticos y soluciones para el hogar con la mejor calidad y precio.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-lg">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Ver Catálogo
                </Button>
                <Button size="sm" className="bg-transparent border border-white/30 text-white hover:bg-white/10 hover:text-white rounded-lg">
                  <Instagram className="h-4 w-4 mr-2" />
                  Síguenos
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-white/80">+1 (809) 573-1234</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Instagram className="h-4 w-4 text-primary" />
                  <a href="https://www.instagram.com/elhogarmacorisano/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">@elhogarmacorisano</a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-white/80">SFM, Rep. Dominicana</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-white/80">Lun-Sab: 9:00-18:00</span>
                </div>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Productos</h4>
              <div className="space-y-2">
                <a href="#catalogo" className="block text-white/80 hover:text-primary transition-colors">Muebles</a>
                <a href="#catalogo" className="block text-white/80 hover:text-primary transition-colors">Electrodomésticos</a>
                <a href="#catalogo" className="block text-white/80 hover:text-primary transition-colors">Cocina</a>
                <a href="#catalogo" className="block text-white/80 hover:text-primary transition-colors">Decoración</a>
                <a href="#ofertas" className="block text-white/80 hover:text-primary transition-colors">Ofertas</a>
                <a href="#sucursales" className="block text-white/80 hover:text-primary transition-colors">Sucursales</a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-white/60">
                © 2024 El Hogar Macorisano. Todos los derechos reservados.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">Política de Privacidad</a>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">Términos de Servicio</a>
                <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">Aviso Legal</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
