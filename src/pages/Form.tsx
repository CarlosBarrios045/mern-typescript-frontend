import React, { useState, useEffect } from "react";
// Router
import { useHistory, useParams } from "react-router-dom";

// API
import { createProduct, updateProduct, getProduct } from "src/data/Interface";

// Layout
import {
  Button,
  Input,
  Heading,
  Fade,
  Center,
  Spinner,
} from "@chakra-ui/react";

// Interfaces
import { IVideo } from "src/ts/interfaces";

type FormElement = React.FormEvent<HTMLFormElement>;

interface IUserId {
  id: string;
}

const Form: React.SFC = (): JSX.Element => {
  const initialData = {
    title: "",
    description: "",
    url: "",
  };

  // State
  const [data, setData] = useState<IVideo>(initialData);
  const [isEditVideo, setIsEditVideo] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { title, description, url } = data;
  const validateData = title && url;

  // Router
  const { push, location } = useHistory();
  const { pathname } = location;
  const { id } = useParams<IUserId>();

  const handleSubmit = async (e: FormElement) => {
    e.preventDefault();
    if (validateData) {
      try {
        if (!isEditVideo) {
          await createProduct(data);
        } else {
          await updateProduct(id, data);
        }
        setData(initialData);
        push("/");
      } catch (error) {
        // Error
      }
    }
  };

  const handleGetVideo = async (): Promise<void> => {
    setLoading(true);
    try {
      const { data: d } = await getProduct(id);
      setData({ title: d?.title, description: d?.description, url: d?.url });
      setLoading(false);
    } catch (e) {
      // Error
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathname) {
      if (pathname.includes("/editar-video/")) {
        setIsEditVideo(true);
        handleGetVideo();
      } else {
        setLoading(false)
      }
    }
  }, [pathname]);

  if (loading)
    return (
      <Center w="100%" h="60vh">
        <Spinner w="3rem" h="3rem" />
      </Center>
    );

  return (
    <Fade in>
      <form onSubmit={handleSubmit}>
        <Heading as="h1" mb={4}>
          {!isEditVideo ? "Nuevo vídeo" : "Editar vídeo"}
        </Heading>
        <Input
          type="text"
          placeholder="Título"
          isRequired
          value={title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          mb={3}
        />
        <Input
          type="text"
          placeholder="Descripción"
          isRequired
          value={description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          mb={3}
        />
        <Input
          type="url"
          placeholder="URL del vídeo"
          isRequired
          value={url}
          onChange={(e) => setData({ ...data, url: e.target.value })}
          mb={3}
        />
        <Button
          colorScheme="blue"
          type="submit"
          mt={5}
          disabled={!validateData}
        >
          Guardar
        </Button>
      </form>
    </Fade>
  );
};

export default Form;
