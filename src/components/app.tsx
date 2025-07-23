import { motion, useAnimation, useInView } from "framer-motion";
import {
  Heart,
  Stethoscope,
  Activity,
  UserCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
  Star,
  Calendar,
  Menu,
  X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/buttom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
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
              <img
                src="/logo-clinica.png"
                alt="Logo Clínica Santiago Apóstol"
                className="w-12 h-12 rounded-full object-cover"
                style={{ 
                  border: 'none', 
                  outline: 'none', 
                  boxShadow: 'none',
                  background: 'transparent'
                }}
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">Clínica Santiago Apóstol</h1>
                <p className="text-sm text-muted-foreground">Cuida tu cuerpo</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <a href="#inicio" className="text-foreground hover:text-primary transition-colors font-medium">Inicio</a>
              <a href="#servicios" className="text-foreground hover:text-primary transition-colors font-medium">Servicios</a>
              <a href="#nosotros" className="text-foreground hover:text-primary transition-colors font-medium">Nosotros</a>
              <a href="#testimonios" className="text-foreground hover:text-primary transition-colors font-medium">Testimonios</a>
              <a href="#contacto" className="text-foreground hover:text-primary transition-colors font-medium">Contacto</a>
            </nav>

            {/* Desktop CTA Button */}
            <Button className="hidden md:flex bg-primary hover:bg-primary/90">
              <Calendar className="h-4 w-4 mr-2" />
              Agenda tu cita
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
                href="#servicios" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </a>
              <a 
                href="#nosotros" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </a>
              <a 
                href="#testimonios" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonios
              </a>
              <a 
                href="#contacto" 
                className="block px-4 py-3 text-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
              <div className="pt-2">
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setIsMenuOpen(false)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Agenda tu cita
                </Button>
              </div>
            </nav>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-[90vh] bg-gradient-to-br from-primary/5 via-secondary/30 to-accent/20 flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/imagen1.jpg')",
            backgroundAttachment: 'fixed',
            transform: 'translateZ(0)',
            filter: 'brightness(0.4) contrast(1.1)'
          }}
        ></div>
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
              <img
                src="/logo-clinica.png"
                alt="Logo Clínica Santiago Apóstol"
                className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
                style={{ 
                  border: 'none', 
                  outline: 'none', 
                  boxShadow: 'none',
                  background: 'transparent'
                }}
              />
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Clínica Santiago Apóstol
            </motion.h1>



            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Brindamos atención médica integral con el más alto nivel de profesionalismo y calidez humana.
              Tu salud es nuestra prioridad.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                <Calendar className="h-5 w-5 mr-2" />
                Agenda tu cita ahora
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-white">
                <Phone className="h-5 w-5 mr-2" />
                Llamar ahora
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-20 bg-background">
        <div className="container mx-auto px-[12%]">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos una amplia gama de servicios médicos especializados para cuidar tu salud integral
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
                icon: <Stethoscope className="h-8 w-8" />,
                title: "Medicina General",
                description: "Consultas médicas integrales para toda la familia con profesionales especializados"
              },
              {
                icon: <Activity className="h-8 w-8" />,
                title: "Cardiología",
                description: "Diagnóstico y tratamiento de enfermedades cardiovasculares con tecnología avanzada"
              },
              {
                icon: <UserCheck className="h-8 w-8" />,
                title: "Medicina Preventiva",
                description: "Programas de prevención y chequeos médicos regulares para mantener tu salud"
              },
              {
                icon: <Heart className="h-8 w-8" />,
                title: "Nutrición",
                description: "Asesoramiento nutricional personalizado para un estilo de vida saludable"
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Urgencias",
                description: "Atención médica de emergencia las 24 horas del día, los 365 días del año"
              },
              {
                icon: <Activity className="h-8 w-8" />,
                title: "Laboratorio",
                description: "Análisis clínicos con resultados rápidos y precisos para un diagnóstico certero"
              }
            ].map((service, index) => (
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
                <Card className="h-full border-border group">
                  <CardHeader>
                    <motion.div 
                      className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="text-primary"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {service.icon}
                      </motion.div>
                    </motion.div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sobre Nosotros Section */}
      <section id="nosotros" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-[12%]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Sobre Nosotros</h2>
              <p className="text-lg text-muted-foreground mb-6">
                En Clínica Santiago Apóstol, nos dedicamos a brindar atención médica de excelencia desde hace más de 15 años.
                Nuestro equipo de profesionales altamente calificados se compromete a ofrecer un servicio personalizado y humano.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Contamos con instalaciones modernas y tecnología de vanguardia para garantizar los mejores resultados en cada tratamiento.
                Tu bienestar es nuestra misión.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-muted-foreground">Años de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                  <div className="text-muted-foreground">Pacientes atendidos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">20+</div>
                  <div className="text-muted-foreground">Especialistas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
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
                src="/imagen2.jpg"
                alt="Equipo médico"
                className="w-full rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gerencia Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-[12%]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div 
                  className="max-w-md w-full aspect-square rounded-full overflow-hidden"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <img
                    src="/bolivar-garcia.png"
                    alt="Lic. Bolívar José García - Gerente"
                    className="w-full h-full"
                    style={{ 
                      backgroundColor: 'transparent',
                      background: 'none',
                      backgroundImage: 'none',
                      border: 'none',
                      boxShadow: 'none',
                      filter: 'none',
                      backdropFilter: 'none',
                      mask: 'none',
                      clipPath: 'none',
                      transform: 'scale(1.14)',
                      transformStyle: 'flat',
                      perspective: 'none',
                      backfaceVisibility: 'visible',
                      mixBlendMode: 'normal',
                      isolation: 'auto',
                      opacity: 1,
                      imageRendering: 'auto',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    } as React.CSSProperties}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Excelencia en Gestión
              </h3>
              <h4 className="text-xl text-primary font-semibold mb-6">
                Lic. Bolívar José García
              </h4>
              <p className="text-lg text-muted-foreground mb-6">
                Con más de una década de experiencia en administración de centros de salud,
                el Lic. Bolívar José García lidera nuestro equipo directivo con una visión
                estratégica enfocada en la excelencia operativa y la satisfacción del paciente.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Su gestión administrativa ha sido fundamental para posicionar a la Clínica
                Santiago Apóstol como un referente en calidad de servicio y eficiencia
                organizacional en el sector salud. Bajo su dirección, hemos implementado
                protocolos de gestión que garantizan una atención médica de primera clase.
              </p>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="text-primary">
                  Administración Hospitalaria
                </Badge>
                <Badge variant="secondary" className="text-primary">
                  Gestión de Calidad
                </Badge>
              </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section id="testimonios" className="py-20 bg-background">
        <div className="container mx-auto px-[12%]">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Lo que dicen nuestros pacientes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              La satisfacción de nuestros pacientes es nuestro mayor orgullo
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
                name: "María González",
                text: "Excelente atención y profesionalismo. El Dr. Martínez me explicó todo con mucha paciencia. Recomiendo totalmente esta clínica.",
                rating: 5
              },
              {
                name: "Carlos Rodríguez",
                text: "Las instalaciones son modernas y el personal muy amable. Me sentí en confianza desde el primer momento.",
                rating: 5
              },
              {
                name: "Ana Fernández",
                text: "Gracias a la atención preventiva de la clínica, detectaron a tiempo mi condición. Estoy muy agradecida.",
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
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Avatar>
                          <AvatarFallback className="bg-primary text-white group-hover:bg-primary/90 transition-colors duration-300">
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

      {/* Satisfacción del Cliente Section */}
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
                src="/imagen3.jpg"
                alt="Pacientes satisfechos en Clínica Santiago Apóstol"
                className="w-full h-auto rounded-2xl shadow-lg"
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
                Pacientes Satisfechos
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Durante más de 15 años, hemos construido relaciones duraderas basadas en la 
                confianza y resultados excepcionales. Cada sonrisa de nuestros pacientes 
                refleja nuestro compromiso con la excelencia médica.
              </p>
                             <motion.div 
                 className="grid grid-cols-2 gap-6 mt-8"
                 variants={staggerContainer}
                 initial="initial"
                 whileInView="animate"
                 viewport={{ once: true }}
               >
                 {[
                   { value: 98, label: "Satisfacción general" },
                   { value: 95, label: "Recomendarían la clínica" },
                   { value: 92, label: "Calidad de atención" },
                   { value: 96, label: "Profesionalismo médico" }
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

      {/* Contacto Section */}
      <section id="contacto" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-[12%]">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Estamos aquí para cuidar de tu salud. Agenda tu cita hoy mismo
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Teléfono</h3>
              <p className="opacity-90">+1 (555) 123-4567</p>
            </motion.div>

            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="opacity-90">info@clinicasantiago.com</p>
            </motion.div>

            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dirección</h3>
              <p className="opacity-90">Av. Salud 123, Ciudad</p>
            </motion.div>

            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Horarios</h3>
              <p className="opacity-90">Lun-Vie: 8:00-18:00</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
              <Calendar className="h-5 w-5 mr-2" />
              Agenda tu cita ahora
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mapa Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-[12%]">
          <motion.div
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestra Ubicación</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visítanos en nuestras modernas instalaciones, fácilmente accesibles y con estacionamiento disponible
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.9307758041227!2d-70.70106822478492!3d19.45855118182643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1c5f5ddb8780d%3A0x4f1f56db14a2168b!2sCentro%20M%C3%A9dico%20Santiago%20Ap%C3%B3stol!5e0!3m2!1ses!2sdo!4v1753261312709!5m2!1ses!2sdo" 
                width="100%" 
                height="450" 
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Centro Médico Santiago Apóstol"
              />
            </div>
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
                <img
                  src="/logo-clinica.png"
                  alt="Logo Clínica Santiago Apóstol"
                  className="w-12 h-12 rounded-full object-cover"
                  style={{ 
                    border: 'none', 
                    outline: 'none', 
                    boxShadow: 'none',
                    background: 'transparent'
                  }}
                />
                <div>
                  <h3 className="text-2xl font-bold">Clínica Santiago Apóstol</h3>
                  <p className="text-sm opacity-75">Cuida tu cuerpo</p>
                </div>
              </div>
              <p className="text-white/80 mb-6 max-w-md">
                Brindamos atención médica integral con el más alto nivel de profesionalismo y calidez humana. 
                Tu salud es nuestra prioridad desde hace más de 15 años.
              </p>
              <div className="flex space-x-4">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agenda Cita
                </Button>
                <Button size="sm" className="bg-transparent border border-white/30 text-white hover:bg-white/10 hover:text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Llamar
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-white/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-white/80">info@clinicasantiago.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-white/80">Av. Salud 123, Ciudad</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-white/80">Lun-Vie: 8:00-18:00</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios</h4>
              <div className="space-y-2">
                <a href="#servicios" className="block text-white/80 hover:text-primary transition-colors">Medicina General</a>
                <a href="#servicios" className="block text-white/80 hover:text-primary transition-colors">Cardiología</a>
                <a href="#servicios" className="block text-white/80 hover:text-primary transition-colors">Medicina Preventiva</a>
                <a href="#servicios" className="block text-white/80 hover:text-primary transition-colors">Nutrición</a>
                <a href="#servicios" className="block text-white/80 hover:text-primary transition-colors">Urgencias</a>
                <a href="#servicios" className="block text-white/80 hover:text-primary transition-colors">Laboratorio</a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/10 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-white/60">
                © 2024 Clínica Santiago Apóstol. Todos los derechos reservados.
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
