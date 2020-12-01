import React, { useState, useEffect } from "react";

// Router
import { useHistory } from "react-router-dom";

// API
import { getProducts, deleteProduct } from "src/data/Interface";

// Date
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

// Icons
import { FiEdit, FiTrash } from "react-icons/fi";

// Layout
import ReactPlayer from "react-player";
import {
  Button,
  useColorMode,
  Flex,
  Heading,
  Text,
  Box,
  SlideFade,
  Divider,
  Spinner,
  Center,
  Grid,
} from "@chakra-ui/react";

// Interfaces
import { IVideo } from "src/ts/interfaces";

function Home(): JSX.Element {
  // State
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Router
  const { push } = useHistory();

  // Color Mode
  const { colorMode } = useColorMode();

  // Get Videos
  const getVideos = async (): Promise<void> => {
    try {
      const { data } = await getProducts();
      setVideos(data);
      setLoading(false);
    } catch (e) {
      console.error("Error Get Videos ->", e);
      setLoading(false);
    }
  };

  // Update Video
  const updateVideo = (id: string) => {
    push(`/editar-video/${id}`);
  };

  // Delete Video
  const deleteVideo = async (id: string): Promise<void> => {
    try {
      await deleteProduct(id);
      getVideos();
    } catch (e) {
      console.error("Error Delete Videos ->", e);
    }
  };

  useEffect((): void => {
    getVideos();
  }, []);

  if (loading)
    return (
      <Center w="100%" h="60vh">
        <Spinner w="3rem" h="3rem" />
      </Center>
    );

  return (
    <Grid
      templateColumns={["1fr", "repeat(2, 1fr)"]}
      gap={2}
      w="90%"
      m="0 auto"
      mt={4}
      mb={4}
    >
      {videos.length ? (
        <>
          {videos.map(
            (
              {
                _id = "",
                title,
                description,
                url,
                createdAt = Date.now(),
              }: IVideo,
              i: number
            ) => (
              <SlideFade key={i} in offsetY={20}>
                <Box
                  w="100%"
                  bg={colorMode === "dark" ? "#373e51" : "#cdd8f5"}
                  p={4}
                  mb={4}
                  borderRadius={5}
                >
                  <Flex
                    direction="column"
                    justify="space-between"
                    w="100%"
                    p={2}
                  >
                    <Heading as="h3">{title}</Heading>
                    <Text mt={2}>
                      {format(new Date(createdAt), "dd MMMM yyyy hh:mm aaaa", {
                        locale: es,
                      })}
                      <br />
                      {`(${formatDistanceToNow(new Date(createdAt), {
                        locale: es,
                      })})`}
                    </Text>
                    <Divider mt={2} mb={4} />
                    <Text mb={4}>{description}</Text>
                    <ReactPlayer url={url} width="auto" />
                    <Divider mt={4} mb={2} />

                    <Flex align="center">
                      <Button onClick={(): void => updateVideo(_id)}>
                        Editar <FiEdit style={{ marginLeft: 5 }} />
                      </Button>
                      <Button
                        onClick={(): Promise<void> => deleteVideo(_id)}
                        ml={2}
                      >
                        Eliminar <FiTrash style={{ marginLeft: 5 }} />
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              </SlideFade>
            )
          )}
        </>
      ) : (
        <Text>No hay vídeos aún.</Text>
      )}
    </Grid>
  );
}

export default Home;
