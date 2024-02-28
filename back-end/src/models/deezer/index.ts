import { z } from "zod";

export const ArtistSchema = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string().url(),
  picture: z.string().url(),
  picture_small: z.string().url(),
  picture_medium: z.string().url(),
  picture_big: z.string().url(),
  picture_xl: z.string().url(),
  tracklist: z.string().url(),
  type: z.string(),
});
export const AlbumSchema = z.object({
  id: z.number(),
  title: z.string(),
  cover: z.string().url(),
  cover_small: z.string().url(),
  cover_medium: z.string().url(),
  cover_big: z.string().url(),
  cover_xl: z.string().url(),
  md5_image: z.string(),
  tracklist: z.string().url(),
  type: z.string(),
});

export const SongSchema = z.object({
  id: z.number(),
  readable: z.boolean(),
  title: z.string(),
  title_short: z.string(),
  title_version: z.string().optional(),
  link: z.string().url(),
  duration: z.number(),
  rank: z.number(),
  explicit_lyrics: z.boolean(),
  explicit_content_lyrics: z.number(),
  explicit_content_cover: z.number(),
  preview: z.string().url(),
  md5_image: z.string(),
  artist: ArtistSchema,
  album: AlbumSchema,
  type: z.string(),
});

export const SongOptionSchema = z.object({
  label: SongSchema.shape.title,
  value: SongSchema,
});

export const DeezerSearchResponseSchema = z
  .object({
    data: SongSchema.array(),
    total: z.number(),
    next: z.string(),
  })
  .partial();

export type SearchDeezerResponse = z.infer<typeof DeezerSearchResponseSchema>;
export type Song = z.infer<typeof SongSchema>;
export type SongOption = z.infer<typeof SongOptionSchema>;
export type Album = z.infer<typeof AlbumSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
