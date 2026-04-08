import { Box, Image, Text, Heading, Container, Stack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
  {
    image: "/images/hero1.jpg",
    title: "Reimagining Travel Technology",
    text: "Experience the next generation of travel with AI-driven innovation.",
  },
  {
    image: "/images/hero2.jpg",
    title: "Seamless Bookings",
    text: "Effortless travel planning at your fingertips.",
  },
  {
    image: "/images/hero3.jpg",
    title: "Luxury Refined",
    text: "Curated experiences for the modern traveler.",
  },
];

const MotionBox = motion.create(Box);

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      position="relative"
      h={{ base: "50vh", md: "500px" }}
      minH={{ base: "300px", md: "90vh" }}
      maxH="100vh"
      w="full"
      overflow="hidden"
    >
      <AnimatePresence>
        <MotionBox
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-b, blackAlpha.100, blackAlpha.700)"
            zIndex={1}
          />
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            p={6}
          >
            <Container maxW="4xl">
              <Stack gap={4} align="center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Heading
                    color="white"
                    size={{ base: "2xl", md: "4xl" }}
                    fontWeight="extrabold"
                    letterSpacing="tight"
                    textShadow="0 2px 10px rgba(0,0,0,0.3)"
                  >
                    {slides[currentIndex].title}
                  </Heading>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <Text
                    color="whiteAlpha.900"
                    fontSize={{ base: "lg", md: "2xl" }}
                    fontWeight="medium"
                    maxW="2xl"
                    textShadow="0 1px 5px rgba(0,0,0,0.5)"
                  >
                    {slides[currentIndex].text}
                  </Text>
                </motion.div>
              </Stack>
            </Container>
          </Box>
        </MotionBox>
      </AnimatePresence>

      {/* Navigation Dots */}
      <Stack
        direction="row"
        position="absolute"
        bottom={8}
        left="50%"
        transform="translateX(-50%)"
        zIndex={3}
        gap={3}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            w={currentIndex === index ? "40px" : "12px"}
            h="12px"
            bg={currentIndex === index ? "white" : "whiteAlpha.500"}
            borderRadius="full"
            cursor="pointer"
            transition="all 0.3s"
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default HeroSlider;
