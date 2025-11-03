import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Github, Linkedin, ArrowRight, Sparkles, Database, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Autoplay from "embla-carousel-autoplay";
import { useRef } from 'react';

const Home = () => {
  const plugin = useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true })
  );

  const featuredCards = [
    {
      id: "xy2-12",
      name: "Charizard ex",
      image: "https://assets.tcgdex.net/en/xy/xy2/12/high.webp",
      rarity: "Ultra Rare",
      set: "Flashfire"
    },
    {
      id: "swsh4-188",
      name: "Pikachu VMAX",
      image: "https://assets.tcgdex.net/en/swsh/swsh4/188/high.webp",
      rarity: "Secret Rare",
      set: "Vivid Voltage"
    },
    {
      id: "swsh7-194",
      name: "Rayquaza V",
      image: "https://assets.tcgdex.net/en/swsh/swsh7/194/high.webp",
      rarity: "Ultra Rare",
      set: "Evolving Skies"
    },
    {
      id: "A4a-087",
      name: "Entei ex",
      image: "https://assets.tcgdex.net/en/tcgp/A4a/087/high.webp",
      rarity: "Two Star",
      set: "Scheduled Springs"
    },
    {
      id: "A3b-104",
      name: "Articuno ex",
      image: "https://assets.tcgdex.net/en/tcgp/A3b/104/high.webp",
      rarity: "Two Shiny",
      set: "Eevee Grove"
    },
    {
      id: "sv03.5-205",
      name: "Mew ex",
      image: "https://assets.tcgdex.net/en/sv/sv03.5/205/high.webp",
      rarity: "Hyper Rare",
      set: "151"
    },
    {
      id: "swsh12-139",
      name: "Lugia VSTAR",
      image: "https://assets.tcgdex.net/en/swsh/swsh12/139/high.webp",
      rarity: "Holo Rare VSTAR",
      set: "Silver Tempest"
    },
    {
      id: "A1-254",
      name: "Arcanine ex",
      image: "https://assets.tcgdex.net/en/tcgp/A1/254/high.webp",
      rarity: "Two Star",
      set: "Genetic Apex"
    },
    {
      id: "sv08.5-030",
      name: "Jolteon ex",
      image: "https://assets.tcgdex.net/en/sv/sv08.5/030/high.webp",
      rarity: "Double Rare",
      set: "Prismatic Evolutions"
    },
    {
      id: "swsh6-161",
      name: "Blaziken V",
      image: "https://assets.tcgdex.net/en/swsh/swsh6/161/high.webp",
      rarity: "Ultra Rare",
      set: "Chilling Reign"
    }
  ];

  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Browse Cards",
      description: "Explore thousands of Pokémon trading cards with detailed information, stats, and high-quality images.",
      link: "/cards"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Discover Sets",
      description: "Browse through complete card sets, from classic Base Set to the latest releases with comprehensive listings.",
      link: "/sets"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Explore Series",
      description: "Navigate through different Pokémon TCG series and expansions to find your favorite generations.",
      link: "/series"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen rounded-2xl">
      {/* Hero Section */}
      <section className="px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge variant="secondary" className="w-fit">
              Discover the World of Pokémon TCG
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-primary">
              Welcome to
              <br />
              <span className="text-yellow-500 dark:text-yellow-400">Pokédex TCG</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Your ultimate destination for exploring Pokémon Trading Card Game cards, sets, and series. Dive into the comprehensive database of your favorite cards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/cards">
              <Button size="lg" className="group cursor-pointer">
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                src="https://assets.tcgdex.net/en/tcgp/P-A/009/high.webp" 
                alt="Featured Pokémon Card"
                className="transition-transform duration-500 ease-out hover:-translate-y-2 w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-3xl opacity-20 scale-105"></div>
          </motion.div>
        </div>
      </section>

      {/* Featured Cards Carousel */}
      <section className="py-16">
        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Cards</h2>
            <p className="text-muted-foreground text-lg">Discover some of the most popular and rare cards</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-4">
                {featuredCards.map((card) => (
                  <CarouselItem key={card.id} className="pl-4 basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <Card className="bg-card/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                        <CardContent className="p-4">
                          <Link to={`/cards/${card.id}`} className="absolute inset-0 z-10" />
                          <div className="relative mb-4">
                            <img 
                              src={card.image} 
                              alt={card.name}
                              className="w-full aspect-[3/4] object-cover rounded-lg"
                            />
                            <Badge 
                              variant="secondary" 
                              className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
                            >
                              {card.rarity}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{card.name}</h3>
                          <p className="text-sm text-muted-foreground">{card.set}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="cursor-pointer hidden md:flex bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-foreground dark:text-background dark:hover:bg-primary/90" />
              <CarouselNext className="cursor-pointer hidden md:flex bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-foreground dark:text-background dark:hover:bg-primary/90" />
            </Carousel>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Explore Everything</h2>
            <p className="text-muted-foreground text-lg">Comprehensive tools to discover your favorite Pokémon cards</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full bg-card/80 backdrop-blur-sm border shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/50 dark:to-amber-900/50 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-base mb-6">
                      {feature.description}
                    </CardDescription>
                    <Link to={feature.link}>
                    <Button className="cursor-pointer">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 mt-12">
        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text text-transparent mb-2">
                Pokédex TCG
              </h3>
              <p className="text-muted-foreground">Made by Mark Hermano 🦉</p>
            </div>
            
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/hermanomark"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-muted hover:bg-muted/80 rounded-full transition-colors"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/mark-jason-hermano/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-muted hover:bg-muted/80 rounded-full transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default Home;