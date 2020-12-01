import axios, { AxiosResponse } from "axios";
import { IVideo } from "src/ts/interfaces";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const urlVideos = `${API_BASE_URL}/videos`;
const urlVideo = (id: string): string => `${API_BASE_URL}/video/${id}`;

// GET
export const getProducts = (): Promise<AxiosResponse> => axios.get(urlVideos);
export const getProduct = (id: string): Promise<AxiosResponse> =>
  axios.get(urlVideo(id));

// CREATE
export const createProduct = (data: IVideo): Promise<AxiosResponse> =>
  axios.post(urlVideos, data);

// UPDATE
export const updateProduct = (
  id: string,
  data: IVideo
): Promise<AxiosResponse> => axios.put(urlVideo(id), data);

// DELETE
export const deleteProduct = (id: string): Promise<AxiosResponse> =>
  axios.delete(urlVideo(id));
