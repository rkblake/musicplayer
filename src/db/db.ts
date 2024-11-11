import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";
import { walk } from "@std/fs";
import * as mm from "musicmetadata";
import type metadata from "musicmetadata";

export const init_db = (): DB => {
    const db = new DB("music.db");
    db.execute(`
CREATE TABLE IF NOT EXISTS music (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT,
    album       TEXT,
    artist      TEXT,
    cover_path  TEXT,
    path        TEXT,
    track_num   INTEGER,
    disk_num    INTEGER,
    duration    INTEGER,
    UNIQUE(path)
);
CREATE TABLE IF NOT EXISTS playlist (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT
);
CREATE TABLE IF NOT EXISTS music_to_playlist (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    music_id    INTEGER,
    playlist_id INTEGER,
    FOREIGN KEY(music_id) REFERENCES music(id),
    FOREIGN KEY(playlist_id) REFERENCES playlist(id)
);
`);
    return db;
};
// var metadata = {
//     title: '',
//     artist: [],
//     albumartist: [],
//     album: '',
//     year: '',
//     track: { no: 0, of: 0 },
//     genre: [],
//     disk: { no: 0, of: 0 },
//     picture: [],
//     duration: 0
//   }
type metadata = {
    title: string;
    artist: string[];
    albumartist: string[];
    album: string;
    year: string;
    track: { "no": number; "of": number };
    disk: { "no": number; "of": number };
    duration: number;
};

export const sync_db = async (db: DB) => {
    const dir = Deno.env.get("MUSIC_DIR");
    for await (const dirEntry of walk(dir!, { exts: ["mp3"] })) {
        mm.default(
            Deno.readFileSync(dirEntry.path),
            { duration: true },
            (err: Error | null, meta: metadata) => {
                if (!err) {
                    db.execute(`
INSERT OR IGNORE INTO music (title, album, artist, path)
VALUES ('${meta.title}', '${meta.album}', '${meta.artist}', '${dirEntry.path}');
`);
                }
            },
        );
    }
};

type song = {
    name: string;
    album: string;
    artist: string;
    path: string;
    // track_num: number;
    // duration: number;
};
export const get_songs = (db: DB) => {
    const songs = db.query(`
SELECT title, album, artist, path FROM music;
`) as unknown[] as song[];
    console.log(songs);
    return songs;
};

// get_artists
// get_albums
// get_albums_by_artist
// get_songs_by_artist
// get_songs_by_album
// create_playlist
// add_song_to_playlist
// remove_song_from_playlist
// remove_playlist
