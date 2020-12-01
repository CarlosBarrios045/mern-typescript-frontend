/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";

import { FiSun, FiMoon } from "react-icons/fi";
import { Button, useColorMode, Flex, Fade, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export interface NavbarBarProps {}

const NavbarBar: React.SFC<NavbarBarProps> = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Fade in>
      <Container maxW="xl" pt={5} pb={5} mb={5}>
        <Flex w="100%" align="center" justify="space-between">
          <Flex align="center" h="100%">
            <Button colorScheme="gray" as={Link} to="/" mr={10}>
              Inicio
            </Button>
            <Button colorScheme="gray" as={Link} to="/nuevo-video">
              Nuevo vídeo
            </Button>
          </Flex>
          <Button colorScheme="gray" onClick={toggleColorMode}>
            Modo
            {colorMode === "light" ? (
              <FiMoon style={{ marginLeft: 4 }} />
            ) : (
              <FiSun style={{ marginLeft: 4 }} />
            )}
          </Button>
        </Flex>
      </Container>
    </Fade>
  );
};

export default NavbarBar;
